/**
 * @file src/components/point/PointChargeHeader.tsx
 * @author 허영현
 * @since 2025-12-04
 * @description 포인트 충전 페이지의 헤더 컴포넌트 파일입니다.
 */

export default function PointChargeHeader() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => history.back()}
        style={{
          background: "none",
          border: "none",
          color: "#666",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        ← 돌아가기
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>포인트 충전</h1>
      <p style={{ color: "#777", marginTop: "4px" }}>
        포인트를 충전하고 사용 내역을 확인하세요
      </p>
    </div>
  );
}
