/**
 * @file src/types/order.ts
 * @author 허영현
 * @since 2025-12-10
 * @description 간식 주문 내역 응답의 타입 값을 정의하는 파일입니다.
 */
export interface OrderResponse {
  orderId: number;
  userId: number;
  snackName: string;
  totalPrice: number;
  orderStatus: "SUCCESS" | "FAIL" | "PAID" | "CANCELED";
  orderTime: string;
}
