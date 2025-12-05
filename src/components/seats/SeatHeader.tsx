"use client";
import { FaArrowLeft } from "react-icons/fa";

/**
 * @file src/components/seats/SeatHeader.tsx
 * @author 윤재민
 * @since 2025-12-05
 * @description 좌석 페이지의 헤더를 보여줍니다
 */
export default function SeatHeader() {
  return (
    <div>
      <button
        onClick={() => {
          history.back();
        }}
        className="flex items-center text-zinc-500 hover:text-zinc-700 cursor-pointer"
      >
        <FaArrowLeft size="16" />
        <span className="ml-2">돌아가기</span>
      </button>
      <h2 className="mt-5 text-3xl font-bold">좌석 예약</h2>
      <p className="mt-2 text-zinc-700 text-lg">
        원하시는 좌석을 선택하고 예약하세요.
      </p>
    </div>
  );
}
