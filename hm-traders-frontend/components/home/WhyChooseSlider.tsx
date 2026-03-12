"use client";

export default function WhyChooseSlider({ items }: any) {
  const sliderItems = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "20px 0",
      }}
    >
      <div className="sliderTrack">
        {sliderItems.map((item: any, i: number) => (
          <div key={i} className="card">
            <div className="card-content">
              {item.whychoose}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .sliderTrack {
          display: flex;
          gap: 24px;
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        .sliderTrack:hover {
          animation-play-state: paused;
        }

          .card {
        min-width: 320px;
        width: 320px;
        height: 200px;
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      /* sliding background */
      .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0%;
        background: #fcae1b;
        transition: width 0.4s ease;
        z-index: 0;
      }

      /* animate left to right */
      .card:hover::before {
        width: 100%;
      }

      /* keep content above background */
      .card * {
        position: relative;
        z-index: 1;
      }

        .card-content {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          overflow-y: auto;
          padding: 5px;
        }

        /* Custom scrollbar for card content */
        .card-content::-webkit-scrollbar {
          width: 4px;
        }

        .card-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .card-content::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .card-content::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Optional: Add gradient overlays for smooth edges */
        @media (min-width: 768px) {
          div:before,
          div:after {
            // content: '';
            position: absolute;
            top: 0;
            width: 100px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }

          div:before {
            left: 0;
            background: linear-gradient(to right, #f5f5f5, transparent);
          }

          div:after {
            right: 0;
            background: linear-gradient(to left, #f5f5f5, transparent);
          }
        }
      `}</style>
    </div>
  );
}