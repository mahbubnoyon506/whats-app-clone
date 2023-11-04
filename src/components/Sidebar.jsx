import { MdDonutLarge } from "react-icons/md";
import {
  BsFillChatLeftTextFill,
  BsPersonCircle,
  BsSearch,
  BsThreeDotsVertical,
} from "react-icons/bs";
import SidebarChatList from "./SidebarChatList";
function Sidebar() {
  return (
    <div className="w-full ">
      {/* side bar head */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#202C33]">
        <div className="w-1/3 rounded-full">
          <BsPersonCircle size={40} />
        </div>
        <div className="w-2/3 flex justify-end items-center gap-5">
          {" "}
          <MdDonutLarge size={25} />
          <BsFillChatLeftTextFill size={25} />
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      {/* sidebar body */}
      <div className="bg-[#111B21] px-5 pb-5 space-y-5 relative h-[90vh]">
        <BsSearch className="absolute left-8 top-8" size={20} />
        <input
          className="bg-[#202C33] rounded-md w-full pl-10 py-2 focus:outline-none"
          placeholder="Search or start new chat"
          type="search"
          name=""
          id=""
        />
        <SidebarChatList />
        <SidebarChatList />
        <SidebarChatList />
        <SidebarChatList />
        <SidebarChatList />
      </div>
    </div>
  );
}

export default Sidebar;
