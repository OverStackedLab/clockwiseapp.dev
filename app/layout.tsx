import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | ClockWise Dashboard",
    default: "ClockWise Dashboard",
  },
  description:
    "The official ClockWise Dashboard built for easy task management.",
  metadataBase: new URL("https://overstacked.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
