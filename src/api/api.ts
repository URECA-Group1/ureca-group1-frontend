import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소로 변경
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰을 가져오는 헬퍼 (지금은 localStorage 기준)
const getToken = () => {
  if (typeof window === "undefined") return null; // SSR 방지
  return localStorage.getItem("token");
};

// 요청 인터셉터: 매 요청마다 Authorization 헤더 자동 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
