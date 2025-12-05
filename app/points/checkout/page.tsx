/**
 * @file app/points/checkout/page.tsx
 * @author 허영현
 * @since 2025-12-05
 * @description 토스 결제 위젯 페이지입니다.
 */

"use client";

import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export default function PointCheckoutPage() {
  const params = useSearchParams();
  const chargeAmount = params.get("amount");

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initWidgets() {
      const tossPayments = await loadTossPayments(clientKey);

      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });

      setWidgets(widgets);
    }

    initWidgets();
  }, []);

  useEffect(() => {
    if (!widgets) return;
    if (!chargeAmount) return;

    async function render() {
      const amountValue = Number(chargeAmount);

      // 위젯 결제 금액 설정
      await widgets.setAmount({
        value: amountValue,
        currency: "KRW",
      });

      // 결제 UI 렌더링
      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });

      // 이용약관 UI 렌더링
      await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });

      setReady(true);
    }

    render();
  }, [widgets, chargeAmount]);

  const requestPayment = async () => {
    if (!widgets) return;

    await widgets.requestPayment({
      orderId: `charge_${new Date().getTime()}`,
      orderName: `포인트 ${Number(chargeAmount).toLocaleString()}원 충전`,
      successUrl: `${window.location.origin}/points/success`,
      failUrl: `${window.location.origin}/points/fail`,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ▶▶ 여기가 예쁘게 꾸며진 영역 */}
      <div
        style={{
          background: "#fff",
          padding: "20px 24px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: 700,
            color: "#333",
          }}
        >
          포인트 충전
        </h2>

        <div
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#555",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "8px" }}>충전 금액:</span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#7c3aed",
            }}
          >
            {chargeAmount
              ? `${Number(chargeAmount).toLocaleString()}원`
              : "-원"}
          </span>
        </div>
      </div>

      {/* 토스 결제 UI */}
      <div id="payment-method" />
      <div id="agreement" />

      <button
        disabled={!ready}
        onClick={requestPayment}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "16px",
          background: ready ? "#4f46e5" : "#9ca3af",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        결제하기
      </button>
    </div>
  );
}
