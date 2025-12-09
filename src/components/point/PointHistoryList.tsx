/**
 * @file src/components/point/PointHistoryList.tsx
 * @author 허영현
 * @since 2025-12-09
 * @description 포인트 사용 내역 리스트 + 페이징 컴포넌트 파일입니다.
 */

import { PaidOrder } from "@/src/types/point";
import PointHistoryItem from "./PointHistoryItem";
import styles from "./PointHistory.module.css";

interface Props {
  orders: PaidOrder[];
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export default function PointHistoryList({
  orders,
  page,
  setPage,
  totalPages,
}: Props) {
  const hasOrders = orders.length > 0;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>포인트 사용 내역</h3>

      <div className={styles.listBox}>
        {!hasOrders && (
          <div className={styles.empty}>포인트 사용 내역이 없습니다.</div>
        )}

        {hasOrders &&
          orders.map((order) => (
            <PointHistoryItem key={order.orderId} order={order} />
          ))}
      </div>

      {/* 페이징 UI - 사용내역 있을 때만 표시 */}
      {hasOrders && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={styles.pageButton}
          >
            이전
          </button>

          <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={styles.pageButton}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
