import { getAbout } from "@/lib/api";

export default async function HeroSection({ banner }: any) {
  const data = await getAbout();

  const aboutText = data?.docs?.[0]?.about || "";

  return (
    <section
      style={{
        // background: "#f5f5f5",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "600",
            marginBottom: "20px",
            letterSpacing: "2px",
          }}
        >
         {banner?.title || "Welcome to HM Traders"}
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.7",
            color: "#444",
          }}
        >
          {aboutText}
        </p>
      </div>
    </section>
  );
}