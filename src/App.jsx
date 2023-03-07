import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FindNum from "./pages/FindNum";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindNum />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
