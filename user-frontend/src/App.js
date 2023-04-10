import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";

const App = () => {
  return (
    <Account>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </Account>
  );
}

export default App;
