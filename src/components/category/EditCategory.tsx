import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { MdArrowForwardIos } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import "./editCategory.css";

// Types
interface Subcategory {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const EditCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        {
          id: 2,
          name: "Phones",
          subcategories: [
            { id: 3, name: "Smartphones", subcategories: [] },
            { id: 4, name: "Feature Phones", subcategories: [] },
          ],
        },
        { id: 5, name: "Laptops", subcategories: [] },
      ],
    },
  ]);

  const [collapsedCategories, setCollapsedCategories] = useState<Set<number>>(new Set());
  const [collapsedSubcategories, setCollapsedSubcategories] = useState<Set<number>>(new Set());
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showSubcategoryPopup, setShowSubcategoryPopup] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [activeCategoryId] = useState<number | null>(1);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | null>(null);
  const [activeSubcategoryName, setActiveSubcategoryName] = useState<string | null>("Electronics");

  // Toggle collapse for individual subcategory
  const toggleCollapseSubcategory = (subId: number) => {
    setCollapsedSubcategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subId)) newSet.delete(subId);
      else newSet.add(subId);
      return newSet;
    });
  };

  // Toggle collapse for the main category (Electronics)
  const toggleCollapseCategory = (categoryId: number) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) newSet.delete(categoryId);
      else newSet.add(categoryId);
      return newSet;
    });
  };

  // Add Subcategory (Insert at the top)
  const confirmAddSubcategory = () => {
    if (!newSubcategoryName.trim()) return;

    const newSub: Subcategory = {
      id: Date.now(),
      name: newSubcategoryName.trim(),
      subcategories: [],
    };

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === activeCategoryId && activeSubcategoryId === null) {
          return {
            ...cat,
            subcategories: [newSub, ...cat.subcategories], // Insert at the top
          };
        }

        const updateSubs = (subs: Subcategory[]): Subcategory[] =>
          subs.map((sub) => {
            if (sub.id === activeSubcategoryId) {
              return {
                ...sub,
                subcategories: [newSub, ...(sub.subcategories || [])], // Insert at the top
              };
            }
            return {
              ...sub,
              subcategories: sub.subcategories ? updateSubs(sub.subcategories) : [],
            };
          });

        return {
          ...cat,
          subcategories: updateSubs(cat.subcategories),
        };
      })
    );

    setNewSubcategoryName("");
    setShowSubcategoryPopup(false);
    setActiveSubcategoryId(null);
    setActiveSubcategoryName(null);
  };

  // Update subcategory name
  const updateSubcategoryName = (subId: number, name: string) => {
    const update = (subs: Subcategory[]): Subcategory[] =>
      subs.map((sub) => {
        if (sub.id === subId) return { ...sub, name };
        return {
          ...sub,
          subcategories: sub.subcategories ? update(sub.subcategories) : [],
        };
      });

    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        subcategories: update(cat.subcategories),
      }))
    );
  };


  // Recursive render for subcategories
  const renderSubcategories = (subs: Subcategory[], level: number = 1) =>
    subs.map((sub) => {
      const isCollapsed = collapsedSubcategories.has(sub.id);
      const hasSubcategories = sub.subcategories && sub.subcategories.length > 0;  // Check if it has subcategories

      return (
        <div key={sub.id} style={{ marginLeft: `1.5rem`, marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Always show the icon, but rotate only if there are subcategories */}
            <MdArrowForwardIos
              size={12}
              style={{
                cursor: hasSubcategories ? "pointer" : "default",  // Only clickable if it has subcategories
                transform: hasSubcategories && isCollapsed ? "rotate(90deg)" : "rotate(0deg)",  // Rotate only if has subcategories
                transition: "transform 0.2s",
              }}
              onClick={() => hasSubcategories && toggleCollapseSubcategory(sub.id)}  // Only toggle if it has subcategories
            />
            <input
              className="subcategory-input"
              type="text"
              value={sub.name}
              onChange={(e) => updateSubcategoryName(sub.id, e.target.value)}
            />
            <AiOutlinePlus onClick={() => openAddSubPopup(sub.id, sub.name)} />
          </div>
          {/* Only render subcategories if they're not collapsed */}
          {!isCollapsed && sub.subcategories && renderSubcategories(sub.subcategories, level + 1)}
        </div>
      );
  });


  // Open Add Subcategory Popup
  const openAddSubPopup = (subId: number | null, name: string | null) => {
    setActiveSubcategoryId(subId);
    setActiveSubcategoryName(name);
    setShowAddPopup(true);
  };

  return (
    <section className="attribute-setting">
      <header>
        <p className="page-name">Edit Category</p>
        <button className="cancel-btn2">Cancel</button>
      </header>
      <div className="edit-box">
        <div className="category-name">
          <label>Category Name</label>
          <input
            autoFocus
            type="text"
            value={activeSubcategoryName ?? ""} 
            onChange={(e) => setActiveSubcategoryName(e.target.value)}
          />
        </div>
        <div className="category-tree">
          <p className="category-tree-title">Products in {activeSubcategoryName}</p>
          <div className="category-tree-wrapper" style={{ padding: "1.2rem" }}>
            <input
              className="search-category-product"
              type="text"
              placeholder="Search by SKU or by Product Name"
            />
            <div className="category-title">
              <span className="dropdown">
                <IoMdArrowDropright height={"10px"} color="#fff" 
                 style={{
                  transition: "transform 0.2s",
                  transform: collapsedCategories.has(1) ? "rotate(0deg)" : "rotate(90deg)", // Rotate the icon
                }}
                onClick={() => toggleCollapseCategory(1)} // Passing category id for collapse
                />
              </span>
              <p>{activeSubcategoryName}</p>
              <AiOutlinePlus onClick={() => openAddSubPopup(null, "Electronics")} />
            </div>

            {categories.map((cat) => (
              <div key={cat.id} style={{ marginTop: "1rem", marginRight:"1rem" }}>
                <div>
                  {!collapsedCategories.has(cat.id) && renderSubcategories(cat.subcategories)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <button className="submit" >Save Changes</button> */}
        <button type="submit" className="save-changes-button">Save Changes</button>
      </div>

      {/* Add Subcategory Popup */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="addsubcategory">
            <p className="addsubcategory-title">Add to {activeSubcategoryName}</p>
            <div className="btn">
              <button
                onClick={() => {
                  setShowAddPopup(false);
                  setShowSubcategoryPopup(true);
                }}
              >
                <TbCategoryPlus size={16} color="#D0D0D0" />
                Subcategory
              </button>
              <button onClick={() => alert("🛒 Add Product - coming soon!")}>
                <AiOutlineProduct size={16} color="#D0D0D0" />
                Product
              </button>
            </div>
            <RxCross1
              className="cancel-btn"
              onClick={() => {
                setShowAddPopup(false);
                setActiveSubcategoryId(null);
                setActiveSubcategoryName(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Subcategory Popup */}
      {showSubcategoryPopup && (
        <div className="popup-overlay">
          <div className="addsubcategory-confirm">
            <p className="addsubcategory-confirm-title">Add to {activeSubcategoryName}</p>
            <input
              type="text"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              placeholder="Enter Subcategory Name"
            />
            <button className="confirm-btn" onClick={confirmAddSubcategory}>
              Add
            </button>
            <RxCross1
              className="cancel-btn"
              onClick={() => {
                setShowSubcategoryPopup(false);
                setNewSubcategoryName("");
                setActiveSubcategoryId(null);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EditCategory;
