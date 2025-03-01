import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;  // Only send message if text is not empty

    try {
      await sendMessage({
        text: text.trim(),
      });

      // Clear form after sending message
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
