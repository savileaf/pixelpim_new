// context/ProductTopbarContext.tsx
import { createContext, useContext, useState,type ReactNode } from "react";

interface TopbarConfig {
  createButtonLabel?: string;
  createButtonWidth?:number,
  showCreateButton?: boolean;
  showViewButton?: boolean;
  showFilter?: boolean;
  filterOptions?: string[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchBarWidth?: number;
}

const defaultTopbarConfig: TopbarConfig = {
  createButtonLabel: "CREATE ATTRIBUTE",
  createButtonWidth: 150,
  showCreateButton: true,
  showFilter: true,
  filterOptions: ["Filter O","Option B", "Option B"],
  showSearch: true,
  searchPlaceholder: "Search Attribute",
};

const TopbarContext = createContext<TopbarConfig>(defaultTopbarConfig);
const SetTopbarContext = createContext<(config: TopbarConfig) => void>(() => {});
const ResetTopbarContext = createContext<() => void>(() => {});

export const ProductTopbarProvider = ({ children }: { children: ReactNode }) => {
  const [topbarConfig, setTopbarConfig] = useState<TopbarConfig>(defaultTopbarConfig);

  const resetTopbar = () => setTopbarConfig(defaultTopbarConfig);

  return (
    <TopbarContext.Provider value={topbarConfig}>
      <SetTopbarContext.Provider value={setTopbarConfig}>
        <ResetTopbarContext.Provider value={resetTopbar}>
          {children}
        </ResetTopbarContext.Provider>
      </SetTopbarContext.Provider>
    </TopbarContext.Provider>
  );
};

export const useProductTopbar = () => useContext(TopbarContext);
export const useSetProductTopbar = () => useContext(SetTopbarContext);
export const useResetProductTopbar = () => useContext(ResetTopbarContext);
