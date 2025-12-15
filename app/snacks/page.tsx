/**
 * @file app/snacks/page.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 목록 화면을 보여주는 페이지입니다.
 */

"use client";

import UserPoint from "@/src/components/point/UserPoint";
import SnackList from "@/src/components/snack/SnackList";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function SnacksPage() {
  return (
    <div className="mt-10 mx-10">
      <Link
        href="/"
        className="flex items-center text-zinc-500 hover:text-zinc-700 cursor-pointer"
      >
        <FaArrowLeft size="16" />
        <span className="ml-2">돌아가기</span>
      </Link>

      <h2 className="mt-5 text-3xl font-bold">간식 주문</h2>

      <p className="mt-2 text-zinc-700 text-lg">
        다양한 간식과 음료를 주문하세요
      </p>

      <UserPoint />

      <SnackList />
    </div>
  );
}
