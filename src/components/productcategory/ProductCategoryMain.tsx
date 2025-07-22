import { useEffect, useState } from "react";
import { useResetProductTopbar, useSetProductTopbar } from "../../context/ProductTopbarContext";
import CustomTable from "../CustomTable";
import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { ProductCategoryTree } from "./ProductCategoryTree";
import CreateCategoryModal from "./CreateCategoryModal";

// Define the category node type for your data
type CategoryNodeType = {
  name: string;
  count?: number;
  children?: CategoryNodeType[];
};

// Sample category data with proper typing
const categories: CategoryNodeType[] = [
  {
    name: "Electronics",
    children: [
      {
        name: "Mobile Phones",
        children: [
          {
            name: "Android Phones",
            children: [
              { name: "Samsung", count: 12 },
              { name: "OnePlus", count: 8 },
              { name: "Xiaomi", count: 14 },
            ],
          },
          {
            name: "Iphones",
            count: 10,
          },
        ],
      },
      {
        name: "Laptops",
        children: [
          { name: "Gaming Laptops", count: 7 },
          { name: "Ultrabooks", count: 5 },
          { name: "Business Laptops", count: 6 },
        ],
      },
      {
        name: "Tablets",
        children: [
          { name: "Android Tablets", count: 4 },
          { name: "iPads", count: 9 },
        ],
      },
      
    ],
  },
  
];

// Calculate total products recursively with types
const calculateTotalProducts = (node: CategoryNodeType): number => {
  if (!node.children || node.children.length === 0) {
    return node.count || 0;
  }
  return node.children.reduce((sum: number, child: CategoryNodeType) => {
    return sum + calculateTotalProducts(child);
  }, 0);
};

// Handler for menu clicks
const handleMenuClick = (key: string, record: any) => {
  console.log(`Action: ${key}`, record);
};

const ProductCategoryMain = () => {
  const setTopbar = useSetProductTopbar();
  const resetTopbar = useResetProductTopbar();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState<CategoryNodeType[]>(categories);

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
      // Removed onCreateClick since your TopbarConfig likely doesn't accept it. 
      // Instead, you can add a button with onClick logic inside your topbar UI if needed.
    });

    return () => {
      resetTopbar();
    };
  }, []);

  const handleCreateCategory = (groupName: string) => {
    const newCategory: CategoryNodeType = {
      name: groupName,
      children: [],
    };
    setCategoriesList((prev) => [...prev, newCategory]);
    setIsCreateModalOpen(false);
  };

  // Prepare data for CustomTable
  const customData = categoriesList.map((category, index) => ({
    key: index.toString(),
    category_name: <ProductCategoryTree data={[category]} />,
    total_products: calculateTotalProducts(category),
  }));

  // Table columns with typings
  const customColumns = [
    {
      title: "Category NAME",
      dataIndex: "category_name",
      key: "category_name",
      width: 300,
      render: (text: React.ReactNode) => (
        <div className="flex items-center justify-between">
          {text}
          <FaExternalLinkAlt color="blue" />
        </div>
      ),
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

  return (
    <div className="p-2">
      <CustomTable dataSource={customData} columns={customColumns} showImage={false} scroll={{y:450}}/>
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
