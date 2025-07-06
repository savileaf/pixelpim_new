import React, { useState } from 'react';
import { Modal, Input, Button, List, Typography } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useColumns } from '../context/ColumnContext';

interface CustomiseColumnModalProps {
  visible: boolean;
  onCancel: () => void;
}

const CustomiseColumnModal: React.FC<CustomiseColumnModalProps> = ({
  visible,
  onCancel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { columns, addColumn, removeColumn } = useColumns();

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const predefinedAttributes = [
    { key: 'price', name: 'Price' },
    { key: 'currency', name: 'Currency' },
    { key: 'availableStock', name: 'Available Stock' },
    { key: 'launchDate', name: 'Launch Date' },
    { key: 'is_active', name: 'Is Active' },
  ];

  const filteredPredefinedAttributes = predefinedAttributes.filter(
    (attr) =>
      attr.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !columns.some((col) => col.key === attr.key)
  );

  const handleAddAttribute = (attribute: { key: string; name: string }) => {
    addColumn(attribute.name, attribute.key);
    setSearchTerm('');
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ color: '#eee',marginLeft:"10px", fontSize: '18px', fontWeight: 'bold' , backgroundColor:"#575657" }}>
          CUSTOMIZE COLUMNS
        </Typography.Text>
      }
      className='ant-modal-content'
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={onCancel} block style={{
          backgroundColor: '#03a9f4',
          borderColor: '#03a9f4',
          color: '#fff',
          height: '40px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop:"0"
        }}>
          Save Changes
        </Button>,
      ]}
      width={400}
      bodyStyle={{
        padding: '0px',
        backgroundColor: '#575657',
        borderTop: '1px solid #444',
      }}
      closeIcon={true}
      style={{ top: 5 }}
      // headStyle={{
      //   backgroundColor: '#575657',
      //   borderBottom: '1px solid #444',
      //   padding: ' 0px', 
      //   width:"full"
      // }}
      maskClosable={false}
    >
      <div style={{ marginBottom: '0px', padding: '0 10px', marginTop:"0" }}> 
        <List
          dataSource={sortedColumns}
          renderItem={(column) => (
            <List.Item
              key={column.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderBottom: '1px solid #444',
                marginBottom: '-1px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    cursor: 'grab',
                    marginRight: '12px',
                    color: '#999',
                    fontSize: '16px',
                  }}
                >
                  &#x2261;
                </span>
                <Typography.Text style={{ flexGrow: 1, color: '#eee' }}>
                  {column.name}
                </Typography.Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {column.key === 'sku' ? (
                  <Typography.Text type="danger" style={{ fontSize: '0.8em', color: '#f5222d' }}>
                    Not Customizable
                  </Typography.Text>
                ) : (
                  column.key !== 'product_name' &&
                  column.key !== 'sku' &&
                  column.key !== 'product_description' &&
                  (
                    <CloseOutlined
                      onClick={() => removeColumn(column.key)}
                      style={{ cursor: 'pointer', color: '#eee', fontSize: '16px' }}
                    />
                  )
                )}
              </div>
            </List.Item>
          )}
          style={{ padding: 0 }}
          bordered={false}
        />
      </div>


      <div style={{ padding: '10px' }}>
        <Typography.Paragraph style={{ marginBottom: '8px', fontWeight: 500, color: '#eee' }}>
          Add Attribute to Column
        </Typography.Paragraph>
        <Input
          placeholder="Search Property Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: '16px',
            backgroundColor: 'white',
            color: 'black',
            borderColor: '#333',
            borderRadius: '4px',
            height: '40px',
          }}
        />
        <List
          dataSource={filteredPredefinedAttributes}
          renderItem={(item) => (
            <List.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0', 
                borderBottom: 'none',
              }}
            >
              <Typography.Text style={{ color: '#eee' }}>{item.name}</Typography.Text>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => handleAddAttribute(item)}
                style={{ color: '#03a9f4' }}
              />
            </List.Item>
          )}
          style={{ padding: 0 }}
          bordered={false}
          className="add-attribute-list"
        />
      </div>
    </Modal>
  );
};

export default CustomiseColumnModal;