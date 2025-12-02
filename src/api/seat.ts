import { api } from "./api";
import { GetSeatsResponse } from "@/src/types/seat";

export async function getSeats(): Promise<GetSeatsResponse> {
  const response = await api.get<GetSeatsResponse>("/api/seats");
  return response.data;
}
