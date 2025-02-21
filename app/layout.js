import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solace",
  description:
    "Solace means comfort or consolation in a time of distress or sadness. It can refer to something that provides relief or a sense of peace when someone is going through difficulties.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <svg width="0" height="0" className="absolute inset-0 z-0">
          <defs>
            <pattern
              id="pattern-1"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#fff" />
            </pattern>
          </defs>
        </svg>
        <Header />
        {children}
      </body>
    </html>
  );
}
