import { api } from "./api";
import { GetSeatsResponse } from "@/src/types/seat";

/**
 * @file src/api/seat.ts
 * @author 윤재민
 * @since 2025-12-02
 * @description 좌석 페이지와 관련된 API 함수들이 있는 파일입니다.
 */

export async function getSeats(): Promise<GetSeatsResponse> {
  const response = await api.get<GetSeatsResponse>("/api/seats");
  return response.data;
}
