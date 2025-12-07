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

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <p style={styles.text}>결제 승인 처리 중입니다...</p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    animation: "fadeIn 0.6s ease-in-out",
  },
  loader: {
    width: "48px",
    height: "48px",
    border: "5px solid #ddd",
    borderTop: "5px solid #4F46E5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    fontSize: "18px",
    color: "#555",
    fontWeight: 500,
  },
};

// 글로벌 애니메이션 추가
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}
