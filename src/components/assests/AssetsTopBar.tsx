import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Topbar from "../Topbar";
import ViewGroupModal from "./ViewGroupModal";
import AssetsModal from "./AssetsModal"; // ✅ ensure this path is correct

interface ReusableAssetsTopbarProps {
  customLeftSection?: React.ReactNode;
  searchButtonLabel?: string;
  inputButtonWidth?: number;
}

const AssetsTopbar = ({
  customLeftSection,
  searchButtonLabel = "Search Files",
  inputButtonWidth = 50,
}: ReusableAssetsTopbarProps) => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState<string | null>(null);

  const handleGroupNameSubmit = (name: string) => {
    setGroupName(name);
    setIsGroupModalOpen(false);
    setIsAssetsModalOpen(true);
  };

  const handleAssetsModalClose = () => {
    setIsAssetsModalOpen(false);
    setGroupName(null);
  };

  const handleSaveAssets = (groupName: string, selectedAssets: any[]) => {
    console.log("Saving assets for group:", groupName);
    console.log("Selected assets:", selectedAssets);
    // TODO: Add logic to save group and its assets
    handleAssetsModalClose();
  };

  return (
    <>
      <Topbar
        customLeftSection={
          customLeftSection ?? (
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-1 rounded text-sm text-[#1b0c31] w-[10.2rem] bg-white">
              <FaPlus className="text-blue-500" />
              Upload Files
            </button>
          )
        }
        viewGroupButton={true}
        onViewGroupClick={() => setIsGroupModalOpen(true)}
        showCustomizeColumns={false}
        searchButtonLabel={searchButtonLabel}
        inputButtonWidth={inputButtonWidth}
      />

      {isGroupModalOpen && (
        <ViewGroupModal
          onClose={() => setIsGroupModalOpen(false)}
          onCreateGroup={handleGroupNameSubmit}
        />
      )}

      {isAssetsModalOpen && groupName && (
        <AssetsModal
          groupName={groupName}
          onClose={handleAssetsModalClose}
          onSaveAssets={handleSaveAssets}
        />
      )}
    </>
  );
};

export default AssetsTopbar;
