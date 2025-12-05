import SeatingChartHeader from "@/src/components/seats/SeatingChartHeader";
import SeatHeader from "@/src/components/seats/SeatHeader";
import SeatingChart from "@/src/components/seats/SeatingChart";

/**
 * @file app/seats/page.tsx
 * @author 윤재민
 * @since 2025-12-02
 * @description 좌석 화면을 보여주는 페이지입니다.
 */

export default function SeatsPage() {
  return (
    <div className="mt-10 mx-10">
      <SeatHeader />
      <div className="py-6 px-4 shadow-xl rounded-xl w-[600px]">
        <SeatingChartHeader />
        <SeatingChart />
      </div>
    </div>
  );
}
