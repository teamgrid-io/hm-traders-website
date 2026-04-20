import "./StatsSection.css";

interface StatItem {
  number: string | number;
  title: string;
}

interface Section {
  acf_fc_layout: string;
  stats?: StatItem[];
}

interface StatsSectionProps {
  sections: Section[];
}

export default function StatsSection({ sections }: StatsSectionProps) {
  // ✅ find stat section
  const section = sections?.find(
    (item) => item.acf_fc_layout === "statsection"
  );
  if (!section) return null;
  return (
    <section className="stats-section">
      <div className="stats-overlay">
        <div className="stats-container">
          {section?.stats?.map((item, index) => (
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