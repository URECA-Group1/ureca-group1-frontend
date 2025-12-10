import { api } from "./api";
import { OrderResponse } from "../types/order";

/**
 * @file src/api/order.ts
 * @author 허영현
 * @since 2025-12-10
 * @description 간식 주문과 관련된 API 함수들이 있는 파일입니다.
 */

// 1) 간식 주문 요청 (Kafka 비동기 접수)
export async function requestOrder(snackId: number): Promise<string> {
  const response = await api.post<{ data: string }>(`/api/orders/${snackId}`);
  return response.data.data; // "SUCCESS" (접수 성공)
}

// 2) 주문 내역 조회
export async function fetchOrderHistory() {
  const response = await api.get<{ data: OrderResponse[] }>("/api/orders/list");
  return response.data.data;
}

// 3) 결제 승인
export async function payOrder(orderId: number): Promise<OrderResponse> {
  const response = await api.post<{ data: OrderResponse }>(
    `/api/orders/${orderId}/payment`
  );
  return response.data.data;
}

// 3. 결제 취소
export async function cancelPay(orderId: number): Promise<OrderResponse> {
  const response = await api.post<{ data: OrderResponse }>(
    `/api/orders/${orderId}/cancel`
  );
  return response.data.data;
}
