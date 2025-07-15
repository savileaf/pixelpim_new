import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './index.css';
import { FilterProvider } from './context/FilterContext';
import { ColumnProvider } from './context/ColumnContext';
import { ViewProvider } from './context/ViewContext';
import { ModalProvider } from './context/ModalContext';
import { GroupProvider } from './context/GroupDataContext';
import { AttributeModalProvider } from './context/AttributeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
    <FilterProvider>
      <ColumnProvider>
      <ViewProvider>
          <GroupProvider>
        <ModalProvider>
          <AttributeModalProvider>
      <App />

          </AttributeModalProvider>
        </ModalProvider>
          </GroupProvider>
      </ViewProvider>
      </ColumnProvider>
      </FilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);