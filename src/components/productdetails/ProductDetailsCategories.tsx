import { Link } from "react-router-dom"
import { ProductCategoryTree } from "../productcategory/ProductCategoryTree"

const categories = [
  {
    name: 'Electronics',
    children: [
      {
        name: 'Mobile Phones',
        children: [
          {
            name: 'Android Phones',
            children: [
              { name: 'Samsung', count: 12 },
              { name: 'OnePlus', count: 8 },
              { name: 'Xiaomi', count: 14 },
            ],
          },
          {
            name: 'Iphones',
            count: 10
          }
        ]
      },
      {
        name: 'Laptops',
        children: [
          { name: 'Gaming Laptops', count: 7 },
          { name: 'Ultrabooks', count: 5 },
          { name: 'Business Laptops', count: 6 }
        ]
      },
      {
        name: 'Tablets',
        children: [
          { name: 'Android Tablets', count: 4 },
          { name: 'iPads', count: 9 }
        ]
      }
    ]
  },
  {
    name: 'Mobile Accessories',
    children: [
      { name: 'Chargers', count: 15 },
      { name: 'Cables', count: 20 },
      { name: 'Screen Protectors', count: 18 },
      { name: 'Phone Cases', count: 25 }
    ]
  },
  {
    name: 'Laptops & Computers',
    children: [
      {
        name: 'Desktops',
        children: [
          { name: 'Gaming PCs', count: 6 },
          { name: 'Workstations', count: 4 }
        ]
      },
      {
        name: 'Monitors',
        children: [
          { name: '4K Monitors', count: 5 },
          { name: 'Curved Monitors', count: 3 }
        ]
      },
      { name: 'Accessories', count: 12 }
    ]
  },
];

const ProductDetailsCategories = () => {
  return (
    <div className="w-full h-screen max-h-[100vh] bg-[#f2f0f0] p-4">
          <div>
            <Link to="/">
              <button
                className="px-6 py-2 text-gray-800 font-medium bg-[#e6e6e6]"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)",
                }}
              >
                BACK
              </button>
            </Link>
          </div>
          <div className="flex flex-row  mt-4 w-full gap-2">
            {/* image section */}
            <div className=" p-2 flex flex-col gap-4 w-[18rem] min-w-[18rem]">
              <img src="/images/placeholder.png" alt="product" />
              <div className="w-[8rem]">
                <button className="rounded-3xl px-4 py-2 bg-[#cc922f] text-white">
                  Add Image
                </button>
              </div>
            </div>

            <div className="p-2 w-full flex flex-col gap-4">
                <h2 className="font-semibold text-[18px] text-[#1b0c31]">Category Tree</h2>
                <ProductCategoryTree data={categories}/>
            </div>
    </div>
    </div>

  )
}

export default ProductDetailsCategories
