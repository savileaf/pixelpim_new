import React, { useState } from "react";
import CustomTable from "../CustomTable";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Products {
  id: number;
  name: string;
  sku: string;
  image?: string;
}

interface ProductModalProps {
  subcategoryName: string | null;
  products: Products[];
  onClose: () => void;
  onSelect?: (selectedKeys: string[]) => void;
}

const CategoryProductModal: React.FC<ProductModalProps> = ({
  subcategoryName,
  products,
  onClose,
  onSelect,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const columns = [
    {
      title: (
        <span className="font-semibold text-[11px] text-[#7b7089]">PRODUCT NAME</span>
      ),
      dataIndex: "product_name",
      key: "product_name",
      width: 190,
      render: (text: string) => (
        <div className="flex items-center justify-between">
          <span className="font-normal text-[12px] text-[#1b0c31]">{text}</span>
          <FaExternalLinkAlt color="blue" />
        </div>
      ),
    },
    {
      title: (
        <span className="font-semibold text-[11px] text-[#7b7089]">SKU</span>
      ),
      dataIndex: "sku",
      key: "sku",
      width: 90,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-[12px] text-[#1b0c31]">{text}</span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="flex items-center gap-2">
          <BsThreeDotsVertical />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      product_name: "Vintage SweatShirt.doc",
      image: "/images/jeans.png",
      sku: "VS123",
    },
    {
      key: "2",
      product_name: "Lookbook.xlsx",
      image: "/images/jeans.png",
      sku: "LB456",
    },
    {
      key: "3",
      product_name: "product-image.jpg",
      image: "/images/jeans.png",
      sku: "PI789",
    },
    {
      key: "4",
      product_name: "Product Details.pdf",
      image: "/images/jeans.png",
      sku: "PD321",
    },
  ];


  return (
    <div className="w-[30rem] max-w-[30rem]">
      <CustomTable
        dataSource={data}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
};

export default CategoryProductModal;
