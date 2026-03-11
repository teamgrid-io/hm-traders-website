
import { getAbout } from "@/lib/api";
import {getWhyChoose} from "@/lib/api";

export default async function About() {
  let aboutData: any = null
  let whyChooseData: any = null
  try {
    aboutData = await getAbout()
  } catch (err) {
    console.error('AboutPreview: failed to load about', err)
  }

    try {
    whyChooseData = await getWhyChoose()
    } catch (err) {
    console.error('AboutPreview: failed to load whychoose', err)
  }

  return (
  <section style={{ padding: "80px 20px", maxWidth: "1200px", margin: "auto" }}>
  
  <h1 style={{ fontSize: "40px", marginBottom: "20px", textAlign: "center" }}>
    About Us
  </h1>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    {aboutData?.docs?.map((item: any) => (
      <div key={item.id}>
        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          {item.about}
        </p>
      </div>
    ))}
  </div>

  <h1 style={{ fontSize: "40px", margin: "40px 0 20px", textAlign: "center" }}>
    Why Should You Choose Us?
  </h1>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
<ul
  style={{
    paddingLeft: "20px",
    listStyleType: "disc",
  }}
>
  {whyChooseData?.docs?.map((item: any) => (
    <li
      key={item.id}
      style={{
        fontSize: "18px",
        lineHeight: "1.6",
        marginBottom: "10px",
      }}
    >
      {item.whychoose}
    </li>
  ))}
</ul>
  </div>

</section>
  );
}