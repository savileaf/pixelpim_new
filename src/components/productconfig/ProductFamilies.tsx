import { useEffect, useState } from "react";
import { useSetProductTopbar, useResetProductTopbar } from "../../context/ProductTopbarContext";
import CustomTable from "../CustomTable";
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "antd";
import ViewProductModal from "./ViewProductModal";
import ViewAttributeModal from "./ViewAttributeModal";
import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Link , useNavigate } from "react-router-dom";
import { useAttributeModal } from "../../context/AttributeContext";




const ProductFamilies = () => {
  const setTopbar = useSetProductTopbar();
  const resetTopbar = useResetProductTopbar();
  const [search, setSearch] = useState("");
  const { openModal, addAttribute } = useAttributeModal();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false)
  const navigate = useNavigate();



  const handleMenuClick = (key: string, record: any) => {
    console.log(`Action: ${key}`, record);
  };


  const customData = [
    {
      key: "1",
      family_name: "Price",
      products: 5,
      attributes: 4,
    },
    {
      key: "2",
      family_name: "Currency",
      products: 6,
      attributes: 8,
    }, {
      key: "3",
      family_name: "Available Stock",
      products: 5,
      attributes: 4,
    }, {
      key: "4",
      family_name: "Launch Date",
      products: 5,
      attributes: 4,
    }, {
      key: "5",
      family_name: "Is Active",
      products: 5,
      attributes: 4,
    },
    {
      key: "6",
      family_name: "Product Image",
      products: 5,
      attributes: 4,
    }, {
      key: "7",
      family_name: "Color",
      products: 5,
      attributes: 4,
    },
    {
      key: "8",
      family_name: "Size",
      products: 5,
      attributes: 4,
    },

  ]

  const customColumns = [
    {
      title: "FAMILY NAME",
      dataIndex: "family_name",
      key: "family_name",
      width: 300,
      render: (text: string) => (
    <span
      onClick={() => navigate(`/productfamily/edit`)}
      className="cursor-pointer"
    >
      {text}
    </span>
  ),
    },
    {
      title: "PRODUCTS",
      dataIndex: "products",
      key: "products",
      width: 120,
      render: (text: string) => (
        <div className="flex items-center gap-1 w-[3rem] border border-[#ded2df] border-solid justify-center">

          <span className="border-r border-solid border-[#ded2df] w-[1.2rem]">{text}</span>
          <Tooltip title="View All Products" placement="bottom">
            <IoEyeOutline onClick={() => setIsProductModalOpen(true)} />

          </Tooltip>

        </div>
      ),
    },
    {
      title: "ATTRIBUTES",
      dataIndex: "attributes",
      key: "attributes",
      width: 120,
      render: (text: string) => (
        <div className="flex items-center gap-1 w-[3rem] border border-[#ded2df] border-solid justify-center">

          <span className="border-r border-solid border-[#ded2df] w-[1.2rem]">{text}</span>
          <Tooltip title="View All Attributes" placement="bottom">
            <IoEyeOutline onClick={openModal} />

          </Tooltip>
        </div>
      ),

    },
    {
      title: "",
      key: "actions",
      width: 10,
      render: (_: any, record: any) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleMenuClick(key, record)}
            className="font-normal text-[11px] text-[#828282]"
            items={[
              {
                key: "edit",
                label: (
                  <Link to="/productfamily/edit" className="flex items-center gap-2">
                    <FaEdit />
                    <span>Edit Family</span>
                  </Link>
                ),
              },
              { label: "Visibility", key: "visibility", icon: <span>👁️</span> },
              { label: "Import Family Data", key: "import" },
              { label: "Delete Family", key: "delete", danger: true },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ]

  useEffect(() => {
    setTopbar({
      createButtonLabel: "CREATE FAMILY",
      showCreateButton: true,
      showViewButton: false,
      showFilter: true,
      filterOptions: ["Filter Options", "Active", "Archived"],
      showSearch: true,
      searchPlaceholder: "Search Family",
      searchValue: search,
      onSearchChange: setSearch,
      searchBarWidth: 540,
    });

    return () => {
      resetTopbar();
    };
  }, [search]);

  return (
    <div className="flex flex-col px-4">
      <CustomTable dataSource={customData} columns={customColumns} showImage={false} />
      <ViewProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
      <ViewAttributeModal/>
    </div>
  )
};

export default ProductFamilies;
