import React, { useEffect, useRef, useState } from 'react';

interface MirrorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MirrorInput: React.FC<MirrorInputProps> = ({ value, onChange }) => {
  const [inputWidth, setInputWidth] = useState(50); // default width
  const mirrorRef = useRef<HTMLSpanElement>(null);

  // Update width based on the mirror span
  useEffect(() => {
    if (mirrorRef.current) {
      mirrorRef.current.textContent = value;
      setInputWidth(mirrorRef.current.offsetWidth + 1); // +1 for extra space to prevent jumpiness
    }
  }, [value]);

  return (
    <>
    <div className="relative inline-block">
      {/* Regular input field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ width: `${inputWidth}px`}}
        className='font-inter text-xs text-[#1B0C31] bg-[#d4d4d4] rounded-sm w-fit border-0 outline-none py-2 px-3'
      />
      {/* Hidden mirror span */}
      <span
        ref={mirrorRef}
        className="absolute invisible whitespace-pre text-xs py-2 px-3 top-0 left-0"
      />
    </div>
    </>
  );
};

export default MirrorInput;
