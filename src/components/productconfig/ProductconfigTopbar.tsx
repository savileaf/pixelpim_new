// ProductconfigTopbar.tsx
import type { FC } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
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
    <div className="flex items-center gap-3 px-4 py-2 bg-white ">
      {/* Create Button */}
      {showCreateButton && (
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 border border-gray-300 px-4 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded"
        >
          <FaPlus className="text-xs" />
          {createButtonLabel}
        </button>
      )}

      {/* View Property Group */}
      {showViewButton && (
        <Link to={viewButtonLink}>
          <button className="border border-gray-300 px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 rounded">
            {viewButtonLabel}
          </button>
        </Link>
      )}

      {/* Filter Dropdown */}
      {showFilter && (
        <select className="border border-gray-300 px-4 py-1.5 text-sm text-gray-700 rounded bg-white hover:cursor-pointer">
          {filterOptions.map((option, i) => (
            <option key={i}>{option}</option>
          ))}
        </select>
      )}

      {/* Search Box */}
      {showSearch && (
        <div className="flex items-center border border-gray-300 rounded overflow-hidden ml-auto">
          <div className="bg-gray-200 px-4 py-2 text-gray-600">
            <FaSearch size={14} />
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
