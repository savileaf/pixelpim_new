import CustomTable from "../components/CustomTable";
import FilterData from "../components/FilterData";
import Topbar from "../components/Topbar";
import { useFilterContext } from "../context/FilterContext";
import { useModalContext } from "../context/ModalContext";
import { useViewContext } from "../context/ViewContext";
import CustomizeColumnModal from "../components/CustomiseColumnModal";
import ProductGridView from "../components/ProductGridView";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";


const ProductsMain = () => {
  const { isCustomizeColumnsVisible, openCustomizeColumns, closeCustomizeColumns } = useModalContext();
  const { isFilterVisible } = useFilterContext();
  const { viewMode } = useViewContext();

  return (
  <div className="w-full flex flex-col">
  <Topbar onCustomizeColumnsClick={openCustomizeColumns} />

  <div className="flex flex-1 w-full overflow-hidden">
    {/* Left Side - Table or Grid */}
    <div className="flex-grow min-w-0 overflow-auto relative">
      {viewMode === "list" ? (
        <CustomTable rowHeight={30} />
      ) : (
        <ProductGridView />
      )}
    </div>

    {/* Right Side - Filter Panel */}
    {isFilterVisible && (
      <div className="w-[15rem] shrink-0 px-4 py-2 border-l border-gray-200">
        <FilterData />
      </div>
    )}
  </div>

  {isCustomizeColumnsVisible && (
    <CustomizeColumnModal
      visible={isCustomizeColumnsVisible}
      onCancel={closeCustomizeColumns}
    />
  )}

  {/* Floating Add Button */}
  <div className="w-[50px] h-[50px] bg-[#2ecc71] rounded-full absolute bottom-8 right-[6rem] flex items-center justify-center">
    <Tooltip title="Add Product">
      <Link to="/add/product">
        <FaPlus color="#f0ad02" size={30} />
      </Link>
    </Tooltip>
  </div>
</div>

  );
};

export default ProductsMain;