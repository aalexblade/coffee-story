'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
} from 'react';
import { fetchCoffeeMenu, type Coffee } from '@/entities/coffee';
import { fetchPickupSlots } from '../api/fetchPickupSlots';
import { createOrder } from '../api/createOrder';
import {
  clearStoredOrder,
  getOrderServerSnapshot,
  getStoredOrder,
  saveOrder,
  subscribeToOrderStore,
} from '../lib/orderStorage';
import { getOrderErrorMessage, OrderError } from '../lib/orderErrors';
import { getTodayDate, isPickupSlotInFuture } from '../lib/pickupSlots';
import type {
  CoffeeOrder,
  CoffeeOrderLine,
  PickupSlot,
} from '../model/order.types';
import styles from './CoffeeOrder.module.css';
import { OrderConfirmation } from './OrderConfirmation';

// Допоміжна функція маскування телефону (+380 XX XXX XX XX)
function formatUkrainianPhone(value: string): string {
  // Залишаємо тільки цифри
  const digits = value.replace(/\D/g, '');

  // Якщо починається з 380, прибираємо код країни для зручності форматування
  let raw = digits;
  if (raw.startsWith('380')) {
    raw = raw.slice(3);
  } else if (raw.startsWith('80')) {
    raw = raw.slice(2);
  } else if (raw.startsWith('0')) {
    raw = raw.slice(1);
  }

  // Обмежуємо довжину 9 цифрами після +380
  raw = raw.slice(0, 9);

  if (raw.length === 0) return '+380 ';
  if (raw.length <= 2) return `+380 (${raw}`;
  if (raw.length <= 5) return `+380 (${raw.slice(0, 2)}) ${raw.slice(2)}`;
  if (raw.length <= 7)
    return `+380 (${raw.slice(0, 2)}) ${raw.slice(2, 5)}-${raw.slice(5)}`;

  return `+380 (${raw.slice(0, 2)}) ${raw.slice(2, 5)}-${raw.slice(5, 7)}-${raw.slice(7, 9)}`;
}

// Валідація імені (Українська та латинські літери, пробіли, дефіси, апостроф)
const NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\s-]{2,40}$/;

export function CoffeeOrder() {
  const [items, setItems] = useState<CoffeeOrderLine[]>([]);
  const [slots, setSlots] = useState<PickupSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<PickupSlot | null>(null);

  // Стейти даних клієнта
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('+380 ');

  // Окремі помилки валідації полів
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  const order = useSyncExternalStore(
    subscribeToOrderStore,
    getStoredOrder,
    getOrderServerSnapshot,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const refreshSlots = useCallback(async () => {
    const currentDate = getTodayDate();
    const slotsData = await fetchPickupSlots(currentDate);

    const availableSlots = slotsData.filter((slot) =>
      isPickupSlotInFuture(slot),
    );

    setSlots(availableSlots);

    setSelectedSlot((currentSlot) => {
      if (
        currentSlot &&
        availableSlots.some((slot) => slot.id === currentSlot.id)
      ) {
        return currentSlot;
      }

      return availableSlots[0] ?? null;
    });
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        setGeneralError(null);

        const menuData = await fetchCoffeeMenu();

        const orderLines: CoffeeOrderLine[] = menuData.map((item: Coffee) => ({
          id: item.id,
          title: item.title,
          details: item.details,
          price: item.price,
          quantity: 0,
        }));

        setItems(orderLines);
        await refreshSlots();
      } catch (err) {
        console.error('Error initializing CoffeeOrder:', err);
        setGeneralError(
          'Не вдалося завантажити дані. Будь ласка, оновіть сторінку.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [refreshSlots]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      refreshSlots().catch((err) => {
        console.error('Error refreshing pickup slots in background:', err);
      });
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshSlots]);

  const selectedItems = useMemo(
    () => items.filter((item) => item.quantity > 0),
    [items],
  );

  const totalQuantity = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems],
  );

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems],
  );

  const updateQuantity = (id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(20, Math.max(0, item.quantity + delta)),
            }
          : item,
      ),
    );
  };

  // Обробники зміни значень полів з валідацією на льоту
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerName(val);

    if (nameError) {
      if (NAME_REGEX.test(val.trim())) {
        setNameError(null);
      }
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUkrainianPhone(e.target.value);
    setCustomerPhone(formatted);

    if (phoneError) {
      const digitsOnly = formatted.replace(/\D/g, '');
      if (digitsOnly.length === 12) {
        setPhoneError(null);
      }
    }
  };

  const handleSlotSelect = (slot: PickupSlot) => {
    setSelectedSlot(slot);
    if (slotError) {
      setSlotError(null);
    }
  };

  // Строга валідація всієї форми перед відправкою
  const validateForm = (): boolean => {
    let isValid = true;

    // 1. Перевірка імені
    const trimmedName = customerName.trim();
    if (!trimmedName) {
      setNameError('Будь ласка, вкажіть ваше ім’я');
      isValid = false;
    } else if (!NAME_REGEX.test(trimmedName)) {
      setNameError('Ім’я має містити від 2 до 40 літер без спецсимволів');
      isValid = false;
    } else {
      setNameError(null);
    }

    // 2. Перевірка телефону (потрібно рівно 12 цифр: 380 + 9 цифр)
    const digitsOnly = customerPhone.replace(/\D/g, '');
    if (digitsOnly.length !== 12) {
      setPhoneError('Введіть коректний номер телефону (+380 XX XXX XX XX)');
      isValid = false;
    } else {
      setPhoneError(null);
    }

    // 3. Перевірка слоту
    if (!selectedSlot) {
      setSlotError('Будь ласка, оберіть час видачі');
      isValid = false;
    } else {
      setSlotError(null);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setGeneralError(null);

    if (selectedItems.length === 0) {
      setGeneralError('Оберіть хоча б один напій у меню.');
      return;
    }

    if (!validateForm() || !selectedSlot) {
      return;
    }

    const cleanName = customerName.trim();
    const cleanPhone = `+${customerPhone.replace(/\D/g, '')}`;

    try {
      setIsSubmitting(true);

      const createdOrderData = await createOrder({
        pickupSlotId: selectedSlot.id,
        customerName: cleanName,
        customerPhone: cleanPhone,
        items: selectedItems.map((item) => ({
          coffee_id: item.id,
          quantity: item.quantity,
        })),
      });

      const newOrder: CoffeeOrder = {
        id: createdOrderData.orderId,
        orderNumber: createdOrderData.orderNumber,
        formattedOrderNumber: createdOrderData.formattedOrderNumber,
        pickupTime: selectedSlot.slot_time.slice(0, 5),
        items: createdOrderData.items.map((item) => ({
          id: item.coffee_id,
          title: item.title,
          details: '',
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        totalQuantity: createdOrderData.totalQuantity,
        totalPrice: createdOrderData.totalPrice,
      };

      saveOrder(newOrder);
    } catch (err) {
      console.error('Error submitting order:', err);

      if (err instanceof OrderError) {
        setGeneralError(getOrderErrorMessage(err.code));

        if (err.code === 'SLOT_FULL' || err.code === 'SLOT_UNAVAILABLE') {
          refreshSlots().catch((refreshErr) => {
            console.error(
              'Error refreshing slots after order error:',
              refreshErr,
            );
          });
        }
      } else {
        setGeneralError('Не вдалося оформити замовлення. Спробуйте ще раз.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderAgain = () => {
    clearStoredOrder();
    setCustomerName('');
    setCustomerPhone('+380 ');
    setNameError(null);
    setPhoneError(null);
    setSlotError(null);

    setItems((currentItems) =>
      currentItems.map((item) => ({ ...item, quantity: 0 })),
    );

    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    }
  };

  if (order) {
    return <OrderConfirmation order={order} onOrderAgain={handleOrderAgain} />;
  }

  return (
    <section
      id="order"
      className={styles.section}
      aria-labelledby="coffee-order-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>ORDER & PICKUP</span>
          </div>

          <div className={styles.headingRow}>
            <h2 id="coffee-order-heading" className={styles.heading}>
              Your coffee,
              <br />
              <em>your moment.</em>
            </h2>

            <p className={styles.intro}>
              Обери напій, вкажи час та забери замовлення з нашого віконця без
              черги.
            </p>
          </div>
        </div>

        {generalError && <div className={styles.error}>{generalError}</div>}

        {isLoading ? (
          <div className={styles.loading}>Завантаження меню...</div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.products}>
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className={`${styles.product} ${
                    item.quantity > 0 ? styles.selected : ''
                  }`}
                >
                  <div className={styles.productInfo}>
                    <span className={styles.productNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  </div>

                  <div className={styles.productAction}>
                    <span className={styles.price}>{item.price} ₴</span>

                    <div
                      className={styles.quantity}
                      aria-label={`${item.title} quantity`}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0 || isSubmitting}
                        aria-label={`Зменшити ${item.title}`}
                      >
                        −
                      </button>

                      <span aria-live="polite">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= 20 || isSubmitting}
                        aria-label={`Додати ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.summary}>
              <div className={styles.summaryTop}>
                <span>YOUR ORDER</span>
                <span>{totalQuantity} ITEMS</span>
              </div>

              <div className={styles.summaryItems}>
                {selectedItems.length === 0 ? (
                  <p className={styles.empty}>
                    Обери хоча б один напій, щоб продовжити.
                  </p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>{item.price * item.quantity} ₴</span>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.pickup}>
                <span className={styles.pickupLabel}>PICKUP TIME</span>

                <div className={styles.times}>
                  {slots.length === 0 ? (
                    <p className={styles.empty}>Немає доступних слотів</p>
                  ) : (
                    slots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        className={
                          selectedSlot?.id === slot.id ? styles.activeTime : ''
                        }
                        onClick={() => handleSlotSelect(slot)}
                        disabled={isSubmitting}
                        aria-pressed={selectedSlot?.id === slot.id}
                      >
                        {slot.slot_time.slice(0, 5)}
                      </button>
                    ))
                  )}
                </div>
                {slotError && (
                  <span className={styles.inputError}>{slotError}</span>
                )}
              </div>

              {/* Поля для імені та телефону клієнта */}
              <div className={styles.customerFields}>
                <div className={styles.field}>
                  <label htmlFor="customer-name" className={styles.fieldLabel}>
                    YOUR NAME
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    className={`${styles.fieldInput} ${
                      nameError ? styles.invalidInput : ''
                    }`}
                    placeholder="Олександр"
                    value={customerName}
                    onChange={handleNameChange}
                    disabled={isSubmitting}
                    maxLength={40}
                  />
                  {nameError && (
                    <span className={styles.inputError}>{nameError}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="customer-phone" className={styles.fieldLabel}>
                    PHONE NUMBER
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    className={`${styles.fieldInput} ${
                      phoneError ? styles.invalidInput : ''
                    }`}
                    placeholder="+380 (67) 123-45-67"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                  />
                  {phoneError && (
                    <span className={styles.inputError}>{phoneError}</span>
                  )}
                </div>
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <strong>{totalPrice} ₴</strong>
              </div>

              <button
                type="button"
                className={styles.submit}
                disabled={selectedItems.length === 0 || isSubmitting}
                onClick={handleSubmit}
              >
                <span>{isSubmitting ? 'Processing...' : 'Place order'}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
