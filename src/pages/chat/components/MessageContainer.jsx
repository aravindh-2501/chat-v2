import { useEffect, useRef } from "react";
import moment from "moment";
import apiClient from "../../../api/apiInstance";
import { GET_MESSAGES } from "../../../api/endPoints";
import { useUserStore } from "../../../store/userStore";
import { useSocketStore } from "../../../store/useSocketStore";
import { playAudioNotification } from "../../../utils/audioNotification";

const MessageContainer = ({ SelectedUser }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const messages = useSocketStore((state) => state.messages);
  const { addMessage, isTyping } = useSocketStore();

  const messagesEndRef = useRef(null);

  const handlenotify = () => {
    playAudioNotification();
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser?._id || !SelectedUser?.id) return;

      try {
        const response = await apiClient.get(
          `${GET_MESSAGES}/${currentUser._id}?receiver=${SelectedUser.id}`
        );
        addMessage(response?.data?.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser?._id, SelectedUser?.id, addMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col w-full" style={{ height: "64vh" }}>
      <div className="flex-1 bg-gray-800 w-full h-full overflow-y-auto p-4">
        {/* Show messages */}
        {messages.length === 0 ? (
          <div className="text-white text-center mt-4">No messages</div>
        ) : (
          messages.map((message, idx) => (
            <div
              key={idx}
              className={`chat ${
                message.sender === currentUser?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      message.avatar ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div className="chat-bubble text-sm text-white bg-primary">
                {message.text}
              </div>
              <div className="chat-footer opacity-50">
                <time className="text-xs">
                  {moment(message.createdAt).format("h:mm A")}
                </time>
              </div>
            </div>
          ))
        )}

        {/* Show typing indicator */}
        {isTyping && (
          <div className="chat-start flex">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    SelectedUser?.avatar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <div className="chat-bubble flex items-center bg-gray-700 ml-3">
              <div className="loader w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        )}

        <button onClick={handlenotify}>click</button>
        {/* Ref for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
