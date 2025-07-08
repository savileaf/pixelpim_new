import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface SectionItem {
  title: string;
  items: string[];
}

const sections: SectionItem[] = [
  {
    title: "Product",
    items: ["Property", "Families", "Categories", "Relationships", "Table views"],
  },
  {
    title: "Assets",
    items: ["Categories"],
  },
  {
    title: "General",
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
    <aside className="w-[12rem] h-screen bg-gray-50 shadow-md border-r border-gray-200 text-sm font-medium">
      <nav className="pt-4 px-3">
        {sections.map(({ title, items }) => (
          <div key={title}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 text-gray-700 hover:text-black"
              onClick={() => toggleSection(title)}
            >
              <span className="uppercase text-xs tracking-wide font-semibold">
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
              <ul className="pl-3 border-l border-gray-300 ml-1">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${title.toLowerCase()}/${item
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className={`block py-1.5 px-2 rounded-sm ${
                        isActive(item)
                          ? "text-blue-600 border-l-2 border-blue-600 pl-2 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100"
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
