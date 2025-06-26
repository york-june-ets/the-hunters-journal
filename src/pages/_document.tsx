import { Html, Head, Main, NextScript } from 'next/document'
import { Header } from '@/components/Header'
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Header></Header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}