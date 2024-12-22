import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ SelectedUser }) => {
  const navigate = useNavigate();

  console.log("SelectedUser", SelectedUser);

  const clearSelectedUser = () => {
    navigate("/");
  };

  const avatar =
    SelectedUser?.avatar ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const name = SelectedUser?.name || "Unknown User";
  const email = SelectedUser?.email || "No Email Available";

  return (
    <div className="w-full flex justify-between items-center bg-gray-800 p-4 border-b border-gray-600 rounded-t-lg">
      <div className="flex items-center">
        <div className="avatar w-12 h-12">
          <img className="rounded-full" src={avatar} alt="User Avatar" />
        </div>
        <div className="ml-3 flex flex-col">
          <p className="text-primary text-sm">{name}</p>
          <p className="text-primary text-xs">{email}</p>
        </div>
      </div>
      <div>
        <button
          className="btn bg-primary  p-2 rounded-full"
          onClick={clearSelectedUser}
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
