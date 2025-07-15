import { useState } from 'react';
import { BiSolidChevronDownSquare, BiSolidChevronRightSquare } from 'react-icons/bi';

const CategoryNode = ({ node }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-2">
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex items-center gap-2 rounded text-left"
      >
        <span>
          {hasChildren ? (
            open ? <BiSolidChevronDownSquare size={20} color='#b0c7f2'/> : <BiSolidChevronRightSquare size={20} color='#b0c7f2'/>
          ) : (
            <div className="w-4 h-4" />
          )}
        </span>
        <span className="bg-gray-200 text-sm px-2 py-1 rounded">
          {node.name}
        </span>
      </button>

      {/* Render children if open */}
      {open && hasChildren && (
        <div className="ml-2 mt-1 flex flex-col gap-1">
          {node.children.map((child, index) => (
            <CategoryNode key={index} node={child} />
          ))}
        </div>
      )}

      {/* Always show product count if it exists */}
      {node.count && (
        <div className="text-xs text-gray-500 ml-8 mt-1">
          {node.count} Products
        </div>
      )}
    </div>
  );
};

export const ProductCategoryTree = ({ data }) => {
  return (
    <div className="text-sm flex flex-col gap-2">
      {data.map((node, index) => (
        <CategoryNode key={index} node={node} />
      ))}
    </div>
  );
};
