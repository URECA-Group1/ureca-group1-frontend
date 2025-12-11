// app/page.tsx

"use client";
import Image from "next/image";
import HeaderComponent from "../src/components/HeaderComponent"; // 경로 확인
import styles from "./Home.module.css";
import { LuDoorOpen } from "react-icons/lu";
import { RiArmchairLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";

export default function Home() {
  const cardItems = [
    {
      title: "회의실 예약",
      icon: <LuDoorOpen size={36} style={{ color: "#159e9c" }} />,
      iconBg: styles.iconBgTeal,
      action: "예약하기",
      colorClass: styles.tealText,
      link: "/meeting-rooms",
    },
    {
      title: "좌석 예약",
      icon: <RiArmchairLine size={36} style={{ color: "#0b9a71" }} />,
      iconBg: styles.iconBgGreen,
      action: "예약하기",
      colorClass: styles.greenText,
      link: "/seats",
    },
    {
      title: "간식 주문",
      icon: <IoFastFoodOutline size={36} style={{ color: "#da7908" }} />,
      iconBg: styles.iconBgOrange,
      action: "주문하기",
      colorClass: styles.orangeText,
      link: "/snacks",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <HeaderComponent />

      <main className="flex flex-col items-center justify-center flex-1 py-24 px-6">
        {/* 제목 */}
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900">
            유레카 스터디카페
          </h1>
          <p className="text-lg text-zinc-600">
            편리한 예약과 주문 서비스를 이용해보세요
          </p>
        </div>

        {/* 카드 3개 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {cardItems.map((item, idx) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => (window.location.href = item.link)}
            >
              {/* 아이콘 박스 */}
              <div className={`${styles.iconBox} ${item.iconBg}`}>
                {item.icon}
              </div>

              <div className={styles.cardTitle}>{item.title}</div>

              <div className={`${styles.actionRow} ${item.colorClass}`}>
                <span>{item.action}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
