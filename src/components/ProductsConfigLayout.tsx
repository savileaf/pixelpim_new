import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import ProductconfigTopbar from "./productconfig/ProductconfigTopbar"
import ProductsSidebar from "./ProductsSidebar"
import { useProductTopbar } from "../context/ProductTopbarContext"

const ProductsConfigLayout = () => {
  const topbarConfig = useProductTopbar();
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-row">
        <Sidebar />
        <ProductsSidebar />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <div className="w-full">
          <ProductconfigTopbar {...topbarConfig} />

        </div>
        <div className="flex-1 overflow-hidden w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProductsConfigLayout
