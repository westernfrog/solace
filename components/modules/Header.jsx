"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Gallery", href: "/gallery" },
  { name: "Notes", href: "/notes" },
  { name: "Blogs", href: "/blogs" },
  { name: "Progress", href: "/progress" },
  { name: "Questions", href: "/questions" },
];

export default function Header() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <header className="sticky inset-x-0 top-0 z-50 lg:px-10 px-6 py-6 mix-blend-difference">
      <nav>
        <ul className="flex flex-wrap items-center justify-center lg:gap-6 gap-6">
          <li className="group">
            <Link href="/" className="relative text-sm">
              Solace
              <span
                className={`absolute -bottom-1 left-0 w-full h-px bg-light transition-transform duration-500 ease-in-out transform origin-left ${
                  pathname === "/"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          </li>
          {navigation.map((item) => (
            <li key={item.name} className="group">
              <Link href={item.href} className="relative text-sm">
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-px bg-light transition-transform duration-500 ease-in-out transform origin-left ${
                    pathname === item.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
