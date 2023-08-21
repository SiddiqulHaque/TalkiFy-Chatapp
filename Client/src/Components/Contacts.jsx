import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
const Contacts = ({ contacts, currentuser, changeChat }) => {
  const [currentusername, setCurrentusername] = useState(undefined);
  const [currentuserimage, setCurrentuserimage] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const PF = "http://localhost:8000/images/";
  useEffect(() => {
    if (currentuser) {
      setCurrentusername(currentuser.username);
      setCurrentuserimage(currentuser.profilePic);
    }
  }, [currentuser]);
  const changeCurrentchat = (index, contact) => {
    setSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentusername && (
        <div className="grid grid-rows-[10%_15%_75%] overflow-hidden">
          <div className="flex justify-center items-center gap-4">
            <img src={logo} alt="" className="h-[2rem]" />
            <h1 className=" font-bold  text-3xl text-pink-500 ">TALKIFY</h1>
          </div>
          <div onClick={()=>changeChat(undefined)} className="w-[90%] min-h-[3rem] h-[65px] bg-pink-600  cursor-pointer rounded-md gap-4 p-1 mx-[10px]  items-center flex">
            {currentuserimage ? (
              <div>
                <img
                  src={PF + currentuserimage}
                  alt=""
                  className="h-[3rem] w-[3rem] object-cover rounded-[50%] "
                />
              </div>
            ) : (
              <div>
                <img
                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  alt=""
                  className="h-[3rem] w-[3rem] object-cover rounded-[50%] "
                />
              </div>
            )}

            <div>
              <h3 className="text-gray-100 text-xl">{currentusername}</h3>
            </div>
          </div>
          <div className="flex flex-col items-center overflow-auto gap-[0.5rem] h-full  ">
            {contacts.map((contact, index) => {
              return (
                <div
                  onClick={() => changeCurrentchat(index, contact)}
                  key={index}
                  className={`w-[90%] min-h-[3.5rem] ${
                    selected ? "bg-pink-500" : ""
                  } bg-slate-700 cursor-pointer rounded-md gap-4 p-1 py-[1rem] items-center flex `}
                >
                  {contact.profilePic ? (
                    <div>
                      <img
                        src={PF + contact.profilePic}
                        alt=""
                        className="h-[3rem] w-[3rem] object-cover rounded-[50%]  "
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        alt=""
                        className="h-[3rem] w-[3rem] object-cover rounded-[50%] "
                      />
                    </div>
                  )}

                  <div>
                    <h3 className=" text-gray-100 text-lg ">
                      {contact.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
