"use client"; // 반드시 필요
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function HeaderComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 쿠키에서 token 가져오기
    const token = Cookies.get("token");
    if (token) {
      localStorage.setItem("token", token);
      Cookies.remove("token");
    }

    // 토큰 존재 여부로 로그인 상태 결정
    setIsLogin(!!localStorage.getItem("token"));
  }, []);

  const doLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false); // 상태 업데이트 → UI 자동 갱신
    router.refresh(); // App Router에서는 새로고침 대신 refresh
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        {/* LEFT LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer text-zinc-800"
          onClick={() => router.push("/")}
        >
          URECA StudyCafe
        </h1>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-4">
          {!isLogin && (
            <button
              className="w-[100px] py-2 bg-zinc-800 text-white rounded-lg cursor-pointer text-center"
              onClick={() => router.push("/login")}
            >
              로그인
            </button>
          )}
          {isLogin && (
            <button
              className="w-[100px] py-2 bg-zinc-800 text-white rounded-lg cursor-pointer text-center"
              onClick={doLogout}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
