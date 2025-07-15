import React, { createContext, useContext, useState } from 'react';

interface ProductRow {
  key: React.Key;
  attributeName: string;
}

interface AttributeModalContextType {
  isOpen: boolean;
  data: ProductRow[];
  openModal: () => void;
  closeModal: () => void;
  addAttribute: (attributeName: string) => void;
  deleteAttribute: (key: React.Key) => void;
}

const AttributeModalContext = createContext<AttributeModalContextType | undefined>(undefined);

// fetching data from api later to populate data from the database
const defaultAttributes: ProductRow[] = [
  { key: "1", attributeName: "Price" },
  { key: "2", attributeName: "Color" },
  { key: "3", attributeName: "Size" },
];

export const AttributeModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ProductRow[]>(defaultAttributes);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addAttribute = (attributeName: string) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey, attributeName }]);
  };

  const deleteAttribute = (key: React.Key) => {
    setData(prev => prev.filter(attr => attr.key !== key));
  };

  return (
    <AttributeModalContext.Provider value={{ isOpen, data, openModal, closeModal, addAttribute, deleteAttribute }}>
      {children}
    </AttributeModalContext.Provider>
  );
};

export const useAttributeModal = () => {
  const context = useContext(AttributeModalContext);
  if (!context) throw new Error("useAttributeModal must be used within AttributeModalProvider");
  return context;
};
