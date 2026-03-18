import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import HmLogo from "../../public/images/hmlogo.svg";
import { IoSearchSharp } from "react-icons/io5";;
import { FaRegHeart } from "react-icons/fa6";
import "./Navbar.css";

export default async function Header() {
  const menu = await getMenu();

  return (
   <>
      {/* TOP HEADER */}
      <div className="topHeader">
        <div className="headerContainer">
        
          {/* <div className="logo">
            <Image src={HmLogo} alt="HM Traders Logo" /> */}
              {/* <h1>H.M Traders</h1> */}
          {/* </div> */}

      <div className="logo">
  <Image src={HmLogo} alt="HM Traders Logo" width={98} height={36} />
</div>
        {/* NAVBAR */}
      <nav className="navbar">
       
          {menu?.map((item: any) => (
            <Link key={item.id} href={item.link}>
              {item.title}
            </Link>
          ))}  
      
      </nav>
          <div className="headerIcons">
            <IoSearchSharp  className="searchIcon" />
            <FaRegHeart className="heartIcon" />
            <button>
              Request a Quote
            </button>
          </div>
          </div>
      </div>  
    </>
  );
}
