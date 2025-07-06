import { useFilterContext } from "../context/FilterContext";

const FilterData =() =>{
      const { isFilterVisible, toggleFilter } = useFilterContext();
    
    return(
        <div className="w-[15rem]">
            <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4 h-cover space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
                <button
                  onClick={toggleFilter}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Hide
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="form-checkbox text-blue-500 rounded" />
                  <span>Option 1</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="form-checkbox text-blue-500 rounded" />
                  <span>Option 2</span>
                </label>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Category:</p>
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="radio" name="category" value="catA" className="form-radio text-blue-500" />
                    <span>Category A</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="radio" name="category" value="catB" className="form-radio text-blue-500" />
                    <span>Category B</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range:
                  </label>
                  <select
                    id="price-range"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option>All</option>
                    <option>$0 - $50</option>
                    <option>$51 - $100</option>
                    <option>$101+</option>
                  </select>
                </div>

                <div className="pt-4 text-right">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}
export default FilterData;