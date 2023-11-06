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
import { useEffect, useReducer, useState } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase.init";

function Chat({ userData }) {
  const receive = true;
  const fileRef = useReducer(null);

  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [file, setFile] = useState("");

  const addMessage = async () => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
    const messageRef = collection(messageDoc, `Message-${userData?.id}`);
    try {
      await addDoc(messageRef, {
        message: message,
        // file: file,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    const userDoc = doc(database, "Users", `${userData?.id}`);
    const messageDoc = doc(userDoc, "Message", `${userData?.id}`);
    const messageRef = collection(
      messageDoc,
      `Message-${auth.currentUser?.uid}`
    );
    try {
      await addDoc(messageRef, {
        message: message,
        file: file,
        name: auth.currentUser?.displayName,
      });
      addMessage();
      setFile("");
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = async () => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
    const messageRef = collection(messageDoc, `Message-${userData?.id}`);
    setTimeout(async () => {
      try {
        const data = await getDocs(messageRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessageData(filteredData);
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  useEffect(() => {
    showMessage();
  }, [messageData]);

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
        {messageData.length > 0
          ? messageData?.map((index, data) => {
              <div key={index} className="px-10">
                <div className="flex justify-end">
                  <div className=" bg-[#005C4B] px-2 py-1 rounded">
                    <p>
                      {data?.message} {console.log(data?.message)}
                    </p>
                    <p className="flex justify-end text-xs">7:35 AM</p>
                  </div>
                </div>
              </div>;
            })
          : null}
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
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {receive ? (
            <AiOutlineSend
              onClick={sendMessage}
              className="cursor-pointer"
              size={20}
            />
          ) : (
            <FaMicrophone className="cursor-pointer" size={20} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
