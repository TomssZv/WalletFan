import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "../components/topBar/topBar";
import "./globals.css";
import { BalanceStoreProvider } from "@/providers/balanceStoreProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Fan",
  description: "Wallet Fan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <div className="flex justify-evenly">
          <BalanceStoreProvider>
            <Toaster position="bottom-left" />
            {children}
          </BalanceStoreProvider>
        </div>
      </body>
    </html>
  );
}
