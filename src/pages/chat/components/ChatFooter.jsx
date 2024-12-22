import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import apiClient from "../../../api/apiInstance";
import { SEND_MSG } from "../../../api/endPoints";
import { useUserStore } from "../../../store/userStore";
import { useSocketStore } from "../../../store/useSocketStore";
import EmojiPicker from "emoji-picker-react";

const ChatFooter = ({ SelectedUser }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const currentUser = useUserStore((state) => state.currentUser);
  const { sendMessage, addMessage } = useSocketStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser?._id,
      receiver: SelectedUser?.id,
      text: message,
      createdAt: new Date(),
    };

    addMessage(newMessage);

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
      {/* Emoji Picker button */}
      <div className="relative">
        <button
          className="p-2 text-gray-100"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaceSmileIcon className="w-6 h-6" />
        </button>

        {/* Emoji Picker popup */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-16 left-0 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      {/* Message input */}
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Send Button */}
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
