import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex w-full min-h-[600px] h-screen">
      <Sidebar />
      <main className="w-full flex-grow bg-[#f2f0f0] p-6 ">
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
