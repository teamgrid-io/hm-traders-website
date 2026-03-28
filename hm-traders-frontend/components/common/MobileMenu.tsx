"use client";

import { useState } from "react";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import SearchBarToggle from "../common/SearchBarToggle";
import './MobileMenu.css'

export default function MobileMenu({ menu }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <IoClose size={26} /> : <IoMenu size={26} />}
      </div>

      {/* MOBILE MENU */}
      <div className={`mobileMenu ${open ? "show" : ""}`}>
        {menu?.map((item: any) => (
          <Link key={item.id} href={item.link} onClick={() => setOpen(false)}>
            {item.title}
          </Link>
        ))}

        <div className="mobileExtras">
         
          <button>Request a Quote</button>
           <SearchBarToggle />
        </div>
      </div>
    </>
  );
}