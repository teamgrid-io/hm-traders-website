"use client";
import { useEffect } from "react";

export default function NavbarScrollEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".topHeader");
      if (!header) return;

      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}