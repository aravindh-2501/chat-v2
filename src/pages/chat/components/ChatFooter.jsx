import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import apiClient from "../../../api/apiInstance";
import { SEND_MSG } from "../../../api/endPoints";
import { useUserStore } from "../../../store/userStore";
import { useSocketStore } from "../../../store/useSocketStore";

const ChatFooter = ({ SelectedUser }) => {
  const [message, setMessage] = useState("");
  const currentUser = useUserStore((state) => state.currentUser);
  const { sendMessage, addMesssage } = useSocketStore();

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser?._id,
      receiver: SelectedUser?.id,
      text: message,
      createdAt: new Date(),
    };

    // Add locally only for the sender's view
    addMesssage(newMessage);

    try {
      await apiClient.post(SEND_MSG, newMessage);
      sendMessage(newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-3 rounded-b-lg flex items-center gap-2">
      <button className="p-2 text-gray-100">
        <FaceSmileIcon className="w-6 h-6" />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={`p-2 text-white bg-primary rounded-lg ${
          !message.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatFooter;
