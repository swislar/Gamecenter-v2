import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import { AuthContext } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/index";

const Main = () => {
  const [showMenu, setShowMenu] = useState(true);

  const navigate = useNavigate();

  const { guestLogin } = useContext(AuthContext);

  const pageTitle = "Game center";

  const handleGuestLogin = (e) => {
    e.preventDefault();
    guestLogin();
    navigate("/home");
    return;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowMenu(false);

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowMenu(false);

    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    setShowMenu(false);

    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <>
      {/* TO DO: ADD TYPES OF LIBRARIES USED AT THE TOP WITH HORIZONTAL TEXT MOVING ANIMATIONS */}
      <div className="w-full h-[100vh]">
        <div className="flex flex-col items-center h-[100vh] md:flex-row">
          <Header animateTitle={true} />
          <div className="flex w-3/4 h-2/3 items-center justify-center">
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: (pageTitle.length + 1) / 10,
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  exitBeforeEnter={true}
                  key={"menu"}
                  className="flex flex-col items-center justify-center w-3/4"
                >
                  <section className="flex flex-row items-center justify-center p-1 rounded-md menu-border">
                    <div className="flex flex-col items-center justify-center menu">
                      <div className="p-2 bg-slate-400 text-neutral-950 border-neutral-800 border-2">
                        Welcome to Game Center!
                      </div>
                      <Link
                        onClick={handleLogin}
                        className="py-1 ease-in duration-100 w-full text-center border-b-2 border-cyan-200 menu-button"
                      >
                        Click here to login
                      </Link>
                      <Link
                        className="py-1 ease-in duration-100 w-full text-center border-b-2 border-cyan-200 menu-button"
                        onClick={handleGuestLogin}
                      >
                        Play as guest
                      </Link>
                      <Link
                        onClick={handleRegister}
                        className="py-1 text-sm ease-in duration-100 w-full text-center border-cyan-200 menu-button"
                      >
                        Click here to register now!
                      </Link>
                    </div>
                  </section>
                  <motion.section
                    whileTap={{ scale: 0.85 }}
                    className="flex flex-row items-center justify-center p-1 rounded-md mt-5 menu-border"
                  >
                    <div className="menu">
                      <Link
                        onClick={handleAdmin}
                        className="flex flex-col items-center justify-center hover:cursor-pointer ease-in duration-100 menu-button"
                      >
                        <p className="px-2">Manage users</p>
                      </Link>
                    </div>
                  </motion.section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
