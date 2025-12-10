import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

// 1. Initialize the font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Legal Digital NG - Nigerian Legal Database',
  description: 'Access Nigeria\'s most comprehensive legal database.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Apply the font class to the body */}
      <body className={`${montserrat.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}