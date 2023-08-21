import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signin } from "../Utils/routes";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const {loading ,error,dispatch}=useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [cookies] = useCookies([]);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/",{state:values});
    }
  }, [cookies, navigate]);
  const toastOpt = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // console.log(cookies);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      dispatch({ type: "LOGIN_START" });
      const { data } = await axios.post(
        Signin,
        { username, password },
        { withCredentials: true }
      );
      if (data.status === false) {
        dispatch({ type: "LOGIN_FAILURE" });
        toast.error(data.msg, toastOpt);
      }
      if (data.status === true) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        navigate("/",{state:values});
      }
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { username, password } = values;
    if (password.length === 0) {
      toast.error("Password is required", toastOpt);
      return false;
    } else if (username.length === 0) {
      toast.error("Username is required", toastOpt);
    }
    return true;
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 text-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 rounded-xl bg-slate-950  px-[2rem] pt-[3rem] pb-[4rem]"
      >
        <div className="flex justify-center items-center gap-4">
          <img src={logo} alt="" className="h-[3rem]" />
          <h1 className=" font-bold  text-3xl text-pink-500 ">TALKIFY</h1>
        </div>
        <input
          className="bg-transparent p-[1rem]  border-[1.5px] border-fuchsia-900 outline-none rounded-lg focus:border-fuchsia-400 "
          autoComplete="off"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />

        <input
          className="bg-transparent p-[1rem]  border-[1.5px] border-fuchsia-900 outline-none rounded-lg focus:border-fuchsia-400 "
          autoComplete="off"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />

        <button
          type="submit"
          className=" bg-pink-600  px-12 py-2 rounded-md border-[none] font-semibold hover:bg-pink-900"
        >
          LOGIN
        </button>
        <span className="uppercase font-semibold">
          Does not have an account ?{" "}
          <Link className=" text-pink-600 none" to="/register">
            REGISTER
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
