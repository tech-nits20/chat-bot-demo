import React, { useEffect, useState } from "react";
import Chats from "../Chats";
import "./Chatbot.css";
import send from "../../assets/send.png";
import { analyzeChatOptions } from "../helper/ChatHelper/analyzeChatOptions";

interface ResponseBotObject {
  purpose?: string;
  message?: string;
  options?: { header: string; option?: string[] };
  sender: "bot" | "user";
}

const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot",
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

  const setNextStep = (response: string) => {
    let formattedResponse = response;
    setStep((prevState) => prevState + 1);
    setSendUserResponse(formattedResponse);
    const result = botResponse.options?.option?.find(item => item === formattedResponse);
    if (result) {
      formattedResponse = result;
    }
    let res = analyzeChatOptions(step, formattedResponse);
    setBotResponse({ options: res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  useEffect(() => {
    setTimeout(() => {
      let res = analyzeChatOptions(0, "");
      setBotResponse({ options: res, sender: 'bot'});
      setNextStep("");
    }, 2000);
  }, []);

  return (
    <div>
      <div className="container">ChatBot</div>
      <div className="chat-container">
        <Chats
          userResponse={userResponse}
          botResponse={botResponse}
          sendUserResponse={sendUserResponse}
          optionClick={optionClick}
        />
        <form onSubmit={(e) => handleSubmit(e)} className="form-container">
          <input onChange={(e) => handleInputChange(e)} value={userResponse} />
          <button>
            <img src={send} alt="send" height={10} width={10} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
