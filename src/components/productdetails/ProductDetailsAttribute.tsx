import { FaCross, FaPlus, FaSearch, FaSortAmountDown, FaTags } from 'react-icons/fa';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { MdCancel, MdFormatTextdirectionLToR } from 'react-icons/md';
import { Link } from 'react-router-dom';


// Define types for the AttributeInputBox component props
interface AttributeInputBoxProps {
  content: string; // Content is expected to be a string for the input field
}

// AttributeInputBox component (now only contains the input field with no background/border)
const AttributeInputBox: React.FC<AttributeInputBoxProps> = ({ content }) => {
  return (
    <div className=""> 
      <input
        type="text"
        value={content}
        readOnly // Set to readOnly as per the image, no interaction shown
        className="w-full px-2 py-1 border border-gray-300 rounded-md font-normal text-[12px] text-neutral-600"
      />
    </div>
  );
};

const ProductDetailsAttribute = () => {
  return (
    <div className="p-2 w-full">
        <div className='mt-2 ms-2'>
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
        <div className='flex gap-4 p-2'>
        <div className="p-2 flex items-center justify-center w-[18rem] max-w-[18rem]">
      <div className=" overflow-hidden w-full flex flex-col gap-3">
        <div className="">
          <img
            src="/jeans.png"  
            alt="Jeans"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className=" grid grid-cols-2 gap-2">
          <div className="relative overflow-hidden">
            <img
              src="/jeans.png" // Placeholder for thumbnail 1
              alt="Thumbnail 1"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail 2 */}
          <div className="relative overflow-hidden">
            <img
              src="/jeans.png" // Placeholder for thumbnail 2
              alt="Thumbnail 2"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail 3 */}
          <div className="relative overflow-hidden">
            <img
              src="/jeans.png" // Placeholder for thumbnail 3
              alt="Thumbnail 3"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="relative overflow-hidden group">
            <img
              src="/jeans.png" 
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
    {/* FORM SECTION */}
       <div className="w-[36rem] flex flex-col gap-4 p-2">
        <div className="flex gap-3">
            <div className='py-1 w-[10rem] bg-white border border-gray-200 flex items-center justify-center gap-2 font-semibold text-[#9d9d9d]'>
                    <FiPlus size={22} color='#2ecc71'/>
                    Add Attribute
            </div>
            
             <div className="flex items-center border border-gray-400 rounded overflow-hidden w-[15rem]">
                          <div className="bg-[#676767] text-white p-[7px]">
                            <FaSearch size={18} />
                          </div>
                          <input
                            type="text"
                            placeholder="Search Attribute Name"
                            className={`px-3 text-sm outline-none font-normal text-[12px] text-[#9d9d9d]`}
                          />
        </div>

        <div className=' flex items-center justify-center gap-4 px-4 py-1 border border-gray-400 rounded overflow-hidden'>
            <span className='text-[#9d9d9d]'>Sort by</span>
            <FaSortAmountDown size={18} />
        </div>
        </div>
 {/* ATRRIBUTES FORM SECTION */}
        <div className="flex items-start justify-center">
      <div className="w-full max-w-2xl">
        {/* Size Attribute Block */}
        <div className="relative mb-4"> {/* Added mb-6 for spacing between blocks */}
          <MdCancel className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 absolute -top-2 right-0 transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center mb-4"> {/* Header section */}
            <h3 className="font-medium text-[14px] text-[#2d2b2b]">
              Size
            </h3>
            <div className="bg-[#e3e3e3] rounded-md px-3 py-1 flex items-center space-x-2 text-[#979797] text-[11px"> {/* Styling for the attribute type box */}
              <span className='font-normal text-[11px] text-[#979797]'>Attribute Type: Short Text</span>
              <div className="flex items-center justify-center text-gray-600">
                <MdFormatTextdirectionLToR className="w-4 h-4" />
              </div>
            </div>
          </div>
          <AttributeInputBox content="M"/>
        </div>

        {/* Product Description Attribute Block */}
        <div className="relative mb-6">
          <MdCancel className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 absolute -top-2 right-0 transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-[14px] text-[#2d2b2b]">
              Product Description
            </h3>
            <div className="bg-[#e3e3e3] rounded-md px-3 py-1 flex items-center space-x-2 text-[#979797] text-[11px]">
              <span className='font-normal text-[11px] text-[#979797]'>Attribute Type: Paragraph</span>
              <div className="flex items-center justify-center text-gray-600">
                <MdFormatTextdirectionLToR className="w-4 h-4" />
              </div>
            </div>
          </div>
          <AttributeInputBox content="This vest is your go-to wardrobe essential for any casual occasion." />
        </div>

        {/* Weight Attribute Block */}
        <div className="relative mb-6">
          <MdCancel className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 absolute -top-2 right-0 transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-[14px] text-[#2d2b2b]">
              Weight
            </h3>
            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center space-x-2 text-gray-600 text-sm">
              <span className='font-normal text-[11px] text-[#979797]'>Attribute Type: Decimal</span>
              <div className="flex items-center justify-center text-gray-600">
                <span className="text-xs font-bold">1.23</span> {/* Custom icon for decimal */}
              </div>
            </div>
          </div>
          <AttributeInputBox content="1.1 Kg" />
        </div>

        {/* Min Order Attribute Block */}
        <div className="relative mb-6">
          <MdCancel className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 absolute -top-2 right-0 transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-[14px] text-[#2d2b2b] flex items-center">
              Min Order <FaPlus className="w-4 h-4 ml-2 text-orange-500" />
            </h3>
            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center space-x-2 text-gray-600 text-sm">
              <span className='font-normal text-[11px] text-[#979797]'>Attribute Type: Integer</span>
              <div className="flex items-center justify-center text-gray-600">
                <span className="text-xs font-bold">123</span> {/* Custom icon for integer */}
              </div>
            </div>
          </div>
          <AttributeInputBox content="1" />
        </div>

        {/* Color Attribute Block */}
        <div className="relative mb-6">
          <MdCancel className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 absolute -top-2 right-0 transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-[14px] text-[#2d2b2b] flex items-center">
              Color <FaPlus className="w-4 h-4 ml-2 text-orange-500" />
            </h3>
            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center space-x-2 text-gray-600 text-sm">
              <span className='font-normal text-[11px] text-[#979797]'>Attribute Type: Multiselect</span>
              <div className="flex items-center justify-center text-gray-600">
                <FaTags className="w-4 h-4" />
              </div>
            </div>
          </div>
          <AttributeInputBox content="" />
        </div>
      </div>
    </div>

       </div>
    </div>
    </div>
  )
}

export default ProductDetailsAttribute
