import Link from "next/link";
import Image from "next/image";
// import { getMenu } from "@/lib/getMenu";
import HmLogo from "../../public/images/hmlogo.svg";
import "./Navbar.css";
import NavbarScrollEffect from "../common/NavbarScrollEffect";
import SearchBarToggle from "../common/SearchBarToggle";
import MobileMenu from "../common/MobileMenu";
import Menu from "../common/Menu";

export default async function Header() {
  // const menu = await getMenu(); 
   const menu = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About Us", link: "/about" },
    { id: 3, title: "Products", link: "/products" },
    { id: 4, title: "E-catalogue", link: "/catalogue" },
    { id: 5, title: "Contact Us", link: "/contact" },
  ];



  return (
    <>
      <NavbarScrollEffect />

      <div className="topHeader">
        <div className="headerContainer">

          {/* LOGO */}
          <div className="logo">
            <Image src={HmLogo} alt="HM Traders Logo" width={98} height={36} />
          </div>

          {/* DESKTOP NAV */}
          <Menu menu={menu} />

          {/* RIGHT SIDE */}
          <div className="headerIcons">
            <div className="desktopOnly">
              <SearchBarToggle />
              <Link href='/contact'>
                <button className="button">Request a Quote</button>
              </Link>
            </div>

            {/* MOBILE MENU */}
            <MobileMenu menu={menu} />
          </div>

        </div>
      </div>
    </>
  );
}