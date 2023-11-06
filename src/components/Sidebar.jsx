import { MdDonutLarge } from "react-icons/md";
import {
  BsFillChatLeftTextFill,
  BsPersonCircle,
  BsSearch,
  BsThreeDotsVertical,
} from "react-icons/bs";
import SidebarChatList from "./SidebarChatList";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Sidebar({ setUserData }) {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const userRef = collection(database, "Users");
    try {
      const data = await getDocs(userRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [users]);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full ">
      {/* side bar head */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#202C33]">
        <div className="w-1/3 rounded-full">
          {auth.currentUser?.photoURL ? (
            <img
              className="cursor-pointer rounded-full"
              width={40}
              height={40}
              src={auth.currentUser?.photoURL}
              alt=""
              onClick={logout}
            />
          ) : (
            <BsPersonCircle
              className="cursor-pointer"
              size={40}
              onClick={logout}
            />
          )}
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
        {users.map((user, index) => (
          <SidebarChatList key={index} user={user} setUserData={setUserData} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
