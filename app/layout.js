import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import Volume from "@/components/modules/Volume";
import { AudioProvider } from "@/context/AudioContext"; // Import the provider

const InterSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solace",
  description:
    "Solace means comfort or consolation in a time of distress or sadness. It can refer to something that provides relief or a sense of peace when someone is going through difficulties.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${InterSans.variable} antialiased`}>
        <AudioProvider>
          <Header />
          <Volume />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
