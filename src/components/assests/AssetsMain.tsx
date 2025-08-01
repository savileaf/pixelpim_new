import { useState } from "react";
import { useFilterContext } from "../../context/FilterContext";
import { useViewContext } from "../../context/ViewContext";
import { useGroupModals } from "../../hooks/useGroupModals";
import CustomTable from "../CustomTable";
import FilterData from "../FilterData";
import GridView from "../GridView";
import { FaFileAlt, FaFileExcel, FaFileWord } from "react-icons/fa";
import AssetsTopbar from "./AssetsTopBar";
import ViewGroupModal from "../assests/ViewGroupModal";
import CreateGroupModal from "../productconfig/CreateGroupModal";
import { useGroupContext } from "../../context/GroupDataContext";
import { IoMdImage } from "react-icons/io";
import { MdTextSnippet } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf": return <BiSolidFilePdf className="text-red-500" size={22} />;
    case "xls":
    case "xlsx": return <FaFileExcel className="text-green-600" size={18} />;
    case "jpg":
    case "jpeg":
    case "png": return <IoMdImage className="text-[#002d74]" size={18} />;
    case "doc":
    case "docx": return <FaFileWord className="text-[#1b5cb9]" size={18} />;
    case "txt": return <MdTextSnippet className="text-[#079b94]" size={18} />;
    default: return <FaFileAlt className="text-gray-500" size={18} />;
  }
};

const AssetsMain = () => {
  const { viewMode } = useViewContext();
  const { isFilterVisible } = useFilterContext();
  const { addGroup } = useGroupContext();

  const {
    isGroupModalOpen,
    isCreateGroupModalOpen,
    closeGroupModal,
    handleGroupNameSubmit,
    handleCreateGroup,
  } = useGroupModals();

  const customData = [
    { key: "1", file_name: "Vintage SweatShirt.doc", upload_date: "2025/03/03", size: "2mb" },
    { key: "2", file_name: "Lookbook.xlsx", upload_date: "2025/04/10", size: "1.5mb" },
    { key: "3", file_name: "product-image.jpg", upload_date: "2025/04/12", size: "3mb" },
    { key: "4", file_name: "Product Details.pdf", upload_date: "2025/03/03", size: "2mb" },
  ];

  const customColumns = [
    {
      title: "FILE NAME",
      dataIndex: "file_name",
      key: "file_name",
      width: 300,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          {getFileIcon(text)}
          <span>{text}</span>
        </div>
      ),
    },
    { title: "UPLOAD DATE", dataIndex: "upload_date", key: "upload_date", width: 200 },
    { title: "SIZE", dataIndex: "size", key: "size", width: 100 },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const ALL_KEYS = customData.map((item) => item.key);

  // const handleToggleSelectAll = () => {
  //   setSelectedRowKeys((prev) =>
  //     prev.length === ALL_KEYS.length ? [] : ALL_KEYS
  //   );
  // };

  return (
    <div>
      <AssetsTopbar
        selectedRowKeys={selectedRowKeys}
        onToggleSelectAll={() => {
          if (selectedRowKeys.length === ALL_KEYS.length) {
            setSelectedRowKeys([]);
          } else {
            setSelectedRowKeys(ALL_KEYS);
          }
        }}
        ALL_KEYS={ALL_KEYS}
      />

      <div className="flex flex-row gap-2">
        {viewMode === "list" ? (
          <CustomTable
            dataSource={customData}
            columns={customColumns}
            showImage={false}
            scroll={{ y: 390 }}
             selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
          />
        ) : (
          <GridView />
        )}
        {isFilterVisible && (
          <div className="w-[13rem]  shrink-0 py-2">
            <FilterData />
          </div>
        )}
      </div>

      {isGroupModalOpen && (
        <ViewGroupModal
          onClose={closeGroupModal}
          onCreateGroup={handleGroupNameSubmit}
        />
      )}

      <CreateGroupModal
        open={isCreateGroupModalOpen}
        onClose={() => {}}
        onSave={(data) => handleCreateGroup(data, addGroup)}
      />
    </div>
  );
};

export default AssetsMain;
