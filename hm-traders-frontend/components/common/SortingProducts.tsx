'use client';
import { useState } from "react";


interface SortingProductsProps {
  onSortChange: (value: 'asc' | 'desc') => void;
}

const SortingProducts = ({ onSortChange }: SortingProductsProps) => {
  const [sortOption, setSortOption] = useState<'asc' | 'desc'>("asc");

  const handleChange = (value: 'asc' | 'desc') => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <select value={sortOption} onChange={(e) => handleChange(e.target.value as 'asc' | 'desc')}>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default SortingProducts;