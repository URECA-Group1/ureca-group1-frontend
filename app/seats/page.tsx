"use client";
import { useEffect, useState } from "react";

import Seat from "@/src/components/Seat";
import { getSeats } from "@/src/api/seat";
import { Seat as SeatType } from "@/src/types/seat";

export default function SeatsPage() {
  const [seats, setSeats] = useState<SeatType[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getSeats();
      setSeats(data.data);
    };
    load();
  }, []);

  return (
    <div className="mt-10 mx-10">
      <h2 className="text-2xl">좌석 예약/입실/퇴실</h2>
      <hr className="mb-5" />
      <div className="flex overflow-y-auto flex-wrap">
        {seats?.map((seat) => (
          <Seat
            key={seat.id}
            id={seat.id}
            seatNumber={seat.seatNumber}
            seatStatus={seat.seatStatus}
          />
        ))}
      </div>
    </div>
  );
}
