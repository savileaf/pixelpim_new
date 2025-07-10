import { useEffect } from "react";
import { useResetProductTopbar, useSetProductTopbar } from "../../context/ProductTopbarContext";
import CustomTable from "../CustomTable";

const ProductCategoryMain = () => {
    const setTopbar = useSetProductTopbar();
      const resetTopbar = useResetProductTopbar();
    
    
      useEffect(() => {
          setTopbar({
            createButtonLabel: "CREATE CATEGORIES",
            createButtonWidth:210,
            showCreateButton: true,
            showViewButton: false,
            showFilter: true,
            filterOptions: ["Filter Options", "Active", "Archived"],
            showSearch: true,
            searchPlaceholder: "Search Family",
            // searchValue: search,
            // onSearchChange: setSearch,
            searchBarWidth: 500,
          });
      
          return () => {
            resetTopbar();
          };
        }, []);
  return (
    <div>
      <CustomTable/>
    </div>
  )
}

export default ProductCategoryMain
