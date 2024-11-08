import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

const sendMessageToServer = async (message: string) => {
  try {
    const response = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatInput: message }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const ChatRoom = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = (event.target as HTMLFormElement).elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const newMessage = messageInput.value;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    try {
      const response = await sendMessageToServer(newMessage);
      console.log("Server response:", response.content[0].text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.content[0].text, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
    messageInput.value = "";
  };

  // console.log(messages);
  return (
    <>
      <Container
        style={{
          height: "100vh",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "4px",
            padding: "1rem",
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: "1rem",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
                margin: "0.5rem 0",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    message.sender === "user" ? "#DCF8C6" : "#CDE0F7",
                  borderRadius: "20px",
                  padding: "10px",
                  maxWidth: "60%",
                  wordWrap: "break-word",
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            id="message"
            name="message"
            label="Message pour l'IA"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ChatRoom;
