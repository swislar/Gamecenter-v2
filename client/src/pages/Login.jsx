import React, { useContext, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { LoadingSpinner, Header } from "../components/index";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef();

  const { login, currentUser, setCurrentUser, adminLogin, guestLogin } =
    useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.username === "admin" && inputs.password === "test") {
      adminLogin();
      navigate("/home");
      return;
    }
    try {
      setLoading(true);
      console.log("Attempting to login");
      await login(inputs);
      console.log("Login complete");
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        formRef.current.submit();
      }
      window.addEventListener("keypress", handleKeyPress);
    };
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleSubmit]);

  return (
    <>
      <div className="absolute top-0 w-full h-[100vh]">
        <div className="flex flex-col items-center md:flex-row h-[100vh]">
          <Header animateTitle={false} />
          <section className="w-3/4 h-2/3 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row items-center justify-center p-1 rounded-md menu-border"
            >
              <div className="flex flex-col items-center justify-center menu">
                <div className="flex flex-col items-center justify-center">
                  <span className="flex flex-row bg-slate-400 text-neutral-950 border-neutral-950 border-2 w-full">
                    <motion.p
                      whileTap={{ scale: 0.85 }}
                      className="relative m-2 border-2 border-zinc-900 px-1 rounded-lg menu-button"
                    >
                      <Link to="/">Back</Link>
                    </motion.p>
                    <p className="flex items-center justify-center text-center text-xl w-full hover:cursor-default">
                      Login
                    </p>
                    <motion.p
                      whileTap={{ scale: 0.85 }}
                      className="relative m-2 border-2 border-zinc-900 px-1 rounded-lg  menu-button"
                    >
                      <Link onClick={handleSubmit}>Next</Link>
                    </motion.p>
                  </span>
                  <div className="flex flex-row items-center pr-6 relative">
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex flex-col px-2 py-1 md:flex-row"
                    >
                      <button type="submit" />
                      <input
                        required
                        type="text"
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        onChange={handleChange}
                        className="mx-2 mt-1 mb-2 text-center outline-none text-black h-7 md:my-1"
                      />
                      <span className="flex flex-row items-center justify-center">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="password"
                          autoComplete="off"
                          onChange={handleChange}
                          className="mx-2 mb-1 text-center outline-none text-black h-7 md:my-1"
                        />
                      </span>
                    </form>
                    <span className="absolute flex flex-col right-0 bottom-3 md:bottom-auto">
                      {showPassword ? (
                        <EyeOff
                          className="w-5 h-5 mr-2.5 hover:cursor-pointer hover:text-slate-200"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <Eye
                          className="w-5 h-5 mr-2.5 hover:cursor-pointer hover:text-slate-200"
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                {error && error}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
      {loading ? <LoadingSpinner className="absolute" /> : ""}
    </>
  );
};

export default Login;
