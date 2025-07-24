import React from 'react';
import { Modal, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined} from '@ant-design/icons';
import { useAttributeModal } from '../../context/AttributeContext';

interface ProductRow {
  key: React.Key;
  attributeName: string;
}

const ViewAttributeModal: React.FC = () => {
  const { isOpen, data, closeModal} = useAttributeModal();

  const columns: ColumnsType<ProductRow> = [
    {
      title: 'ATTRIBUTE NAME',
      dataIndex: 'attributeName',
      key: 'attributeName',
      render: (text: string) => <span>{text}</span>,
    }
  ];

  return (
    <Modal
      open={isOpen}
      width={400}
      style={{ top: "20%" , left:"10%"  }}
      footer={null}
      onCancel={closeModal}
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
