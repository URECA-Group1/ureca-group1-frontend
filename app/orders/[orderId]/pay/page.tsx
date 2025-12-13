/**
 * @file app/orders/[orderId]/pay/page.tsx
 * @author 허영현
 * @since 2025-12-10
 * @description 간식 결제 화면을 보여주는 페이지입니다.
 */
"use client";

import {
  fetchOrderHistory,
  payOrder,
  cancelPay,
} from "../../../../src/api/order";
import type { OrderResponse } from "../../../../src/types/order";
import { fetchMyPoints } from "../../../../src/api/point";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function PayPage() {
  const router = useRouter();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [points, setPoints] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const load = async () => {
      const myPoints = await fetchMyPoints();
      setPoints(myPoints);

      const list = await fetchOrderHistory();
      const found = list.find((o) => o.orderId === Number(orderId));
      setOrder(found ?? null);

      if (found) setRemaining(myPoints - found.totalPrice);
    };
    load();
  }, [orderId]);

  // 뒤로가기(popstate) → 자동 취소 처리
  useEffect(() => {
    const id = Number(orderId);
    if (!id) return;

    const handleBack = () => {
      // 결제 취소 실행
      cancelPay(id).finally(() => {
        // 이전 페이지로 이동 (Next.js router 사용)
        router.back();
      });
    };

    // 히스토리가 이미 조작되지 않았다면 pushState 1회
    if (!window.history.state || !window.history.state.customPayState) {
      window.history.pushState({ customPayState: true }, "", "");
    }

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [orderId, router]);

  if (!order)
    return <div className={styles.container}>주문 정보를 불러오는 중...</div>;

  // 결제
  const handlePay = async () => {
    setLoading(true);
    try {
      await payOrder(Number(orderId));
      alert("결제가 완료되었습니다.");
      router.push("/snacks");
    } catch (err: any) {
      alert(err?.response?.data?.message || "포인트가 부족합니다.");
    } finally {
      setLoading(false);
    }
  };

  // 결제 취소
  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelPay(Number(orderId));
      alert("결제가 취소되었습니다.");
      router.push("/snacks");
    } catch {
      alert("결제 취소 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={handleCancel}>
          ← 돌아가기
        </button>

        <h1 className={styles.pageTitle}>결제하기</h1>
        <p className={styles.pageDesc}>
          주문 내역을 확인하고 결제를 진행하세요
        </p>

        {/* Point card */}
        <div className={styles.pointCard}>
          <div className={styles.pointLabel}>현재 보유 포인트</div>
          <div className={styles.pointValue}>{points.toLocaleString()} P</div>

          <div className={styles.remainingRow}>
            <div className={styles.remainingLabel}>결제 후 잔여 포인트</div>
            <div
              className={styles.remainingValue}
              style={{ color: remaining < 0 ? "#e80f0fff" : "white" }}
            >
              {remaining.toLocaleString()} P
            </div>
          </div>
        </div>

        {/* Order card */}
        <div className={styles.orderCard}>
          <div className={styles.orderTitle}>주문 내역</div>

          <div className={styles.orderRow}>
            <div>
              <div className={styles.snackName}>{order.snackName}</div>
            </div>

            <div className={styles.snackPrice}>
              {order.totalPrice.toLocaleString()} P
            </div>
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button
            className={styles.cancelBtn}
            onClick={handleCancel}
            disabled={loading}
          >
            취소
          </button>

          <button
            className={styles.payBtn}
            onClick={handlePay}
            disabled={loading}
          >
            결제하기
          </button>
        </div>
      </div>
    </main>
  );
}
