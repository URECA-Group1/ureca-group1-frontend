import { useState } from "react";
import Modal from "./Modal";
import {
  cancelReservation,
  enterMeetingRoomReservationPage,
} from "@/src/api/meeting-rooms";

/**
 * @file src/components/MeetingRoom.tsx
 * @author 윤재민
 * @since 2025-12-05
 * @description 회의실 페이지의 각 회의실 칸을 보여주는 화면입니다.
 */
export default function MeetingRoom({
  id,
  updateMeetingRoomsList,
}: {
  id: string;
  updateMeetingRoomsList: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reservationId, setReservationId] = useState<string>("");

  const enterReservationPage = async () => {
    try {
      const data = await enterMeetingRoomReservationPage(id);

      console.log("reservationId: " + data.id);
      setReservationId(data.id);
      setIsOpen(true);
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  const leaveReservationPage = async () => {
    setIsOpen(false);
    try {
      await cancelReservation(reservationId);
      updateMeetingRoomsList();
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  return (
    <>
      <div
        className="p-16 m-2 border w-2xl lg:w-md border-zinc-100 rounded-xl cursor-pointer hover:bg-zinc-100 shadow"
        onClick={enterReservationPage}
      >
        <div className="text-center text-2xl font-bold">{"회의실 " + id}</div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={leaveReservationPage}
        title={`회의실 ${id} 예약`}
      >
        <></>
      </Modal>
    </>
  );
}
