
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
 <section className="about-section">
  <h1 className="about-title">About Us</h1>
 
  <div className="about-container">
    {aboutData?.docs?.map((item: any) => (
      <div key={item.id} className="about-card">
        <p>{item.about}</p>
      </div>
    ))}
  </div>
 
  <h1 className="why-title">Why Should You Choose Us?</h1>
 
  <div className="why-container">
    <ul>
      {whyChooseData?.docs?.map((item: any) => (
        <li key={item.id}>{item.whychoose}</li>
      ))}
    </ul>
  </div>
</section>
 
  );
}
