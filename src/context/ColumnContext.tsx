import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ColumnConfig {
  key: string;
  name: string;
  visible: boolean;
  order: number;
  customizable?: boolean;
}

interface ColumnContextType {
  columns: ColumnConfig[];
  addColumn: (name: string, key: string) => void;
  removeColumn: (key: string) => void;
  toggleColumnVisibility: (key: string) => void;
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

const initialColumns: ColumnConfig[] = [
  { key: 'product_name', name: 'Product Name', visible: true, order: 1, customizable: false },
  { key: 'product_description', name: 'Description', visible: true, order: 2, customizable: false },
  { key: 'sku', name: 'SKU', visible: true, order: 3, customizable: false },
  { key: 'varients', name: 'Varients', visible: true, order: 4 , customizable:true },
  { key: 'price', name: 'Price', visible: true, order: 5 , customizable:true},
  { key: 'currency', name: 'Currency', visible: true, order: 6 , customizable:true},

];

export const ColumnProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<ColumnConfig[]>(() => {
    const saved = localStorage.getItem('tableColumns');
    return saved ? JSON.parse(saved) : initialColumns;
  });

  const saveColumns = (newColumns: ColumnConfig[]) => {
    setColumns(newColumns);
    localStorage.setItem('tableColumns', JSON.stringify(newColumns));
  };

  const addColumn = (name: string, key: string) => {
    if (!columns.some(col => col.key === key)) {
      const newOrder = Math.max(...columns.map(c => c.order), 0) + 1;
      saveColumns([...columns, { key, name, visible: true, order: newOrder }]);
    }
  };

  const removeColumn = (key: string) => {
    saveColumns(columns.filter(col => col.key !== key));
  };

  const toggleColumnVisibility = (key: string) => {
    saveColumns(columns.map(col => 
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };

  return (
    <ColumnContext.Provider value={{ columns, addColumn, removeColumn, toggleColumnVisibility }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumns = () => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw new Error('useColumns must be used within a ColumnProvider');
  }
  return context;
};