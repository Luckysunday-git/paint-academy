// src/App.jsx
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import PaintTypes from "./Components/PaintTypes";
import Contact from "./Components/Contact";
import AllInOneVideos from "./Components/AllInOneVideo";
import Footer from "./Components/Footer";
import PaintMaterials from "./Components/PaintMaterials";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // only one useState

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="paintTypes">
          <PaintTypes searchTerm={searchTerm} />
        </section>
        <section id="all-in-one-videos">
          <AllInOneVideos />
        </section>
        <section id="paint-materials">
          <PaintMaterials />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </main>
    </>
  );
}

export default App;
