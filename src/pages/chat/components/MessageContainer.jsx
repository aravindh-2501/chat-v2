import { useEffect, useRef } from "react";
import moment from "moment";
import apiClient from "../../../api/apiInstance";
import { GET_MESSAGES } from "../../../api/endPoints";
import { useUserStore } from "../../../store/userStore";
import { useSocketStore } from "../../../store/useSocketStore";

const MessageContainer = ({ SelectedUser }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const messages = useSocketStore((state) => state.messages);
  const addMessage = useSocketStore((state) => state.addMesssage);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser?._id || !SelectedUser?.id) return;

      try {
        const response = await apiClient.get(
          `${GET_MESSAGES}/${currentUser._id}?receiver=${SelectedUser.id}`
        );
        console.log("getmssa", response?.data);
        addMessage(response?.data?.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser?._id, SelectedUser?.id, addMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("messages", messages);

  const flatMessages = messages.flat();
  console.log(flatMessages);

  return (
    <div className="flex flex-col w-full" style={{ height: "64vh" }}>
      <div className="flex-1 bg-gray-800 w-full h-full overflow-y-auto p-4">
        {flatMessages.length === 0 ? (
          <div>No messages</div>
        ) : (
          flatMessages.map((message, idx) => (
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
              <div className="chat-bubble text-sm text-white">
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
