// ViewContext.js
import { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => useContext(ViewContext);
