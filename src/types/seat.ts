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
