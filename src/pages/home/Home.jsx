import { useState } from "react";

import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";

function Home() {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    profile_image: "",
  });

  return (
    <div className="flex divide-x divide-gray-600">
      <div className="w-1/3">
        <Sidebar setUserData={setUserData} />
      </div>
      <div className="w-2/3">
        {" "}
        <Chat userData={userData} />{" "}
      </div>
    </div>
  );
}

export default Home;
