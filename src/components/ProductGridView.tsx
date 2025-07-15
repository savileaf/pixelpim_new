import ProductGridComponent from "./ProductGridComponent"


const ProductGridView = () => {
  return (
    <div className="w-full h-cover bg-white p-2">
        <div className="flex flex-row gap-4">
             <ProductGridComponent/>
         <ProductGridComponent/>
         <ProductGridComponent/>
         <ProductGridComponent/>

        </div>

    </div>
  )
}

export default ProductGridView
