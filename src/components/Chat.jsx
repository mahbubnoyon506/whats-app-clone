import {
  BsCameraVideo,
  BsPersonCircle,
  BsSearch,
  BsTelephone,
} from "react-icons/bs";
import { AiOutlinePlus, AiOutlineSend } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { BiSmile } from "react-icons/bi";

import chatBg from "/assets/images/whats-app-bg.png";
import { useEffect, useState } from "react";

function Chat() {
  const [receive, setReceive] = useState(true);
  const [chatRooms, setChatRooms] = useState([]);

  console.log(chatRooms);
  return (
    <div className="w-full">
      {/* chat head */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#202C33]">
        <div className="w-1/3 flex gap-3 rounded-full">
          <BsPersonCircle size={40} />
          <div className="">
            <h2 className="">Title</h2>
            <p className="text-xs">last seen</p>
          </div>
        </div>
        <div className="w-2/3 flex justify-end items-center gap-5">
          {" "}
          <div className="outline outline-1 outline-gray-500 p-2 rounded flex justify-center items-center gap-3 divide-x divide-gray-500">
            <BsCameraVideo className="cursor-pointer" size={20} />
            <div className="pl-3">
              <BsTelephone className="cursor-pointer" size={20} />
            </div>
          </div>
          <BsSearch className="" size={20} />
        </div>
      </div>

      {/* chat body */}
      <div
        className="h-[80vh] space-y-3"
        style={{ backgroundImage: `url(${chatBg})`, backgroundSize: "cover" }}
      >
        <div className="px-10">
          <div className="flex justify-end">
            <div className=" bg-[#005C4B] px-2 py-1 rounded">
              <p>hello dssjdfggjdhkg adfgjdkfghh</p>
              <p className="flex justify-end text-xs">7:35 AM</p>
            </div>
          </div>
        </div>
        <div className="px-10">
          <div className={`flex ${receive && "justify-start"}`}>
            <div className=" bg-[#202C33] px-2 py-1 rounded">
              <p>hello dssjdfggjdhkg adfgjdkfghh</p>
              <p className="flex justify-end text-xs">7:35 AM</p>
            </div>
          </div>
        </div>
      </div>
      {/* chat footer */}
      <div className=" px-5 py-3 bg-[#202C33]">
        <div className="flex justify-between items-center gap-3">
          <AiOutlinePlus className="cursor-pointer hover:rotate-9" size={20} />
          <div className="w-full relative">
            <BiSmile
              className="absolute top-2.5 left-2.5 cursor-pointer"
              size={20}
            />
            <input
              className="w-full bg-[#2A3942] rounded focus:outline-none py-2 pl-10"
              type="text"
              name=""
              id=""
            />
          </div>
          {receive ? (
            <AiOutlineSend className="cursor-pointer" size={20} />
          ) : (
            <FaMicrophone className="cursor-pointer" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
