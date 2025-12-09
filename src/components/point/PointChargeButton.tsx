/**
 * @file src/components/point/PointChargeButton.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 포인트 충전하기 버튼 컴포넌트 파일입니다.
 */

import { useRouter } from "next/navigation";
import "./PointChargeButton.css";

export default function PointChargeButton({ amount }: { amount: number | "" }) {
  const router = useRouter();

  const onClick = () => {
    if (!amount || amount <= 0) {
      alert("충전 금액을 입력해주세요.");
      return;
    }

    // 결제 위젯 페이지로 이동하며 금액 전달
    router.push(`/points/checkout?amount=${amount}`);
  };

  return (
    <button className="charge-btn" onClick={onClick}>
      충전하기
    </button>
  );
}
