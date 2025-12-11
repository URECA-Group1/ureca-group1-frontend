"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  /* 프론트엔드에서 인가 코드 발급 받을 떄 사용함
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleUrl = "https://accounts.google.com/o/oauth2/auth";
  const googleClientId = "243224992700-pjff0ng98digervts8aeosp5plblkg3b.apps.googleusercontent.com";
  const googleRedirectUrl = "http://localhost:3000/oauth/google/redirect";
  const googleScope = "openid email profile";

  const kakaoUrl = "https://kauth.kakao.com/oauth/authorize";
  const kakaoClientId = "b25cace08aa3bf3857ec62bbf3a04ba2";
  const kakaoRedirectUrl = "http://localhost:3000/oauth/kakao/redirect";
  */

  /* 일반 회원 로그인
  const memberLogin = async () => {
    const loginData = { email, password };

    const response = await axios.post("http://localhost:8080/member/doLogin", loginData);
    const token = response.data.token;
    localStorage.setItem("token", token);
    window.location.href = "/";
  };
  */

  /* 프론트엔드에서 인가 코드 발급 시
  const googleLogin = () => {
    const url =
      `${googleUrl}?client_id=${googleClientId}` +
      `&redirect_uri=${googleRedirectUrl}` +
      `&response_type=code&scope=${googleScope}`;

    window.location.href = url;
  };

  
  const kakaoLogin = () => {
    const url =
      `${kakaoUrl}?client_id=${kakaoClientId}` +
      `&redirect_uri=${kakaoRedirectUrl}` +
      `&response_type=code`;

    window.location.href = url;
  };
  */

  // 백엔드에서 인가 코드 발급 시
  const googleServerLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  // 백엔드에서 인가 코드 발급 시
  const kakaoServerLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-zinc-900">URECA StudyCafe</h1>
      <p className="text-zinc-500 mt-6 mb-10">
        소셜 계정으로 간편하게 로그인하세요
      </p>

      {/* 로그인 카드 */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl py-10 px-8 mb-4">
        <h2 className="text-center text-2xl font-semibold mb-6">로그인</h2>

        {/* 로그인 버튼 구역 */}
        <div className="flex flex-col gap-4 items-center">
          {/* Google Login */}
          <div
            onClick={googleServerLogin}
            className="cursor-pointer overflow-hidden w-[350px] transition duration-300 ease-in-out hover:brightness-90"
          >
            <img src="/google_login.png" />
          </div>

          {/* Kakao Login */}
          <div
            onClick={kakaoServerLogin}
            className="cursor-pointer overflow-hidden w-[350px] transition duration-300 ease-in-out hover:brightness-90"
          >
            <img src="/kakao_login.png" />
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="text-base text-zinc-500 hover:text-zinc-700 transition mt-2"
      >
        ← 메인으로 돌아가기
      </Link>
    </div>
  );
}
