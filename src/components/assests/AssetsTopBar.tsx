import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Topbar from "../Topbar";
import ViewGroupModal from "./ViewGroupModal";
import AssetsModal from "./AssetsModal";
import { useLocation, useNavigate } from "react-router-dom";


interface ReusableAssetsTopbarProps {
  customLeftSection?: React.ReactNode;
  searchButtonLabel?: string;
  inputButtonWidth?: number;
  selectedRowKeys?: React.Key[];
  onToggleSelectAll?: () => void;
  ALL_KEYS?: string[];
}

const AssetsTopbar = ({
  customLeftSection,
  searchButtonLabel = "Search Files",
  inputButtonWidth = 50,
  selectedRowKeys,
  onToggleSelectAll,
  ALL_KEYS,
}: ReusableAssetsTopbarProps) => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState<string | null>(null);

  const location = useLocation();
const navigate = useNavigate();

const isOnViewGroupPage = location.pathname === "/assets/opengroup"; // adjust this path if different

const toggleViewPage = () => {
  navigate(isOnViewGroupPage ? "/assets/main" : "/assets/opengroup"); // or your actual asset page path
};

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
        onOpenGroupClick={toggleViewPage}
        viewGroupButtonLabel={isOnViewGroupPage ? "View Files" : "View Groups"}
        showCustomizeColumns={false}
        searchButtonLabel={searchButtonLabel}
        inputButtonWidth={inputButtonWidth}
        selectedRowKeys={selectedRowKeys}
        onToggleSelectAll={onToggleSelectAll}
        ALL_KEYS={ALL_KEYS}
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
