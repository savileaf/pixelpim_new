import React from 'react';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined } from '@ant-design/icons';

interface ProductRow {
  key: React.Key;
  attributeName: string;
}

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: ProductRow[];
}

const ViewAttributeModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  data: propData,
  onClose
}) => {
  const columns: ColumnsType<ProductRow> = [
    {
      title: 'ATTRIBUTE NAME',
      dataIndex: 'attributeName',
      key: 'attributeName',
      render: (text: string) => <span>{text}</span>,
    },
    
  ];

 const data: ProductRow[] = propData || [
  { key: "1", attributeName: "Price" },
  { key: "2", attributeName: "Currency" },
  { key: "3", attributeName: "Color" },
  { key: "4", attributeName: "Size" },
  { key: "5", attributeName: "Material" },
  { key: "6", attributeName: "Weight" },
  { key: "7", attributeName: "Dimensions" },
  { key: "8", attributeName: "Brand" },
  { key: "9", attributeName: "Model Number" },

];
  return (
    <Modal
      open={isOpen}
      width={300}
      style={{top:"10%"}}
      footer={null}
      onCancel={onClose}
      closable={true}
      closeIcon={<CloseOutlined style={{ color: 'black', fontSize: 16 }} />}

    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="w-full custom-product-table bg-[#eeeeee]"
        rowClassName={() => 'custom-table-row'}
      />
    </Modal>
  );
};

export default ViewAttributeModal;