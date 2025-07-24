import { useEffect, useState } from "react";
import CustomTable from "../CustomTable";
import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import CreateGroupModal from "./CreateGroupModal"; 
import { Link } from "react-router-dom";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import { useSetProductTopbar, useResetProductTopbar } from "../../context/ProductTopbarContext"; // 👈 Add this

const ViewProperty = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibilityState, setVisibilityState] = useState<Record<string, boolean>>({});

  const openCreateGroupModal = () => setIsModalVisible(true);
  const closeCreateGroupModal = () => setIsModalVisible(false);

  const setTopbar = useSetProductTopbar();       // 👈 use context
  const resetTopbar = useResetProductTopbar();   // 👈 optional reset on unmount

  useEffect(() => {
    setTopbar({
      createButtonLabel: "CREATE GROUP",       
      viewButtonLabel: "View Attributes",           
      viewButtonLink: "/product/attribute",    
      showViewButton: true,
      showFilter: true,
      showSearch: true,
      searchPlaceholder: "Search Group",
    });

    return () => {
      resetTopbar(); // 👈 Clean up to avoid affecting other pages
    };
  }, []);

  const handleMenuClick = (key: string, record: any) => {
    if (key === "visibility") {
      setVisibilityState(prev => ({
        ...prev,
        [record.key]: !prev[record.key],
      }));
    }
  };

  const customData = [
  {
    key: "1",
    group_name: "Basic Information",
    total_property: 5,
    property_included: "Product Name , SKU, Product Description",
  },
  {
    key: "2",
    group_name: "Specifications",
    total_property: 4,
    property_included: "Product Name , SKU, Product Description",
  },
  {
    key: "3",
    group_name: "Pricing & Costs",
    total_property: 4,
    property_included: "Product Name , SKU, Product Description",
  },
  {
    key: "4",
    group_name: "Inventory Details",
    total_property: 4,
    property_included: "Product Name , SKU, Product Description",
  },
  {
    key: "5",
    group_name: "Images & Media",
    total_property: 4,
    property_included: "Product Name , SKU, Product Description",
  },
  {
    key: "6",
    group_name: "Variants and Options",
    total_property: 4,
    property_included: "Product Name , SKU, Product Description",
  }
];

  const customColumns = [
    {
      title: "GROUP NAME",
      dataIndex: "group_name",
      key: "group_name",
      width: 200,
      render: (text: string) => (
        <div className="flex items-center gap-1">
          <button
            className="text-xl text-gray-600 hover:text-blue-500"
            onClick={openCreateGroupModal}
          >
            +
          </button>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "TOTAL PROPERTIES",
      dataIndex: "total_property",
      key: "total_property",
      width: 150,
    },
    {
      title: "INCLUDED PROPERTIES",
      dataIndex: "property_included",
      key: "property_included",
      width: 300,
    },
    {
      title: "",
      key: "actions",
      width: 20,
       fixed: "right" as const, 
  className: "actions-column",
      render: (_: any, record: any) => {
        const isVisible = visibilityState[record.key];
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
              {
                label: "Visibility",
                key: "visibility",
                icon: isVisible ? (
                  <MdOutlineToggleOn size={18} />
                ) : (
                  <MdOutlineToggleOff size={18} />
                ),
              },
              { label: "Import Family Data", key: "import" },
              { label: "Delete Family", key: "delete", danger: true },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]} overlayClassName="custom-dropdown-shadow">
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="mt-2">
      <CustomTable dataSource={customData} columns={customColumns} showImage={false} />
      <CreateGroupModal open={isModalVisible} onClose={closeCreateGroupModal} onSave={() => console.log("Group saved")} />
    </div>
  );
};

export default ViewProperty;
