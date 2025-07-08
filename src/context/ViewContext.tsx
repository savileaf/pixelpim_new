import { createContext, useContext, useState,type ReactNode } from 'react';

// 1. Define the type
interface ViewContextType {
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
}

// 2. Provide a default context (can be undefined initially)
const ViewContext = createContext<ViewContextType | undefined>(undefined);

// 3. Define the provider with typing for props
export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useViewContext must be used within a ViewProvider');
  }
  return context;
};
