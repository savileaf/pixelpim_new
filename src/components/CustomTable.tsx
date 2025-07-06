import React, { useState } from "react";
import { Table as AntTable, Checkbox, Dropdown, Menu } from "antd";
import { GoSortDesc } from "react-icons/go";
import { FaImage } from "react-icons/fa6";
import TruncateWithTooltip from "./TruncateWithTooltip";
import FilterData from "./FilterData";
import CustomiseColumnModal from "./CustomiseColumnModal";
import { useColumns } from "../context/ColumnContext";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  image?: string;
  product_name?: string;
  product_description?: string;
  sku?: string;
  varients?: string;
  [key: string]: any;
}

const defaultData: DataType[] = [
  {
    key: "1",
    image: "../src/assets/Image.png",
    product_name: "Wireless Mouse",
    product_description: "Ergonomic wireless mouse with long battery life.",
    sku: "WM123",
    varients: "3",
  },
  {
    key: "2",
    image: "../src/assets/Image.png",
    product_name: "Gaming Keyboard",
    product_description: "Mechanical keyboard with RGB lights.",
    sku: "GK456",
    varients: "5",
  },
];

interface CustomTableProps {
  dataSource?: DataType[];
  isModalVisible?: boolean;
  setIsModalVisible?: (visible: boolean) => void;
  isFilterVisible?: boolean;
  showImage?: boolean;
  headerBgColor?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  dataSource,
  isModalVisible = false,
  setIsModalVisible = () => {},
  isFilterVisible = false,
  showImage = true,
  headerBgColor,
}) => {
  const { columns: contextColumns } = useColumns();
  const [sortOption, setSortOption] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data = dataSource ?? defaultData;

  const handleSortClick = () => setDropdownVisible(!dropdownVisible);

  const handleMenuClick = (e: { key: string }) => {
    setSortOption(e.key);
    setDropdownVisible(false);
  };

  const sortMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Ascending">Ascending</Menu.Item>
      <Menu.Item key="Descending">descending</Menu.Item>
      <Menu.Item key="Oldest">Oldest</Menu.Item>
      <Menu.Item key="Newest">Newest</Menu.Item>
    </Menu>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const getColumnRender = (key: string) => {
    switch (key) {
      case 'product_name':
        return (text: string) => <TruncateWithTooltip text={text} maxWidth={200} />;
      case 'product_description':
        return (text: string) => <TruncateWithTooltip text={text} maxWidth={300} />;
      default:
        return (text: string) => text;
    }
  };

  // Generate table columns from context
  const tableColumns: ColumnsType<DataType> = [
    // Combined Sort and Checkbox Column
    {
      title: (
        <Dropdown
          overlay={sortMenu}
          trigger={["click"]}
          open={dropdownVisible}
          onOpenChange={setDropdownVisible}
        >
          <div className="flex items-center justify-center cursor-pointer" onClick={handleSortClick}>
            <GoSortDesc size={20} />
            {dropdownVisible && <span className="ml-1 text-xs">{sortOption}</span>}
          </div>
        </Dropdown>
      ),
      dataIndex: 'key',
      key: 'checkbox',
      width: 60,
      fixed: 'left' as const,
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRowKeys([...selectedRowKeys, record.key]);
              } else {
                setSelectedRowKeys(selectedRowKeys.filter((k) => k !== record.key));
              }
            }}
          />
        </div>
      ),
    },
    // Optional Image Column
    ...(showImage ? [{
      title: <FaImage size={18} />,
      dataIndex: 'image',
      key: 'image',
      width: 60,
      render: (image?: string) => 
        image ? (
          <img src={image} alt="Product" className="w-8 h-8 object-cover rounded shadow" />
        ) : (
          "-"
        ),
    }] : []),
    // Dynamic Columns from Context
    ...contextColumns
      .filter(col => col.visible)
      .map(col => ({
        title: col.name,
        dataIndex: col.key,
        key: col.key,
        className: "font-normal text-[12px] text-[#2d2b2b]",
        render: getColumnRender(col.key),
      })),
  ];

  return (
    <div className="px-4 py-2 w-full overflow-hidden">
      <div className="flex gap-4 w-full">
        <div className={`${isFilterVisible ? "w-[calc(100%-16rem)]" : "w-full"}`}>
          <AntTable
            columns={tableColumns}
            dataSource={data}
            pagination={false}
            className="w-full custom-table"
            rowClassName={() => "no-select-highlight"}
            rowKey="key"
            style={
              headerBgColor
                ? ({ "--custom-table-header-bg": headerBgColor } as React.CSSProperties)
                : undefined
            }
          />
          {isFilterVisible && (
            <div className="mt-12">
              <FilterData />
            </div>
          )}
        </div>
        <CustomiseColumnModal 
          visible={isModalVisible} 
          onCancel={() => setIsModalVisible(false)} 
        />
      </div>
    </div>
  );
};

export default CustomTable;