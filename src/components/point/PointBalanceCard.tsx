/**
 * @file src/components/point/PointBalanceCard.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 포인트 충전 페이지의 현재 포인트 표시 컴포넌트 파일입니다.
 */

export default function PointBalanceCard({ points }: { points: number }) {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #a94bff, #ff6bcb)",
        borderRadius: "16px",
        color: "#fff",
        padding: "24px",
        marginBottom: "30px",
      }}
    >
      <p style={{ fontSize: "16px", opacity: 0.8 }}>현재 보유 포인트</p>
      <h2 style={{ fontSize: "40px", fontWeight: 800 }}>
        {points.toLocaleString()}P
      </h2>
    </div>
  );
}
