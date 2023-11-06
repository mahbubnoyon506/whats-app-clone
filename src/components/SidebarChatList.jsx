import { BsPersonCircle } from "react-icons/bs";

function SidebarChatList({ user, setUserData }) {
  const { profile_image, username, id } = user;

  const handleUser = (user) => {
    setUserData({
      id: id,
      username: username,
      profile_image: profile_image,
    });
  };
  return (
    <div className="flex items-center gap-3 " onClick={handleUser(user)}>
      {profile_image ? (
        <img
          className="rounded-full"
          width={40}
          height={40}
          src={profile_image}
          alt=""
        />
      ) : (
        <BsPersonCircle size={40} />
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
