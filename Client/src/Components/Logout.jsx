import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = ({ logout }) => {
  return (
    <button
      onClick={logout}
      className=" h-[2rem] w-[2rem] flex justify-center items-center rounded-md mr-2 text-2xl font-bold bg-slate-800"
    >
      <BiPowerOff className=" text-gray-100" />
    </button>
  );
};

export default Logout;
