import type { FC } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const ProductconfigTopbar: FC = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white ">
      {/* Create Property Button */}
      <button className="flex items-center gap-2 border border-gray-300 px-4 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded">
        <FaPlus className="text-xs" />
        CREATE PROPERTY
      </button>

      {/* View Property Group */}
      <button className="border border-gray-300 px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 rounded">
        View Property Group
      </button>

      {/* Filter Dropdown */}
      <select className="border border-gray-300 px-4 py-1.5 text-sm text-gray-700 rounded bg-white hover:cursor-pointer">
        <option>Filter Option</option>
        <option>Option A</option>
        <option>Option B</option>
      </select>

      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded overflow-hidden ml-auto w-[25rem]">
        <div className="bg-gray-200 px-4 py-2 text-gray-600">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          placeholder="Search Attribute"
          className="w-full px-4 py-1.5 text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ProductconfigTopbar;
