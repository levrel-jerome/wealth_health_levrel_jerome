import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employe from "./pages/Employes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employe" element={<Employe />}></Route>
        <Route path="*" element={<p>toto</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
