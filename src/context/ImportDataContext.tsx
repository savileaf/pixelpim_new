import { createContext, useContext, useState,type ReactNode } from 'react';
import GlobalModal from '../components/data/GlobalModal';
import * as XLSX from 'xlsx';


type ImportDataContextType = {
  openImportModal: () => void;
  headers: string[];
  rows: any[][];
};

const ImportDataContext = createContext<ImportDataContextType | undefined>(undefined);

export const ImportDataProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[][]>([]);

  const openImportModal = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        if (parsedData.length) {
          setHeaders(parsedData[0]);
          setRows(parsedData.slice(1));
          setIsModalOpen(true);
        }
      };
      reader.readAsBinaryString(file);
    };
    input.click();
  };

  return (
    <ImportDataContext.Provider value={{ openImportModal, headers, rows }}>
      {children}
      <GlobalModal
        isOpen={isModalOpen}
        headers={headers}
        rows={rows}
        onClose={() => setIsModalOpen(false)}
      />
    </ImportDataContext.Provider>
  );
};

export const useImportData = () => {
  const context = useContext(ImportDataContext);
  if (!context) throw new Error("useImportData must be used within an ImportDataProvider");
  return context;
};
