import Content from "@/components/layout/content";
import Header from "@/components/layout/header";
import { AppProvider } from "@/contexts/app-provider";
import { CustomTonProvider } from "@/contexts/custom-ton-provider";
import WatermelonProvider from "@/contexts/database-provider";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastProvider } from "@/contexts/toasts/context";
import { TonProvider } from "@/contexts/ton-provider";
import "@/styles/_main.scss";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

const inter = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "OraiDex Ton Multisig",
  description: "Ton Multisig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <ThemeProvider>
            <WatermelonProvider>
              <TonProvider>
                <CustomTonProvider>
                  <ToastProvider>
                    <Header />
                    <Content>{children}</Content>
                  </ToastProvider>
                </CustomTonProvider>
              </TonProvider>
            </WatermelonProvider>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
