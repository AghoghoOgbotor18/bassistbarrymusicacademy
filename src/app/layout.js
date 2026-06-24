import { Fraunces, Karla, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AuthModalProvider from "./context/AuthModalContext";
import AuthModal from "./components/AuthModal";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Bassist Barry Music Academy",
  description: "A bass guitar academy in Nigeria",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthModalProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <AuthModal />
        </AuthModalProvider>
      </body>
    </html>
  );
}
