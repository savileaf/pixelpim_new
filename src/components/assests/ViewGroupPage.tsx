import { FaFolder, FaPlus } from 'react-icons/fa';
import CustomTable from '../CustomTable'
import AssetsTopbar from './AssetsTopBar'




const customColumns = [
  { title:(
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <FaFolder size={18} color='orange'/>
        <span>GROUP NAME</span>
      </div>
    ),
    render: (text: string) => (
        <div className="flex items-center gap-2">
         <FaPlus color='#ada7a7' size={16}/>
          <span>{text}</span>
        </div>
      ),
    dataIndex: "group_name", key: "group_name", width: 200
  },
  { title: "CREATED DATE", dataIndex: "created_date", key: "created_date", width: 200 },
  {title:"SIZE", dataIndex:"size", key:"size", width:100}
];

const data =[
  { key: "1", group_name: "Most Used Products", created_date: "2025/03/03", size: "2mb" },
    { key: "2", group_name: "New Products", created_date: "2025/04/10", size: "1.5mb" },
    { key: "3", group_name: "Jeans", created_date: "2025/04/12", size: "3mb" },
    { key: "4", group_name: "Ladies Items", created_date: "2025/03/03", size: "2mb" },
     { key: "5", group_name: "New Products", created_date: "2025/04/10", size: "1.5mb" },
    { key: "6", group_name: "Jeans", created_date: "2025/04/12", size: "3mb" },
    { key: "7", group_name: "Ladies Items", created_date: "2025/03/03", size: "2mb" },
]




const ViewGroupPage = () => {
// const {groups} = useGroupContext()
// const tableData = groups.map((group, index) => ({
//   key: index.toString(),
//   group_name: group.name,
//   created_date: new Date().toLocaleDateString(), 
//   size: `${group.attributes.length} assets`,
// }));
  return (
    <div className=''>
        <AssetsTopbar />
        <CustomTable columns={customColumns} showImage={false} dataSource={data}/>
    </div>
  )
}

export default ViewGroupPage
