import type { CoffeeOrder } from '../model/order.types';
import styles from './OrderConfirmation.module.css';

interface OrderConfirmationProps {
  order: CoffeeOrder;
  onOrderAgain: () => void;
}

export function OrderConfirmation({
  order,
  onOrderAgain,
}: OrderConfirmationProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="order-confirmation-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>ORDER CONFIRMED</span>
          </div>

          <div className={styles.status}>
            <span className={styles.statusIcon} aria-hidden="true">
              ✓
            </span>

            <p>Your coffee is on its way.</p>
          </div>

          <h2 id="order-confirmation-heading" className={styles.heading}>
            See you
            <br />
            <em>soon.</em>
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.orderNumber}>
            <span>ORDER NUMBER</span>

            <strong>#{order.id}</strong>
          </div>

          <div className={styles.details}>
            <div className={styles.detail}>
              <span>Pickup time</span>
              <strong>{order.pickupTime}</strong>
            </div>

            <div className={styles.detail}>
              <span>Items</span>
              <strong>{order.totalQuantity}</strong>
            </div>

            <div className={styles.detail}>
              <span>Total</span>
              <strong>{order.totalPrice} ₴</strong>
            </div>
          </div>

          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <span>YOUR ORDER</span>
              <span>{order.totalQuantity} ITEMS</span>
            </div>

            <div className={styles.itemsList}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>

                  <span>
                    {item.quantity} × {item.price} ₴
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <p>
              Покажи номер замовлення у віконці та забери свою каву без черги.
            </p>

            <button
              type="button"
              className={styles.button}
              onClick={onOrderAgain}
            >
              <span>Order another coffee</span>

              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
