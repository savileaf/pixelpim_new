import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const tabs = [
  { label: "Basic Information", path: "basic-info" },
  { label: "Attributes", path: "attributes" },
  { label: "Categories", path: "categories" },
  { label: "Assets", path: "assets" },
];

const ProductDetailsLayout = () => {
  const location = useLocation();
  const [ , setActiveTab] = useState<string>("");

  useEffect(() => {
    const current = tabs.find(tab => location.pathname.includes(tab.path));
    setActiveTab(current?.label || "Basic Information");
  }, [location.pathname]);

  return (
    <div className="flex">
      <div className="flex-1">
        <Outlet />
      </div>

      <div className="w-56 mr-2 border-2 h-[25rem] border-solid border-blue-400 bg-white py-6 px-4 mt-[4.4rem]">
        <ul className="space-y-6">
          {tabs.map((tab) => (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                onClick={() => setActiveTab(tab.label)}
                className={({ isActive }) => `
                  relative block cursor-pointer pl-4 text-sm font-semibold transition-colors duration-200
                  ${isActive ? "text-green-500" : "text-black"}
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r" />
                    )}
                    {tab.label.toUpperCase()}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsLayout;
