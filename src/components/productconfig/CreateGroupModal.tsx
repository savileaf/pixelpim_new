import React, { useState } from 'react';
import { Modal, Input, Button, Checkbox } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';

interface Attribute {
  id: string;
  name: string;
  selected: boolean;
}

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (group: { attributes: string[] }) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, onClose, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attributes, setAttributes] = useState<Attribute[]>([
    { id: '1', name: 'Price', selected: false },
    { id: '2', name: 'Currency', selected: false },
    { id: '3', name: 'Available Stock', selected: false },
    { id: '4', name: 'Launch Date', selected: false },
    { id: '5', name: 'Is Active', selected: false },
    { id: '6', name: 'Product Images', selected: false },
    { id: '7', name: 'Color', selected: false },
  ]);

  const filteredAttributes = attributes.filter(attr =>
    attr.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = attributes.filter(attr => attr.selected).length;

  const handleCheckboxChange = (id: string) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === id ? { ...attr, selected: !attr.selected } : attr
      )
    );
  };

  const handleSubmit = () => {
    const selectedAttributes = attributes
      .filter(attr => attr.selected)
      .map(attr => attr.name);

    if (selectedAttributes.length === 0) {
      alert("Please select at least one attribute.");
      return;
    }

    onSave({ attributes: selectedAttributes });

    // Reset state
    setSearchTerm('');
    setAttributes(prev =>
      prev.map(attr => ({ ...attr, selected: false }))
    );
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={400}
      style={{ top: '10%' }}
      bodyStyle={{ backgroundColor: "#eeeeee" }}
      className="create-group-modal"
    >
      <div className="relative p-6">
        <button onClick={onClose} className="absolute top-3 right-4">
          <IoCloseOutline className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search Property Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: '30px' }}
          />
        </div>

        {/* Attribute List Header */}
        <div className="mb-2 pl-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            ATTRIBUTE NAME
            {selectedCount > 0 && (
              <span className="text-xs text-gray-500 ml-2">
                ({selectedCount} selected)
              </span>
            )}
          </h3>
        </div>

        {/* Attribute List */}
        <div className="space-y-1 mb-6 overflow-y-auto pr-2 max-h-[200px]">
          {filteredAttributes.map((attribute) => (
            <div key={attribute.id}>
              <div className="flex gap-4 items-center py-2">
                <Checkbox
                  checked={attribute.selected}
                  onChange={() => handleCheckboxChange(attribute.id)}
                  className="mr-3"
                />
                <span className="text-base text-gray-800">{attribute.name}</span>
              </div>
              <hr className="w-full text-gray-400" />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <Button
          type="primary"
          block
          size="large"
          className="rounded-md"
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          onClick={handleSubmit}
        >
          Create Group ({selectedCount})
        </Button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
