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
        onChange={(e) =>
          setAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
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
