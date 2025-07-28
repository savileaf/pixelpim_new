import {
  FaSearch,
  FaList,
  FaFilter,
  FaSlidersH,
  FaRegFolderOpen
} from "react-icons/fa";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { TfiExport } from "react-icons/tfi";
import { TfiImport } from "react-icons/tfi";
import { useFilterContext } from "../context/FilterContext";
import { useViewContext } from "../context/ViewContext";
import { Tooltip } from "antd";
import { useImportData } from "../context/ImportDataContext";
import { AiOutlineDelete } from "react-icons/ai";

interface TopbarProps {
  selectedRowKeys?: React.Key[];
  showselectButton?: boolean;
  onSelectClick?: () => void;
  createSelectLabel?: string;
  onCustomizeColumnsClick?: () => void;
  viewGroupButton?: boolean;
  onViewGroupClick?: () => void;
  viewGroupButtonLabel?: string;
  viewGroupButtonLink?: string;

  onOpenGroupClick?:()=>void;

  customLeftSection?: React.ReactNode;

  groupFilesButton?: boolean;
  onGroupFilesClick?: () => void;
  groupFilesButtonLabel?: string;
  groupFilesButtonLink?: string;

  importDataLabel?: string;
  exportDataLabel?: string;

  searchButtonLabel?: string;

  showCustomizeColumns?: boolean;
  inputButtonWidth?: number;
  onSelectAllClick?: (checked: boolean) => void;
  onToggleSelectAll?: () => void;
  ALL_KEYS?: string[],

}



const Topbar: React.FC<TopbarProps> = ({

  onCustomizeColumnsClick,
  // showselectButton = true,
  // onSelectClick,
  createSelectLabel = "Select Family",

  viewGroupButton = false,
  onViewGroupClick,

  // groupFilesButton=false,
  showCustomizeColumns = true,
  searchButtonLabel = "Search Product by SKU or Product Name",
  inputButtonWidth = 110,
  customLeftSection = false,
  selectedRowKeys = [],
  onToggleSelectAll,
  ALL_KEYS = [],
  viewGroupButtonLabel,
  onOpenGroupClick


}) => {
  const { isFilterVisible, toggleFilter } = useFilterContext();
  // const { columns: columnConfig } = useColumns();
  // const {openCustomizeColumns} = useModalContext()
  const { viewMode, setViewMode } = useViewContext() as {
    viewMode: string;
    setViewMode: (mode: string) => void;
  };
  const { openImportModal } = useImportData();

  return (
    <div className="w-full h-cover overflow-hidden">
      <nav className="flex flex-row w-full mb-[18px]">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          {/* Left section */}
          <div className="w-full flex flex-wrap items-center gap-5">
            {customLeftSection ? (customLeftSection) : (
              <select className="select-family border border-[#C3BECA] h-[2rem] px-2 py-[2px] uppercase font-semibold w-[250px] text-[18px] text-[#1B0C31] focus:outline-none">
                <option value="">{createSelectLabel}</option>
                <option value="family1">Family 1</option>
                <option value="family2">Family 2</option>
              </select>
            )
            }

            {/* Conditional view group button */}
            {viewGroupButton && (
              <div>
                <button
                  className="flex items-center gap-2 w-full h-[2rem] border border-[#e8e5e5] px-3 py-1.5 font-medium text-[12px] text-[#676767] hover:bg-yellow-50"
                  onClick={onOpenGroupClick}
                >
                  <FaRegFolderOpen className="text-yellow-500" />
                  {viewGroupButtonLabel || "View Group"}
                </button>
              </div>
            )}

            {viewGroupButton && (
              <div>
                <button className="flex items-center gap-2 h-[2rem] w-full border border-[#e8e5e5] px-3 py-1.5 font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={onViewGroupClick}>
                  <FaRegFolderOpen className="text-yellow-500" />
                  Group Files
                </button>
              </div>

            )
            }

            <div className="w-fit bg-[#f1f0f0]">
              <button className="flex items-center gap-3 w-full h-[2rem] border border-[#d9d9d9] pr-[18px] pl-[16px] py-1.5 font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={openImportModal}>
                <TfiImport className="text-[#FFC562]" size={13} />
                Import Data
              </button>
            </div>

            <div className="w-fit bg-[#f1f0f0]">
              <button className="flex items-center w-full h-[2rem] gap-3 border border-[#d9d9d9] pr-[18px] pl-[16px] py-1.5 font-medium text-[12px] text-[#676767] hover:bg-yellow-50">
                <TfiExport className="text-[#FFC562]" size={12} />
                Export Data
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center border border-[#C3BECA] overflow-hidden flex-grow h-8">
              <div className="bg-[#676767] text-white h-full w-[2rem] flex justify-center items-center">
                <FaSearch height={5} />
              </div>
              <input
                type="text"
                placeholder={searchButtonLabel}
                className={`w-${inputButtonWidth} px-3 text-sm outline-none font-normal text-[12px] text-[#9d9d9d]`}
              />
            </div>

            {/* Customize Columns */}
            {
              showCustomizeColumns && onCustomizeColumnsClick && (
                <button className="flex items-center gap-3 h-[2rem] border border-[#C3BECA] px-4 h-8 font-medium text-[12px] text-[#676767] hover:bg-yellow-50" onClick={onCustomizeColumnsClick}>
                  <FaSlidersH className="text-[#FFC562]" height={13} />
                  Customize Columns
                </button>
              )
            }

            <div className="flex text-gray-600 ml-1">
              <button className={`mr-[10px]  hover:bg-gray-200 ${viewMode === "list" ? "text-blue-500" : ""}`} onClick={() => setViewMode("list")}>
                <Tooltip title="List View">
                  <FaList />
                </Tooltip>
              </button>
              <button className={`hover:bg-gray-200 ${viewMode === "grid" ? "text-blue-500" : ""}`} onClick={() => setViewMode("grid")}>
                <Tooltip title="Grid View" placement="left">
                  <TfiLayoutGrid2 />
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex justify-between items-center px-0.5 mb-2 w-full">
        {selectedRowKeys.length > 0 ? (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 font-normal text-[12px] text-[#676767] rounded-md cursor-pointer mr-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
                checked={selectedRowKeys.length === ALL_KEYS.length}
                onChange={onToggleSelectAll}
              />
              Select All
            </label>
            <div className="flex flex-row items-center gap-3">
              <Tooltip title="Download">
                <TfiImport />
              </Tooltip>
              <Tooltip title="Delete">
                <AiOutlineDelete size={20} />
              </Tooltip>
            </div>

            <p className="text-[12px] "> {selectedRowKeys.length} Selected</p>

          </div>
        ) : (
          <div />
        )}

        {selectedRowKeys.length > 0 && (
          <div className="flex-grow px-6">
            <hr className="w-full border-t border-gray-300" />
          </div>
        )}

        <button
          className="flex items-center gap-1 font-normal text-[12px] text-[#676767] px-2 py-1 hover:bg-yellow-50 border border-gray-200 rounded"
          onClick={toggleFilter}
        >
          <FaFilter className="text-yellow-500" height={3.5} />
          {isFilterVisible ? "Hide Filter" : "Show Filter"}
        </button>
      </div>


    </div>
  );
};
export default Topbar;