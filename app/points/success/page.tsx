/**
 * @file app/points/success/page.tsx
 * @author 허영현
 * @since 2025-12-12
 * @description 토스 결제 성공 페이지의 래퍼 페이지입니다. (Suspense + SuccessPage 감싸기)
 */

"use client";

import { Suspense } from "react";
import SuccessPage from "./success-content";

export const dynamic = "force-dynamic";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
