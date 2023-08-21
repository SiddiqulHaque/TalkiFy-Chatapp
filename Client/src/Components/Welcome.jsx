import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import welcome from "../assets/welcome.gif"
const Welcome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" flex justify-center items-center flex-col text-gray-200">
      <img
        className="h-[10rem] w-[10rem] object-cover"
        src={welcome}
        alt=""
      />
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
