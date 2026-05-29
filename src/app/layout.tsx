import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";

const frankRuhlLibre = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "אקווה אינסטלציה | אינסטלציה ברמה אחרת — ירושלים",
  description:
    "20 שנות ניסיון. 5,000+ פרויקטים. שירות חירום 24/7 בירושלים וגוש דן. אינסטלציה מוסמכת, ביטוח מלא, 5 שנות אחריות.",
  keywords: "אינסטלטור, ירושלים, שירות חירום, תיקון דליפות, התקנות, שיפוץ אמבטיה",
  openGraph: {
    title: "אקווה אינסטלציה",
    description: "אינסטלציה ברמה אחרת — ירושלים",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhlLibre.variable} ${heebo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
