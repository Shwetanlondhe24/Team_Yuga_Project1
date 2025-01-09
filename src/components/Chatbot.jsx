import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import "./Chatbot.css"; // Your CSS styling

const IT_KEYWORDS = [
  "computer", "IT", "software", "hardware", "programming", "coding", 
  "technology", "network", "database", "algorithm", "security", "system",
  "djistra algorithm", "OSI model",
  // Data Structures and Algorithms (DSA)
  "data structure", "array", "sorting", "searching", "linked list",
  "stack", "queue", "tree", "graph", "hashing", "dynamic programming",
  // Object-Oriented Programming (OOP)
  "object-oriented", "oop", "class", "object", "inheritance", "polymorphism",
  "encapsulation", "abstraction", "interface", "constructor", "method",
  // Computer Networks (CNS)
  "network", "protocol", "router", "switch", "IP address", "subnet", 
  "DNS", "HTTP", "TCP", "UDP", "OSI model", "network topology",
  // Database Management Systems (DBMS)
  "database", "dbms", "sql", "query", "table", "schema", "normalization",
  "transaction", "index", "relationship", "foreign key", "primary key"
];

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBhwRJl_C4etSQKPxPXzi6l0DYSBQwmWzs" // Replace with your actual API key
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Load chat history when the component mounts
  useEffect(() => {
    const storedChatHistory = localStorage.getItem("chatHistory");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  // Handle user input
  const handleUserInput = (e) => setUserInput(e.target.value);

  // Check if the user input contains IT-related keywords
  const isITRelated = (input) => {
    const lowerCaseInput = input.toLowerCase();
    return IT_KEYWORDS.some(keyword => lowerCaseInput.includes(keyword));
  };

  // Send message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    if (!isITRelated(userInput)) {
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: "I'm only able to answer questions related to computer/IT topics." },
      ]);
      localStorage.setItem("chatHistory", JSON.stringify([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: "I'm only able to answer questions related to computer/IT topics." },
      ]));
      setUserInput("");
      return;
    }

    setIsLoading(true);

    const conversationHistory = chatHistory
      .map((entry) => `${entry.type === "user" ? "User" : "Bot"}: ${entry.message}`)
      .join("\n");
    const prompt = `${conversationHistory}\nUser: ${userInput}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      const updatedChatHistory = [
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ];

      setChatHistory(updatedChatHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="chatbot-container">
      <h1 className="text-center">Chatbot</h1>
      <ChatHistory chatHistory={chatHistory} />
      <Loading isLoading={isLoading} />
      <input
        type="text"
        value={userInput}
        onChange={handleUserInput}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} disabled={isLoading}>Send</button>
      <button onClick={clearChat}>Clear Chat</button>
    </div>
  );
};

export default Chatbot;
