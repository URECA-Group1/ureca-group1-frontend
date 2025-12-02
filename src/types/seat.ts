/**
 * @file src/types/seat.ts
 * @author 윤재민
 * @since 2025-12-02
 * @description 좌석 페이지와 관련된 타입 값을 정의하는 파일입니다.
 */
export interface Seat {
  id: string;
  seatNumber: string;
  seatStatus: SeatStatus;
}

export enum SeatStatus {
  EMPTY = "EMPTY",
  RESERVED = "RESERVED",
  USED = "USED",
}

export interface GetSeatsResponse {
  status: number;
  message: string;
  data: Seat[];
}
