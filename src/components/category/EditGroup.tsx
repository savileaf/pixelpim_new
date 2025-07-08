import React, { useState, useEffect, useRef } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { GoSortDesc } from "react-icons/go";
import './attribute-setting.css';
import './editgroup.css';

interface Attribute {
  id: number;
  name: string;
}

const allAttributesList: Attribute[] = [
  { id: 1, name: 'Color' },
  { id: 2, name: 'Size' },
  { id: 3, name: 'Material' },
  { id: 4, name: 'Weight' },
  { id: 5, name: 'Brand' },
  { id: 6, name: 'Manufacture Process' },
  { id: 7, name: 'Stiching' },
  { id: 8, name: 'Location' },
  { id: 9, name: 'Material' },
  { id: 10, name: 'Leather Quality' },
];

type SortOrder = 'asc' | 'desc';

const EditGroup: React.FC = () => {
  const [titleInput, setTitleInput] = useState('Basic Information');
  const [existingAttributes, setExistingAttributes] = useState<Attribute[]>([
    { id: 1, name: 'Color' },
    { id: 2, name: 'Size' },
  ]);

  const [searchExisting, setSearchExisting] = useState('');
  const [searchAll, setSearchAll] = useState('');
  const [selectedExistingIds, setSelectedExistingIds] = useState<Set<number>>(new Set());
  const [selectedAllIds, setSelectedAllIds] = useState<Set<number>>(new Set());

  // Sort states & popup visibility
  const [existingSortOrder, setExistingSortOrder] = useState<SortOrder>('asc');
  const [allSortOrder, setAllSortOrder] = useState<SortOrder>('asc');
  const [existingSortPopupVisible, setExistingSortPopupVisible] = useState(false);
  const [allSortPopupVisible, setAllSortPopupVisible] = useState(false);

  const existingSortRef = useRef<HTMLDivElement>(null);
  const allSortRef = useRef<HTMLDivElement>(null);

  const selectAllExistingRef = useRef<HTMLInputElement>(null);
  const selectAllAllRef = useRef<HTMLInputElement>(null);

  const allAttributes = allAttributesList.filter(
    (attr) => !existingAttributes.some((exist) => exist.id === attr.id)
  );

  // Filtered + sorted existing attributes based on search and sort order
  const filteredSortedExisting = existingAttributes
    .filter(attr => attr.name.toLowerCase().includes(searchExisting.toLowerCase()))
    .sort((a, b) =>
      existingSortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Filtered + sorted all attributes based on search and sort order
  const filteredSortedAll = allAttributes
    .filter(attr => attr.name.toLowerCase().includes(searchAll.toLowerCase()))
    .sort((a, b) =>
      allSortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Toggle select/deselect single attribute checkbox
  const toggleSelect = (
    id: number,
    selectedSet: Set<number>,
    setSelected: React.Dispatch<React.SetStateAction<Set<number>>>
  ) => {
    const newSet = new Set(selectedSet);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  };

  // Toggle select all / deselect all for existing attributes
  const toggleSelectAllExisting = () => {
    if (selectedExistingIds.size === filteredSortedExisting.length) {
      // Deselect all
      setSelectedExistingIds(new Set());
    } else {
      // Select all
      setSelectedExistingIds(new Set(filteredSortedExisting.map(attr => attr.id)));
    }
  };

  // Toggle select all / deselect all for all attributes
  const toggleSelectAllAll = () => {
    if (selectedAllIds.size === filteredSortedAll.length) {
      setSelectedAllIds(new Set());
    } else {
      setSelectedAllIds(new Set(filteredSortedAll.map(attr => attr.id)));
    }
  };

  const addSelectedToExisting = () => {
    const selectedAttrs = allAttributes.filter(attr => selectedAllIds.has(attr.id));
    setExistingAttributes(prev => [...prev, ...selectedAttrs]);
    setSelectedAllIds(new Set());
  };

  const removeSelectedFromExisting = () => {
    setExistingAttributes(prev =>
      prev.filter(attr => !selectedExistingIds.has(attr.id))
    );
    setSelectedExistingIds(new Set());
  };

  const handleRemoveSingle = (id: number) => {
    setExistingAttributes(prev => prev.filter(attr => attr.id !== id));
    setSelectedExistingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleAddSingle = (attr: Attribute) => {
    setExistingAttributes(prev => [...prev, attr]);
    setSelectedAllIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(attr.id);
      return newSet;
    });
  };

  useEffect(() => {
  if (selectAllExistingRef.current) {
    selectAllExistingRef.current.indeterminate =
      selectedExistingIds.size > 0 && selectedExistingIds.size < filteredSortedExisting.length;
  }

  if (selectAllAllRef.current) {
    selectAllAllRef.current.indeterminate =
      selectedAllIds.size > 0 && selectedAllIds.size < filteredSortedAll.length;
  }
}, [selectedExistingIds, selectedAllIds, filteredSortedExisting.length, filteredSortedAll.length]);


  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        existingSortRef.current && !existingSortRef.current.contains(event.target as Node)
      ) {
        setExistingSortPopupVisible(false);
      }
      if (
        allSortRef.current && !allSortRef.current.contains(event.target as Node)
      ) {
        setAllSortPopupVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className='attribute-setting'>
      <header>
        <p className='page-name'>Edit Attribute Group</p>
        <button className='cancel-btn2'>Cancel</button>
      </header>
      <div className='attribute-edit-box'>
        <div className='category-name'>
          <label>Group Name</label>
          <input
            type='text'
            autoFocus
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>

        <div className='attribute-edit-box-wrapper'>
          <p className='attribute-edit-box-title'>Attributes in {titleInput}</p>

          <div className='attributes-box'>
            {/* Left Column: Existing Attributes */}
            <div className='attributes-box-left' style={{ flex: 1 }}>
              <p className='attributes-box-left-title'>Existing Attributes</p>
              <input
                className='attributes-box-left-input'
                type='text'
                placeholder='Search by Attribute Name'
                value={searchExisting}
                onChange={(e) => setSearchExisting(e.target.value)}
              />
              <div className="sort-select" ref={existingSortRef} style={{ position: 'relative' }}>
                <span
                  className='attribute-box-sorticon'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExistingSortPopupVisible(prev => !prev)}
                >
                  <GoSortDesc className='sorticon' size={22} />
                </span>
                {existingSortPopupVisible && (
                  <div className='sortpopup'>
                    <p className='sortpopup-title'>Sort By</p>
                    <p
                      className='sortpopup-ascending'
                      onClick={() => {
                        setExistingSortOrder('asc');
                        setExistingSortPopupVisible(false);
                      }}
                    >
                      Ascending
                    </p>
                    <p
                      className='sortpopup-desceding'
                      onClick={() => {
                        setExistingSortOrder('desc');
                        setExistingSortPopupVisible(false);
                      }}
                    >
                      Descending
                    </p>
                  </div>
                )}

                {selectedExistingIds.size > 0 && (
                  <div className='attribute-select' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type='checkbox'
                      ref={selectAllExistingRef}
                      checked={selectedExistingIds.size === filteredSortedExisting.length}
                      onChange={toggleSelectAllExisting}
                    />
                    <p>{selectedExistingIds.size} attribute(s) selected</p>
                    <button onClick={removeSelectedFromExisting}>
                      <RxCross1
                        size={'12px'}
                        style={{ cursor: 'pointer' }}
                        title="Remove Selected"
                      />
                    </button>
                  </div>
                )}
              </div>

              {filteredSortedExisting.map(attr => (
                <div
                  className='attributes-box-left-list-wrapper'
                  key={attr.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.7rem',
                  }}
                >
                  <div className='attributes-box-left-list' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type='checkbox'
                      checked={selectedExistingIds.has(attr.id)}
                      onChange={() =>
                        toggleSelect(attr.id, selectedExistingIds, setSelectedExistingIds)
                      }
                    />
                    <span>{attr.name}</span>
                  </div>
                  <RxCross1
                    size={'12px'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveSingle(attr.id)}
                    title="Remove"
                  />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 1, backgroundColor: '#898989' }}></div>

            {/* Right Column: All Attributes */}
            <div className='attributes-box-right' style={{ flex: 1 }}>
              <p className='attributes-box-right-title'>All Attributes</p>
              <input
                className='attributes-box-right-input'
                type='text'
                placeholder='Search by Attribute Name'
                value={searchAll}
                onChange={(e) => setSearchAll(e.target.value)}
              />

              <div className="sort-select" ref={allSortRef} style={{ position: 'relative' }}>
                <span
                  className='attribute-box-sorticon'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAllSortPopupVisible(prev => !prev)}
                >
                  <GoSortDesc className='sorticon' size={22} />
                </span>
                {allSortPopupVisible && (
                  <div className='sortpopup'>
                    <p className='sortpopup-title'>Sort By</p>
                    <p
                      className='sortpopup-ascending'
                      onClick={() => {
                        setAllSortOrder('asc');
                        setAllSortPopupVisible(false);
                      }}
                    >
                      Ascending
                    </p>
                    <p
                      className='sortpopup-ascending'
                      onClick={() => {
                        setAllSortOrder('desc');
                        setAllSortPopupVisible(false);
                      }}
                    >
                      Descending
                    </p>
                  </div>
                )}

                {selectedAllIds.size > 0 && (
                  <div className='attribute-select' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type='checkbox'
                      ref={selectAllAllRef}
                      checked={selectedAllIds.size === filteredSortedAll.length}
                      onChange={toggleSelectAllAll}
                    />
                    <p>{selectedAllIds.size} attribute(s) selected</p>
                    <button onClick={addSelectedToExisting}>
                      <AiOutlinePlus
                        size={'12px'}
                        style={{ cursor: 'pointer' }}
                        title="Add Selected"
                      />
                    </button>
                  </div>
                )}
              </div>

              {filteredSortedAll.map(attr => (
                <div
                  className='attributes-box-right-list-wrapper'
                  key={attr.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.7rem',
                  }}
                >
                  <div className='attributes-box-right-list' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type='checkbox'
                      checked={selectedAllIds.has(attr.id)}
                      onChange={() =>
                        toggleSelect(attr.id, selectedAllIds, setSelectedAllIds)
                      }
                    />
                    <span>{attr.name}</span>
                  </div>
                  <AiOutlinePlus
                    size={'12px'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAddSingle(attr)}
                    title="Add"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className='save-changes-button'>Save Changes</button>
      </div>
    </section>
  );
};

export default EditGroup;
