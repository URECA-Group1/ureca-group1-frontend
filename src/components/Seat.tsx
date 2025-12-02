"use client";

import { useState } from "react";
import Modal from "./Modal";
import { SeatStatus, Seat as SeatType } from "@/src/types/seat";

/**
 * @file src/components/Seat.tsx
 * @author 윤재민
 * @since 2025-12-02
 * @description 좌석 페이지의 각 좌석 칸을 보여주는 화면입니다.
 */
export default function Seat(seat: SeatType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 입실 중 - 빨간색
  // 예약 중 - 노란색
  // 사용 가능 - 초록색
  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case SeatStatus.USED:
        return "bg-red-500 text-white";
      case SeatStatus.RESERVED:
        return "bg-yellow-400 text-white";
      case SeatStatus.EMPTY:
      default:
        return "bg-green-500 text-white";
    }
  };

  return (
    <>
      <div
        key={seat.id}
        className={`
          flex flex-col hover:bg-zinc-500 cursor-pointer px-4 py-6 m-1 rounded-2xl border
          ${getSeatColor(seat.seatStatus)}
          `}
        onClick={() => setIsOpen(true)}
      >
        <div className="w-10 text-center">{seat.id}</div>
        <div className="w-10 text-center">{seat.seatNumber}</div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={seat.seatNumber}
      >
        <button
          className="py-2 px-3 border border-amber-300 rounded-sm bg-amber-300 hover:bg-amber-400 cursor-pointer"
          onClick={() => alert("기능 개발 중...")}
        >
          예약
        </button>
        <button
          className="ml-1 py-2 px-3 border border-red-400 rounded-sm bg-red-400 hover:bg-red-500 cursor-pointer"
          onClick={() => alert("기능 개발 중...")}
        >
          예약 취소
        </button>
        <button
          className="ml-1 py-2 px-3 border border-green-400 rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer"
          onClick={() => alert("기능 개발 중...")}
        >
          입실
        </button>
        <button
          className="ml-1 py-2 px-3 border border-red-400 rounded-sm bg-red-400 hover:bg-red-500 cursor-pointer"
          onClick={() => alert("기능 개발 중...")}
        >
          퇴실
        </button>
      </Modal>
    </>
  );
}
