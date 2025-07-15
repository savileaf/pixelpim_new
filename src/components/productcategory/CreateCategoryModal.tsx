// CreateCategoryModal.tsx
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (groupName: string) => void;
}

const CreateCategoryModal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateCategory }) => {
  const [categoryName, setCategoryName] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (categoryName.trim()) {
      onCreateCategory(categoryName.trim());
      setCategoryName('');
    } else {
      console.error('Group name cannot be empty.');
    }
  };

  return (
    <div className="fixed top-[20%] left-[40%] bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e452a] rounded-xl shadow-2xl w-full max-w-sm relative flex flex-col items-center p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-3xl font-bold leading-none hover:text-gray-300"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="w-full mt-8">
          <input
            type="text"
            placeholder="Enter Group Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 mb-2 rounded-lg text-lg text-gray-800 placeholder-gray-500 bg-white"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
