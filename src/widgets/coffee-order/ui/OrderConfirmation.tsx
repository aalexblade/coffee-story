import type { CoffeeOrder } from '../model/order.types';
import styles from './CoffeeOrder.module.css';

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
      id="order"
      className={styles.section}
      aria-labelledby="order-confirmation-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>ORDER CONFIRMED</span>
          </div>

          <div className={styles.headingRow}>
            <h2 id="order-confirmation-heading" className={styles.heading}>
              Thank you,
              <br />
              <em>see you soon!</em>
            </h2>

            <p className={styles.intro}>
              Замовлення <strong>#{order.id}</strong> прийнято. Ми підготуємо
              його до <strong>{order.pickupTime}</strong>.
            </p>
          </div>
        </div>

        <div className={styles.confirmationBox}>
          <h3>Деталі замовлення:</h3>
          <ul className={styles.confirmationList}>
            {order.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{item.price * item.quantity} ₴</span>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <span>До сплати</span>
            <strong>{order.totalPrice} ₴</strong>
          </div>

          <button
            type="button"
            className={styles.submit}
            onClick={onOrderAgain}
          >
            <span>Замовити ще</span>
            <span aria-hidden="true">↺</span>
          </button>
        </div>
      </div>
    </section>
  );
}
