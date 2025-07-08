import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ProductsMain from "./pages/ProductsMain"
import Login from "./pages/Login"
import GridView from "./components/GridView"
import ProductsConfigLayout from "./components/ProductsConfigLayout"
import ProductConfigurationPage from "./pages/ProductConfigurationPage"
import ViewProperty from "./components/productconfig/ViewProperty"
import ProductFamilies from "./components/productconfig/ProductFamilies"
import { ProductTopbarProvider } from "./context/ProductTopbarContext"
import EditCategory from "./components/category/EditCategory"
import EditGroup from "./components/category/EditGroup"

const App = () => {
  return (
    <Routes>
    <Route element={<Layout/>}>
    <Route path="/" element={<ProductsMain/>}/>
    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/grid" element={<GridView/>}/>

    <Route path="/product" element={
      <ProductTopbarProvider>
      <ProductsConfigLayout/>
      </ProductTopbarProvider>
  }>
    <Route path="/product/property" element={<ProductConfigurationPage/>}/>
    <Route path="/product/viewproperty" element={<ViewProperty/>}/>
    <Route path="/product/families" element={<ProductFamilies/>}/>
    </Route>

    <Route path="/category/edit" element={<EditCategory/>}/>
    <Route path="/group/edit" element={<EditGroup/>}/>
    </Routes>
  )
}

export default App
