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

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          {viewMode === "list" ? (
            <CustomTable rowHeight={30}/>
          ) : (
            <ProductGridView />
          )}
        </div>
        {isFilterVisible && <FilterData />}

      </div>

      {isCustomizeColumnsVisible && (
        <CustomizeColumnModal
          visible={isCustomizeColumnsVisible}
          onCancel={closeCustomizeColumns}
        />
      )}
      <div className="w-[50px] h-[50px] bg-[#2ecc71] rounded-[50%] absolute bottom-8 right-[4rem] flex items-center justify-center">
        <Tooltip title="Add Product">
          <Link to="/add/product">
        <FaPlus color="#f0ad02" size={30}/>
          
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProductsMain;