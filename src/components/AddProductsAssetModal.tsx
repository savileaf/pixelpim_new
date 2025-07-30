import { FaSearch, FaSortAmountDown } from "react-icons/fa"
import CustomTable from "./CustomTable"
import {  useState } from "react";

const columns = [
    {
        title: (
            <span className="font-semibold text-[11px] text-[#7b7089]">
                PRODUCT NAME
            </span>
        ),
        dataIndex: "product_name",
        key: "product_name",
        render: (text: string) => (
            <span className='font-normal text-[12px] text-[#1b0c31]'>{text}</span>
        ),
    },
    {
        title: (
            <span className="font-semibold text-[11px] text-[#7b7089]">SKU</span>
        ),
        dataIndex: "sku", key: "sku",
        render: (text: string) => (
            <div className="flex items-center gap-2">
                <span className='font-normal text-[12px] text-[#1b0c31]'>{text}</span>
            </div>
        )
    },
    {
        title: (
            <span className="font-semibold text-[11px] text-[#7b7089]">
                PRODUCT Description
            </span>
        ),
        dataIndex: "product_description",
        key: "product_description",
        render: (text: string) => (
            <span className='font-normal text-[12px] text-[#1b0c31]'>{text}</span>

        ),
    },
];

const data = [
    {
        key: "1",
        product_name: "Vintage SweatShirt.doc",
        image: "/images/jeans.png",
        sku: "VS123",
        product_description: "Ergonomic wireless mouse with long battery life.",

    },
    {
        key: "2",
        product_name: "Lookbook.xlsx",
        image: "/images/jeans.png",
        sku: "LB456",
        product_description: "Ergonomic wireless mouse with long battery life.",

    },
    {
        key: "3",
        product_name: "product-image.jpg",
        image: "/images/jeans.png",
        sku: "PI789",
        product_description: "Ergonomic wireless mouse with long battery life.",

    },
    {
        key: "4",
        product_name: "Product Details.pdf",
        image: "/images/jeans.png",
        sku: "PD321",
        product_description: "Ergonomic wireless mouse with long battery life.",

    },
];

const AddProductsAssetModal = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Memoize all keys for "Select All" functionality
    // const ALL_KEYS = useMemo(() => data.map(item => item.key), [data]);

    
    return (
        <div className="w-[1105px] h-[554px] bg-neutral-300 flex flex-col gap-2 px-6 py-4">
            <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center border border-[#C3BECA] w-[332px] h-8">
                    <div className="bg-[#676767] text-white h-full w-[2rem] flex justify-center items-center">
                        <FaSearch height={5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Product by sku or Product Name"
                        className={`w-[332px] px-3 text-sm outline-none font-normal text-[12px] text-[#9d9d9d]`}
                    />
                </div>

                <div className=' flex items-center justify-center gap-4 px-4 border border-gray-400 overflow-hidden h-8'>
                    <span className='text-[#9d9d9d] text-sm'>Sort by</span>
                    <FaSortAmountDown size={14} />
                </div>
                {
                    selectedRowKeys.length > 0 && (
                        <div className="w-[123px] h-4 bg-[#ffc562] rounded-lg flex items-center justify-center">
                          <p className="text-[11px] text-[#eda934]">{selectedRowKeys.length} selected</p>
                           </div>
                    )
                }
            </div>
            <div className="w-full">
                <CustomTable
                    columns={columns}
                    dataSource={data}
                    placeSortButton={false}
                    showCheckbox={true} // Ensure checkboxes are visible in CustomTable
                    selectedRowKeys={selectedRowKeys} // Pass the current selected keys
                    setSelectedRowKeys={setSelectedRowKeys} 
                />
            </div>

            <div className="flex justify-end">
                <button
                    className="w-[126px] h-10 bg-[#2ecc71] font-medium text-[14px] text-white"
                >
                    Link Varients
                </button>
            </div>
        </div>
    )
}

export default AddProductsAssetModal