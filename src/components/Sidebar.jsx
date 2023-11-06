import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase.init";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  BsFillChatLeftTextFill,
  BsPersonCircle,
  BsSearch,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdDonutLarge } from "react-icons/md";

import SidebarChatList from "./SidebarChatList";
import toast from "react-hot-toast";

function Sidebar({ setUserData }) {
  // State to hold user data
  const [users, setUsers] = useState([]);

  // Function to fetch user data from Firebase
  const getUsers = async () => {
    const userRef = collection(database, "Users");
    try {
      const querySnapshot = await getDocs(userRef);
      const userData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Effect to fetch user data when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Sidebar Header */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#202C33]">
        <div className="w-1/3 rounded-full">
          {auth.currentUser?.photoURL ? (
            <img
              className="cursor-pointer rounded-full"
              width={40}
              height={40}
              src={auth.currentUser.photoURL}
              alt=""
              onClick={handleLogout}
            />
          ) : (
            <BsPersonCircle
              className="cursor-pointer"
              size={40}
              onClick={handleLogout}
            />
          )}
        </div>
        <div className="w-2/3 flex justify-end items-center gap-5">
          <MdDonutLarge
            className="cursor-pointer"
            onClick={() => toast.success("Didn't add yet.")}
            size={25}
          />
          <BsFillChatLeftTextFill
            className="cursor-pointer"
            onClick={() => toast.success("Didn't add yet.")}
            size={25}
          />
          <BsThreeDotsVertical
            className="cursor-pointer"
            onClick={() => toast.success("Didn't add yet.")}
            size={25}
          />
        </div>
      </div>
      {/* Sidebar Body */}
      <div className="bg-[#111B21] px-5 pb-5 space-y-5 relative h-[90vh]">
        <BsSearch className="absolute left-8 top-8" size={20} />
        <input
          className="bg-[#202C33] rounded-md w-full pl-10 pr-2 py-2 focus:outline-none"
          placeholder="Search or start a new chat"
          type="search"
          name=""
          id=""
        />
        {users.map((user) => (
          <SidebarChatList
            key={user.id}
            user={user}
            setUserData={setUserData}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
