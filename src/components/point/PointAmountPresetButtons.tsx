/**
 * @file src/components/point/PointAmountPresetButtons.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 충전할 포인트를 빠른 선택하는 버튼 컴포넌트 파일입니다.
 */

export default function PointAmountPresetButtons({
  setAmount,
}: {
  setAmount: (n: number) => void;
}) {
  const presets = [10000, 30000, 50000, 100000];

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {presets.map((p) => (
        <button
          key={p}
          onClick={() => setAmount(p)}
          style={{
            flex: "1",
            padding: "12px 0",
            border: "1px solid #ddd",
            borderRadius: "12px",
            background: "#f8f2ff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {(p / 10000).toFixed(0)}만원
        </button>
      ))}
    </div>
  );
}
