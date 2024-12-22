{messages.length === 0 ? (
<div>No messages</div>
) : (
messages.map((message, idx) => (
<div
key={idx}
// className={`chat ${
              //   message.sender === currentUser?._id ? "chat-end" : "chat-start"
              // }`} >
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
)}s
