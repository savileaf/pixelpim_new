 import {
  FaDownload,
  FaUpload,
  FaSearch,
  FaTh,
  FaList,
  FaFilter,
  FaSlidersH,
  FaRegFolderOpen
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useFilterContext } from "../context/FilterContext";
import { useViewContext } from "../context/ViewContext";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

interface TopbarProps {
  showselectButton?:boolean;
  onSelectClick?: ()=> void;
  createSelectLabel?: string;
onCustomizeColumnsClick?: () => void;  
  viewGroupButton?: boolean;
  onViewGroupClick?: () => void;
  viewGroupButtonLabel?: string;
  viewGroupButtonLink?: string;

  customLeftSection?: React.ReactNode;


  groupFilesButton?: boolean;
  onGroupFilesClick?: () => void;
  groupFilesButtonLabel?: string;
  groupFilesButtonLink?: string;

  importDataLabel?:string;
  exportDataLabel?:string;

  searchButtonLabel?:string;

  showCustomizeColumns?: boolean;
  inputButtonWidth?:number;
}



const Topbar : React.FC<TopbarProps> = ({ 
  onCustomizeColumnsClick,
  // showselectButton = true,
  // onSelectClick,
  createSelectLabel = "Select Family",

  viewGroupButton=false,
  onViewGroupClick,

  // groupFilesButton=false,
  showCustomizeColumns=true,
  searchButtonLabel= "Search Product by SKU or Product Name",
  inputButtonWidth=64,
  customLeftSection=false,



 }) => {
  const { isFilterVisible, toggleFilter } = useFilterContext();   
  // const { columns: columnConfig } = useColumns();
  // const {openCustomizeColumns} = useModalContext()
  const {  setViewMode } = useViewContext() as {
  viewMode: string;
  setViewMode: (mode: string) => void;
};



  return (
    <div className="w-full h-cover">
      <nav className="flex flex-row w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          {/* Left section */}
          <div className="flex flex-wrap items-center gap-3">
            {
              customLeftSection ? (customLeftSection) :(
                <select className="border border-gray-300 px-4 py-1.5 rounded w-[14rem] font-semibold text-[14px] text-[#1b0c31] focus:outline-none">
              <option value="">{createSelectLabel}</option>
              <option value="family1">Family 1</option>
              <option value="family2">Family 2</option>
            </select>
              )
            }

            {/* Conditional view group button */}
            {
              viewGroupButton && (
                 <Link to="/assets/opengroup">
                  <button className="flex items-center gap-2 w-full border border-gray-200 px-3 py-1.5 rounded font-medium text-[12px] text-[#676767] hover:bg-yellow-50">
                    <FaRegFolderOpen className="text-yellow-500" height={5}/>
                    Open Group
                </button>
                 </Link>

              )
            }

             {
              viewGroupButton && (
                <div>
                  <button className="flex items-center gap-2 w-full border border-gray-200 px-3 py-1.5 rounded font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={onViewGroupClick}>
                    <FaRegFolderOpen className="text-yellow-500"/>
                    Group Files
                </button>
            </div>

              )
            }

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
              <div className="bg-[#676767] text-white p-1.5">
                <FaSearch height={5}/>
              </div>
              <input
                type="text"
                placeholder={searchButtonLabel}
                className={`w-${inputButtonWidth} px-3 py-1 text-sm outline-none font-normal text-[12px] text-[#9d9d9d]`}
              />
            </div>

            {/* Customize Columns */}
            {
              showCustomizeColumns && onCustomizeColumnsClick &&(
                <button className="flex items-center gap-3 border px-3 py-1.5 rounded font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={onCustomizeColumnsClick}>
              <FaSlidersH className="text-yellow-500" height={13}/>
              Customize Columns
            </button>
              )
            }

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