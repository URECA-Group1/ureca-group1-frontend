/**
 * @file src/components/point/PointHistoryItem.tsx
 * @author 허영현
 * @since 2025-12-09
 * @description 포인트 사용 내역 한 줄 컴포넌트 파일입니다.
 */

import styles from "./PointHistory.module.css";
import { PaidOrder } from "@/src/types/point";

export default function PointHistoryItem({ order }: { order: PaidOrder }) {
  const date = new Date(order.orderTime);
  const formatted = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.snack}>{order.snackName}</div>
        <div className={styles.date}>{formatted}</div>
      </div>

      <div className={styles.price}>-{order.totalPrice.toLocaleString()} P</div>
    </div>
  );
}
