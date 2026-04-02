import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import HmLogo from "../../public/images/hmlogo.svg";
import "./Navbar.css";
import NavbarScrollEffect from "../common/NavbarScrollEffect";
import SearchBarToggle from "../common/SearchBarToggle";
import MobileMenu from "../common/MobileMenu";
import Menu from "../common/Menu";

export default async function Header() {
  const menu = await getMenu();

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