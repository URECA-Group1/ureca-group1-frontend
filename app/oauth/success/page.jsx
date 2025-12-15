"use client";

/*
@file oauth/success/page.jsx
@author 신형서
@since 2025-12-14
@description 로그인 성공 callback 페이지
*/

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const COOKIE_DOMAIN = ".urecastudycafe.store";

// 로그인 성공 시 임시 쿠키에 담겨져 있던 액세스 토큰을 localStorage로 옮기고
// 액세스 토큰을 쿠키에서 삭제
export default function OAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access");

    if (accessToken) {
      localStorage.setItem("access", accessToken);
      // Cookies.remove("access", { 
      //   path: "/",
      //   domain: COOKIE_DOMAIN,
      //   secure: true
      // }); // 즉시 삭제
    }

    router.replace("/");
  }, []);

  return <div>로그인 처리 중...</div>;
}
