import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface SectionItem {
  title: string;
  items: string[];
}

const sections: SectionItem[] = [
  {
    title: "PRODUCT",
    items: ["Attribute", "Families", "Categories", "Relationships", "Table views"],
  },
  {
    title: "ASSETS",
    items: ["Category"],
  },
  {
    title: "GENERAL",
    items: ["Connections"],
  },
];

const ProductsSidebar: React.FC = () => {
  const location = useLocation();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Product: true,
    Assets: true,
    General: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (item: string): boolean => {
    return location.pathname.toLowerCase().includes(item.toLowerCase().replace(/\s/g, "-"));
  };

  return (
    <aside className="pt-6 px-5 w-[162px] flex-none basis-[162px] min-h-[600px] h-screen bg-[#F1F0F0] text-sm font-medium">
      <nav className="">
        {sections.map(({ title, items }) => (
          <div key={title} className="pb-5">
            <div
              className="flex justify-between items-center cursor-pointer pb-2 text-[#484848] hover:text-black"
              onClick={() => toggleSection(title)}
            >
              <span className="uppercase text-sm tracking-wide font-semibold setting-sidebar-link ">
                {title}
              </span>
              <FaChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  openSections[title] ? "rotate-180" : ""
                }`}
              />
            </div>

            {openSections[title] && (
              <ul className="border-l border-[#C2C5C8]">
                {items.map((item) => (
                  <li key={item} className="pb-1.5">
                    <Link
                      to={`/${title.toLowerCase()}/${item
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className={`block py-1 px-4 setting-sidebar-link font-medium ${
                        isActive(item)
                          ? "text-[#2ECC71] border-l-2 border-[#2ECC71]"
                          : "text-[#626568] hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ProductsSidebar;
