import { api } from "./api";
import { Snack } from "../types/snack";

/**
 * @file src/api/snack.ts
 * @author 허영현
 * @since 2025-12-03
 * @description 간식 페이지와 관련된 API 함수들이 있는 파일입니다.
 */

export async function fetchSnackList(): Promise<Snack[]> {
  const response = await api.get<{ data: Snack[] }>("/api/snacks/list");
  return response.data.data; // API 응답의 data 배열만 반환
}
