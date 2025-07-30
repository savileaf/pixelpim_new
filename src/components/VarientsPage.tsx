  import { useMemo, useState } from "react"
import { useFilterContext } from "../context/FilterContext"
  import CustomTable from "./CustomTable"
  import FilterData from "./FilterData"
  import Topbar from "./Topbar"
  import { FaLink } from "react-icons/fa"
import AddProductsAssetModal from "./AddProductsAssetModal"

  
    const columns =[
      {
        title: "Product Name",
        dataIndex: "product_name",
        key: "product_name",
      },
      {
        title:"Product Description",
        dataIndex:"product_description",
        key:"product_description",
      },
      {
        title:"SKU",
        dataIndex:"sku",
        key:"sku",
      }
    ]
    const data =[
      {
      key: "1",
      product_name: "Wireless Mouse",
      product_description: "Ergonomic wireless mouse with long battery life.",
      image:"/images/mouse.jpg",
      sku: "WM123",
    },
    {
      key: "2",
      product_name: "Gaming Keyboard",
      product_description: "Mechanical keyboard with RGB lights.",
      image:"/images/mouse.jpg",
      sku: "GK456",
    },
    {
      key: "3",
      product_name: "Wireless Mouse",
      product_description: "Ergonomic wireless mouse with long battery life.",
      image:"/images/jeans.png",
      sku: "WM123",
    },
    {
      key: "4",
      product_name: "Gaming Keyboard",
      product_description: "Mechanical keyboard with RGB lights.",
      image:"/images/jeans.png",

      sku: "GK456",
    },
    {
      key: "5",
      product_name: "Wireless Mouse",
      product_description: "Ergonomic wireless mouse with long battery life.",
      image:"/images/jeans.png",

      sku: "WM123",
    },
    {
      key: "6",
      product_name: "Gaming Keyboard",
      product_description: "Mechanical keyboard with RGB lights.",
      image:"/images/jeans.png",

      sku: "GK456",
    },
    {
      key: "7",
      product_name: "Wireless Mouse",
      product_description: "Ergonomic wireless mouse with long battery life.",
      image:"/images/jeans.png",

      sku: "WM123",
    },
    {
      key: "8",
      product_name: "Gaming Keyboard",
      product_description: "Mechanical keyboard with RGB lights.",
      image:"/images/jeans.png",

      sku: "GK456",
    }

    ]
  const VarientsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isFilterVisible} = useFilterContext();
     // State to manage selected row keys
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Get all keys from your data for "Select All" functionality
  const ALL_KEYS = useMemo(() => data.map(item => item.key), [data]);

  // Handler for select all checkbox
  // const onToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     setSelectedRowKeys(ALL_KEYS);
  //   } else {
  //     setSelectedRowKeys([]);
  //   }
  // };
const customImportButton = (
    <div className="w-fit bg-[#f1f0f0]">
        <button
        className="flex items-center gap-3 w-full h-[2rem] border border-[#d9d9d9] pr-[18px] pl-[16px] py-1.5 font-medium text-[12px] text-[#676767] hover:bg-white"
        onClick={() => setIsModalOpen(true)}
      >
        <FaLink className="text-[#FFC562]" size={13}/>
        Link Varients
      </button>
    </div>
    )

    return (
      <div className="w-full flex flex-col">
        <Topbar customImportButton={customImportButton} showCustomizeColumns={false} unLinkVarient={true}
        selectedRowKeys={selectedRowKeys}
        onToggleSelectAll={() => {
          if (selectedRowKeys.length === ALL_KEYS.length) {
            setSelectedRowKeys([]);
          } else {
            setSelectedRowKeys(ALL_KEYS);
          }
        }}
        ALL_KEYS={ALL_KEYS}
        />
        <div className="flex flex-row flex-grow gap-6">
        <div className="flex-grow min-w-0">
        <CustomTable dataSource={data} columns={columns} 
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        
        />

        </div>
        {isFilterVisible && 
        (<FilterData />
        )}
        </div>
            {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl">
            <button
              className="absolute top-4 right-6 text-sm text-gray-600 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <AddProductsAssetModal />
          </div>
        </div>
      )}
      </div>
    )
  }

  export default VarientsPage
