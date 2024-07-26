import "./output.css";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
