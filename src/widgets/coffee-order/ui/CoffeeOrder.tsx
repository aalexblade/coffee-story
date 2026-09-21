'use client';

import { useMemo, useState } from 'react';
import type { CoffeeOrderLine } from '../model/order.types';
import styles from './CoffeeOrder.module.css';

const ORDER_ITEMS: CoffeeOrderLine[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    description: '30 ml · 1 shot',
    price: 70,
    quantity: 0,
  },
  {
    id: 'flat-white',
    title: 'Flat White',
    description: '180 ml · double shot',
    price: 110,
    quantity: 0,
  },
  {
    id: 'latte',
    title: 'Latte',
    description: '300 ml · double shot',
    price: 120,
    quantity: 0,
  },
];

const PICKUP_TIMES = ['08:30', '09:00', '09:30', '10:00', '10:30'];

export function CoffeeOrder() {
  const [items, setItems] = useState(ORDER_ITEMS);
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[0]);

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
      selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
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
            {items.map((item) => (
              <article
                key={item.id}
                className={`${styles.product} ${
                  item.quantity > 0 ? styles.selected : ''
                }`}
              >
                <div className={styles.productInfo}>
                  <span className={styles.productNumber}>
                    {String(items.indexOf(item) + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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
