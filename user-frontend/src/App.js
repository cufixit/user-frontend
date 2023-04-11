import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import Start from "./components/Start";
import New from "./components/New";
import Home from "./components/Home";

const App = () => {
  return (
    <Account>
      <Status />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/new" element={<New />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </Account>
  );
}

export default App;
