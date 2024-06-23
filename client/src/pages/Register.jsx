import React, { useContext, useState } from "react";
import { EyeOff, Eye } from "react-feather";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { LoadingSpinner, Header } from "../components/index";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showMenu, setShowMenu] = useState(true);
  const { currentDomain } = useContext(AuthContext);
  const [error, setError] = useState("Username to be less than 8 characters");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.username.length >= 8) {
      setError("Username too long!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${currentDomain}/api/auth/register`,
        inputs
      );
      console.log(res);
      if (res.status === 400) return;
      setShowMenu(false);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 500);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="absolute w-full h-[100vh]">
        <div className="flex flex-col items-center h-[100vh] md:flex-row ">
          <Header animateTitle={false} />
          <section className="flex w-3/4 h-2/3 items-center justify-center">
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="flex flex-row items-center justify-center p-1 rounded-md menu-border"
                >
                  <div className="flex flex-col items-center menu">
                    <div className="bg-slate-400 px-2 border-2 border-slate-700 text-gray-950 text-center hover:cursor-default">
                      Register your account here!
                    </div>
                    <span className="text-center text-xs pt-1">{error}</span>
                    <div className="flex flex-col items-left my-3">
                      <input
                        required
                        type="text"
                        placeholder="username"
                        name="username"
                        autoComplete="off"
                        className="flex justify-center items-center text-center w-36 text-black text-sm mb-4 py-1 outline-none"
                        onChange={handleChange}
                      />
                      <div className="flex flex-row items-center justify-center">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          name="password"
                          autoComplete="off"
                          className="flex justify-center items-center text-center w-36 text-black text-sm py-1 outline-none"
                          onChange={handleChange}
                        />
                        {showPassword ? (
                          <EyeOff
                            className="w-5 h-5 ml-3 hover:cursor-pointer hover:text-slate-200"
                            onClick={() => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <Eye
                            className="w-5 h-5 ml-3 hover:cursor-pointer hover:text-slate-200"
                            onClick={() => {
                              setShowPassword(true);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <span
                      className="flex justify-center items-center w-full ease-in duration-100 hover:cursor-pointer border-2 border-cyan-200 menu-button"
                      onClick={handleSubmit}
                    >
                      Next
                    </span>
                    <a
                      href="/"
                      className="flex justify-center w-full ease-in duration-100 hover:cursor-pointer border-2 border-t-0 border-cyan-200 menu-button"
                    >
                      Back
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
      {loading ? <LoadingSpinner className="absolute" /> : ""}
    </>
  );
};

export default Register;
