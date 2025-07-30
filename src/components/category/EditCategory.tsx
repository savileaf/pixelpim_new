import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete, AiOutlineProduct } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { MdArrowForwardIos, MdCancel } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import "./editcategory.css";
import MirrorInput from "./MirrorInput";
import CategoryProductModal from "./CategoryProductModal";
import { Dropdown, Menu, Tooltip } from "antd";
import { TfiImport } from "react-icons/tfi";
import { FiMoreVertical } from "react-icons/fi";

// Types
interface Products {
  id: number;
  name: string;
  sku: string;
  image: string;
}
interface Subcategory {
  id: number;
  name: string;
  subcategories?: Subcategory[];
  products: Products[];
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
const findAndUpdateSubcategory = (
  subs: Subcategory[],
  subId: number,
  callback: (subs: Subcategory[], index: number) => void
): Subcategory[] => {
  return subs
    .map((sub, index) => {
      if (sub.id === subId) {
        callback(subs, index);
        return null; // remove it
      } else if (sub.subcategories) {
        return {
          ...sub,
          subcategories: findAndUpdateSubcategory(sub.subcategories, subId, callback),
        };
      }
      return sub;
    })
    .filter(Boolean) as Subcategory[];
};


const EditCategory: React.FC = () => {
  const [subcategoryToMove, setSubcategoryToMove] = useState<Subcategory | null>(null);

  const deleteSubcategoryById = (subId: number) => {
    setCategories((prev) =>
      prev.map((cat) => {
        const updated = findAndUpdateSubcategory([...cat.subcategories], subId, (subs, idx) => {
          subs.splice(idx, 1);
        });
        return { ...cat, subcategories: updated };
      })
    );
  };

  const prepareMoveSubcategory = (sub: Subcategory) => {
    setSubcategoryToMove(sub);
  };

  const pasteSubcategory = (targetSubId: number) => {
    if (!subcategoryToMove) return;

    setCategories((prev) =>
      prev.map((cat) => {
        let subcat: Subcategory | null = null;

        const cleaned = findAndUpdateSubcategory([...cat.subcategories], subcategoryToMove.id, (subs, idx) => {
          subcat = subs[idx];
          subs.splice(idx, 1);
        });

        const addToSub = (subs: Subcategory[]): Subcategory[] =>
          subs.map((sub) => {
            if (sub.id === targetSubId && subcat) {
              return {
                ...sub,
                subcategories: [...(sub.subcategories || []), subcat],
              };
            }
            return {
              ...sub,
              subcategories: sub.subcategories ? addToSub(sub.subcategories) : [],
            };
          });

        return {
          ...cat,
          subcategories: addToSub(cleaned),
        };
      })
    );
    setSubcategoryToMove(null);
  };

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        {
          id: 2,
          name: "Phones",
          products: [],
          subcategories: [
            {
              id: 3,
              name: "Smartphones",
              products: [
                { id: 101, name: "iPhone 14", sku: "APL14", image: "" },
                { id: 102, name: "Pixel 7", sku: "GGLP7", image: "" },
              ],
              subcategories: [],
            },
            {
              id: 4,
              name: "Feature Phones",
              products: [
                { id: 103, name: "Nokia 3310", sku: "NOK3310", image: "" },
              ],
              subcategories: [],
            },
          ],
        },
        {
          id: 5,
          name: "Laptops",
          products: [],
          subcategories: [
            {
              id: 6,
              name: "Gaming Laptops",
              products: [
                { id: 104, name: "Alienware X15", sku: "AWX15", image: "" },
                { id: 105, name: "Razer Blade 17", sku: "RB17", image: "" },
              ],
              subcategories: [],
            },
            {
              id: 7,
              name: "Ultrabooks",
              products: [
                { id: 106, name: "Dell XPS 13", sku: "DX13", image: "" },
              ],
              subcategories: [],
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "Home Appliances",
      subcategories: [
        {
          id: 9,
          name: "Kitchen",
          products: [],
          subcategories: [
            {
              id: 10,
              name: "Microwaves",
              products: [
                { id: 107, name: "LG Microwave", sku: "LG-MW", image: "" },
              ],
              subcategories: [],
            },
            {
              id: 11,
              name: "Blenders",
              products: [
                { id: 108, name: "NutriBullet Pro", sku: "NB-PRO", image: "" },
                { id: 109, name: "Vitamix E310", sku: "VMX310", image: "" },
              ],
              subcategories: [],
            },
          ],
        },
        {
          id: 12,
          name: "Laundry",
          products: [],
          subcategories: [
            {
              id: 13,
              name: "Washing Machines",
              products: [
                { id: 110, name: "Samsung EcoBubble", sku: "SMG-EB", image: "" },
              ],
              subcategories: [],
            },
          ],
        },
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
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string | null>(null);
  const [selectedKeys,] = useState<React.Key[]>([]);


  const toggleCollapseSubcategory = (subId: number) => {
    setCollapsedSubcategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(subId) ? newSet.delete(subId) : newSet.add(subId);
      return newSet;
    });
  };

  const toggleCollapseCategory = (categoryId: number) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
      return newSet;
    });
  };

  const confirmAddSubcategory = () => {
    if (!newSubcategoryName.trim()) return;

    const newSub: Subcategory = {
      id: Date.now(),
      name: newSubcategoryName.trim(),
      subcategories: [],
      products: [],
    };

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === activeCategoryId && activeSubcategoryId === null) {
          return { ...cat, subcategories: [newSub, ...cat.subcategories] };
        }

        const updateSubs = (subs: Subcategory[]): Subcategory[] =>
          subs.map((sub) => {
            if (sub.id === activeSubcategoryId) {
              return {
                ...sub,
                subcategories: [newSub, ...(sub.subcategories || [])],
              };
            }
            return {
              ...sub,
              subcategories: sub.subcategories ? updateSubs(sub.subcategories) : [],
            };
          });

        return { ...cat, subcategories: updateSubs(cat.subcategories) };
      })
    );

    setNewSubcategoryName("");
    setShowSubcategoryPopup(false);
    setActiveSubcategoryId(null);
    setActiveSubcategoryName(null);
  };

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
      prev.map((cat) => ({ ...cat, subcategories: update(cat.subcategories) }))
    );
  };

  const getProductCount = (sub: Subcategory): number => {
    let count = sub.products?.length || 0;
    if (sub.subcategories) {
      sub.subcategories.forEach((nested) => {
        count += getProductCount(nested);
      });
    }
    return count;
  };

  const handleViewProducts = (subcategory: Subcategory) => {
    setSelectedProducts(subcategory.products || []);
    setSelectedSubcategoryName(subcategory.name);
    setShowProductModal(true);
  };

  const renderSubcategories = (subs: Subcategory[], level: number = 1) =>
    subs.map((sub) => {
      const isCollapsed = collapsedSubcategories.has(sub.id);
      const hasSubcategories = sub.subcategories && sub.subcategories.length > 0;
      const productCount = getProductCount(sub);

      return (
        <div key={sub.id} className="mt-4 ml-6">
          <div className="flex items-center gap-3">
            <MdArrowForwardIos
              size={12}
              style={{
                cursor: hasSubcategories ? "pointer" : "default",
                transform: hasSubcategories && isCollapsed ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
              onClick={() => hasSubcategories && toggleCollapseSubcategory(sub.id)}
            />
            <MirrorInput
              value={sub.name}
              onChange={(e) => updateSubcategoryName(sub.id, e.target.value)}
            />
            <AiOutlinePlus onClick={() => openAddSubPopup(sub.id, sub.name)} />
            <Dropdown
              trigger={["click"]}
              placement="bottomLeft"
              overlay={
                <Menu>
                  <Menu.Item key="move" onClick={() => prepareMoveSubcategory(sub)}>
                    Move
                  </Menu.Item>
                  <Menu.Item
                    key="paste"
                    disabled={!subcategoryToMove || subcategoryToMove.id === sub.id}
                    onClick={() => pasteSubcategory(sub.id)}
                  >
                    Paste Here
                  </Menu.Item>
                  <Menu.Item key="delete" danger onClick={() => deleteSubcategoryById(sub.id)}>
                    Delete
                  </Menu.Item>
                </Menu>
              }
            >
              <div className="cursor-pointer px-2 py-1">
                <FiMoreVertical size={16} />
              </div>
            </Dropdown>
          </div>

          {productCount > 0 && (
            <div className="ml-6">
              <span
                className="font-normal text-[10px] underline text-[#1b0c31] cursor-pointer"
                onClick={() => handleViewProducts(sub)}
              >
                View Products {productCount}
              </span>
            </div>
          )}

          {!isCollapsed && sub.subcategories && renderSubcategories(sub.subcategories, level + 1)}
        </div>
      );
    });

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
      <div className={`w-full ${showProductModal ? "flex gap-4 justify-center" : "flex items-center justify-center"}`}>
        <div className="edit-box ">
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

                  <IoMdArrowDropright
                    height={"10px"}
                    color="#fff"
                    style={{
                      transition: "transform 0.2s",
                      transform: collapsedCategories.has(1)
                        ? "rotate(0deg)"
                        : "rotate(90deg)",
                    }}
                    onClick={() => toggleCollapseCategory(1)}
                  />
                </span>
                <p>{activeSubcategoryName}</p>
                <AiOutlinePlus onClick={() => openAddSubPopup(null, "Electronics")} />
              </div>

              {categories.map((cat) => (
                <div key={cat.id} style={{ marginTop: "1rem", marginRight: "1rem" }}>
                  <div>
                    {!collapsedCategories.has(cat.id) && renderSubcategories(cat.subcategories)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="save-changes-button">
            Save Changes
          </button>
        </div>

        {showProductModal && (
          <div className="h-cover mt-8 p-2 px-4 bg-[#f2f2f2] flex flex-col items-center relative">
            {/* ✅ Cancel Button Top Right */}
            <div className="absolute top-4 right-4">
              <MdCancel onClick={() => setShowProductModal(false)} />
            </div>

            <div className="mt-3">
              <span className="font-normal text-[14px] text-[#302e2e]">
                Mobile Phones Products/ Categories not selected, Clicked
              </span>

              {selectedProducts && selectedProducts.length > 0 && (
                <div className="flex flex-row">
                  <div className="flex flex-row items-center gap-3">
                    <Tooltip title="Download">
                      <TfiImport />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <AiOutlineDelete size={20} />
                    </Tooltip>
                  </div>
                  <p>{selectedKeys.length} items selected </p>
                </div>
              )
              }

              <CategoryProductModal
                subcategoryName={selectedSubcategoryName}
                products={selectedProducts}
                onClose={() => setShowProductModal(false)}
              />
            </div>
          </div>
        )}

      </div>


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


