// App.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import GlobalModal from './GlobalModal';


const ImportData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      if (!parsedData.length) return;
      setHeaders(parsedData[0]);
      setRows(parsedData.slice(1));
      setIsModalOpen(true);
    };

    reader.readAsBinaryString(file);
  };

  return (
      <GlobalModal
        isOpen={isModalOpen}
        headers={headers}
        rows={rows}
        onClose={() => setIsModalOpen(false)}
      />
  );
};

export default ImportData;
