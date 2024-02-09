import React, { useContext, useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import Chatinput from "./Chatinput";
import Messages from "./Messages";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { addMessage, getallMessage } from "../Utils/routes";
import { v4 as uuidv4 } from "uuid";
const chatContainer = ({ currentchat, logout, socket, ismobile }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [arrivalmsg, setArrivalmsg] = useState(null);
  const scrollRef = useRef();
  const PF = "http://localhost:8000/images/";
  useEffect(() => {
    const fetchallmessage = async () => {
      if (currentchat) {
        const response = await axios.post(getallMessage, {
          from: user?._id,
          to: currentchat._id,
        });
        setMessages(response.data);
      }
    };
    fetchallmessage();
  }, [currentchat]);
  const handlesendmsg = async (msg) => {
    socket.current.emit("send-msg", {
      from: user?._id,
      to: currentchat?._id,
      message: msg,
    });
    await axios.post(addMessage, {
      from: user?._id,
      to: currentchat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalmsg({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalmsg && setMessages((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <div className={`${ismobile?'hidden':"px-2 pt-2 grid grid-rows-[10%_78%_12%] overflow-hidden"}`}>
      <div className="flex justify-between items-center pl-[1.5rem] bg-slate-600  py-2 rounded-md">
        <div className="flex items-center gap-4">
          <div>
            <img
              src={
                currentchat.profilePic
                  ? currentchat.profilePic
                  : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              alt=""
              className="h-[3rem] w-[3rem] rounded-[50%] object-cover"
            />
          </div>
          <div className="text-gray-100">
            <h3 className="text-xl font-semibold font-serif ">
              {currentchat.username}
            </h3>
          </div>
        </div>
        <Logout logout={logout} />
      </div>
      {/* Chat messages  */}
      <div className="py-[1rem] px-[2rem] flex flex-col overflow-auto   break-words  h-[100%]">
        {messages.map((message) => {
          return (
            <div className="" ref={scrollRef} key={uuidv4()}>
              <div
                className={` flex items-center ${
                  message.fromSelf ? " justify-end" : "justify-start "
                }`}
              >
                <div
                  className={`max-w-[40%] overflow-auto px-[1rem] py-[0.3rem] my-1 text-[1rem] rounded-[1rem] text-gray-100 ${
                    message.fromSelf ? " bg-slate-600" : "bg-pink-500"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* chat input  */}
      <Chatinput handlesendmsg={handlesendmsg} />
    </div>
  );
};

export default chatContainer;
