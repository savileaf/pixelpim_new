import React, { createContext, useContext, useState } from "react";

interface Filters {
  category?: string;
  priceRange?: string;
  options?: string[];
}

interface FilterContextType {
  isFilterVisible: boolean;
  toggleFilter: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const toggleFilter = () => setIsFilterVisible(prev => !prev);

  return (
    <FilterContext.Provider value={{ isFilterVisible, toggleFilter, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
