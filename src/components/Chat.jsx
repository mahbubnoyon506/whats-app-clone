import React, { useEffect, useReducer, useRef, useState } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase.init";
import { AiOutlineSend } from "react-icons/ai";

import {
  BsCameraVideo,
  BsPersonCircle,
  BsSearch,
  BsTelephone,
} from "react-icons/bs";
import { BiSmile } from "react-icons/bi";
import { FaMicrophoneSlash } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

import chatBg from "/assets/images/whats-app-bg.png";
import toast from "react-hot-toast";

function Chat({ userData }) {
  const fileRef = useReducer(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [file, setFile] = useState(""); // Removed unused state variables

  // Function to add a message document to Firestore
  const addMessage = async () => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
    const messageRef = collection(messageDoc, `Message-${userData?.id}`);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    try {
      await addDoc(messageRef, {
        message,
        file,
        name: auth.currentUser?.displayName,
        timestamp: formattedDate,
      });
      setFile(""); // Clear the file state after sending the message
    } catch (err) {
      console.error(err);
    }
  };

  // Function to fetch and display messages
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

  // Effect to fetch and display messages when messageData or userData changes
  useEffect(() => {
    showMessage();
  }, [messageData, userData]);

  // Function to send a message
  const sendMessage = () => {
    if (message) {
      addMessage();
    }
    setMessage("");
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));

    toast.success("File uploaded.");
  };

  console.log("got message", messageData);
  return (
    <div className="w-full">
      {/* chat head */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#202C33]">
        <div className=" flex gap-3 rounded-full">
          {userData?.profile_image ? (
            <img
              className=" rounded-full"
              width={40}
              height={40}
              src={userData?.profile_imageL}
              alt=""
            />
          ) : (
            <BsPersonCircle className="" size={40} />
          )}
          <div className="">
            <h2 className="">
              {userData?.username ? userData?.username : "Not Set"}
            </h2>
            <p className="text-xs">last seen</p>
          </div>
        </div>
        <div className=" flex justify-end items-center gap-5">
          <div className="outline outline-1 outline-gray-500 p-2 rounded flex justify-center items-center gap-3 divide-x divide-gray-500">
            <BsCameraVideo
              onClick={() => toast.success("Didn't add yet.")}
              className="cursor-pointer"
              size={20}
            />
            <div className="pl-3">
              <BsTelephone
                onClick={() => toast.success("Didn't add yet.")}
                className="cursor-pointer"
                size={20}
              />
            </div>
          </div>
          <BsSearch
            onClick={() => toast.success("Didn't add yet.")}
            className="cursor-pointer"
            size={20}
          />
        </div>
      </div>

      {/* chat body */}
      <div
        className="h-[80vh] overflow-y-scroll"
        style={{ backgroundImage: `url(${chatBg})`, backgroundSize: "cover" }}
      >
        {messageData.length > 0 &&
          messageData
            .slice()
            .reverse()
            .map((data, index) => (
              <div key={index} className="px-10 py-3">
                <div className="flex justify-end">
                  <div>
                    <div className=" bg-[#005C4B] px-2 py-1 rounded">
                      <p>{data?.message}</p>
                      <p className="flex justify-end text-xs">
                        {data?.timestamp}
                      </p>
                    </div>
                    {data.file !== "" && (
                      <img className="pt-6" width={200} src={data.file} />
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* chat footer */}
      <div className="px-5 py-3 bg-[#202C33]">
        <div className="flex justify-between items-center gap-3">
          <div>
            <MdAttachFile
              className="cursor-pointer rotate-45 text-white"
              size={30}
              onClick={() => fileRef.current.click()}
            />
            <input
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              ref={fileRef}
              type="file"
              className="hidden"
            />
          </div>
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
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {message ? (
            <AiOutlineSend
              onClick={sendMessage}
              className="cursor-pointer"
              size={30}
            />
          ) : (
            <FaMicrophoneSlash
              onClick={() => toast.success("Didn't add yet.")}
              className="cursor-pointer"
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
