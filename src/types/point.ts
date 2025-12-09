/**
 * @file src/types/point.ts
 * @author 허영현
 * @since 2025-12-03
 * @description 유저의 포인트와 관련된 타입 값을 정의하는 파일입니다.
 */

// 보유 포인트
export interface PointResponse {
  points: number;
}

// 포인트 사용 내역
export interface PaidOrder {
  orderId: number;
  userId: number;
  snackName: string;
  totalPrice: number;
  orderStatus: string;
  orderTime: string; // ISO 날짜 문자열
}
