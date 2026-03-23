import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DamKoto — দাম কত?",
  description: "Facebook Commerce Operating System for Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
	<meta name="facebook-domain-verification"
	content="txo4rxmg3p5f2tkn61gmqade00rr2r"
	/>
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Bangla:wght@400&family=DM+Sans:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
