import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { WiDirectionUpRight } from "react-icons/wi";
import { Link } from "react-router-dom"
interface ProductDetailsProps {
  productName: string;
  sku: string;
  variants: number;
  status: "Complete" | "Incomplete";
  productLink: string;
}
const ProductDetails:React.FC<ProductDetailsProps> = ({
    productName,
  sku,
  productLink
}) => {

  
  const handleCopy = () => {
    navigator.clipboard.writeText(productLink);
  };
  return (
    <div className="w-full h-screen bg-[#f2f0f0] px-4 py-2">
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
        {/* IMAGE GALLERY IN THE LEFT */}
      <div className=" p-2 flex items-center justify-center w-[18rem] max-w-[18rem]">
      <div className=" overflow-hidden w-full flex flex-col gap-3">
      
        <div className="">
          <img
            src="/images/jeans.png"  
            alt="Jeans"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className=" grid grid-cols-2 gap-2">
          <div className="relative overflow-hidden">
            <img
              src="/images/jeans.png" // Placeholder for thumbnail 1
              alt="Thumbnail 1"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail 2 */}
          <div className="relative overflow-hidden">
            <img
              src="/images/jeans.png" // Placeholder for thumbnail 2
              alt="Thumbnail 2"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail 3 */}
          <div className="relative overflow-hidden">
            <img
              src="/images/jeans.png" // Placeholder for thumbnail 3
              alt="Thumbnail 3"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="relative overflow-hidden group">
            <img
              src="/images/jeans.png" 
              alt="View All"
              className="w-full h-auto object-cover "
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">View All</span>
            </div>
          </div>
        </div>

        {/* "Add Image" button section */}
          <div className="w-[8rem]">
          <button className="rounded-3xl px-4 py-2 bg-[#cc922f] text-white">
            Add Image
          </button>
          </div>
      </div>
    </div>
     {/* form section */}
    <div className="w-[33rem] min-w-[33rem] p-2 space-y-4 mt-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          value={productName}
          className="w-full border border-gray-300 rounded px-3 py-1.5   text-sm"
        />
      </div>

      {/* SKU */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
        <input
          type="text"
          value={sku}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
        />
      </div>

      {/* Variants */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Variants</label>
        <div className="w-[53px] h-[22px] bg-[#fefefe] flex flex-row items-center justify-between border border-gray-200">
            <div className="flex items-center justify-center w-[30px] border-r border-gray-200 text-[12px] text-[#1b0c31]"> 1</div>
              <div><WiDirectionUpRight size={22} className="text-[12px] text-[#1b0c31]"/></div>
            </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
       <div className="flex flex-row">
                                      <span className="font-normal text-[11px] text-[#008000]">Complete</span>
                                      <IoCheckmarkDoneCircle color="green" />
                                  </div>
      </div>

      {/* Product Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Link</label>
        <div className="flex items-center relative">
          <input
            type="text"
            value={productLink}
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm truncate"
          />
       <FaRegCopy onClick={handleCopy} color="#ffc562" size={22} className="absolute top-2 right-2"/>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default ProductDetails
