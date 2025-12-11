/**
 * @file src/components/point/UserPoint.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 유저의 잔여 포인트 표시 + 충전 페이지로 이동하는 컴포넌트 파일입니다.
 */

"use client";

import { useEffect, useState } from "react";
import { fetchMyPoints } from "../../api/point";

export default function UserPoint() {
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await fetchMyPoints();
        setPoints(p);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const moveToChargePage = () => {
    window.location.href = "/points/charge";
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #ff9f1c, #F97416)",
        padding: "28px 32px",
        borderRadius: "16px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "24px",
        marginBottom: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      onClick={moveToChargePage}
    >
      {/* 왼쪽 문구 + 포인트 */}
      <div>
        <div style={{ fontSize: "14px", opacity: 0.9 }}>내 잔여 포인트</div>
        <div style={{ fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>
          {points !== null ? `${points.toLocaleString()}P` : "불러오는 중..."}
        </div>
      </div>

      {/* 오른쪽 충전하기 */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        충전하기 →
      </div>
    </div>
  );
}
