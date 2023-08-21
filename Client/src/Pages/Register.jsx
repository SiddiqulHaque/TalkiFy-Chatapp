import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Signup } from "../Utils/routes";
import { AuthContext } from "../Context/AuthContext";
const Register = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const { user, loading, dispatch } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOpt = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/", { state: values });
    }
  }, [cookies, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;
      dispatch({ type: "SIGNUP_START" });
      const { data } = await axios.post(
        Signup,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data.status == false) {
        dispatch({ type: "SIGNUP_START" });
        toast.error(data.msg, toastOpt);
      }
      if (data.status == true) {
        // localStorage.setItem("token", JSON.stringify(data.token));
        dispatch({ type: "SIGNUP_SUCCESS", payload: data.newUser });
        console.log(data);
        navigate("/setpp", { state: values });
      }
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { email, username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and ConfirmPassword should be same", toastOpt);
      return false;
    } else if (password.length < 7) {
      toast.error("Password should be greater than 8 Characters", toastOpt);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 Characters", toastOpt);
    } else if (email.length === 0) {
      toast.error("Email is required", toastOpt);
    }
    return true;
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 text-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 rounded-xl bg-slate-950  px-[4rem] pt-[3rem] pb-[4rem]"
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
          type="email"
          placeholder="E-Mail"
          name="email"
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

        <input
          className="bg-transparent p-[1rem]  border-[1.5px] border-fuchsia-900 outline-none rounded-lg focus:border-fuchsia-400 "
          autoComplete="off"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          className=" bg-pink-600  px-12 py-2 rounded-md border-[none] font-semibold hover:bg-pink-900"
        >
          REGISTER
        </button>
        <span className="uppercase font-semibold">
          Already have an account ?{" "}
          <Link className=" text-pink-600 none" to="/login">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
