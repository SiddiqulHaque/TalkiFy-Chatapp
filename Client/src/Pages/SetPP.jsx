import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleuser, update, upload } from "../Utils/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const SetPP = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [cookies] = useCookies([]);
  const [values, setValues] = useState(location.state);
  const [file, setFile] = useState(user.profilePic);
  const [newName, setnewName] = useState(user?.username);
  const navigate = useNavigate();
  const preset_key = "ppe1wd2s";
  // const cloudname = process.env.REACT_APP_CLOUD_NAME;

  useEffect(() => {
    const fetchsingleuser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const res = await axios.get(getSingleuser + user?._id);
        setFile(res.data.profilePic);
        setnewName(res.data.username);
      }
    };
    fetchsingleuser();
  }, []);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/daxshafbw/image/upload`, formData)
      .then((res) => {
        setFile(res.data.secure_url);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
  }, [cookies, navigate]);
  const handleSkip = (e) => {
    e.preventDefault();
    navigate("/", { state: values });
  };
  const toastOpt = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: user.username,
      profilePic: user.profilePic,
    };
    if (file !== null) {
      updatedUser.profilePic = file;
    }
    if (newName.length !== 0) {
      updatedUser.username = newName;
    }
    try {
      await axios.put(
        "http://localhost:8000/api/auth/update/" + user?._id,
        updatedUser
      );
      toast.success("Profile Updated Successfully", toastOpt);
      setTimeout(() => {
        navigate("/", { state: values });
      }, 2000);
    } catch (err) {
      toast.error("Failed to Update Profile", toastOpt);
    }
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 text-gray-100">
        <form className="flex flex-col gap-4 rounded-xl bg-slate-950  px-[2rem] pt-[3rem] pb-[4rem] justify-center items-center">
          <div className="flex justify-center items-center gap-4">
            <img src={logo} alt="" className="h-[3rem]" />
            <h3 className=" font-medium text-3xl  text-pink-500 ">TALKIFY</h3>
          </div>
          <div className="flex justify-center items-center gap-4">
            {file ? (
              <img
                src={file}
                alt=""
                className=" h-[90px] w-[90px] rounded-[50%]"
              />
            ) : (
              <img
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                alt=""
                className=" h-[80px] w-[80px] object-cover rounded-[50%]"
              />
            )}
            <h3 className=" font-normal text-xl  text-pink-500 ">
              Update Your Profile
            </h3>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center py-6 px-10">
            <label
              htmlFor="inputfile"
              className=" w-[30%] flex justify-end items-center"
            >
              <BiImageAdd className="text-pink-700 h-[40px] w-[40px]" />
            </label>
            <input
              className=" font-normal text-md w-full flex justify-center items-center"
              type="file"
              id="inputfile"
              onChange={handleFile}
              // value={file}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="bg-slate-600 h-10 w-full px-4 py-2 rounded-lg focus:outline-none  "
              value={newName}
              onChange={(e) => setnewName(e.target.value)}
            />
          </div>
          <div className="gap-3 flex">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className=" bg-pink-600  px-12 py-2 rounded-md border-[none] font-semibold hover:bg-pink-900 "
            >
              UPDATE
            </button>
            <button
              onClick={(e) => handleSkip(e)}
              className=" bg-pink-600  px-12 py-2 rounded-md border-[none] font-semibold hover:bg-pink-900"
            >
              BACK
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default SetPP;
