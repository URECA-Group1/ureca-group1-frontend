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
      // 1) 일단 Kafka 요청 성공했는지만 확인 (이건 재고 보장 X)
      const result = await requestOrder(snackId);

      if (result !== "SUCCESS") {
        alert("주문 요청 실패 (서버 오류)");
        return;
      }

      // Kafka Consumer가 DB 저장할 시간 잠깐 기다리기
      await new Promise((res) => setTimeout(res, 500));

      // 2) 진짜 주문이 저장되었는지 & 재고 확보 성공인지 확인
      const orders = await fetchOrderHistory();

      if (!orders || orders.length === 0) {
        alert("주문 내역을 찾을 수 없습니다.");
        return;
      }

      // 가장 최신 주문
      const latest = orders[orders.length - 1];

      // 3) 재고 확보 결과에 따라 분기 처리
      if (latest.orderStatus === "SUCCESS") {
        router.push(`/orders/${latest.orderId}/pay`);
      } else if (latest.orderStatus === "FAIL") {
        alert("선착순 마감되었습니다.");
        window.location.reload();
      } else {
        alert(`처리할 수 없는 주문 상태: ${latest.orderStatus}`);
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
