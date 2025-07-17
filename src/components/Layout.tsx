import {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  
  const [height, setHeight] = useState(window.innerHeight - 10);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 10);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  
  return (
    <div className="flex w-full h-screen" style={{ minHeight: `${height}px` }}>
      <Sidebar />
      <main className="w-full flex-grow bg-[#f2f0f0] p-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
