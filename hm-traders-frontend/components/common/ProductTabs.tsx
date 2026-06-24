"use client";
 
import { useState } from "react";
import "./ProductTabs.css";
 
type Spec = {
  title: string;
  value: string;
};
 
type Feature = {
  feature: string;
};
 
export default function ProductTabs({
  specifications=[],
  features=[],
}: {
  specifications?: Spec[];
  features?: Feature[];
}) {
  const [activeTab, setActiveTab] = useState<"specs" | "features">("specs");
 
  return (
    <div className="productSpecs">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "specs" ? "activeTab" : ""}
          onClick={() => setActiveTab("specs")}
        >
          Technical Specifications
        </button>
 
        <button
          className={activeTab === "features" ? "activeTab" : ""}
          onClick={() => setActiveTab("features")}
        >
          Product Features
        </button>
      </div>
 
      <div className="tableArea">
        {/* Content */}
        {activeTab === "specs" && (
          <table className="specTable">
            <tbody>
  {
    specifications?.length > 0 ? (
      specifications?.map((spec, i) => (
        <tr key={i}>
          <td className="specLabel lato">{spec.title}</td>
          <td className="specValue lato">{spec.value}</td>
        </tr>
      ))
    ) : (
      <tr>
        <p  className="noSpecs ">
          No specifications available.
        </p>
      </tr>
    )
  }
</tbody>
          </table>
        )}
 
        {activeTab === "features" && (
          <ul className="featureList lato">
           {
            features?.length > 0 ? (
               features?.map((item, i) => (
              <li className="featureValue" key={i}>
                 <span className="point">✔</span> {item.feature}
              </li>
            ))
            ) : (
              <p  className=" ">
                No features available.
              </p>
            )
           }
          </ul>
        )}
      </div>
    </div>
  );
}