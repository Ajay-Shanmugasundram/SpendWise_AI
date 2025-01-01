import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spendwise AI",
  description:
    "Spendwise AI tool Track your expenses, transaction and scan using AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header></Header>
        <main className="min-h-screen"> {children}</main>
        <footer className="bg-blue-100">
          <div className="container mx-auto text-center p-4 text-grey-800">
            <p>copyright is not a very powerful way to protect a UI</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
