"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getAvailableMeetingRooms } from "@/src/api/meeting-rooms";
import { MeetingRoom as MeetingRoomType } from "@/src/types/meeting-room";
import { FaArrowLeft } from "react-icons/fa";
import MeetingRoom from "@/src/components/MeetingRoom";

/**
 * @file src/types/seat.ts
 * @author 윤재민
 * @since 2025-12-02
 * @description 회의실 페이지를 보여주는 화면입니다.
 */
export default function MeetingRoomsPage() {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoomType[]>([]);

  const loadMeetingRooms = async () => {
    try {
      const data = await getAvailableMeetingRooms();
      setMeetingRooms(data);
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMeetingRooms();
  }, []);

  return (
    <div className="mt-10 mx-10 min-w-sm">
      <div>
        <Link
          href="/"
          className="flex items-center text-zinc-500 hover:text-zinc-700 cursor-pointer"
        >
          <FaArrowLeft size="16" />
          <span className="ml-2">돌아가기</span>
        </Link>
        <h2 className="mt-5 text-3xl font-bold">회의실 예약</h2>
        <p className="mt-2 text-zinc-700 text-lg">
          원하는 회의실을 선택하세요.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-4">
        {meetingRooms.map((room) => {
          return (
            <MeetingRoom
              key={room.id}
              id={room.id}
              updateMeetingRoomsList={loadMeetingRooms}
            />
          );
        })}
      </div>
    </div>
  );
}
