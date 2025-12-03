/**
 * @file src/components/SnackList.tsx
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 리스트 UI 컴포넌트 파일입니다.
 */

"use client";

import { useEffect, useState } from "react";
import { fetchSnackList } from "../api/snack";
import { Snack } from "../types/snack";

export default function SnackList() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchSnackList();
        setSnacks(list);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>⏳ 불러오는 중...</p>;
  if (error) return <p>❌ 에러: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {snacks.map((snack) => (
        <div
          key={snack.id}
          style={{
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "6px" }}>
            {snack.snackName}
          </h2>
          <p>가격: {snack.snackPrice}원</p>
          <p>재고: {snack.snackQuantity}개</p>
        </div>
      ))}
    </div>
  );
}
