// src/components/AttributeSelector.tsx
import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { CiText } from "react-icons/ci";
import { BsTextParagraph } from "react-icons/bs";
import {
  AiOutlineFieldNumber,
  AiOutlineUnorderedList,
  AiOutlineHtml5,
  AiOutlineLink,
  AiOutlineCalendar,
  AiOutlineCheckSquare,
  AiOutlineClose,
} from 'react-icons/ai';

// Attribute Types with icons
const ATTRIBUTE_TYPES = [
  { name: 'Short Text', icon: <CiText size={16} /> },
  { name: 'Paragraph', icon: <BsTextParagraph size={16} /> },
  { name: 'HTML', icon: <AiOutlineHtml5 size={16} /> },
  { name: 'Integer', icon: <AiOutlineFieldNumber size={16} /> },
  { name: 'Decimal', icon: <AiOutlineFieldNumber size={16} /> },
  { name: 'Dropdown', icon: <AiOutlineUnorderedList size={16} /> },
  { name: 'Multiselect', icon: <AiOutlineCheckSquare size={16} /> },
  { name: 'Date', icon: <AiOutlineCalendar size={16} /> },
  { name: 'URL', icon: <AiOutlineLink size={16} /> },
  { name: 'Boolean', icon: <AiOutlineCheckSquare size={16} /> },
] as const;

export type AttributeType = typeof ATTRIBUTE_TYPES[number]['name'];

interface AttributeSelectorProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

 const AttributeSelector: React.FC<AttributeSelectorProps> = ({ formData: _formData, setFormData: _setFormData }) => {
  const [selectedType, setSelectedType] = useState<AttributeType | ''>('');
  const [multiselectOptions, setMultiselectOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [attributeName, setAttributeName] = useState(''); // ✅ <-- this line


  // Handles input display per attribute type
  const renderInputField = (type: AttributeType) => {
    switch (type) {
      case 'Short Text':
        return (
          <input
            type="text"
            className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter value (e.g. Product name)"
          />
        );

      case 'Paragraph':
        return (
          <textarea
            className="w-full px-3 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter a detailed description (e.g. This product is made of 100% organic cotton...)"
            rows={4} // Optional: adds better height
          />
        );

      case 'HTML':
        return <textarea className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400" />;
      case 'Integer':
        return <input type="number" className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400" placeholder="Enter an integer (e.g. 10, 42)" />;
      case 'Decimal':
        return <input type="number" step="0.01" className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400" placeholder="Enter a decimal value (e.g. 3.14, 99.99)"/>;

      case 'Dropdown':
        return (
          <div>
            {/* Input to add dropdown options */}
            <input
              type="text"
              style={{ padding: "4px 10px" }}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Add dropdown option and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  e.preventDefault();
                  if (!multiselectOptions.includes(inputValue.trim())) {
                    setMultiselectOptions([...multiselectOptions, inputValue.trim()]);
                    setInputValue('');
                  }
                }
              }}
            />


            {/* Display added options as removable tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {multiselectOptions.map((opt, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {opt}
                  <AiOutlineClose
                    className="cursor-pointer text-green-600"
                    onClick={() =>
                      setMultiselectOptions(multiselectOptions.filter((_, i) => i !== idx))
                    }
                  />
                </span>
              ))}
            </div>

          </div>
        );

      case 'Multiselect':
        return (
          <div className="space-y-2">
            {/* Attribute Name Input (e.g., Color) */}
            {/* <input
              type="text"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              placeholder="Attribute name (e.g. Color)"
              className="w-full border px-3 py-2 rounded-md"
            /> */}

            {/* Add option input */}
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Add multiselect option and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  e.preventDefault();
                  if (!multiselectOptions.includes(inputValue.trim())) {
                    setMultiselectOptions([...multiselectOptions, inputValue.trim()]);
                  }
                  setInputValue('');
                }
              }}
            />


            {/* Chips for added options */}
            <div className="flex flex-wrap gap-2">
              {multiselectOptions.map((opt, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {opt}
                  <AiOutlineClose
                    className="cursor-pointer text-blue-600"
                    onClick={() =>
                      setMultiselectOptions(multiselectOptions.filter((_, i) => i !== idx))
                    }
                  />
                </span>
              ))}
            </div>


          </div>
        );

      case 'Date':
        return <input type="date" className="w-full border px-3 py-2 rounded-md" />;
      case 'URL':
        return <input type="url" className="w-full border px-3 py-2 rounded-md" />;
      case 'Boolean':
        return (
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" />
            <span>True / False</span>
          </label>
        );
      default:
        return null;
    }
  };

  const getAttributePlaceholder = (type: AttributeType) => {
  switch (type) {
    case 'Short Text':
      return 'Attribute name (e.g. Title, Brand)';
    case 'Dropdown':
    case 'Multiselect':
      return 'Attribute name (e.g. Size, Material)';
    case 'Integer':
    case 'Decimal':
      return 'Attribute name (e.g. Quantity, Weight)';
    case 'Date':
      return 'Attribute name (e.g. Launch Date)';
    case 'Boolean':
      return 'Attribute name (e.g. In Stock, Available)';
    case 'URL':
      return 'Attribute name (e.g. Product Link)';
    case 'HTML':
    case 'Paragraph':
      return 'Attribute name (e.g. Description)';
    default:
      return 'Attribute name';
  }
};


  return (
    <div className="space-y-4 mt-6">
      <label className="block text-sm font-medium mb-2 text-[#302E2E]">{`Add Custom Attribute (Optional)`}</label>

      {/* Custom dropdown with icon + text */}
      <div className="w-full relative">
        <div
          className="flex justify-start items-center cursor-pointer w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedType ? (
            <div className="flex items-center gap-2">
              {ATTRIBUTE_TYPES.find((t) => t.name === selectedType)?.icon}
              <span>{selectedType}</span>
            </div>
          ) : (

            <p className="flex justify-between items-center w-full">
              <span className="text-gray-400">Select attribute type first</span>
              <span>
                {showDropdown ? <IoIosArrowUp  size={14} /> : <IoIosArrowDown  size={14} />}
              </span>
            </p>
          )}
        </div>

        {showDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-sm shadow-lg max-h-60 overflow-y-auto">
            {ATTRIBUTE_TYPES.map(({ name, icon }) => (
              <div
                key={name}
                onClick={() => {
                  setSelectedType(name);    // Set selected type here
                  setShowDropdown(false);   // Close dropdown immediately
                }}
                className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm cursor-pointer"
              >
                {icon}
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Render input field after selection */}
      {selectedType && (
        <div className="mt-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedType('');
                setMultiselectOptions([]);
                setAttributeName('');
              }}
              className="text-red-500 hover:text-red-700 text-sm mb-2"
            >
              Clear
            </button>
          </div>
          
          {/* Attribute Name */}
          <input
            type="text"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
            placeholder={getAttributePlaceholder(selectedType)}
            className="w-full border px-3 py-2 rounded-md bg-white mb-2"
          />
          
          
          {renderInputField(selectedType)}
        </div>
      )}





    </div>
  );
};

export default AttributeSelector;