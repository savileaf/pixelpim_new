import { useState } from "react";

export function useGroupModals() {
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [tempGroupName, setTempGroupName] = useState<string | null>(null);

  const openGroupModal = () => setGroupModalOpen(true);
  const closeGroupModal = () => setGroupModalOpen(false);

  const openCreateGroupModal = () => setCreateGroupModalOpen(true);
  const closeCreateGroupModal = () => setCreateGroupModalOpen(false);

  const handleGroupNameSubmit = (name: string) => {
    setTempGroupName(name);
    closeGroupModal();
    openCreateGroupModal(); // Open attribute modal after group name
  };

  const handleCreateGroup = (data: { attributes: string[] }, addGroup: Function) => {
    if (!tempGroupName) return;
    addGroup({
      name: tempGroupName,
      attributes: data.attributes,
    });
    setTempGroupName(null);
    closeCreateGroupModal();
  };

  return {
    isGroupModalOpen,
    isCreateGroupModalOpen,
    openGroupModal,
    closeGroupModal,
    openCreateGroupModal,
    closeCreateGroupModal,
    tempGroupName,
    setTempGroupName,
    handleGroupNameSubmit,
    handleCreateGroup,
  };
}
