import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { WiDirectionUpRight } from "react-icons/wi"
const ProductGridComponent = () => {
  return (
               <div className="w-[16rem] h-cover flex flex-col border border-solid border-gray-200">
                   <img src="/product_image1.png" alt="product"/>
   
                   <div className="flex flex-col px-3 py-2 gap-3">
                       <div>
                           <h2 className="font-normal text-[10px] text-[#7c7387]">PRODUCT NAME</h2>
                       <p className="font-normal text-[12px] text-[#1b0c31]">Vintage Sweatshirt, Multicolor, Unisex, XL</p>
                       </div>
   
                       <div>
                           <p className="font-normal text-[10px] text-[#7c7387]">VARIENTS</p>
   
                       <div className="w-[53px] h-[22px] bg-[#fefefe] flex flex-row items-center justify-between border border-gray-200">
                           <div className="flex items-center justify-center w-[30px] border-r border-gray-200 text-[12px] text-[#1b0c31]"> 1</div>
                           <div><WiDirectionUpRight size={22} className="text-[12px] text-[#1b0c31]"/></div>
                       </div>
                       </div>
   
                       <div>
                           <p className="font-normal text-[10px] text-[#7c7387]">SKU</p>
                           <span className="font-normal text-[11px] text-[#575657]">SWT-11523-WXL</span>
                       </div>
   
                       <div className="mt-1">
                           <p className="font-normal text-[10px] text-[#7c7387]">PRODUCT DESCRIPTION:</p>
                           <span className="font-normal text-[12px] text-[#1b0c31]">A cozy and vibrant unisex hoodie in orange, designed for comfort and style.</span>
                       </div>
   
                       <div className="flex flex-col gap-1 mt-1">
                           <span className="font-normal text-[10px] text-[#7c7387]">ATTRIBUTE STATUS: </span>
                           <div className="flex flex-row">
                               <span className="font-normal text-[11px] text-[#008000]">Complete</span>
                               <IoCheckmarkDoneCircle color="green" />
                           </div>
                       </div>
                   </div>
               </div>
  )
}

export default ProductGridComponent
