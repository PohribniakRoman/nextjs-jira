import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import "./globals.scss";
import "../styles/main.scss";
import { Navigation } from "@/components/Navigation";
import { Metadata } from "next";
import { ReduxProvider } from "@/redux/Provider";
import {NotificationContainer} from "@/components/NotificationContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jira",
  description: "Jira copy with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <Navigation />
            {children}
            <NotificationContainer />
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
