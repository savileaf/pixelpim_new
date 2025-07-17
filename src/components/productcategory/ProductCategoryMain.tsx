import { useEffect, useState } from "react";
import { useResetProductTopbar, useSetProductTopbar } from "../../context/ProductTopbarContext";
import CustomTable from "../CustomTable";
import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { ProductCategoryTree } from "./ProductCategoryTree";
import CreateCategoryModal from "./CreateCategoryModal";


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
  {
    name: 'Home Appliances',
    children: [
      { name: 'Refrigerators', count: 10 },
      { name: 'Microwaves', count: 8 },
      { name: 'Washing Machines', count: 6 },
      { name: 'Air Conditioners', count: 5 }
    ]
  },
  {
    name: "Men's Clothing",
    children: [
      { name: 'T-Shirts', count: 30 },
      { name: 'Jeans', count: 20 },
      { name: 'Jackets', count: 10 },
      { name: 'Shoes', count: 18 }
    ]
  },
  {
    name: "Women's Footwear",
    children: [
      { name: 'Flats', count: 12 },
      { name: 'Heels', count: 10 },
      { name: 'Sneakers', count: 7 },
      { name: 'Sandals', count: 9 }
    ]
  },
  {
    name: 'Beauty & Personal Care',
    children: [
      { name: 'Skincare', count: 22 },
      { name: 'Haircare', count: 15 },
      { name: 'Makeup', count: 18 },
      { name: 'Fragrances', count: 11 }
    ]
  }
];
  const customColumns = [
    {
      title: "Category NAME",
      dataIndex: "category_name",
      key: "category_name",
      width: 330,
      render: (text:string)=>{
        return(
          <div className="flex items-center justify-between">
          <span>{text}</span>
          <FaExternalLinkAlt color="blue"/>
        </div>
        )
      }
    },
    {
      title: "TOTAL PRODUCTS",
      dataIndex: "total_products",
      key: "total_products",
      width: 100,
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
                label: (
                  <Link to={`/edit/product/category`} className="flex items-center gap-1">
                    <FaEdit />
                    Edit Group
                  </Link>
                ),
                key: "edit",
              },
              { label: "Visibility", key: "visibility", icon: <span>👁️</span> },
              { label: "Import Group Data", key: "import" },
              { label: "Delete Group", key: "delete", danger: true },
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
  ];

  // CREATING CATEGORY OPEN MODAL
  

  // CALCULATING THE TOTAL NUMBER OF PRODUCTS IN EACH CATEGORY
  const calculateTotalProducts = (node) => {
  if (!node.children || node.children.length === 0) {
    return node.count || 0;
  }

  return node.children.reduce((sum, child) => {
    return sum + calculateTotalProducts(child);
  }, 0);
};
   const handleMenuClick = (key: string, record: any) => {
    console.log(`Action: ${key}`, record);
  };



const ProductCategoryMain = () => {
  const setTopbar = useSetProductTopbar();
  const resetTopbar = useResetProductTopbar();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Manage modal visibility
  const [categoriesList, setCategoriesList] = useState(categories);
  useEffect(() => {
    setTopbar({
      createButtonLabel: "CREATE CATEGORIES",
      createButtonWidth: 210,
      showCreateButton: true,
      showViewButton: false,
      showFilter: true,
      filterOptions: ["Filter Options", "Active", "Archived"],
      showSearch: true,
      searchPlaceholder: "Search Family",
      searchBarWidth: 500,
      onCreateClick: () => setIsCreateModalOpen(true), 
    });

    return () => {
      resetTopbar();
    };
  }, []);

    const handleCreateCategory = (groupName: string) => {
    const newCategory = {
      name: groupName,
      children: [],
    };
    setCategoriesList((prev) => [...prev, newCategory]);
    setIsCreateModalOpen(false);
  };
    // DATA SEND TO THE CUSTOM TABLE 
const customData = categoriesList.map((category, index) => ({
    key: index.toString(),
    category_name: <ProductCategoryTree data={[category]} />,
    total_products: calculateTotalProducts(category),
  }));

  return (
    <div className="px-4">
      <CustomTable dataSource={customData} columns={customColumns} showImage={false} />
      {isCreateModalOpen && (
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateCategory={handleCreateCategory}
        />
      )}
    </div>
  );
};

export default ProductCategoryMain;