/**
 * @file src/components/SnackList.tsx
 * @author 허영현, 박서연
 * @since 2025-12-07
 * @description 간식 리스트 UI 컴포넌트 파일입니다.
 */

"use client";

import { useEffect, useState } from "react";
import { fetchSnackList } from "../../api/snack";
import { requestOrder, fetchOrderHistory } from "../../api/order";
import { Snack } from "../../types/snack";
import { useRouter } from "next/navigation";
import styles from "./SnackList.module.css";

export default function SnackList() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchSnackList();
        setSnacks(list);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 주문하기 눌렀을 때 실행되는 함수
  const handleOrder = async (snackId: number) => {
    try {
      const result = await requestOrder(snackId); // "SUCCESS" or "FAIL"

      if (result === "SUCCESS") {
        const orders = await fetchOrderHistory();

        if (!orders || orders.length === 0) {
          alert("주문 내역을 찾을 수 없습니다.");
          return;
        }

        // 최신 주문은 배열의 마지막 요소
        const latest = orders[orders.length - 1];

        router.push(`/orders/${latest.orderId}/pay`);
      } else {
        alert("선착순 마감되었습니다.");
      }
    } catch (err) {
      alert("주문 요청 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>⏳ 불러오는 중...</p>;
  if (error) return <p>❌ 에러: {error}</p>;

  return (
    <div className={styles.gridContainer}>
      {snacks.map((snack) => (
        <div key={snack.snackId} className={styles.card}>
          {/* 이미지 영역 */}
          <div className={styles.imagePlaceholder}>이미지 없음</div>

          {/* 정보 영역 */}
          <div>
            <h3 className={styles.snackName}>{snack.snackName}</h3>

            <div className={styles.infoRow}>
              <span className={styles.price}>
                {snack.snackPrice.toLocaleString()}P
              </span>
              <span className={styles.stock}>
                재고: {snack.snackQuantity}개
              </span>
            </div>
          </div>

          {/* 버튼 영역 */}
          <button
            className={styles.orderButton}
            onClick={() => handleOrder(snack.snackId)}
          >
            주문하기
          </button>
        </div>
      ))}
    </div>
  );
}
