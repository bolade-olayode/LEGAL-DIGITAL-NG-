// app/layout.js (The Root Wrapper)
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Legal Digital NG',
  description: 'Nigerian Legal Database',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  )
}