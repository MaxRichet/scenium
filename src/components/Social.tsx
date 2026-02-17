import Link from "next/link";
import ArrowIcon from "./icons/Arrow";

const LINKS = [
    { label: 'Email', content: 'scenium@gmail.com', href: 'mailto:scenium@gmail.com' },
    { label: 'TikTok', content: '@scenium._', href: 'https://www.tiktok.com/@scenium._' },
    { label: 'Instagram', content: 'scenium._', href: 'https://www.instagram.com/scenium._/' },
    { label: 'LinkedIn', content: 'Scenium', href: 'https://www.linkedin.com/company/sceniumevent/' },
]

export default function Social() {

  return (
    <div className="flex flex-wrap w-[450px] gap-[52px] content-center mb-[180px] mt-[70px]">
        {LINKS.map((link) => (
            <div key={link.href}>
                <p style={{ fontSize: "var(--title-social)" }}>{link.label}</p>
                <div>
                    <Link
                    href={link.href}
                    className="flex items-center"
                    style={{ fontSize: "var(--txt-social)" }}
                    >
                        {link.content}
                        <ArrowIcon size={26} />
                    </Link>
                </div>
            </div>
          ))}
    </div>
  )
}