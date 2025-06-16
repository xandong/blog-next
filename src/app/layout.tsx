import type { Metadata } from "next"
import localFont from "next/font/local"

import "@/styles/global.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Toaster } from "@/components/_ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
})

export const metadata: Metadata = {
  title: "Share 4 Us",
  description: "Compartilhe  o que quiser com quem quiser",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster duration={3000} position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
