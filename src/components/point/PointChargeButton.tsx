/**
 * @file src/components/point/PointChargeButton.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 포인트 충전하기 버튼 컴포넌트 파일입니다.
 */

export default function PointChargeButton({ amount }: { amount: number | "" }) {
  const onClick = () => {
    if (!amount || amount <= 0) {
      alert("충전 금액을 입력해주세요.");
      return;
    }

    alert(`(DEMO) ${amount.toLocaleString()}원 충전 요청`);
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "16px",
        background: "linear-gradient(to right, #a94bff, #d13bff)",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      충전하기
    </button>
  );
}
