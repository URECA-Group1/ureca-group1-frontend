import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import {getCookie} from 'cookies-next';

export const api = axios.create({
  baseURL: "https://urecastudycafe.store", // 백엔드 주소로 변경
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 자동으로 전송하도록 설정
});

// JWT 토큰을 가져오는 헬퍼 (지금은 localStorage 기준)
const getAccessToken = () => {
  if (typeof window === "undefined") return null; // SSR 방지
  return localStorage.getItem("access");
};

// 요청 인터셉터: 매 요청마다 Authorization 헤더 자동 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 재발급 로직 추가
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const status = error.response ? error.response.status : null;
        
        // 401 (Unauthorized) 에러이면서, 이미 재시도 중이 아닐 때
        if (status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 플래그 설정
            console.log("Access Token 만료 감지. 재발급 시도 중...");

            // 쿠키에 Refresh Token이 있는지 확인 (Next.js 환경 가정)
            if (!getCookie('refresh')) { 
                console.error("Refresh Token이 쿠키에 없습니다. 재로그인 필요.");
                localStorage.removeItem('access');
                // 💡 Next.js Router를 사용할 수 없으므로 window.location 사용
                window.location.href = '/login'; 
                return Promise.reject(error);
            }

            try {
                // 토큰 재발급 요청 (Refresh Token은 자동으로 쿠키로 전송됨)
                const res = await api.post('api/members/token/refresh'); 

                // 새 Access Token을 응답 헤더(Authorization)에서 추출
                const newAccessTokenWithBearer = res.headers.authorization as string; 
                
                if (!newAccessTokenWithBearer) {
                    throw new Error("새 Access Token이 응답 헤더에 없습니다.");
                }

                const newAccessToken = newAccessTokenWithBearer.replace('Bearer ', '');
                
                // 새 Access Token 저장 및 원본 요청 헤더 업데이트
                localStorage.setItem('access', newAccessToken);
                originalRequest.headers.Authorization = newAccessTokenWithBearer;

                // 원본 요청 재시도
                console.log("토큰 재발급 성공, 원본 요청 재시도.");
                return api(originalRequest); 

            } catch (refreshError) {
                // 재발급 실패 (Refresh Token도 만료되었거나 서버 오류)
                console.error("토큰 재발급 실패. 로그아웃 처리:", refreshError);
                localStorage.removeItem('access');
                window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);
