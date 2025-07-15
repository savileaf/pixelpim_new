import { useFilterContext } from "../../context/FilterContext";
import { useViewContext } from "../../context/ViewContext";
import { useGroupModals } from "../../hooks/useGroupModals"; // ✅ import the hook
import CustomTable from "../CustomTable";
import FilterData from "../FilterData";
import GridView from "../GridView";
import { FaFilePdf } from "react-icons/fa";
import AssetsTopbar from "./AssetsTopBar";
import ViewGroupModal from "../assests/ViewGroupModal";
import CreateGroupModal from "../productconfig/CreateGroupModal";
import { useGroupContext } from "../../context/GroupDataContext";



const AssetsMain = () => {
  const { viewMode } = useViewContext();
  const { isFilterVisible } = useFilterContext();
  const { addGroup } = useGroupContext();

  // ✅ Use group modal hook
  const {
    isGroupModalOpen,
    isCreateGroupModalOpen,
    // openGroupModal,
    closeGroupModal,
    handleGroupNameSubmit,
    handleCreateGroup,
  } = useGroupModals();

  const customData = [
    {
      key: "1",
      file_name: "Vintage SweatShirt",
      upload_date: "2025/03/03",
      size: "2mb",
    },
  ];

  const customColumns = [
    {
      title: "FILE NAME",
      dataIndex: "file_name",
      key: "file_name",
      width: 300,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <FaFilePdf color="red" />
          <span>{text}</span>
        </div>
      ),
    },
    { title: "UPLOAD DATE", dataIndex: "upload_date", key: "upload_date", width: 200 },
    { title: "SIZE", dataIndex: "size", key: "size", width: 100 },
  ];

  return (
    <div>
      <AssetsTopbar />

      <div className="flex flex-row p-4">
        {viewMode === "list" ? (
          <CustomTable dataSource={customData} columns={customColumns} showImage={false} />
        ) : (
          <GridView />
        )}
        {isFilterVisible && (
          <div className="ml-4">
            <FilterData />
          </div>
        )}
      </div>

      {/* ✅ Group Name Modal */}
      {isGroupModalOpen && (
        <ViewGroupModal
          onClose={closeGroupModal}
          onCreateGroup={handleGroupNameSubmit}
        />
      )}

      {/* ✅ Attribute Modal */}
      <CreateGroupModal
        open={isCreateGroupModalOpen}
        onClose={() => {}}
        onSave={(data) => handleCreateGroup(data, addGroup)} 
      />
    </div>
  );
};

export default AssetsMain;
