'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchCoffeeMenu, type Coffee } from '@/entities/coffee';
import { fetchPickupSlots } from '../api/fetchPickupSlots';
import { createOrder } from '../api/createOrder';
import type {
  CoffeeOrder,
  CoffeeOrderLine,
  PickupSlot,
} from '../model/order.types';
import styles from './CoffeeOrder.module.css';
import { OrderConfirmation } from './OrderConfirmation';

export function CoffeeOrder() {
  const [items, setItems] = useState<CoffeeOrderLine[]>([]);
  const [slots, setSlots] = useState<PickupSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<PickupSlot | null>(null);

  const [order, setOrder] = useState<CoffeeOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        setError(null);

        const [menuData, slotsData] = await Promise.all([
          fetchCoffeeMenu(),
          fetchPickupSlots(todayDate),
        ]);

        const orderLines: CoffeeOrderLine[] = menuData.map((item: Coffee) => ({
          id: item.id,
          title: item.title,
          details: item.details,
          price: item.price,
          quantity: 0,
        }));

        setItems(orderLines);
        setSlots(slotsData);

        if (slotsData.length > 0) {
          setSelectedSlot(slotsData[0]);
        }
      } catch (err) {
        console.error('Error initializing CoffeeOrder:', err);
        setError('Не вдалося завантажити дані. Будь ласка, оновіть сторінку.');
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [todayDate]);

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
              quantity: Math.max(0, item.quantity + delta),
            }
          : item,
      ),
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0 || !selectedSlot) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const createdOrderData = await createOrder({
        pickupSlotId: selectedSlot.id,
        items: selectedItems.map((item) => ({
          coffee_id: item.id,
          quantity: item.quantity,
        })),
      });

      const formattedOrderId = `CO-${String(createdOrderData.orderNumber).padStart(6, '0')}`;

      const newOrder: CoffeeOrder = {
        id: formattedOrderId,
        pickupTime: selectedSlot.slot_time.slice(0, 5),
        items: selectedItems,
        totalQuantity,
        totalPrice,
        createdAt: new Date().toISOString(),
      };

      setOrder(newOrder);
    } catch (err) {
      console.error('Error submitting order:', err);
      setError('Не вдалося оформити замовлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderAgain = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({ ...item, quantity: 0 })),
    );
    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    }
    setOrder(null);
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

        {error && <div className={styles.error}>{error}</div>}

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
                        disabled={isSubmitting}
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
                        onClick={() => setSelectedSlot(slot)}
                        disabled={isSubmitting}
                        aria-pressed={selectedSlot?.id === slot.id}
                      >
                        {slot.slot_time.slice(0, 5)}
                      </button>
                    ))
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
                disabled={
                  selectedItems.length === 0 || !selectedSlot || isSubmitting
                }
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
