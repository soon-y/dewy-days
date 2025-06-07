import type { Metadata } from "next";
import { Nunito, Cherry_Bomb_One } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

const cherryBomb = Cherry_Bomb_One({
  weight: '400',
  variable: '--font-cherry',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Dewy Days",
  description: "Water tracking application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${cherryBomb.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
