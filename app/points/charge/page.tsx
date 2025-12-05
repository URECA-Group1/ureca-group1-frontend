/**
 * @file app/points/charge/page.tsx
 * @author 허영현
 * @since 2025-12-05
 * @description 포인트 충전 페이지입니다.
 */

"use client";

import { useState, useEffect } from "react";
import { fetchMyPoints } from "@/src/api/point";

import PointChargeHeader from "@/src/components/point/PointChargeHeader";
import PointBalanceCard from "@/src/components/point/PointBalanceCard";
import PointAmountInput from "@/src/components/point/PointAmountInput";
import PointAmountPresetButtons from "@/src/components/point/PointAmountPresetButtons";
import PointChargeButton from "@/src/components/point/PointChargeButton";

export default function ChargePage() {
  const [points, setPoints] = useState<number>(0);
  const [amount, setAmount] = useState<number | "">("");

  useEffect(() => {
    (async () => {
      const p = await fetchMyPoints();
      setPoints(p);
    })();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <PointChargeHeader />

      <PointBalanceCard points={points} />

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          marginTop: "20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
          포인트 충전하기
        </h2>

        <PointAmountInput amount={amount} setAmount={setAmount} />

        <PointAmountPresetButtons setAmount={setAmount} />

        <PointChargeButton amount={amount} />
      </div>
    </div>
  );
}
