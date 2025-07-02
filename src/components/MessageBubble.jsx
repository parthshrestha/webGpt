import "./MessageBubble.css";

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`bubble-container ${isUser ? "user" : "assistant"}`}>
      <div className="bubble">
        <strong>{isUser ? "You" : "WebGPT"}</strong>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
