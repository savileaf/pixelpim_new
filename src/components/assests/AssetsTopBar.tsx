import { FaPlus } from "react-icons/fa";
import Topbar from "../Topbar";
import ViewGroupModal from "./ViewGroupModal";
import CreateGroupModal from "../productconfig/CreateGroupModal";
import { useGroupModals } from "../../hooks/useGroupModals";
import { useGroupContext } from "../../context/GroupDataContext";

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
  const {
    isGroupModalOpen,
    isCreateGroupModalOpen,
    openGroupModal,
    closeGroupModal,
    tempGroupName,
    setTempGroupName,
    openCreateGroupModal,
    closeCreateGroupModal,
  } = useGroupModals();

  const { addGroup } = useGroupContext();

  const handleGroupNameSubmit = (name: string) => {
    setTempGroupName(name);
    closeGroupModal();
    openCreateGroupModal();
  };

  const handleCreateGroupSave = (data: { attributes: string[] }) => {
    if (!tempGroupName) return;
    
  const groupData = {
    name: tempGroupName,
    attributes: data.attributes,
  };

  console.log("Saving group data:", groupData);
    addGroup({
      name: tempGroupName,
      attributes: data.attributes,
    });
    closeCreateGroupModal();
    setTempGroupName(null);
  };

  const handleCreateGroupClose = () => {
    closeCreateGroupModal();
    setTempGroupName(null);
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
        onViewGroupClick={openGroupModal}
        showCustomizeColumns={false}
        searchButtonLabel={searchButtonLabel}
        inputButtonWidth={inputButtonWidth}
      />

      {isGroupModalOpen && (
        <ViewGroupModal
          onClose={closeGroupModal}
          onCreateGroup={handleGroupNameSubmit}
        />
      )}

      <CreateGroupModal
        open={isCreateGroupModalOpen}
        onClose={handleCreateGroupClose}
        onSave={handleCreateGroupSave}
      />
    </>
  );
};


export default AssetsTopbar;
