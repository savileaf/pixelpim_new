// components/GlobalModal.tsx
import React,{useState} from 'react';
import AttributeSelector from '../../components/productdetails/AttributeSelector'; 

interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  headers: string[];
  rows: any[][];
}

interface OptionType {
  label: string;
  value: string;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ isOpen, onClose, headers, rows }) => {

  const [mappedAttributes, setMappedAttributes] = useState<Record<string, OptionType | null>>({});
  const [addAsNew, setAddAsNew] = useState<Record<string, boolean>>({});
  

  const handleMappingChange = (title: string, selected: OptionType | null) => {
    setMappedAttributes(prev => ({ ...prev, [title]: selected }));
  };

  const handleAddAsNewToggle = (title: string, checked: boolean) => {
    setAddAsNew(prev => ({ ...prev, [title]: checked }));
  };
  
  const allSystemAttributes = [
    { label: 'Product Name', value: 'name' },
    { label: 'SKU', value: 'sku' },
    { label: 'Category', value: 'category' },
    { label: 'Brand', value: 'brand' },
    { label: 'Color', value: 'color' },
  ];


  if (!isOpen) return null;

return (
  <div style={styles.overlay}>
    <div className="flex flex-wrap relative min-h-[400px] gap-y-0 bg-[#DBD9D9] w-[95%] h-[95%]  rounded-md" style={styles.modal}>
      
      {/* LEFT: Header Mapping */}
      <div className="w-[44%] p-5 border-r border-[#868686] overflow-y-auto max-h-[calc(95vh-120px)]">
        <h5 className="font-bold text-sm text-black mb-4">Connect Your Column Titles with System Attributes</h5>
        {headers.map((header, i) => (
          <div key={i}>
            <AttributeSelector
              title={header}
              attributes={allSystemAttributes}
              selected={mappedAttributes[header] || null}
              addAsNewChecked={addAsNew[header] || false}
              onChange={(selected) => handleMappingChange(header, selected)}
              onAddNewToggle={(checked) => handleAddAsNewToggle(header, checked)}
            />
          </div>
        ))}
      </div>

      {/* RIGHT: Preview */}
      <div className="w-[56%] p-5 overflow-auto max-h-[calc(95vh-120px)] flex-grow">
        <h5 className="font-bold text-sm text-black mb-4">Your Data Preview</h5>
        {rows.length > 0 ? (
          <div className="overflow-auto max-h-[400px] bg-white border border-gray-300 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="p-2 border border-gray-300 bg-gray-100">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((_, colIndex) => (
                      <td key={colIndex} className="p-2 border border-gray-300">
                        {row[colIndex] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No preview data available.</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full border-t border-[#868686] px-5 py-3">
        <div className="flex gap-2 items-center">
          <input type="checkbox" />
          <p className="font-normal text-xs text-[#1b0c31]">
            Note: If the SKU in the imported data matches an existing SKU, update the existing product information.
          </p>
        </div>
        <button className="bg-[#2ECC71] text-white px-4 py-2 rounded-md text-[14px]">Import Data</button>
      </div>

      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 text-sm bg-gray-200 px-2 py-1 rounded">Close</button>
    </div>
  </div>
);

};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
};

export default GlobalModal;
