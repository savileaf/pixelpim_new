import {
  FaBell,
  FaQuestionCircle,
  FaRegFileAlt,
} from "react-icons/fa";
import { BiBox } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Products", icon: <BiBox />, link: "/" },
    { name: "Digital Assets", icon: <FaRegFileAlt />, link: "/assets/main" },
    { name: "Brand Portals", icon: <MdOutlineDesktopWindows />, link:"#" },
    { name: "Channels", icon: <BsGlobe size={12}/>, link:"#" },
    { name: "Product Configuration", icon: <MdOutlineSettings />, link: "/product/attribute" },
  ];

  const resources = [
    { name: "Notifications", icon: <FaBell size={12}/> },
    { name: "Help & Support", icon: <FaQuestionCircle size={12}/> },
  ];
  return (
    <div className="w-[13rem] bg-[#003F1B] h-full flex flex-col items-between">
      <div className="flex flex-col">
        <div className="pixel-box border-b-[6px] border-solid border-[#CC922F] h-[4.4rem]">
          <div className="flex flex-row items-center justify-center gap-4 w-full h-full">
            <img src="../src/assets/logo.png" alt="logo" className="h-[1.625rem] w-[1.625rem]" />
            <h2 className="text-[#00c965] text-2xl font-semibold">Pixel<span className="text-[#CC922F]">PIM</span></h2>
          </div>
        </div>
      </div>

      <div className=" text-white w-[13rem] px-3 py-[14px] text-[14px] flex-grow font-regular flex flex-col justify-between space-y-19">
        <div className="space-y-2">
          {menuItems.map(({ name, icon, link }) => {
            const isActive = link && location.pathname === link;
            const content = (
              <div
                className={`flex items-center gap-2 px-2 py-[6px] mb-[6px] rounded ${isActive ? "bg-[#2ECC71]" : "hover:bg-[#064f2c]"
                  }`}
              >
                <span className="text-[14px] w-4">{icon}</span>
                <span className="text-white sidebar-link">{name}</span>
              </div>
            );

            return link ? (
              <Link key={name} to={link}>
                {content}
              </Link>
            ) : (
              <div key={name}>{content}</div>
            );
          })}

        </div>

        <div>
          <div className="sidebar-resources mt-6 text-gray-400 text-xs font-bold uppercase tracking-wide px-2 mb-2">
            Resources
          </div>

          <div className="space-y-1">
            {resources.map(({ name, icon }) => (
              <div
                key={name}
                className="flex items-center gap-2 px-2 py-[6px] mb-[6px] rounded hover:bg-[#064f2c]"
              >
                <span className="">{icon}</span>
                <span className="s-resources-link">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-1.5 items-center">
            <div className="h-[2.5rem] w-[2.5rem] rounded-[100%] bg-[#cc922f] flex items-center justify-center text-[1.2rem]">
              MP
            </div>
            <div className="flex flex-col">
              <h2>Aashish</h2>
              <p className="text-[0.6rem]">Choudhary Group</p>
            </div>
          </div>

          <BsThreeDotsVertical size={22} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
