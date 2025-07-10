import { useEffect } from "react";
import { useResetProductTopbar, useSetProductTopbar } from "../../context/ProductTopbarContext";
import { Link } from "react-router-dom";

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
    <div className="p-8">
      <Link to="/edit/product/category">
        <button>
            Edit category
        </button>
         </Link>
    </div>
  )
}

export default ProductCategoryMain
