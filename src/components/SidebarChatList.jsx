import { BsPersonCircle } from "react-icons/bs";

function SidebarChatList({ user }) {
  const { profile_image, username } = user;

  return (
    <div className="flex items-center gap-3 ">
      {profile_image ? (
        <img
          className="rounded-full"
          width={50}
          height={50}
          src={profile_image}
          alt=""
        />
      ) : (
        <BsPersonCircle size={50} />
      )}
      <div className="w-full flex justify-between ">
        <div>
          <h2 className="text-sm">{username ? username : "Not set"}</h2>
          <p className="text-xs">message</p>
        </div>
        <p className="text-sm">last seen</p>
      </div>
    </div>
  );
}

export default SidebarChatList;
