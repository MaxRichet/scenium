import type { Metadata } from "next";
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Degular-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Degular-Semibold.otf',
      weight: '600',
      style: 'semibold',
    },
  ],
  variable: '--font-main',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Scenium",
  description: "Scènes événementielles mobiles pour vos mariages, anniversaires et soirées. Un clic, une scène, des souvenirs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={myFont.variable}
      >
        <div className="flex items-center pt-[30px] fixed z-999">
          <Link href='/' className="ml-[125px] cursor-pointer z-10 max-xl:ml-[30px]">
            <Image src='/logoN.svg' alt='Logo Scenium' width={115} height={44} className="max-lg:hidden" />
          </Link>
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
