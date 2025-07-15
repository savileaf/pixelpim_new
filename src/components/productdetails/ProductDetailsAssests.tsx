import { FaFilePdf, FaSearch, FaShare, FaSortAmountDown } from "react-icons/fa";
import { FiDownload, FiEdit2, FiPlus, FiShare, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import CustomTable from "../CustomTable";
import { useState } from "react";
import { Tooltip } from "antd";




const ProductDetailsCategory = () => {
  const [hoveredRowKey, setHoveredRowKey] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data,setData] = useState(
  [
  {
    key: "1",
    file_name: "Vintage SweatShirt",
    size: "2mb",
  },
  {
    key: "2",
    file_name: "Vintage SweatShirt",
    size: "2mb",
  },
  {
    key: "3",
    file_name: "Vintage SweatShirt",
    size: "2mb",
  },
]
);

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
    {
      title: "SIZE", dataIndex: "size", key: "size", width: 150,
      render: (text: string, record: any) => (
        <div className="relative w-full h-full group">
          <div className="w-full h-full flex items-center justify-between px-2"
          onMouseEnter={() => setHoveredRowKey(record.key)}
      onMouseLeave={() => setHoveredRowKey(null)}
          >
            <span>{text}</span>

            {/* Only show icons on hover */}
            {hoveredRowKey === record.key && (
              <div className="flex items-center gap-2 absolute inset-0 bg-white px-2 justify-start z-10">
                <Tooltip title="Edit">
                  <FiEdit2 size={18} className="cursor-pointer text-gray-700" />
                </Tooltip>
                <Tooltip title="Download">
                  <FiDownload size={18} className="cursor-pointer text-gray-700" />
                </Tooltip>
                <Tooltip title="Delete" >
                  <FiTrash2 size={18} className="cursor-pointer text-red-500" 
                  onClick={() =>
              setData((prev) => prev.filter((item) => item.key !== record.key))
            }/>
                </Tooltip>
                <Tooltip title="Share">
                  <FiShare size={18} className="cursor-pointer text-blue-500" />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ),

    },
  ];


  return (
    <div className="w-full h-screen bg-[#f2f0f0] p-4">
      <div>
        <Link to="/">
          <button
            className="px-6 py-2 text-gray-800 font-medium bg-[#e6e6e6]"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)",
            }}
          >
            BACK
          </button>
        </Link>
      </div>
      <div className="flex flex-row  mt-4 w-full gap-2">
        {/* image section */}
        <div className=" p-2 flex flex-col gap-4 w-[18rem] max-w-[18rem]">
          <img src="/placeholder.png" alt="product" className="border-0" />
          <div className="w-[8rem]">
            <button className="rounded-3xl px-4 py-2 bg-[#cc922f] text-white">
              Add Image
            </button>
          </div>
        </div>


        {/* form section */}
        <div className="w-[36rem] min-w-[36rem] p-2 space-y-4">
          <div className="flex justify-between">
            <div className='py-[1.5] px-2 w-[10rem] bg-white border border-gray-200 flex items-center justify-center gap-2 font-semibold text-[#9d9d9d]'>
              <FiPlus size={22} color='#2ecc71' />
              Add Attribute
            </div>

            <div className="h-[1.9rem] flex items-center border border-gray-400 rounded overflow-hidden w-[15rem]">
              <div className="bg-[#676767] text-white p-[8.6px]">
                <FaSearch size={14} />
              </div>
              <input
                type="text"
                placeholder="Search Attribute Name"
                className={`px-3 text-sm outline-none font-normal text-[12px] text-[#9d9d9d]`}
              />
            </div>

            <div className='h-[1.9rem] flex items-center justify-center gap-4 px-4 border border-gray-400 rounded overflow-hidden'>
              <span className='text-[#9d9d9d]'>Sort by</span>
              <FaSortAmountDown size={16} />
            </div>
          </div>
            {/* SECTION SHOWING DELETE, DOWNLOAD, SHARE WHEN THE ITEM IS SELECTED */}
            {selectedRowKeys.length > 0 && (
  <div className="flex items-center justify-between px-2 py-1 mb-2">
    {/* Left - Action icons */}
    <div className="flex items-center gap-4 text-[#2d2d2d]">
      <Tooltip title="Delete">
      <button><FiTrash2 className="text-[18px]" /></button>
      </Tooltip>
      <Tooltip title="Download">
      <button><FiDownload className="text-[18px]" /></button>
      </Tooltip>
      <Tooltip title="Share">
      <button><FaShare className="text-[18px]" /></button>
      </Tooltip>
      <div className="bg-[#f8e5c3] text-[11px] text-center text-[#cc922f] px-2 py-1 rounded-full">
        {selectedRowKeys.length} Asset{selectedRowKeys.length > 1 ? 's' : ''} Selected
      </div>
    </div>

    {/* Right - Total asset count */}
    <span className="text-[11px] text-right text-neutral-700">
      {data.length} Assets
    </span>
  </div>
)}

          <div>
            <CustomTable dataSource={data} columns={customColumns} showImage={false}
              onRow={(record) => ({
                onMouseEnter: () => setHoveredRowKey(record.key),
                onMouseLeave: () => setHoveredRowKey(null),
              })}
               selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsCategory;