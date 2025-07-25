import React, { useState } from "react";
import { Table as AntTable, Checkbox, Dropdown, Menu, ConfigProvider } from "antd";
import { GoSortDesc } from "react-icons/go";
import { FaImage } from "react-icons/fa6";
import TruncateWithTooltip from "./TruncateWithTooltip";
import CustomiseColumnModal from "./CustomiseColumnModal";
import { useColumns } from "../context/ColumnContext";
import type { ColumnsType } from "antd/es/table";

interface ScrollConfig {
  x?: number | string;
  y?: number | string;
}

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
    image: "/images/mouse.jpg",
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
  {
    key: "3",
    image: "/images/mouse.jpg",
    product_name: "Wireless Mouse",
    product_description: "Ergonomic wireless mouse with long battery life.",
    sku: "WM123",
    varients: "3",
  },
  {
    key: "4",
    image: "/images/keyboard.jpg",
    product_name: "Gaming Keyboard",
    product_description: "Mechanical keyboard with RGB lights.",
    sku: "GK456",
    varients: "5",
  },
  {
    key: "5",
    image: "/images/mouse.jpg",
    product_name: "Wireless Mouse",
    product_description: "Ergonomic wireless mouse with long battery life.",
    sku: "WM123",
    varients: "3",
  },
  {
    key: "6",
    image: "/images/keyboard.jpg",
    product_name: "Gaming Keyboard",
    product_description: "Mechanical keyboard with RGB lights.",
    sku: "GK456",
    varients: "5",
  },
  {
    key: "7",
    image: "/images/mouse.jpg",
    product_name: "Wireless Mouse",
    product_description: "Ergonomic wireless mouse with long battery life.",
    sku: "WM123",
    varients: "3",
  },
  {
    key: "8",
    image: "/images/keyboard.jpg",
    product_name: "Gaming Keyboard",
    product_description: "Mechanical keyboard with RGB lights.",
    sku: "GK456",
    varients: "5",
  }

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
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>;


  rowHeight?: number;
  onRow?: (record: DataType, index?: number) => React.HTMLAttributes<HTMLElement>;
  scroll?: ScrollConfig;
}

const CustomTable: React.FC<CustomTableProps> = ({
  dataSource,
  columns: propColumns,
  isModalVisible = false,
  setIsModalVisible = () => { },
  // isFilterVisible = false,
  showImage = true,
  headerBgColor,
  selectedRowKeys,
  setSelectedRowKeys: parentSetSelectedRowKeys,
  rowHeight,
  onRow,
  scroll = { x: 'max-content', y: 400 }
}) => {
  const { columns: contextColumns } = useColumns();
  const [sortOption, setSortOption] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useState<React.Key[]>([]);

  const selectedKeys = selectedRowKeys ?? localSelectedRowKeys;
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
        return (text: string) => <TruncateWithTooltip text={text} maxWidth={200} />;
      case 'product_description':
        return (text: string) => <TruncateWithTooltip text={text} maxWidth={300} />;
      default:
        return (text: string) => text;
    }
  };

  const dynamicColumns = propColumns ||
    contextColumns
      .filter(col => col.visible)
      .map(col => {
        let width;

        if (col.key === "product_name") {
          width = 250;
        } else if (col.key === "product_description") {
          width = 350;
        } else {
          width = 120;
        }

        return {
          title: col.name,
          dataIndex: col.key,
          key: col.key,
          className: "font-normal text-[12px] text-[#2d2b2b]",
          render: getColumnRender(col.key),
          width,
          ellipsis: col.key !== "product_name" && col.key !== "product_description",
          onCell: () => ({
            style: width === 120 ? {
              maxWidth: 120,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            } : {}
          }),
        };
      });




  const tableColumns: ColumnsType<DataType> = [
    {
      title: (
        <Dropdown
          overlay={sortMenu}
          trigger={["click"]}
          open={dropdownVisible}
          onOpenChange={setDropdownVisible}
        >
          <div className="flex items-center justify-center cursor-pointer" onClick={handleSortClick} style={{width: 20 , maxWidth:20}}>
            <GoSortDesc size={20} />
            {dropdownVisible && <span className="ml-1 text-xs">{sortOption}</span>}
          </div>
        </Dropdown>
      ),
      dataIndex: 'key',
      key: 'checkbox',
      width: 30,
      fixed: 'left' as const,
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
            <img src={image} alt="Product" className="w-10 h-10 shadow-[2px_3px_5px_0_rgba(56,56,56,1)]" />
          ) : (
            "-"
          ),
      }]
      : []),
    ...dynamicColumns,
  ];

  const rowLimitBeforeScroll = 6;
const shouldScrollY = data.length > rowLimitBeforeScroll;

const resolvedScroll: ScrollConfig = {
  x: scroll?.x ?? 'max-content',
  y: shouldScrollY ? scroll?.y ?? 400 : undefined, // Only apply y-scroll if needed
};

  return (
    <div className="py-2 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full">
          <div className={"w-full rounded-none"}>
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 0,
                },
              }}
            >
              <AntTable
                columns={tableColumns}
                dataSource={data}
                pagination={false}
                className="w-full custom-table"
                rowClassName={() => "no-select-highlight"}
                rowKey="key"
                onRow={onRow}
                scroll={resolvedScroll}
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
            </ConfigProvider>
          <p className="text-[12px] ms-1 text-[#7c7387] mt-1"> <span className="font-semibold"> {data.length}</span> Products</p>
          </div>
          <div className="py-2">
            <CustomiseColumnModal
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;