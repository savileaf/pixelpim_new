import { Checkbox } from "antd";
import { BiSolidFilePdf } from "react-icons/bi";



type AssetsGridProps = {
  id: string;
  name: string;
  date: string;
  size: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
  imgsrc?:string
}

type AssetsGridViewProps = {
  selectedKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
};

const dummyData = [
  { id: "1", name: "Red T-Shirt", date: "2025/06/13", size: "300kb", imgsrc:"/images/mouse.jpg" },
  { id: "2", name: "Blue T-Shirt", date: "2025/06/14", size: "500kb", imgsrc:"/images/red-tshirt 1.png" },
  { id: "3", name: "Green T-Shirt", date: "2025/06/15", size: "250kb",imgsrc:"/images/pant 2.png" },
  { id: "4", name: "Red T-Shirt", date: "2025/06/13", size: "300kb" , imgsrc:"/images/product_image1.png" },
  { id: "5", name: "Blue T-Shirt", date: "2025/06/14", size: "500kb", imgsrc:"/images/jeans.png" },
  { id: "6", name: "Green T-Shirt", date: "2025/06/15", size: "250kb",imgsrc:"/images/red-tshirt 1.png" },
  { id: "7", name: "Red T-Shirt", date: "2025/06/13", size: "300kb", imgsrc:"/images/pant 2.png" },
  { id: "8", name: "Blue T-Shirt", date: "2025/06/14", size: "500kb", imgsrc:"/images/product_image1.png" },
  { id: "9", name: "Green T-Shirt", date: "2025/06/15", size: "250kb",imgsrc:"/images/red-tshirt 1.png" },
  { id: "10", name: "Red T-Shirt", date: "2025/06/13", size: "300kb" , imgsrc:"/images/product_image1.png"},
  { id: "11", name: "Blue T-Shirt", date: "2025/06/14", size: "500kb", imgsrc:"/images/pant 2.png" },
  { id: "12", name: "Green T-Shirt", date: "2025/06/15", size: "250kb", imgsrc:"/images/red-tshirt 1.png" },
  
];
const AssetsGrid = ({ id, name, date, size, checked, onChange , imgsrc }: AssetsGridProps)=>{
    return(
<div className="flex flex-col w-[156px] h-[140px] bg-[#F1F0F0] p-2 justify-between">
  <div className="relative w-full h-[70px]">
    <img
      src="/images/bg.png"
      alt="background"
      className="w-full h-full object-cover"
    />
    <img
      src={imgsrc ? imgsrc : "/images/tshirt.png"}
      alt="tshirt"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[70px] object-contain"
    />
    <div className="absolute top-[-12px] left-[-8px]">
    <Checkbox checked={checked} onChange={(e) => onChange(id, e.target.checked)}/>

    </div>
  </div>

  <div className="flex flex-row">
    <BiSolidFilePdf color="red"/>
    <p className="font-normal text-[12px] text-[#1b0c31]">{name}</p>
  </div>

  <div className="flex flex-row justify-between items-center">
        <p className="font-normal text-[10px] text-[#5c5468]">{date}</p>
        <span className="font-normal text-[10px] text-[#5c5468]">{size}</span>
  </div>
</div>

    )
    
}
const AssetsGridView = ({ selectedKeys, setSelectedKeys }: AssetsGridViewProps) => {

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedKeys((prev) =>
      checked ? [...prev, id] : prev.filter((key) => key !== id)
    );
  };
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 bg-white p-4">
      {
        dummyData.map((item)=>(
              <AssetsGrid
         key={item.id}
            id={item.id}
            name={item.name}
            date={item.date}
            size={item.size}
            checked={selectedKeys.includes(item.id)}
            onChange={handleCheckboxChange}
            imgsrc={item.imgsrc}
            
            />
        ))
      }
       
      
    </div>
  )
}

export default AssetsGridView
