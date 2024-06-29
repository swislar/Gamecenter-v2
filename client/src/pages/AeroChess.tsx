import React from "react";
import { Navbar, Airplane } from "../components/index";

const AeroChess = () => {
  return (
    <div className="relative w-full h-full">
      <Navbar />
      <section className="h-3/4 w-full absolute top-18 flex flex-col items-center justify-center">
        <Airplane />
      </section>
    </div>
  );
};

export default AeroChess;
