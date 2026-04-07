import "./StatsSection.css";

export default function StatsSection({ sections }: any) {

  // ✅ find stat section
  const section = sections?.find(
    (item: any) => item.acf_fc_layout === "statsection"
  );

  if (!section) return null;

  return (
    <section className="stats-section">
      <div className="stats-overlay">
        <div className="stats-container">

          {section?.stats?.map((item: any, index: number) => (
            <div key={index} className="stat-card">
              <h2>{item.number}</h2>
              <p>{item.title}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}