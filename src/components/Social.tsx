import Link from "next/link";
import ArrowIcon from "@/components/icons/Arrow";

const LINKS = [
  {
    label: "Email",
    content: "scenium@gmail.com",
    href: "mailto:scenium@gmail.com",
  },
  {
    label: "TikTok",
    content: "@scenium._",
    href: "https://www.tiktok.com/@scenium._",
  },
  {
    label: "Instagram",
    content: "scenium._",
    href: "https://www.instagram.com/scenium._/",
  },
  {
    label: "LinkedIn",
    content: "Scenium",
    href: "https://www.linkedin.com/company/sceniumevent/",
  },
];

export default function Social() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-[600px] gap-x-[80px] gap-y-[52px] mb-[100px] lg:mb-[180px] mt-[70px] justify-items-center lg:justify-items-start">
      {LINKS.map((link) => (
        <div
          key={link.href}
          className="flex flex-col items-center lg:items-start"
        >
          <p
            style={{ fontSize: "var(--title-social)" }}
            className="whitespace-nowrap"
          >
            {link.label}
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <Link
              href={link.href}
              className="flex items-center whitespace-nowrap"
              style={{ fontSize: "var(--txt-social)" }}
            >
              {link.content}
              <ArrowIcon size={26} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
