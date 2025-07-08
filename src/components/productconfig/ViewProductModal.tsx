import React from 'react';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined } from '@ant-design/icons';

interface ProductRow {
  key: React.Key;
  productName: string;
  sku: string;
}

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: ProductRow[];
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  data: propData,
  onClose
}) => {
  const columns: ColumnsType<ProductRow> = [
    {
      title: 'PRODUCT NAME',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
  ];

  const data: ProductRow[] = propData || [
    { key: '1', productName: 'Vintage Sweatshirt', sku: 'SWT-1152' },
    { key: '2', productName: 'Vintage Sweatshirt', sku: 'SWT-1152' },
    { key: '3', productName: 'Vintage Sweatshirt', sku: 'SWT-1152' },
    { key: '4', productName: 'Vintage Sweatshirt', sku: 'SWT-1152' },
    { key: '5', productName: 'Vintage Sweatshirt', sku: 'SWT-1152' },
    { key: '6', productName: 'Color', sku: 'SWT-1152' },
    { key: '7', productName: 'Size', sku: 'Size' },
    { key: '8', productName: 'Weight (kg)', sku: 'SWT-1152' },
    { key: '9', productName: 'Material', sku: 'Material' },
    { key: '10', productName: 'Brand', sku: 'Brand' },
  ];

  return (
    <Modal
      open={isOpen}
      width={500}
      style={{top:"5%"}}
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
        className="w-full custom-product-table"
        rowClassName={() => 'custom-table-row'}
      />
    </Modal>
  );
};

export default ViewProductModal;