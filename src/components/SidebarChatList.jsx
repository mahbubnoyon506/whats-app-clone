import { BsPersonCircle } from "react-icons/bs";

function SidebarChatList() {
  return (
    <div className="flex items-center gap-3">
      <BsPersonCircle size={50} />
      <div className="w-full flex justify-between ">
        <div>
          <h2 className="font-semibold">Title</h2>
          <p className="text-sm">message</p>
        </div>
        <p className="text-sm">last seen</p>
      </div>
    </div>
  );
}

export default SidebarChatList;
