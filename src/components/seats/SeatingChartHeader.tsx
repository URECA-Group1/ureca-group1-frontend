/**
 * @file src/components/seats/SeatingChartHeader.tsx
 * @author 윤재민
 * @since 2025-12-05
 * @description 좌석 페이지의 좌석 배치도 화면 헤더입니다.
 */
export default function SeatingChartHeader() {
  return (
    <div className="mt-5 flex justify-between">
      <h3 className="text-2xl font-bold">좌석 배치도</h3>
      <div className="flex space-x-2 items-center">
        <div className="w-6 h-6 bg-green-500 rounded-md"></div>
        <div>이용 가능</div>
        <div className="w-6 h-6 bg-yellow-400 rounded-md"></div>
        <div>예약 중</div>
        <div className="w-6 h-6 bg-red-400 rounded-md"></div>
        <div>사용 중</div>
      </div>
    </div>
  );
}
