import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isCustomizeColumnsVisible: boolean;
  openCustomizeColumns: () => void;
  closeCustomizeColumns: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCustomizeColumnsVisible, setCustomizeColumnsVisible] = useState(false);

  const openCustomizeColumns = () => setCustomizeColumnsVisible(true);
  const closeCustomizeColumns = () => setCustomizeColumnsVisible(false);

  return (
    <ModalContext.Provider
      value={{
        isCustomizeColumnsVisible,
        openCustomizeColumns,
        closeCustomizeColumns,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
