/* eslint-disable no-unused-vars */
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatPage from "./ChatPage";
const socket = socketIO.connect("http://localhost:4000");
import "./App.css";
function App() {
  return (
    <div>
      <p className="text">Chat App</p>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
