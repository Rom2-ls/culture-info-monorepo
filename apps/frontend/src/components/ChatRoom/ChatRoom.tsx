import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';

const sendMessageToServer = async (message: string) => {
  const response = await fetch("http://localhost:4000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatInput: message }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ChatRoom = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  const { mutate, isLoading } = useMutation(sendMessageToServer, {
    onSuccess: (data) => {
      console.log("Server response:", data.content[0].text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.content[0].text, sender: "ai" },
      ]);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = (event.target as HTMLFormElement).elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const newMessage = messageInput.value;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    mutate(newMessage);
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
            disabled={isLoading}
          />
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="outlined"
            type="submit"
          >
            Envoyer
          </LoadingButton>
        </form>
      </Container>
    </>
  );
};

export default ChatRoom;
