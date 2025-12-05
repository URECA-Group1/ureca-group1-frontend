"use client";
import { useEffect, useState } from "react";

import { getSeats } from "@/src/api/seat";
import Seat from "@/src/components/seats/Seat";
import { Seat as SeatType } from "@/src/types/seat";

/**
 * @file src/components/seats/SeatingChart.tsx
 * @author 윤재민
 * @since 2025-12-05
 * @description 좌석 페이지의 좌석 배치도 화면입니다.
 */
export default function SeatingChart() {
  const [seats, setSeats] = useState<SeatType[]>([]);

  const loadSeats = async () => {
    try {
      const data = await getSeats();
      setSeats(data.data);
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSeats();
  }, []);

  return (
    <div className="mt-5 flex flex-wrap">
      {seats?.map((seat) => (
        <Seat
          key={seat.id}
          id={seat.id}
          seatNumber={seat.seatNumber}
          seatStatus={seat.seatStatus}
          onChanged={loadSeats}
        />
      ))}
    </div>
  );
}
