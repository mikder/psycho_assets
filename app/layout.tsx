import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "이집트 여신으로 알아보는 내 연애 유형",
  description: "12문항으로 보는 나의 연애 성향",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#0b0b0f",
          color: "#eaeaf0",
        }}
      >
        {children}
      </body>
    </html>
  );
}