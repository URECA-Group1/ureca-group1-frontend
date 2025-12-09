/**
 * @file src/components/point/PointAmountPresetButtons.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 충전할 포인트를 빠른 선택하는 버튼 컴포넌트 파일입니다.
 */

import "./PointAmountPresetButtons.css";

export default function PointAmountPresetButtons({
  setAmount,
}: {
  setAmount: (n: number) => void;
}) {
  const presets = [10000, 30000, 50000, 100000];

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {presets.map((p) => (
        <button key={p} className="preset-btn" onClick={() => setAmount(p)}>
          {(p / 10000).toFixed(0)}만원
        </button>
      ))}
    </div>
  );
}
