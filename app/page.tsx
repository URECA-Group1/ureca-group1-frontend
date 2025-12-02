// app/page.tsx
import Image from "next/image";
import HeaderComponent from "../src/components/HeaderComponent"; // 경로 확인

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black font-sans">
      {/* 헤더 */}
      <HeaderComponent />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col items-center justify-center flex-1 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            스터디 카페 통합 예약 시스템
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            회의실, 좌석, 간식을 예약해보세요!
          </p>
        </div>
      </main>
    </div>
  );
}
