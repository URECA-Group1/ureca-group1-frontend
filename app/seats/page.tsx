import Seat from "@/components/Seat";

const SEATS = [
  { id: "1", seatNumber: "A001" },
  { id: "2", seatNumber: "A002" },
  { id: "3", seatNumber: "A003" },
  { id: "4", seatNumber: "A004" },
  { id: "5", seatNumber: "A005" },
  { id: "6", seatNumber: "A006" },
  { id: "7", seatNumber: "A007" },
  { id: "8", seatNumber: "A008" },
  { id: "9", seatNumber: "A009" },
  { id: "10", seatNumber: "A010" },
];

export default function SeatsPage() {
  return (
    <div className="mt-10 mx-10">
      <h2 className="text-2xl">좌석 예약/입실/퇴실</h2>
      <hr className="mb-5" />
      <div className="flex overflow-y-auto flex-wrap">
        {SEATS.map((seat) => (
          <Seat key={seat.id} seatId={seat.id} seatNumber={seat.seatNumber} />
        ))}
      </div>
    </div>
  );
}
