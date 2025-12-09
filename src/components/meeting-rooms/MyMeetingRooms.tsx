import { useState } from "react";
import Modal from "@/src/components/Modal";
import {
  cancelReservation,
  getMyReservedMeetingRooms,
} from "@/src/api/meeting-rooms";
import { MyMeetingRoom } from "@/src/types/meeting-room";

/**
 * @file src/components/meeting-rooms/MyMeetingRooms.tsx
 * @author 윤재민
 * @since 2025-12-09
 * @description 내 예약 내역(회의실)을 보여주는 버튼과 화면입니다.
 */

export default function MyMeetingRooms({
  updateMeetingRoomsList,
}: {
  updateMeetingRoomsList: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [myReservations, setMyReservations] = useState<MyMeetingRoom[]>([]);

  const getMyReservations = async () => {
    try {
      const data = await getMyReservedMeetingRooms();
      console.log(data);
      setMyReservations(data);
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  return (
    <>
      <button
        className="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        onClick={async () => {
          await getMyReservations();
          setIsOpen(true);
        }}
      >
        내 예약
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          updateMeetingRoomsList();
          setIsOpen(false);
        }}
        title={"내 예약"}
      >
        {myReservations?.map((reservation) => (
          <div key={reservation.id} className="p-3 shadow">
            <div className="text-zinc-500">{"예약 번호 " + reservation.id}</div>
            <div className="flex justify-between">
              <div className="text-2xl font-bold">
                {"회의실 " + reservation.meetingRoomId}
              </div>
              <div> {reservation.status} </div>
            </div>
            <button
              className="w-full rounded py-2 px-3 bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
              onClick={async () => {
                await cancelReservation(reservation.id);
                getMyReservations();
              }}
            >
              예약 취소
            </button>
          </div>
        ))}
        <></>
      </Modal>
    </>
  );
}
