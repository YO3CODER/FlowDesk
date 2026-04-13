import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import 'react-quill-new/dist/quill.snow.css'

export const metadata: Metadata = {
  title: "Gestion de projet",
  description: "Create by yo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
       data-theme="dark"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
    </ClerkProvider>
  );
}
