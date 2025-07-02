import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import MessageBubble from "../components/MessageBubble";
import "../components/MessageBubble.css";
import "./chat.css";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) navigate("/login");
    };
    checkSession();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: updatedMessages
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response";
      const assistantMessage = { role: "assistant", content: reply };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        role: "assistant",
        content: " Error connecting to WebGPT."
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <h2>WebGPT</h2>

      <div className="chat-box">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        {isLoading && <MessageBubble role="assistant" content="Typing..." />}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask WebGPT anything..."
          required
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
