import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Logout from "./Logout";
import welcome from "../assets/welcome.gif";
const Welcome = ({ logout, ismobile }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${
        ismobile
          ? "hidden"
          : "flex justify-center items-center flex-col text-gray-200 "
      }`}
    >
      <Logout logout={logout}></Logout>
      <img className="h-[10rem] w-[10rem] object-cover" src={welcome} alt="" />
      <h1 className="text-3xl font-semibold">
        WELCOME CHIEF,
        <span className="text-pink-600 font-serif"> {user?.username}!</span>
      </h1>
      <h2 className="text-2xl font-semibold">
        Select a chat to start Messaging
      </h2>
    </div>
  );
};

export default Welcome;
