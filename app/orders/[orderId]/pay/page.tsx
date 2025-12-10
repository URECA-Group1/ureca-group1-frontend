/**
 * @file app/orders/[orderId]/pay/page.tsx
 * @author 허영현
 * @since 2025-12-10
 * @description 간식 결제 화면을 보여주는 페이지입니다.
 */
"use client";

import { payOrder, cancelPay } from "../../../../src/api/order";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PayPage() {
  const router = useRouter();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);

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
    <div style={{ padding: "20px" }}>
      <h1>결제 페이지</h1>

      <button onClick={handlePay} disabled={loading}>
        결제하기
      </button>

      <button
        onClick={handleCancel}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        결제 취소
      </button>
    </div>
  );
}
