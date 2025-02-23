import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AppLayout from '@/components/layout/AppLayout'
import '@/styles/globals.css'

import { sfProText } from '../../public/fonts/SF-Pro-Text-Font-Family'

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
})

export const metadata: Metadata = {
  title: 'Techinnover Todo',
  description: 'An assessment for a todo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sfProText.variable} ${inter.variable}`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
