/**
 * @file app/points/fail/page.tsx
 * @author 허영현
 * @since 2025-12-05
 * @description 토스 결제 실패 페이지입니다.
 */

"use client";

import { useSearchParams } from "next/navigation";

export default function FailPage() {
  const params = useSearchParams();

  const message = params.get("message");
  const code = params.get("code");

  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        color: "#333",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>
        결제 실패
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "8px" }}>
        결제 처리 중 오류가 발생했습니다.
      </p>

      {code && (
        <p style={{ fontSize: "14px", color: "#888" }}>
          오류 코드: <strong>{code}</strong>
        </p>
      )}

      {message && (
        <p style={{ fontSize: "14px", color: "#888" }}>
          사유: <strong>{message}</strong>
        </p>
      )}

      <button
        onClick={() => (window.location.href = "/points/charge")}
        style={{
          marginTop: "24px",
          padding: "12px 20px",
          background: "#7c3aed",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.25s ease", // 부드러운 색 전환
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#6d28d9"; // hover: 조금 더 진하게
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#7c3aed"; // 원래 색으로 복귀
        }}
      >
        포인트 충전 페이지로 이동
      </button>
    </div>
  );
}
