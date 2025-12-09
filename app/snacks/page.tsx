/**
 * @file app/snacks/page.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 목록 화면을 보여주는 페이지입니다.
 */

"use client";

import { useRouter } from "next/navigation";
import UserPoint from "@/src/components/point/UserPoint";
import SnackList from "@/src/components/snack/SnackList";

export default function SnacksPage() {
  const router = useRouter();

  return (
    <main style={{ padding: "20px" }}>
      {/* 돌아가기 버튼 */}
      <button
        onClick={() => router.push("/")}
        style={{
          background: "none",
          border: "none",
          color: "#666",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        ← 돌아가기
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>간식 목록</h1>

      <p style={{ color: "#777", marginTop: "4px" }}>
        다양한 간식과 음료를 주문하세요
      </p>

      <UserPoint />

      <SnackList />
    </main>
  );
}
