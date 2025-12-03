/**
 * @file src/components/UserPoint.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 유저의 잔여 포인트 표시 + 충전 페이지로 이동하는 컴포넌트 파일입니다.
 */

"use client";

import { useEffect, useState } from "react";
import { fetchMyPoints } from "../api/point";

export default function PointBalance() {
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
      onClick={moveToChargePage}
      style={{
        padding: "12px 16px",
        backgroundColor: "#f8f8f8",
        borderRadius: "8px",
        marginBottom: "20px",
        cursor: "pointer",
        fontWeight: 600,
        border: "1px solid #ddd",
      }}
    >
      💰 내 잔여 포인트:{" "}
      {points !== null ? points.toLocaleString() : "불러오는 중..."} P
    </div>
  );
}
