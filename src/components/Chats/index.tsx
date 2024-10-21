import React, { useState, useEffect, useRef } from "react";
import "./Chats.css";

interface Props {
  userResponse: string;
  botResponse: {
    purpose?: string;
    message?: string;
    options?: {header: string, option?: string[]};
    sender: 'bot' | 'user';
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message?: string;
  options?: {header: string, option?: string[]};
  sender: string;
}

const Chats: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tempArray: MessagesInfo[] = [...messages];
    if (messages.length === 0) {
      setMessages([
        {
          purpose: "introduction",
          message: "Hello! Welcome to LSEG. I'm here to help you.",
          sender: "bot",
        },
      ]);
    } else {
      tempArray.push({ message: props.sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(props.botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [props.sendUserResponse, props.botResponse]);

  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map((chat) => (
        <div key={chat.message}>
          {chat?.message && (
            <div className={`message-${chat.sender}`}>
              <p>{chat.message}</p>
            </div>
          )}
          {chat.options ? (
            <div className="options">
              <div className={`message-${chat.sender}`}>
                <p>{chat.options.header}</p>
              </div>
              {chat?.options?.option?.map((item, index) => (
                <p
                  onClick={(e) => props.optionClick(e)}
                  data-id={item}
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          ) : null}
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
