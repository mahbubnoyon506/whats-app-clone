import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";

function Home() {
  return (
    <div className="flex divide-x divide-gray-600">
      <div className="w-1/3">
        <Sidebar />
      </div>
      <div className="w-2/3">
        {" "}
        <Chat />{" "}
      </div>
    </div>
  );
}

export default Home;
