import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Navbar } from "../components/index";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Statistics = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 0 : 1); //0 for mobile, 1 for desktop
  const { currentDomain, darkMode } = useContext(AuthContext);
  // TODO
  //   const getUsernames = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${currentDomain}/api/user/accounts-username`
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     getUsernames();
  //   }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize(0);
      } else {
        setScreenSize(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  return (
    <div className="relative w-full h-full">
      <Navbar pageName={"Statistics"} />
      <section className="absolute top-18 w-full flex items-center justify-center">
        <p className="text-center">This is the statistics page</p>
        {/* <UserSearchBar onClick={""}/> Pass to the backend to query for userdata */}
      </section>
    </div>
  );
};

export default Statistics;
