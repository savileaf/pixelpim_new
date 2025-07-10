import { createContext, useContext, useState,type ReactNode } from "react";

type Group = {
  name: string;
  attributes: string[];
};

type GroupContextType = {
  groups: Group[];
  addGroup: (group: Group) => void;
};

const GroupDataContext = createContext<GroupContextType | undefined>(undefined);

export const useGroupContext = () => {
  const context = useContext(GroupDataContext);
  if (!context) throw new Error("useGroupContext must be used within a GroupProvider");
  return context;
};

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>(() => {
  const stored = localStorage.getItem("groups");
  return stored ? JSON.parse(stored) : [];
});

  const addGroup = (group: Group) => {
  setGroups((prev) => {
    const updated = [...prev, group];
    localStorage.setItem("groups", JSON.stringify(updated));
    return updated;
  });
};
  return (
    <GroupDataContext.Provider value={{ groups, addGroup }}>
      {children}
    </GroupDataContext.Provider>
  );
};
