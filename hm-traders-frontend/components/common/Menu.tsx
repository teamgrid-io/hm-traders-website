'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

interface NavbarProps {
  menu: MenuItem[];
}

export default function Menu({ menu }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="navbar desktopNav">
      {menu.map((item) => {
        const isActive =
          item.link === "/"
            ? pathname === "/"
            : pathname.startsWith(item.link);

        return (
          <Link
            key={item.id}
            href={item.link}
            className={isActive ? 'active-link' : ''}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}