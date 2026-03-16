import {fetchStatsData} from "@/lib/getStats";
import "./StatsSection.css";

export default async function StatsSection() {
  const stats = await fetchStatsData();

  return (
   <section className="stats-section">
  <div className="stats-overlay">
    <div className="stats-container">
      {stats?.docs?.map((item: any) => (
        <div key={item.id} className="stat-card">
          <h2>{item.number}</h2>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  </div>
</section> 
  );
}   