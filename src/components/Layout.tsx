import {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  
  const [, setHeight] = useState(window.innerHeight - 10);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 10);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-grow bg-[#f2f0f0] p-4">
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
