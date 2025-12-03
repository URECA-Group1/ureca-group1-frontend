import { Snack } from "../types/snack";

/**
 * @file src/api/snack.ts
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 페이지와 관련된 API 함수들이 있는 파일입니다.
 */

export async function fetchSnackList(): Promise<Snack[]> {
  const res = await fetch("/api/snacks/list", { method: "GET" });

  if (!res.ok) {
    throw new Error("간식 목록 조회 실패");
  }

  const result = await res.json();
  return result.data; // API 응답의 data 배열만 반환
}
