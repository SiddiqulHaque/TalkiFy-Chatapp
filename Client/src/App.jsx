import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Chat from "./Pages/Chat";
import SetPP from "./Pages/setPP";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setpp" element={<SetPP />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
