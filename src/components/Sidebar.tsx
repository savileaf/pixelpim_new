import {
  FaThLarge,    
  FaImage,       
  FaDesktop,    
  FaGlobe,       
  FaCog,         
  FaBell,        
  FaQuestionCircle 
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link , useLocation } from "react-router-dom";
const Sidebar = () => {
   const location = useLocation();
    const menuItems = [
    { name: "Products", icon: <FaThLarge />,  link:"/"},
    { name: "Digital Assets", icon: <FaImage /> },
    { name: "Brand Portals", icon: <FaDesktop /> },
    { name: "Channels", icon: <FaGlobe /> },
    { name: "Product Configuration", icon: <FaCog /> , link:"/product/property"  },
  ];

  const resources = [
    { name: "Notifications", icon: <FaBell /> },
    { name: "Help & Support", icon: <FaQuestionCircle /> },
  ];
  return (
    <div className="w-[13rem] bg-[#003316] h-screen flex flex-col items-between">
            <div className="flex flex-col">
            <div className="pixel-box border-b-[6px] border-solid border-[#c78500] h-[4.5rem]">
                <div className="flex flex-row items-center justify-center gap-3 w-full h-full">
                <img src="../src/assets/logo.png" alt="logo" className="h-[1.8rem] w-[2rem]"/>
                <h2 className="text-[#00c965] text-2xl font-semibold">Pixel<span className="text-[#c78500]">PIM</span></h2>
             </div>
            </div>
        </div>

    <div className=" text-white w-[13rem] p-2 text-[14px] mt-3 font-regular flex flex-col space-y-19">
      <div className="space-y-2">
        {menuItems.map(({ name, icon, link }) => {
          const isActive = link && location.pathname === link;
  const content = (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded ${
        isActive ? "bg-[#27C26C] text-[#003217]" : "hover:bg-[#064f2c]"
      }`}
    >
      <span className="text-[14px]">{icon}</span>
      <span className="text-white">{name}</span>
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
        <div className="mt-6 text-gray-400 text-xs uppercase tracking-wide px-2 mb-2">
        Resources
      </div>

      <div className="space-y-1">
        {resources.map(({ name, icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#064f2c]"
          >
            <span className="text-base">{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
      </div>

      <div className="flex flex-row p-2 items-center justify-between w-full">
        <div className="flex flex-row gap-1 items-center">
        <div className="h-[2.5rem] w-[2.5rem] rounded-[100%] bg-[#cc922f] flex items-center justify-center text-[1.2rem]">
        MP
        </div>
        <div className="flex flex-col">  
        <h2>Aashish</h2>
        <p className="text-[0.6rem]">Choudhary Group</p>
        </div>
        </div>

        <BsThreeDotsVertical size={22}/>
    </div>
    </div>

    
 </div>
  )
}

export default Sidebar
