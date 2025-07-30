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
import EditGroup from "./components/category/EditGroup"
import AssetsMain from "./components/assests/AssetsMain"
import ViewGroupPage from "./components/assests/ViewGroupPage"
import EditProductFamily from "./components/productconfig/EditProductFamily"
import ProductCategoryMain from "./components/productcategory/ProductCategoryMain"
import EditCategory from "./components/category/EditCategory"
import ProductDetails from "./components/productdetails/ProductDetails"
import ProductDetailsLayout from "./components/productdetails/ProductDetailsLayout"
import ProductDetailsAttribute from "./components/productdetails/ProductDetailsAttribute"
import ProductDetailsAssests from "./components/productdetails/ProductDetailsAssests"
import ProductDetailsCategories from "./components/productdetails/ProductDetailsCategories"
import AddProduct from "./components/productdetails/AddProduct"
import VarientsPage from "./components/VarientsPage"

const App = () => {
  return (
    <Routes>
    <Route element={<Layout/>}>
    <Route path="/" element={<ProductsMain/>}/>
    <Route path="/varients" element={<VarientsPage/>}/>

    <Route path="/assets" element={<AssetsMain/>}/>
    <Route path="/assets/opengroup" element={<ViewGroupPage/>}/>
    <Route path="/productdetails" element={<ProductDetailsLayout/>}>
        <Route path="/productdetails/basic-info" element={<ProductDetails productName="Sample Product"
      sku="SKU12345"
      variants={3}
      status="Complete"
      productLink="https://example.com/product/sample"/>}/>
        <Route path="/productdetails/attributes" element={<ProductDetailsAttribute/>}/>
        <Route path="/productdetails/assets" element={<ProductDetailsAssests/>}/>
        <Route path="/productdetails/categories" element={<ProductDetailsCategories/>} />
      </Route>
    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/grid" element={<GridView/>}/>

    <Route path="/product" element={
      <ProductTopbarProvider>
      <ProductsConfigLayout/>
      </ProductTopbarProvider>
  }>
  
    <Route path="/product/attribute" element={<ProductConfigurationPage/>}/>
    <Route path="/product/attribute/viewproperty" element={<ViewProperty/>}/>
    <Route path="/product/families" element={<ProductFamilies/>}/>
    <Route path="/product/categories" element={<ProductCategoryMain/>}/>
    </Route>

    <Route path="/category/edit" element={<EditCategory/>}/>
    <Route path="/group/edit" element={<EditGroup/>}/>
    <Route path="/productfamily/edit" element={<EditProductFamily/>}/>
    <Route path="/edit/product/category" element={<EditCategory/>}/>
    <Route path="/add/product" element={<AddProduct/>}/> 
    </Routes>
  )
}

export default App
