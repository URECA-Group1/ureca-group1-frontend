"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function Seat({
  seatId,
  seatNumber,
}: {
  seatId: string;
  seatNumber: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        key={seatId}
        className="flex flex-col hover:bg-zinc-500 cursor-pointer px-4 py-6 m-1 rounded-2xl border"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-10 text-center">{seatId}</div>
        <div className="w-10 text-center">{seatNumber}</div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={seatNumber}
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
