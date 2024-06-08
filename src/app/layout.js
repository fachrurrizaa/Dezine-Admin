'use client'
import { Provider } from '@/components/context/MyContext'
import '../../styles/global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
