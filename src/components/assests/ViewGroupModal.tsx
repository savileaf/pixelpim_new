import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ViewGroupModalProps {
  onClose: () => void;
  onCreateGroup: (groupName: string) => void;
}

const ViewGroupModal = ({ onClose, onCreateGroup }: ViewGroupModalProps) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    if (groupName.trim()) {
      onCreateGroup(groupName);
    } else {
      alert("Please enter a group name.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="relative bg-[#003b1f] rounded-lg px-6 py-2 w-[22rem] h-[10rem] shadow-lg flex flex-col gap-2 items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300"
        >
          <FaTimes size={16} />
        </button>

        <input
          type="text"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mt-3 px-4 py-2 rounded-md border-none bg-white text-black focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#31c46a] hover:bg-[#2ab75f] text-white py-2 rounded-md font-semibold"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default ViewGroupModal;
