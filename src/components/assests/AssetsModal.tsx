import { FaFileAlt, FaFileExcel, FaFileWord, FaTimes } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import { IoMdImage } from "react-icons/io";
import { MdTextSnippet } from "react-icons/md";
import { useState } from "react";
import CustomTable from "../CustomTable";

interface AssetsModalProps {
  groupName: string;
  onClose: () => void;
  onSaveAssets: (groupName: string, selectedAssets: any[]) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <BiSolidFilePdf className="text-red-500" size={20} />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className="text-green-600" size={20} />;
    case "jpg":
    case "jpeg":
    case "png":
      return <IoMdImage className="text-[#002d74]" size={20} />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-[#1b5cb9]" size={20} />;
    case "txt":
      return <MdTextSnippet className="text-[#079b94]" size={20} />;
    default:
      return <FaFileAlt className="text-gray-500" size={20} />;
  }
};

const AssetsModal = ({ groupName, onClose, onSaveAssets }: AssetsModalProps) => {
  const [, setHoveredRowKey] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data,] = useState([
    { key: "1", file_name: "Vintage SweatShirt.pdf", size: "2mb" },
    { key: "2", file_name: "Vintage SweatShirt.xls", size: "2mb" },
    { key: "3", file_name: "Vintage SweatShirt.png", size: "2mb" },
  ]);

  const customColumns = [
    {
      title: "FILE NAME",
      dataIndex: "file_name",
      key: "file_name",
      width: 250,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          {getFileIcon(text)}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
      width: 150,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="relative bg-[#f2f0f0] rounded-lg px-6 py-4 w-[35rem] max-h-[80vh] overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <FaTimes size={16} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Group: {groupName}</h2>
        <div>
          <CustomTable
          dataSource={data}
          columns={customColumns}
          showImage={false}
          onRow={(record) => ({
            onMouseEnter: () => setHoveredRowKey(record.key),
            onMouseLeave: () => setHoveredRowKey(null),
          })}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
        </div>

          <button
        onClick={() => {
          const selected = data.filter(item => selectedRowKeys.includes(item.key));
          onSaveAssets(groupName, selected);
          onClose(); // Close modal after saving
        }}
        className="mt-2 bg-[#2ecc71] text-white py-1.5 px-4 rounded hover:bg-[#27ae60] transition-all"
      >
        Add Assets
      </button>
      </div>
      
    </div>
  );
};

export default AssetsModal;
