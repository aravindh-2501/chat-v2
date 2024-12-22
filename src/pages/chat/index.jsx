import { useLocation, useParams } from "react-router-dom";
import ChatFooter from "./components/ChatFooter";
import ChatSidebar from "./components/ChatSidebar";
import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";

const Chat = () => {
  const { id } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("username");
  const email = queryParams.get("email");

  const SelectedUser = {
    id,
    name,
    email,
  };

  return (
    <div className="w-screen h-[89vh] mt-[4rem] flex flex-col bg-gray-800">
      <div className="flex-1 bg-gray-700 p-6 rounded-xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Sidebar */}
          <div className="lg:col-span-3 md:col-span-5 col-span-12 bg-gray-800 p-4 rounded-lg">
            <ChatSidebar SelectedUser={SelectedUser} />
          </div>

          {/* Chat Window */}
          {SelectedUser && SelectedUser.name ? (
            <div className="lg:col-span-9 md:col-span-7 col-span-12 bg-gray-800 rounded-lg flex flex-col">
              <ChatHeader SelectedUser={SelectedUser} />
              <MessageContainer SelectedUser={SelectedUser} />
              <ChatFooter SelectedUser={SelectedUser} />
            </div>
          ) : (
            <div className="lg:col-span-9 md:col-span-7 col-span-12 bg-gray-800 rounded-lg flex flex-col justify-center items-center">
              <p className="text-gray-300 text-lg">
                No chat selected. Please select a user.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
