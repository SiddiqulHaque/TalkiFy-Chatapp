import React, { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Host, getAlluser, getSingleuser } from "../Utils/routes";
import axios from "axios";
import Contacts from "../Components/Contacts";
import { AuthContext } from "../Context/AuthContext";
import ChatContainer from "../Components/ChatContainer";
import {io} from "socket.io-client"
import Welcome from "../Components/Welcome";

const Chat = () => {
  const socket=useRef();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [contacts, setContacts] = useState([]);
  const location = useLocation();
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
  }, [cookies, navigate]);
  useEffect(() => {
    const fetchsingleuser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const res = await axios.get(getSingleuser + user?.username);
        setCurrentuser(res.data);
      }
    };
    fetchsingleuser();
  }, []);
 useEffect(()=>{
  if(currentuser){
    socket.current=io(Host);
    socket.current.emit("add-user",currentuser._id)
  }
 },[currentuser])

  useEffect(() => {
    const fetchalluser = async () => {
      if (currentuser) {
        const res = await axios.get(getAlluser + currentuser._id);
        setContacts(res.data);
      }
    };
    fetchalluser();
  }, [currentuser]);
  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const handleChatchange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <div className="w-[90vw] h-[90vh] bg-slate-950 grid md:grid-cols-[25%_75%] grid-cols-[35%_65%] ">
        <Contacts
          contacts={contacts}
          currentuser={currentuser}
          changeChat={handleChatchange}
        />
        {!currentChat ? <Welcome /> : <ChatContainer logout={logout} currentchat={currentChat} socket={socket} />}
      </div>
    </div>
  );
};

export default Chat;
