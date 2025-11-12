"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            이집트 여신으로 알아보는<br />내 연애 유형
          </h1>
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.125rem",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <p>테스트 진행 중...</p>
    </div>
  );
}