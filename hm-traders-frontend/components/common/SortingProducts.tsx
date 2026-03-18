'use client';
import { useState } from "react";

const SortingProducts = ({ onSortChange }: any) => {
  const [sortOption, setSortOption] = useState("asc");

  const handleChange = (value: string) => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <select value={sortOption} onChange={(e) => handleChange(e.target.value)}>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default SortingProducts;