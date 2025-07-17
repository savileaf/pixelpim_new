import React, { useState } from "react";
import { Table as AntTable, Checkbox, Dropdown, Menu } from "antd";
import { GoSortDesc } from "react-icons/go";
import { FaImage } from "react-icons/fa6";
import TruncateWithTooltip from "./TruncateWithTooltip";
import FilterData from "./FilterData";
import CustomiseColumnModal from "./CustomiseColumnModal";
import { useColumns } from "../context/ColumnContext";
import type { ColumnsType } from "antd/es/table";
import {useNavigate} from "react-router-dom";

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
    image: "/images/download.png",
    product_name: "Wireless Mouse",
    product_description: "Ergonomic wireless mouse with long battery life.",
    sku: "WM123",
    varients: "3",
  },
  {
    key: "2",
    image: "/images/keyboard.jpg",
    product_name: "Gaming Keyboard",
    product_description: "Mechanical keyboard with RGB lights.",
    sku: "GK456",
    varients: "5",
  },
];

interface CustomTableProps {
  dataSource?: DataType[];
  columns?: ColumnsType<DataType>;
  isModalVisible?: boolean;
  setIsModalVisible?: (visible: boolean) => void;
  isFilterVisible?: boolean;
  showImage?: boolean;
  headerBgColor?: string;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: (keys: React.Key[]) => void;
  rowHeight?: number;
   onRow?: (record: DataType, index?: number) => React.HTMLAttributes<HTMLElement>;
}

const CustomTable: React.FC<CustomTableProps> = ({
  dataSource,
  columns: propColumns,
  isModalVisible = false,
  setIsModalVisible = () => { },
  isFilterVisible = false,
  showImage = true,
  headerBgColor,
  selectedRowKeys: parentSelectedRowKeys,
  setSelectedRowKeys: parentSetSelectedRowKeys,
  rowHeight,
  onRow
}) => {
  const { columns: contextColumns } = useColumns();
  const [sortOption, setSortOption] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  const selectedKeys = parentSelectedRowKeys ?? localSelectedRowKeys;
  const updateSelectedKeys = parentSetSelectedRowKeys ?? setLocalSelectedRowKeys;

  const data = dataSource ?? defaultData;

  const handleSortClick = () => setDropdownVisible(!dropdownVisible);

  const handleMenuClick = (e: { key: string }) => {
    setSortOption(e.key);
    setDropdownVisible(false);
  };

  const sortMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Ascending">Ascending</Menu.Item>
      <Menu.Item key="Descending">Descending</Menu.Item>
      <Menu.Item key="Oldest">Oldest</Menu.Item>
      <Menu.Item key="Newest">Newest</Menu.Item>
    </Menu>
  );



  const getColumnRender = (key: string) => {
    switch (key) {
      case 'product_name':
        return (text: string, record: DataType) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/productdetails/basic-info`)} 
        >
          <TruncateWithTooltip text={text} maxWidth={200} />
        </span>
      );
      case 'product_description':
        return (text: string) => <TruncateWithTooltip text={text} maxWidth={300} />;
      default:
        return (text: string) => text;
    }
  };

  const dynamicColumns = propColumns ||
    contextColumns
      .filter(col => col.visible)
      .map(col => ({
        title: col.name,
        dataIndex: col.key,
        key: col.key,
        className: "font-normal text-[12px] text-[#2d2b2b]",
        render: getColumnRender(col.key),
      
      }));

  const tableColumns: ColumnsType<DataType> = [
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
      // fixed: 'left' as const,
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selectedKeys.includes(record.key)}
            onChange={(e) => {
              if (e.target.checked) {
                updateSelectedKeys([...selectedKeys, record.key]);
              } else {
                updateSelectedKeys(selectedKeys.filter((k) => k !== record.key));
              }
            }}
          />
        </div>
      ),
    },
    ...(showImage
      ? [{
        title: <FaImage size={18} />,
        dataIndex: 'image',
        key: 'image',
        width: 60,
        render: (image?: string) =>
          image ? (
            <img src={image} alt="Product" className="w-full h-8 object-cover rounded shadow" />
          ) : (
            "-"
          ),
      }]
      : []),
    ...dynamicColumns,
  ];

  return (
    <div className="py-2 w-full overflow-hidden">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full">
          <div className={`${isFilterVisible ? "w-[calc(100%-16rem)]" : "w-full"}`}>
            <AntTable
              columns={tableColumns}
              dataSource={data}
              pagination={false}
              className="w-full custom-table"
              rowClassName={() => "no-select-highlight"}
              rowKey="key"
              scroll={{y:420 , x:"max-content"}}
              onRow={onRow}
              style={
                headerBgColor
                  ? ({ "--custom-table-header-bg": headerBgColor } as React.CSSProperties)
                  : undefined
              }
              // ADJUST THE HEIGHT OF THE ROW HEIGHT
              components={{
                
                body: {
                  row: (props) => (
                    <tr {...props} style={{ ...props.style, height: `${rowHeight}px` }}>
                      {props.children}
                    </tr>
                  ),
                },
              }}
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
    </div>
  );
};

export default CustomTable;
