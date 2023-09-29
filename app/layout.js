import './globals.css'
import { Inter } from 'next/font/google'
require('dotenv').config()

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Events Form',
  description: 'Add and remove events for gs-lsamp events page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
