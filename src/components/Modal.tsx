"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* 모달 내용 */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">
            {title ?? "알림"}
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800"
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div className="mb-4 text-sm text-zinc-700">{children}</div>

        {/* footer 버튼 영역 */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-zinc-100 text-zinc-300 hover:text-zinc-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
