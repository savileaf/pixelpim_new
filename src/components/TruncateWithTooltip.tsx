import React, { useRef, useState, useEffect } from 'react';
import { Tooltip } from 'antd';

interface TruncateWithTooltipProps {
  text: string;
  maxWidth?: number; 
}

const TruncateWithTooltip: React.FC<TruncateWithTooltipProps> = ({ text, maxWidth = 200 }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  const content = (
    <div
      ref={textRef}
      className="truncate"
      style={{ maxWidth, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      {text}
    </div>
  );

  return isOverflowed ? <Tooltip title={text} placement="bottom">{content}</Tooltip> : content;
};

export default TruncateWithTooltip;
