import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Sidebar } from '@/components/ui/Sidebar'
import AppLayout from '@/components/layout/AppLayout'
import NotifyContainer from '@/lib/notification'
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
      <body className={`flex ${sfProText.variable} ${inter.variable}`}>
        <AppLayout>
          <Sidebar />
          {children}
        </AppLayout>
        <NotifyContainer />
      </body>
    </html>
  )
}
