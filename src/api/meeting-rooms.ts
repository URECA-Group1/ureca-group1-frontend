import { MeetingRoom } from "../types/meeting-room";
import { api } from "./api";

/**
 * @file src/api/meeting-rooms.ts
 * @author 윤재민
 * @since 2025-12-02
 * @description 회의실 페이지와 관련된 API 함수들이 있는 파일입니다.
 */

// 회의실 목록 받아오기
export async function getAvailableMeetingRooms(): Promise<MeetingRoom[]> {
  const response = await api.get<{ data: MeetingRoom[] }>(
    "/api/meeting-rooms/available"
  );
  return response.data.data;
}

// 예약 페이지 진입
export async function enterMeetingRoomReservationPage(
  meetingRoomId: string
): Promise<{ id: string }> {
  const response = await api.post(
    `/api/meeting-rooms/${meetingRoomId}/reservation-page`
  );
  return response.data.data;
}
