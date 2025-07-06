import React, { useState } from "react";
import CustomTable from "../components/CustomTable";
import { Checkbox } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const customData = [
  { key: "1", property_name: "Price", property_type: "String" },
  { key: "2", property_name: "Color", property_type: "String" },
];

const customColumns = [
  { title: "Property Name", dataIndex: "property_name", key: "property_name", width: 200 },
  { title: "Property Type", dataIndex: "property_type", key: "property_type", width: 200 },
];

const ProductConfigurationPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <div className="py-2 w-full overflow-hidden">
      {selectedRowKeys.length > 0 && (
        <div className="flex flex-row items-center px-4 gap-4 mb-4">
          <Checkbox
            className="flex items-center"
            checked={selectedRowKeys.length === customData.length}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRowKeys(customData.map((item) => item.key));
              } else {
                setSelectedRowKeys([]);
              }
            }}
          >
            <span className="text-sm text-gray-700 font-medium ml-2">Select All</span>
          </Checkbox>

          <button className="flex items-center space-x-1 text-sm font-normal">
            <PlusOutlined className="text-base" />
            <span>Add to Group</span>
          </button>

          <button
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
            aria-label="Delete selected items"
            onClick={() => {
              // handle delete here (optional)
              console.log("Delete selected", selectedRowKeys);
            }}
          >
            <DeleteOutlined className="text-lg" />
          </button>
        </div>
      )}

      <CustomTable
        dataSource={customData}
        columns={customColumns}
        showImage={false}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
};

export default ProductConfigurationPage;
