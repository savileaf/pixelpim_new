import CustomTable from "../components/CustomTable";
import FilterData from "../components/FilterData";
import GridView from "../components/GridView";
import Topbar from "../components/Topbar";
import { useFilterContext } from "../context/FilterContext";
import { useModalContext } from "../context/ModalContext";
import { useViewContext } from "../context/ViewContext";
import CustomizeColumnModal from "../components/CustomiseColumnModal";


const ProductsMain = () => {
  const { isCustomizeColumnsVisible, openCustomizeColumns, closeCustomizeColumns } = useModalContext();
  const { isFilterVisible } = useFilterContext();
  const { viewMode } = useViewContext();

  return (
    <div className="w-full h-screen flex flex-col">
      <Topbar onCustomizeColumnsClick={openCustomizeColumns} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-2">
          {viewMode === "list" ? (
            <CustomTable />
          ) : (
            <GridView />
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
    </div>
  );
};

export default ProductsMain;