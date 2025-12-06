/**
 * @file app/points/success/page.tsx
 * @author 허영현
 * @since 2025-12-05
 * @description 토스 결제 성공 페이지입니다.
 */

"use client";

import { api } from "../../../src/api/api";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const params = useSearchParams();

  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = params.get("amount");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return;

    async function approve() {
      try {
        await api.post("/api/v1/payment", {
          paymentKey,
          orderId,
          amount: Number(amount),
        });

        alert("포인트 충전 완료!");
        window.location.href = "/points/charge";
      } catch (err) {
        console.error(err);
        alert("결제 승인 오류가 발생했습니다.");
        window.location.href = "/points/charge";
      }
    }

    approve();
  }, [paymentKey, orderId, amount]);

  return <p>결제 승인 처리 중...</p>;
}
