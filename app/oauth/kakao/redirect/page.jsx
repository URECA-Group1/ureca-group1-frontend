"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function KakaoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) sendCodeToServer(code);
  }, []);

  const sendCodeToServer = async (code) => {
    try {
      const response = await axios.post("http://localhost:8080/member/kakao/doLogin", { code });
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.replace("/"); // 로그인 후 메인 페이지 이동
    } catch (err) {
      console.error(err);
    }
  };

  return <div>카카오 로그인 진행중...</div>;
}
