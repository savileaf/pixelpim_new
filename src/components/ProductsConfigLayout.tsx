import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import ProductconfigTopbar from "./productconfig/ProductconfigTopbar"
import ProductsSidebar from "./ProductsSidebar"

const ProductsConfigLayout = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-row">
        <Sidebar/>
      <ProductsSidebar/>
      </div>
      <div className="flex flex-col">
        <ProductconfigTopbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default ProductsConfigLayout
