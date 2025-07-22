import { FaFolder, FaPlus } from 'react-icons/fa';
import CustomTable from '../CustomTable'
import AssetsTopbar from './AssetsTopBar'
import { useGroupContext } from '../../context/GroupDataContext';



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



const ViewGroupPage = () => {
const {groups} = useGroupContext()
const tableData = groups.map((group, index) => ({
  key: index.toString(),
  group_name: group.name,
  created_date: new Date().toLocaleDateString(), 
  size: `${group.attributes.length} assets`,
}));
  return (
    <div className=''>
        <AssetsTopbar/>
        <CustomTable columns={customColumns} showImage={false} dataSource={tableData}/>
    </div>
  )
}

export default ViewGroupPage
