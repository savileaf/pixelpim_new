import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ProductsMain from "./pages/ProductsMain"
import Login from "./pages/Login"
import GridView from "./components/GridView"
import ProductsConfigLayout from "./components/ProductsConfigLayout"
import ProductConfigurationPage from "./pages/ProductConfigurationPage"

const App = () => {
  return (
    <Routes>
    <Route element={<Layout/>}>
    <Route path="/" element={<ProductsMain/>}/>
    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/grid" element={<GridView/>}/>

    <Route path="/product" element={<ProductsConfigLayout/>}>
    <Route path="/product/attribute" element={<ProductConfigurationPage/>}/>

    </Route>
    </Routes>
  )
}

export default App
