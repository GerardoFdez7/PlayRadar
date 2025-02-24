import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayRadar",
  description: "Made by a gamer, for gamers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var modoOscuro = localStorage.getItem('modoOscuro');
                if (modoOscuro === 'true') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Si necesitas lógica adicional del lado del cliente para manejar toggles, puedes envolver los children en un componente cliente */}
        {children}
      </body>
    </html>
  );
}
