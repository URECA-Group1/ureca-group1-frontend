/**
 * @file src/components/point/PointAmountInput.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 충전할 포인트를 입력하는 컴포넌트 파일입니다.
 */

export default function PointAmountInput({
  amount,
  setAmount,
}: {
  amount: number | "";
  setAmount: (n: number | "") => void;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 값은 허용
    if (value === "") {
      setAmount("");
      return;
    }

    // 숫자 아닌 값 입력 시
    if (isNaN(Number(value))) {
      alert("숫자만 입력해주세요.");
      return; // 잘못된 값은 state에 들어가지 않음
    }

    // 정상 숫자라면 state 업데이트
    setAmount(Number(value));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        value={amount}
        onChange={onChange}
        placeholder="충전할 금액을 입력하세요"
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />
      <span style={{ color: "#666" }}>원</span>
    </div>
  );
}
