const ChatHistory = ({ chatHistory }) => {
    return (
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div key={index} className={entry.type === "user" ? "user-message" : "bot-message"}>
            {entry.message}
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatHistory;

  