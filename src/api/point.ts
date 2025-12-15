import { api } from "./api";
import { PointResponse } from "../types/point";
import { PaidOrder } from "../types/point";

/**
 * @file src/api/point.ts
 * @author 허영현
 * @since 2025-12-03
 * @description 유저의 포인트와 관련된 API 함수들이 있는 파일입니다.
 */

// 보유 포인트 조회
// export async function fetchMyPoints(): Promise<number> {
//   const response = await api.get<{ data: PointResponse }>("/api/points");
//   return response.data.data.points; // 숫자만 반환
// }

// 포인트 사용 내역 조회
export async function fetchPaidOrders(): Promise<PaidOrder[]> {
  const res = await api.get<{ data: PaidOrder[] }>("/api/orders/paid");
  return res.data.data;
}
