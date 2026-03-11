import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="container footerGrid">

        <div className="footerCol">
          <h3>HM Traders</h3>
          <p>
            We provide high-quality cutting tools and industrial
            solutions for manufacturing industries across India.
          </p>
        </div>

        <div className="footerCol">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footerCol">
          <h3>Products</h3>
          <ul>
            <li>Cutting Tools</li>
            <li>Drilling Tools</li>
            <li>Milling Tools</li>
            <li>Industrial Equipment</li>
          </ul>
        </div>

        <div className="footerCol">
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
          <p>Location: India</p>
        </div>

      </div>

      <div className="footerBottom">
        <p>© 2026 HM Traders. All Rights Reserved.</p>
      </div>

    </footer>
  );
}