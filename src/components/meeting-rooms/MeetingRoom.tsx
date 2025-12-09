import { useState } from "react";
import Modal from "../Modal";
import {
  cancelReservation,
  enterMeetingRoomReservationPage,
  reserveMeetingRoom,
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
  const [phoneNumber, setPhoneNumber] = useState<string>("");

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

  const completeReservation = async () => {
    if (!isValidPhoneNumber()) {
      alert("휴대전화 번호가 올바르지 않습니다.");
      return;
    }

    try {
      await reserveMeetingRoom(reservationId, phoneNumber);
      setIsOpen(false);
      updateMeetingRoomsList();
      alert("예약 성공");
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  const isValidPhoneNumber = (): boolean => {
    const phoneRegex = /^01[016-9]-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
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
        <div>
          <label className="block mb-1 text-sm font-medium">전화번호</label>
          <input
            type="text"
            className="border w-full px-3 py-2 rounded"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="010-1234-5678"
            maxLength={13}
            required
          />
        </div>
        <button
          className="mt-3 w-full bg-blue-500 text-white px-3 py-2 rounded"
          onClick={completeReservation}
        >
          예약하기
        </button>
      </Modal>
    </>
  );
}
