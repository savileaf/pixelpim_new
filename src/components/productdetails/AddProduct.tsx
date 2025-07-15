// src/pages/AddProduct.tsx
import React, { useState } from 'react';
import  AttributeSelector  from './AttributeSelector';


const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    name: '',
    sku: '',
    family: '',
    customAttributes: {},
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.sku.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    console.log('✅ Submitted Product:', formData);
    alert('Product added successfully!');
  };

  return (
    <>
      <section className='pb-13'>
        <header>
          <p className='text-2xl font-bold'>Add Product</p>
          <button className='!text-base'>Cancel</button>
        </header>

        <div className="w-[560px] mt-8 mx-auto p-8 bg-[#f2f2f2]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#302E2E]">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Classic Denim Jacket"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                maxLength={100}
                className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#302E2E]">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., CJ-1023-BLU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
                className="w-full px-3 h-10 py-1 border border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            {/* Product Family */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#302E2E]">
                Product Family (Optional)
              </label>
              <select
                name="Select Product Family"
                value={formData.family}
                onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                className="w-full px-3 h-10 py-1 border  border-[#898989] !rounded-[2px] focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="" disabled hidden>
                  Select Product Family
                </option>
                <option value="family1">Family 1</option>
                <option value="family2">Family 2</option>
              </select>

            </div>

            {/* Custom Attribute Logic */}
            <AttributeSelector formData={formData} setFormData={setFormData} />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Add Product Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="bg-[#2ECC71] hover:bg-[#52e790] text-white px-6 py-2 rounded-sm w-full transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
