import type { Metadata } from "next";
import "./globals.css";
import { Flame } from "lucide-react";
import { getSession } from "@/lib/auth";
import SidebarNav from "@/components/SidebarNav";

export const metadata: Metadata = {
  title: "Ignis | Cinematic Expense Tracker",
  description: "Advanced financial analytics and expense tracking.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          {session && (
            <header className="top-header">
              <div className="sidebar-logo">
                <Flame color="#ff0033" size={32} />
                IGNIS
              </div>
              
              <div className="flex items-center gap-6">
                <SidebarNav />
              </div>
            </header>
          )}
          
          <main className="main-content" style={!session ? { padding: 0 } : {}}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
