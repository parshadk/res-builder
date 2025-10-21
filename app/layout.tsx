import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create a professional resume with ease"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
