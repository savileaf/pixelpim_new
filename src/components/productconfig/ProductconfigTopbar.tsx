// ProductconfigTopbar.tsx
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ProductconfigTopbarProps {
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonLabel?: string;

  showViewButton?: boolean;
  viewButtonLabel?: string;
  viewButtonLink?: string;

  showFilter?: boolean;
  filterOptions?: string[];

  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchBarWidth?:Number;
}

const ProductconfigTopbar: FC<ProductconfigTopbarProps> = ({
  showCreateButton = true,
  onCreateClick,
  createButtonLabel = "CREATE ATTRIBUTE",

  showViewButton = true,
  viewButtonLabel = "View Attribute Group",
  viewButtonLink = "/product/viewproperty",

  showFilter = true,
  filterOptions = ["Filter Options","Option 1","Option 1","Option 1", "Option A", "Option B"],

  showSearch = true,
  searchPlaceholder = "Search Attribute",
  searchValue = "",
  searchBarWidth = 350,
  onSearchChange = () => {},
}) => {
  return (
    <div className="flex items-center justify-between gap-5  bg-white ">
      {/* Create Button */}
      {showCreateButton && (
        <button
          onClick={onCreateClick}
          className="add-attribute h-[32px] flex items-center gap-2 border border-gray-300 px-4 text-base font-semibold text-[#1B0C31] hover:bg-blue-50"
        >
          <IoAdd className="text-2xl text-[#2ECC71]" />
          {createButtonLabel}
        </button>
      )}

      {/* View Property Group */}
      {showViewButton && (
        <Link to={viewButtonLink}>
          <button className="h-[32px] border border-gray-300 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100">
            {viewButtonLabel}
          </button>
        </Link>
      )}

      {/* Filter Dropdown */}
      {showFilter && (
        <select className="h-[32px] w-fit border border-gray-300 px-3 py-1.5 text-sm text-gray-700 bg-white hover:cursor-pointer">
          {filterOptions.map((option, i) => (
            <option key={i}>{option}</option>
          ))}
        </select>
      )}

      {/* Search Box */}
      {showSearch && (
        <div className="h-[32px] flex-grow flex items-center border border-gray-300 overflow-hidden">
          <div className="bg-[#C3BECA] h-[30px] px-2 flex justify-center items-center">
            <FaSearch size={14} className="text-white"/>
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="px-4 py-1.5 text-sm focus:outline-none"
            style={{ width: `${searchBarWidth}px` }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductconfigTopbar;
