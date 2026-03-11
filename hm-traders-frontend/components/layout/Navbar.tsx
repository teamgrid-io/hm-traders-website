import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import HmLogo from "../../public/HmLogo.png";
import { SiMinutemailer } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import "./Navbar.css";

export default async function Header() {
  const menu = await getMenu();

  return (
    <header>
      {/* TOP HEADER */}
      <div className="topHeader">
        <div className="container">
          <div className="logo">
            <Image src={HmLogo} alt="HM Traders Logo" />
          </div>

          <div className="searchBox">
            <input type="text" placeholder="Search your cutting tools..." />
          </div>

          <div className="contactInfo">
            <div className="contactItem">
              <span>
                <SiMinutemailer />
              </span>
              <span>hmtraderssaifee@gmail.com</span>
            </div>
            <div className="contactItem">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="contactItem"
              >
                <span>
                  <FaWhatsapp />
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          {menu?.map((item: any) => (
            <Link key={item.id} href={item.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
