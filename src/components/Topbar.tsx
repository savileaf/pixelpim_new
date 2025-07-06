 import {
  FaDownload,
  FaUpload,
  FaSearch,
  FaTh,
  FaList,
  FaFilter,
  FaSlidersH,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useFilterContext } from "../context/FilterContext";
import {useColumns} from "../context/ColumnContext"
import { useViewContext } from "../context/ViewContext";
import { useModalContext } from "../context/ModalContext";
import { Tooltip } from "antd";

interface TopbarProps {
  onCustomizeColumnsClick: () => void;
  
}

const Topbar : React.FC<TopbarProps> = ({ onCustomizeColumnsClick }) => {
  const { isFilterVisible, toggleFilter } = useFilterContext();   
  const { columns: columnConfig } = useColumns();
  const {openCustomizeColumns} = useModalContext()
  const {viewMode, setViewMode} = useViewContext();



  return (
    <div className="w-full h-cover">
      <nav className="flex flex-row w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          {/* Left section */}
          <div className="flex flex-wrap items-center gap-3">
            <select className="border border-gray-300 px-4 py-1.5 rounded w-[14rem] font-semibold text-[14px] text-[#1b0c31] focus:outline-none">
              <option value="">SELECT FAMILY</option>
              <option value="family1">Family 1</option>
              <option value="family2">Family 2</option>
            </select>

            <div className="w-[9rem] bg-[#f1f0f0]">
              <button className="flex items-center gap-2 w-full border border-gray-200 px-3 py-1.5 rounded font-medium text-[12px] text-[#676767] hover:bg-yellow-50">
                <FaDownload className="text-yellow-500" />
                Import Data
              </button>
            </div>

            <div className="w-[9rem] bg-[#f1f0f0]">
              <button className="flex items-center w-full gap-2 border border-gray-200 px-3 py-1.5 rounded font-normal text-[12px] text-[#9d9d9d] hover:bg-yellow-50">
                <FaUpload className="text-yellow-500" height={5}/>
                Export Data
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center border rounded overflow-hidden">
              <div className="bg-[#676767] text-white p-2">
                <FaSearch height={5}/>
              </div>
              <input
                type="text"
                placeholder="Search Product by SKU or Product Name"
                className="px-3 py-1 text-sm outline-none w-64 font-normal text-[12px] text-[#9d9d9d]"
              />
            </div>

            {/* Customize Columns */}
            <button className="flex items-center gap-3 border px-3 py-1.5 rounded font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={onCustomizeColumnsClick}>
              <FaSlidersH className="text-yellow-500" height={13}/>
              Customize Columns
            </button>

            <div className="flex text-gray-600 ml-1">
              <button className="p-1 hover:bg-gray-200 rounded" onClick={()=>setViewMode("list")}>
                <Tooltip title="List View">
                <FaList />
                </Tooltip>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded" onClick={()=>setViewMode("grid")}>
                <Tooltip title="Grid View">
                <FaTh />
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-row justify-between items-center mr-6 mb-2 px-8">
        <div className="flex items-center gap-4">
        <label className="flex items-center gap-1 font-normal text-[12px] text-[#676767] rounded-md cursor-pointer mr-2">
        <input
          type="checkbox"
          className="form-checkbox h-3 w-3 text-blue-600 rounded"
        />
        Select All
      </label>
          <div className="flex flex-row items-center gap-3">
            
           <Tooltip title="Download ">
             <FaDownload/>
           </Tooltip>
<Tooltip title="Delete">

  <MdDelete/>
</Tooltip>
            
          </div>
        </div>
          <hr className="w-[70%] text-[#576757]"/>

        <button
          className="flex items-center gap-1 font-normal text-[12px] text-[#676767] px-2 py-1 text-gray-700 hover:bg-yellow-50 border border-gray-200 rounded"
          onClick={toggleFilter}
        >
          <FaFilter className="text-yellow-500" height={3.5}/>
          { isFilterVisible ? "Hide Filter" : "Show Filter"}
        </button>
      </div>
    </div>
  );
};
export default Topbar;