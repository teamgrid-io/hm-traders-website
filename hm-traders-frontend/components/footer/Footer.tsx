"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ENDPOINTS } from "@/api/Api";
import { API_URL } from "@/api/Api";
import styles from "./Footer.module.css";
import { submitContactForm } from "@/lib/contact";
interface SocialLink {
  platform:
    | "facebook"
    | "linkedin"
    | "instagram"
    | "x"
    | "youtube"
    | "whatsapp";
  url: string;
}

interface NavLink {
  label: string;
  url: string;
  openInNewTab?: boolean;
}

interface NavColumn {
  heading: string;
  links: NavLink[];
}

interface FooterData {
  brand: {
    companyName: string;
    description?: string;
    socialLinks?: SocialLink[];
  };
  navColumns: NavColumn[];
  newsletter: {
    enabled: boolean;
    tagline?: string;
    placeholder?: string;
    buttonLabel?: string;
    successMessage?: string;
  };
  copyright?: string;
}

function SocialIcon({ platform }: { platform: string }) {
  const iconMap: Record<string, string> = {
    facebook: "/images/jam_facebook.png",
    linkedin: "/images/basil_linkedin-outline.png",
    instagram: "/images/mynaui_instagram.png",
    x: "/images/prime_twitter.png",
  };

  const iconPath = iconMap[platform];

  if (iconPath) {
    return (
      <img
        src={iconPath}
        alt={platform}
        style={{
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
    );
  }
}

export default function Footer({ data }: { data: FooterData }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  // Hardcoded social links from frontend
  const socialLinks: SocialLink[] = [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "x", url: "https://twitter.com" },
  ];

  const handleSubscribe = async () => {
  if (!email || !email.includes("@")) {
    setStatus("error");
    setMessage("Please enter a valid email.");
    return;
  }

  setStatus("loading");

  try {
    await submitContactForm({
      name: "Newsletter Subscriber",
      email: email,
      phone: "N/A",
      message: `Newsletter subscription from ${email}`,
    });

    setStatus("done");
    setMessage(
      data.newsletter?.successMessage || "Thanks for subscribing!"
    );
    setEmail("");
  } catch {
    setStatus("error");
    setMessage("Something went wrong. Please try again.");
  }
};
  const copyright = (data.copyright ?? "").replace(
    "{{year}}",
    new Date().getFullYear().toString(),
  );

  // Debug logging
  if (typeof window !== "undefined") {
   
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <h2 className={styles.brandName}>{data.brand?.companyName}</h2>
          {data.brand?.description && (
            <p className={styles.brandDesc}>{data.brand.description}</p>
          )}
          <div className={styles.socials}>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                className={styles.socialLink}
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav Columns */}
        {data.navColumns?.map((col, ci) => (
          <div key={ci} className={styles.navCol}>
            <h3 className={styles.navHeading}>{col.heading}</h3>
            <ul className={styles.navList}>
              {col.links?.map((link, li) => (
                <li key={li}>
                  <Link
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noreferrer" : undefined}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))} 

        {/* Newsletter Column */}
        {data.newsletter?.enabled && (
          <div className={styles.newsletter}>
            {data.newsletter.tagline && (
              <p className={styles.newsletterTagline}>
                {data.newsletter.tagline}
              </p>
            )}
            {status === "done" ? (
              <p className={styles.successMsg}>{message}</p>
            ) : (
              <div className={styles.subscribeWrap}>
                <div className={styles.subscribeForm}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder={
                      data.newsletter.placeholder || "Enter your email"
                    }
                    className={styles.subscribeInput}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={status === "loading"}
                    className={styles.subscribeBtn}
                  >
                    {status === "loading"
                      ? "Sending..."
                      : data.newsletter.buttonLabel || "Subscribe"}
                  </button>
                </div>
                {status === "error" && (
                  <p className={styles.errorMsg}>{message}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>{copyright}</div>
      </div>
    </footer>
  );
}
