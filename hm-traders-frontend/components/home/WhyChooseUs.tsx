import { getWhyChoose } from "@/lib/api";
import WhyChooseSlider from "./WhyChooseSlider";

export default async function Us() {
  const data = await getWhyChoose();

  return (
    <section style={{ padding: "80px 0px", background: "#f5f5f5" }}>
      <div style={{  margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" ,  fontSize: "42px",
            fontWeight: "600",
           }}>
          Why Choose Us
        </h1>

        <WhyChooseSlider items={data?.docs || []} />
      </div>
    </section>
  );
}