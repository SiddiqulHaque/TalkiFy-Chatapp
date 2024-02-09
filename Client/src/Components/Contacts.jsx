import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Contacts = ({ contacts, currentuser, changeChat, ismobile }) => {
  const [currentusername, setCurrentusername] = useState(undefined);
  const [currentuserimage, setCurrentuserimage] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [searchInput, setsearchInput] = useState("");
  const [fcontact, setfcontact] = useState([]);
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
  useEffect(() => {
    const filteredcontacts = contacts.filter((contact) => {
      if (contact.username.toLowerCase().includes(searchInput)) {
        return contact;
      }
    });
    setfcontact(filteredcontacts);
  }, [searchInput]);

  return (
    <>
      {currentusername && (
        <div
          className={`${
            ismobile
              ? "left-0 grid grid-rows-[10%_10%_15%_75%] overflow-hidden w-full  "
              : "left-[-100%] grid grid-rows-[10%_10%__15%_75%] overflow-hidden fixed md:static md:left-10"
          }   `}
        >
          {/* 1 */}
          <div
            className="flex justify-center items-center gap-4 "
            onClick={() => setCurrentChat(undefined)}
          >
            <img src={logo} alt="" className="h-[2rem]" />
            <h1 className=" font-bold  text-3xl text-pink-500 ">TALKIFY</h1>
          </div>
          {/* 2 */}
          <div className="bg-slate rounded-md  py-2  w-[90%] min-h-[3.5rem] flex justify-center items-center">
            <input
              onChange={(e) => setsearchInput(e.target.value.toLowerCase())}
              type="text"
              placeholder="Search contact"
              className="bg-slate-700 h-10  px-6 py-4 border border-slate-700 outline-none rounded-lg text-slate-200     w-[90%] "
            />
          </div>
          {/* 3 */}
          <div
            onClick={() => {
              changeChat(undefined);
            }}
            className="w-[90%] min-h-[3rem] h-[65px] bg-pink-600  cursor-pointer rounded-md gap-4 p-1 mx-[10px]  items-center flex relative"
          >
            {currentuserimage ? (
              <div>
                <img
                  src={currentuserimage}
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
            <div className="text-white absolute right-2">
              <Link to="/setPP">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* 4 */}
          <div className="flex flex-col items-center overflow-auto gap-[0.5rem] h-full  ">
            {searchInput.length === 0 ? (
              <>
                {contacts.length !== 0 &&
                  contacts.map((contact, index) => {
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
                              src={contact.profilePic}
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
              </>
            ) : (
              <>
                {fcontact.length === 0 ? (
                  <>
                    <div className="text-lg text-slate-200  ">
                      No Matching Contact
                    </div>
                  </>
                ) : (
                  fcontact.map((contact, index) => {
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
                              src={contact.profilePic}
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
                  })
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
