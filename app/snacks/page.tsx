/**
 * @file app/snacks/page.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 목록 화면을 보여주는 페이지입니다.
 */

import UserPoint from "@/src/components/point/UserPoint";
import SnackList from "@/src/components/snack/SnackList";

export default function SnacksPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        간식 목록
      </h1>

      <UserPoint />

      <SnackList />
    </main>
  );
}
