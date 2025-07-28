import React, { useState, useEffect, useRef } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { GoSortDesc } from 'react-icons/go';
import './editproductfamily.css';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import CustomTable from '../CustomTable';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

interface Attribute {
    id: number;
    name: string;
}

type SortOrder = 'asc' | 'desc';
type AssignType = 'required' | 'other';

const allAttributesList: Attribute[] = [
    { id: 1, name: 'Color' },
    { id: 2, name: 'Size' },
    { id: 3, name: 'Material' },
    { id: 4, name: 'Weight' },
    { id: 5, name: 'Brand' },
    { id: 6, name: 'Leather Quality' },
    { id: 7, name: 'Stitching' },
    { id: 8, name: 'Location' },
    { id: 9, name: 'Durability' },
    { id: 10, name: 'Manufacture Process' },
];

const columns = [
    {
        title: (
            <span className="font-semibold text-[11px] text-[#7b7089]">
                PRODUCT NAME
            </span>
        ),
        dataIndex: "product_name",
        key: "product_name",
        width: 170,
        render: (text: string) => (
            <div className="flex items-center justify-between">
                <span className='font-normal text-[12px] text-[#1b0c31]'>{text}</span>
                      <FaExternalLinkAlt color="blue" />
            
            </div>
        ),
    },
    {
        title: (
            <span className="font-semibold text-[11px] text-[#7b7089]">SKU</span>
        ), 
        dataIndex: "sku", key: "sku", width: 80,
        render: (text: string) => (
            <div className="flex items-center gap-2">
                <span className='font-normal text-[12px] text-[#1b0c31]'>{text}</span>
            </div>
        )
    },
    {
        title: (
        <span className="font-semibold text-[11px] text-[#7b7089]">COMPLETENESS</span>
        )
        , dataIndex: "completeness", key: "completeness", width: 70,
         render: (value: boolean) => (
    <div className="flex items-center gap-2">
      {value ? (
        <>
          <IoCheckmarkDoneCircle  className="text-green-600 text-sm" />
          <span className="text-green-600 text-[12px] font-medium">Completed</span>
        </>
      ) : (
        <>
          <span className="text-[#1b0c31] text-[12px] font-medium">Not Completed</span>
        </>
      )}
    </div>
  ),
    },
]

const data = [
    {
        key: "1",
        product_name: "Vintage SweatShirt.doc",
        image:"/images/jeans.png",
        sku: "VS123",
        completeness: false,
    },
    {
        key: "2",
        product_name: "Lookbook.xlsx",
        image:"/images/jeans.png",
        sku: "LB456",
        completeness: true,
    },
    {
        key: "3",
        product_name: "product-image.jpg",
        image:"/images/jeans.png",
        sku: "PI789",
        completeness: false,
    },
    {
        key: "4",
        product_name: "Product Details.pdf",
        image:"/images/jeans.png",
        sku: "PD321",
        completeness: true,
    },
];

const EditProductFamily: React.FC = () => {
    const [selected, setSelected] = useState("");

    const options = ["Ascending", "Descending", "Newest", "Oldest"];
    const [groupName, setGroupName] = useState('Accessories');
    const [requiredAttributes, setRequiredAttributes] = useState<Attribute[]>([
        { id: 1, name: 'Color' },
        { id: 2, name: 'Size' },
    ]);
    const [otherAttributes, setOtherAttributes] = useState<Attribute[]>([
        { id: 3, name: 'Material' },
    ]);
    const [selectedRequired, setSelectedRequired] = useState<Set<number>>(new Set());
    const [selectedOther, setSelectedOther] = useState<Set<number>>(new Set());
    const [assignments, setAssignments] = useState<Map<number, AssignType>>(new Map());

    const [searchRequired, setSearchRequired] = useState('');
    const [searchOther, setSearchOther] = useState('');
    const [searchAll, setSearchAll] = useState('');

    const [sortRequired, setSortRequired] = useState<SortOrder>('asc');
    const [sortOther, setSortOther] = useState<SortOrder>('asc');
    const [sortAll, setSortAll] = useState<SortOrder>('asc');

    const [popupVisible, setPopupVisible] = useState<{ [key: string]: boolean }>({
        required: false,
        other: false,
        all: false,
    });

    const requiredRef = useRef<HTMLInputElement>(null);
    const otherRef = useRef<HTMLInputElement>(null);

    const popupRefs = {
        required: useRef<HTMLDivElement>(null),
        other: useRef<HTMLDivElement>(null),
        all: useRef<HTMLDivElement>(null),
    };

    const allAssignedIds = new Set([...requiredAttributes, ...otherAttributes].map(a => a.id));
    const availableAttributes = allAttributesList.filter(attr => !allAssignedIds.has(attr.id));

    const sortAndFilter = (list: Attribute[], search: string, order: SortOrder) => {
        return list
            .filter(attr => attr.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) =>
                order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
    };

    const toggleSelection = (
        id: number,
        selectedSet: Set<number>,
        setSelected: React.Dispatch<React.SetStateAction<Set<number>>>
    ) => {
        const updated = new Set(selectedSet);
        updated.has(id) ? updated.delete(id) : updated.add(id);
        setSelected(updated);
    };

    const toggleSelectAll = (
        list: Attribute[],
        selected: Set<number>,
        setSelected: React.Dispatch<React.SetStateAction<Set<number>>>
    ) => {
        if (selected.size === list.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(list.map(attr => attr.id)));
        }
    };

    const moveSelectedToAll = (
        selectedSet: Set<number>,
        setSelected: any,
        fromList: Attribute[],
        setFromList: any
    ) => {
        const remaining = fromList.filter(attr => !selectedSet.has(attr.id));
        setFromList(remaining);
        setSelected(new Set());
    };

    const handleAssignmentChange = (id: number, type: AssignType) => {
        const updated = new Map(assignments);
        updated.set(id, type);
        setAssignments(updated);
    };

    const handleAddAssignments = () => {
        const newRequired = [...requiredAttributes];
        const newOther = [...otherAttributes];

        for (const [id, type] of assignments) {
            const attr = allAttributesList.find(a => a.id === id);
            if (!attr) continue;
            if (type === 'required') newRequired.push(attr);
            else newOther.push(attr);
        }

        setRequiredAttributes(newRequired);
        setOtherAttributes(newOther);
        setAssignments(new Map());
    };

    // Close sort popups when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.keys(popupRefs).forEach(key => {
                if (
                    popupRefs[key as keyof typeof popupRefs].current &&
                    !popupRefs[key as keyof typeof popupRefs].current!.contains(event.target as Node)
                ) {
                    setPopupVisible(prev => ({ ...prev, [key]: false }));
                }
            });
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle indeterminate checkbox
    useEffect(() => {
        if (requiredRef.current) {
            requiredRef.current.indeterminate =
                selectedRequired.size > 0 && selectedRequired.size < requiredAttributes.length;
        }
        if (otherRef.current) {
            otherRef.current.indeterminate =
                selectedOther.size > 0 && selectedOther.size < otherAttributes.length;
        }
    }, [selectedRequired, selectedOther, requiredAttributes.length, otherAttributes.length]);

    return (
        <section className="edit-product-family">
            <header>
                <p className="page-name">Edit Product Family</p>
                <Link to="/product/families">
                    <button className="cancel-btn2">Cancel</button>
                </Link>
            </header>

            <div className="edit-productfamily-box">
                {/* Family Name */}
                <div className="productfamily-name">
                    <label>Family Name</label>
                    <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
                </div>

                {/* TABLE SHOWING THE PRODUCTS */}
                <div className='w-full mb-2'>
                    <p className='font-normal text-[14px] text-[#302e2e] mb-2'>Used In Products</p>
                    <div className='w-full border border-solid border-[#929292] p-4'>
                        <div className='flex items-center justify-evenly'>
                            <div className="w-[360px] h-7 bg-white border border-solid border-[#929292] rounded-sm">
                                <input type="text" placeholder='Search by SKU or Product' className=" px-4  font-medium text-[12px] text-[#a2a1a1] " />
                            </div>

                            <div className="relative w-[225px] h-7 bg-white">
                                <select
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value)}
                                    className="w-full appearance-none border border-[#929292]  rounded-sm px-3 font-medium text-[12px] text-[#a2a1a1] focus:outline-none h-7"
                                >
                                    <option value="" disabled>
                                        Sort By
                                    </option>
                                    {options.map((option) => (
                                        <option key={option} value={option} className="text-black">
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                                    <FaChevronDown />
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-2'>
                            <CustomTable showImage={true} columns={columns} showCheckbox={false} dataSource={data} imageColumnWidth={20} />

                        </div>
                    </div>

                </div>

                {/* Attribute Boxes */}
                <div className="attributes-box mt-4">
                    {/* Required Attributes */}
                    <div className="attributes-box-left">
                        <p className="attributes-box-left-title">Required Attributes</p>
                        <input
                            className='attributes-box-left-inputsearch'
                            type="text"
                            placeholder="Search"
                            value={searchRequired}
                            onChange={e => setSearchRequired(e.target.value)}
                        />

                        <div className="sort-select" ref={popupRefs.required}>
                            <GoSortDesc
                                size={22}
                                color='#5a5a5a'
                                onClick={() =>
                                    setPopupVisible(prev => ({ ...prev, required: !prev.required }))
                                }
                                style={{ cursor: 'pointer' }}
                            />
                            {popupVisible.required && (
                                <div className="sortpopup">
                                    <p className="sortpopup-title">Sort By</p>
                                    <p className="sortpopup-ascending" onClick={() => setSortRequired('asc')}>Ascending</p>
                                    <p className="sortpopup-desceding" onClick={() => setSortRequired('desc')}>Descending</p>
                                </div>
                            )}
                            {selectedRequired.size > 0 && (
                                <div className="attribute-select">
                                    <input
                                        type="checkbox"
                                        ref={requiredRef}
                                        checked={selectedRequired.size === requiredAttributes.length}
                                        onChange={() =>
                                            toggleSelectAll(requiredAttributes, selectedRequired, setSelectedRequired)
                                        }
                                    />
                                    <p>{selectedRequired.size} selected</p>
                                    <button
                                        onClick={() =>
                                            moveSelectedToAll(
                                                selectedRequired,
                                                setSelectedRequired,
                                                requiredAttributes,
                                                setRequiredAttributes
                                            )
                                        }
                                    >
                                        <RxCross1 size={12} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {sortAndFilter(requiredAttributes, searchRequired, sortRequired).map(attr => (
                            <div key={attr.id} className="attribute-item">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedRequired.has(attr.id)}
                                        onChange={() =>
                                            toggleSelection(attr.id, selectedRequired, setSelectedRequired)
                                        }
                                    />
                                    <span>{attr.name}</span>
                                </div>
                                <RxCross1
                                    size={12}
                                    onClick={() =>
                                        setRequiredAttributes(prev => prev.filter(a => a.id !== attr.id))
                                    }
                                    title="Remove to All"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, backgroundColor: '#898989' }}></div>

                    {/* Other Attributes */}
                    <div className="attributes-box-right">
                        <p className="attributes-box-right-title">Other Attributes</p>
                        <input
                            className='attributes-box-right-inputsearch'
                            type="text"
                            placeholder="Search"
                            value={searchOther}
                            onChange={e => setSearchOther(e.target.value)}
                        />

                        <div className="sort-select" ref={popupRefs.other} >
                            <GoSortDesc
                                size={22}
                                color='#5a5a5a'
                                onClick={() => setPopupVisible(prev => ({ ...prev, other: !prev.other }))}
                                style={{ cursor: 'pointer' }}
                            />
                            {popupVisible.other && (
                                <div className="sortpopup">
                                    <p className="sortpopup-title">Sort By</p>
                                    <p className='sortpopup-ascending' onClick={() => setSortOther('asc')}>Ascending</p>
                                    <p className='sortpopup-desceding' onClick={() => setSortOther('desc')}>Descending</p>
                                </div>
                            )}
                            {selectedOther.size > 0 && (
                                <div className="attribute-select">
                                    <input
                                        type="checkbox"
                                        ref={otherRef}
                                        checked={selectedOther.size === otherAttributes.length}
                                        onChange={() =>
                                            toggleSelectAll(otherAttributes, selectedOther, setSelectedOther)
                                        }
                                    />
                                    <p>{selectedOther.size} selected</p>
                                    <button
                                        onClick={() =>
                                            moveSelectedToAll(
                                                selectedOther,
                                                setSelectedOther,
                                                otherAttributes,
                                                setOtherAttributes
                                            )
                                        }
                                    >
                                        <RxCross1 size={12} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {sortAndFilter(otherAttributes, searchOther, sortOther).map(attr => (
                            <div key={attr.id} className="attribute-item">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedOther.has(attr.id)}
                                        onChange={() => toggleSelection(attr.id, selectedOther, setSelectedOther)}
                                    />
                                    <span>{attr.name}</span>
                                </div>
                                <RxCross1
                                    size={12}
                                    onClick={() =>
                                        setOtherAttributes(prev => prev.filter(a => a.id !== attr.id))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* All Attributes */}
                <div className="all-attributes" ref={popupRefs.all}>
                    <p className='allattributes-box-title'>All Attributes</p>
                    <input
                        className='all-attributes-search'
                        type="text"
                        placeholder="Search"
                        value={searchAll}
                        onChange={e => setSearchAll(e.target.value)}
                    />
                    <div className='sort-clear' style={{ position: "relative" }}>
                        <GoSortDesc
                            onClick={() => setPopupVisible(prev => ({ ...prev, all: !prev.all }))}
                            style={{ cursor: 'pointer' }}
                            size={22}
                            color='#5a5a5a'
                        />
                        {popupVisible.all && (
                            <div className="sortpopup">
                                <p className="sortpopup-title">Sort By</p>
                                <p className='sortpopup-ascending' onClick={() => setSortAll('asc')}>Ascending</p>
                                <p className='sortpopup-desceding' onClick={() => setSortAll('desc')}>Descending</p>
                            </div>
                        )}

                        {assignments.size > 0 && (
                            <div className='selection-count' style={{ display: 'flex', gap: '1rem' }}>
                                {Array.from(assignments.entries()).filter(([_, val]) => val === 'required').length > 0 && (
                                    <span>
                                        {Array.from(assignments.entries()).filter(([_, val]) => val === 'required').length} required selected
                                    </span>
                                )}
                                {Array.from(assignments.entries()).filter(([_, val]) => val === 'other').length > 0 && (
                                    <span>
                                        {Array.from(assignments.entries()).filter(([_, val]) => val === 'other').length} other selected
                                    </span>
                                )}
                            </div>
                        )}
                        {assignments.size > 0 && (
                            <button onClick={() => setAssignments(new Map())}>
                                Clear All Selection
                            </button>
                        )}
                    </div>


                    {sortAndFilter(availableAttributes, searchAll, sortAll).map(attr => (
                        <div key={attr.id} className="attribute-item">
                            <span>{attr.name}</span>
                            <label>
                                <input
                                    type="radio"
                                    name={`assign-${attr.id}`}
                                    checked={assignments.get(attr.id) === 'required'}
                                    onChange={() => handleAssignmentChange(attr.id, 'required')}
                                />
                                Add to Required
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`assign-${attr.id}`}
                                    checked={assignments.get(attr.id) === 'other'}
                                    onChange={() => handleAssignmentChange(attr.id, 'other')}
                                />
                                Add to Other
                            </label>
                        </div>
                    ))}

                    <button
                        onClick={handleAddAssignments}
                        className='add-attribute-btn'
                        disabled={assignments.size === 0}
                    >
                        Add Attributes
                    </button>
                    {/* <button onClick={handleAddAssignments} className='add-attribute-btn'>Add Attributes</button> */}
                </div>
            </div>
            <button type="submit" className='save-changes-button'>Save Changes</button>
        </section>
    );
};

export default EditProductFamily;
