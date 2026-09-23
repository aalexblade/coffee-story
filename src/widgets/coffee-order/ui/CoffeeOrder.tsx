'use client';

import { useMemo, useState } from 'react';
import { COFFEE_MENU } from '@/entities/coffee';
import type { CoffeeOrder, CoffeeOrderLine } from '../model/order.types';
import styles from './CoffeeOrder.module.css';
import { OrderConfirmation } from './OrderConfirmation';

const INITIAL_ORDER_ITEMS: CoffeeOrderLine[] = COFFEE_MENU.map((item) => ({
  id: item.id,
  title: item.title,
  details: item.details,
  price: item.price,
  quantity: 0,
}));

const PICKUP_TIMES = ['08:30', '09:00', '09:30', '10:00', '10:30'];

function generateOrderId(): string {
  return `CO-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function CoffeeOrder() {
  const [items, setItems] = useState<CoffeeOrderLine[]>(INITIAL_ORDER_ITEMS);
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[0]);
  const [order, setOrder] = useState<CoffeeOrder | null>(null);

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

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const newOrder: CoffeeOrder = {
      id: generateOrderId(),
      pickupTime,
      items: selectedItems,
      totalQuantity,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    setOrder(newOrder);
  };

  const handleOrderAgain = () => {
    setItems(INITIAL_ORDER_ITEMS);
    setPickupTime(PICKUP_TIMES[0]);
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
                      disabled={item.quantity === 0}
                      aria-label={`Зменшити ${item.title}`}
                    >
                      −
                    </button>

                    <span aria-live="polite">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
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
                {PICKUP_TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={time === pickupTime ? styles.activeTime : ''}
                    onClick={() => setPickupTime(time)}
                    aria-pressed={time === pickupTime}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <strong>{totalPrice} ₴</strong>
            </div>

            <button
              type="button"
              className={styles.submit}
              disabled={selectedItems.length === 0}
              onClick={handleSubmit}
            >
              <span>Place order</span>
              <span aria-hidden="true">↗</span>
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
