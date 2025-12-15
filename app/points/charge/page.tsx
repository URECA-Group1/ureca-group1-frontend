/**
 * @file app/points/charge/page.tsx
 * @author 허영현
 * @since 2025-12-05
 * @description 포인트 충전 + 포인트 사용 내역 페이지입니다.
 */

"use client";

import { useState, useEffect } from "react";
import { fetchMyPoints, fetchPaidOrders } from "@/src/api/point";
import { PaidOrder } from "@/src/types/point";

import PointChargeHeader from "@/src/components/point/PointChargeHeader";
import PointBalanceCard from "@/src/components/point/PointBalanceCard";
import PointAmountInput from "@/src/components/point/PointAmountInput";
import PointAmountPresetButtons from "@/src/components/point/PointAmountPresetButtons";
import PointChargeButton from "@/src/components/point/PointChargeButton";
import PointHistoryList from "@/src/components/point/PointHistoryList";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function ChargePage() {
  const [points, setPoints] = useState<number>(0);
  const [amount, setAmount] = useState<number | "">("");
  const [orders, setOrders] = useState<PaidOrder[]>([]);
  const [page, setPage] = useState(1);

  const pageSize = 5; // 페이지당 5개

  useEffect(() => {
    (async () => {
      const p = await fetchMyPoints();
      setPoints(p);

      const o = await fetchPaidOrders();

      // 최신순으로 정렬
      const sorted = [...o].sort(
        (a, b) =>
          new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
      );

      // 잔액 계산 로직
      let balance = p;

      const withBalance = sorted.map((order) => {
        const updated = {
          ...order,
          remainingPoints: balance,
        };

        // 다음 계산 위해 되돌리기
        balance += order.totalPrice;

        return updated;
      });

      setOrders(withBalance);
    })();
  }, []);

  // totalPages가 최소 1이 되게 설정
  const totalPages =
    orders.length === 0 ? 1 : Math.ceil(orders.length / pageSize);

  const paginated =
    orders.length === 0
      ? []
      : orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mt-10 mx-10">
      <Link
        href="/"
        className="flex items-center text-zinc-500 hover:text-zinc-700 cursor-pointer"
      >
        <FaArrowLeft size="16" />
        <span className="ml-2">돌아가기</span>
      </Link>

      <h2 className="mt-5 text-3xl font-bold">포인트 충전</h2>

      <p className="mt-2 text-zinc-700 text-lg">
        포인트를 충전하고 사용 내역을 확인하세요
      </p>

      <PointBalanceCard points={points} />

      {/* 충전 박스 */}
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

      {/* 포인트 내역 */}
      <PointHistoryList
        orders={paginated}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
    // <div>
    //   <PointChargeHeader />

    //   <PointBalanceCard points={points} />

    //   {/* 충전 박스 */}
    //   <div
    //     style={{
    //       background: "#fff",
    //       borderRadius: "16px",
    //       padding: "24px",
    //       marginTop: "20px",
    //       boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
    //     }}
    //   >
    //     <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
    //       포인트 충전하기
    //     </h2>

    //     <PointAmountInput amount={amount} setAmount={setAmount} />

    //     <PointAmountPresetButtons setAmount={setAmount} />

    //     <PointChargeButton amount={amount} />
    //   </div>

    //   {/* 포인트 내역 */}
    //   <PointHistoryList
    //     orders={paginated}
    //     page={page}
    //     setPage={setPage}
    //     totalPages={totalPages}
    //   />
    // </div>
  );
}
