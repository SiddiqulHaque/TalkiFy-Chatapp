import React, { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Host, getAlluser, getSingleuser } from "../Utils/routes";
import axios from "axios";
import Contacts from "../Components/Contacts";
import { AuthContext } from "../Context/AuthContext";
import ChatContainer from "../Components/ChatContainer";
import { io } from "socket.io-client";
import Welcome from "../Components/Welcome";
import Logout from "../Components/Logout";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [contacts, setContacts] = useState([]);
  const location = useLocation();
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const { user } = useContext(AuthContext);
  const [ismobile, setIsmobile] = useState(false);
  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
    console.log(cookies);
  }, [cookies, navigate]);
  useEffect(() => {
    const fetchsingleuser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const res = await axios.get(getSingleuser + user?._id);
        setCurrentuser(res.data);
      }
    };
    fetchsingleuser();
  }, []);
  useEffect(() => {
    if (currentuser) {
      socket.current = io(Host);
      socket.current.emit("add-user", currentuser._id);
    }
  }, [currentuser]);

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
    setIsmobile(false);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center  ">
      <div className="md:w-[100vw] md:h-[100vh] h-[100vh] w-[100vw]  bg-slate-950 grid md:grid-cols-[25%_75%] grid-cols-[10%_90%] ">
        <div className="h-full  bg-slate-900  md:hidden flex flex-col py-4 px-2 gap-12  ">
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="h-10 " onClick={() => setCurrentChat(undefined)}>
              <img src={logo} alt="" className="h-10 w-10" />
            </div>
            <div
              className="text-pink-500 hover:cursor-pointer "
              onClick={() => setIsmobile(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div
              className="text-pink-500  hover:cursor-pointer"
              onClick={() => setIsmobile(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <Link to={"/setPP"} className="text-pink-500  hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
          </div>

          <div className="flex justify-center">
            <Logout logout={logout}></Logout>
          </div>
        </div>
        <Contacts
          ismobile={ismobile}
          contacts={contacts}
          currentuser={currentuser}
          changeChat={handleChatchange}
        />
        {!currentChat ? (
          <Welcome logout={logout} ismobile={ismobile} />
        ) : (
          <ChatContainer
            logout={logout}
            currentchat={currentChat}
            socket={socket}
            ismobile={ismobile}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
