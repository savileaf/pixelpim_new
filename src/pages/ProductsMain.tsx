import { useState } from "react";
import Topbar from "../components/Topbar";
import FilterData from "../components/FilterData";
import CustomTable from "../components/CustomTable";
import CustomizeColumnModal from "../components/CustomiseColumnModal";
import ProductGridView from "../components/ProductGridView";
import { useFilterContext } from "../context/FilterContext";
import { useModalContext } from "../context/ModalContext";
import { useViewContext } from "../context/ViewContext";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

// match keys with defaultData from CustomTable
const ALL_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"];

const ProductsMain = () => {
  const { isCustomizeColumnsVisible, openCustomizeColumns, closeCustomizeColumns } = useModalContext();
  const { isFilterVisible } = useFilterContext();
  const { viewMode } = useViewContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

 

  return (
    <div className="w-full flex flex-col product-main">
      <Topbar
        selectedRowKeys={selectedRowKeys}
        onCustomizeColumnsClick={openCustomizeColumns}
         onToggleSelectAll={() => {
          if (selectedRowKeys.length === ALL_KEYS.length) {
            setSelectedRowKeys([]);
          } else {
            setSelectedRowKeys(ALL_KEYS);
          }
        }}
      />

      <div className="flex gap-1 w-full overflow-hidden justify-between">
        <div className="flex-grow min-w-0 overflow-auto relative">
          {viewMode === "list" ? (
            <CustomTable
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              rowHeight={30}
            />
          ) : (
            <ProductGridView />
          )}
        </div>

        {isFilterVisible && (
          <div className="w-[13rem] shrink-0 py-2 border-l border-gray-200">
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
