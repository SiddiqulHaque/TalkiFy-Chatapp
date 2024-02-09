import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
const Chatinput = ({ handlesendmsg }) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [file,setFile]=useState();
  const handleemojiPicker = () => {
    setEmojiPicker(!emojiPicker);
  };
  const handleemojiclick = (emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    setEmojiPicker(!emojiPicker);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handlesendmsg(msg);
      setMsg("");
    }
  };
  const selectFile=(e)=>{
    setMsg(e.target.files[0].name);
    setFile(e.target.files[0]);
  }
  return (
    <div className="grid grid-cols-[8%_92%] items-center   ">
      {/* Button Container  */}
      <div className="flex items-center justify-center text-gray-100 ml-3 ">
        <div className=" relative ">
          {/* <label htmlFor="inputfile">
            <BiImageAdd className=" text-2xl text-pink-500 cursor-pointer" />
          </label> */}
          {/* <input type="file" id="inputfile" className=" hidden " onChange={(e)=>selectFile(e)} /> */}
          <BsEmojiSmileFill
            className="text-[#ffff00c8] text-[1.3rem] cursor-pointer  "
            onClick={handleemojiPicker}
          />

          {emojiPicker && (
            <div className="absolute top-[-350px]">
              <Picker
                onEmojiClick={handleemojiclick}
                theme="dark"
                height={320}
                width={300}
                skinTonesDisabled="true"
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* form container  */}
      <form
        className="w-[100%] flex items-center justify-between gap-4 bg-slate-500 rounded-md  "
        onSubmit={(e) => sendChat(e)}
      >
        <input
          type="text"
          className="w-[100%] h-[80%] border-none text-gray-100 text-lg focus:outline-none bg-transparent py-2 pl-2   "
          placeholder="Start Messaging..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="px-[0.5rem] py-[0.5rem] mx-1 text-xl rounded-lg bg-pink-500 flex justify-center items-center "
          type="submit"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default Chatinput;
