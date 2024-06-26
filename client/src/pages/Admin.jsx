import React, { useState, useEffect, useContext, useRef } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Header, LoadingSpinner } from "../components";
import { Trash2 } from "react-feather";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";

const Admin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [userData, setUserData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIDToDelete, setUserIDToDelete] = useState(null);
  const [userNameToDelete, setUserNameToDelete] = useState("");
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currentDomain, darkMode } = useContext(AuthContext);

  const formRef = useRef();

  const pageTitle = "Game center";

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.username === "admin" && inputs.password === "test") {
      setLoggedIn(true);
      setLoading(true);
      getUsers();
      return;
    } else {
      setError("Invalid username or password");
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${currentDomain}/api/users/user-data`);
      setUserData(res.data);
      setLoading(false);
      if (res.data === "No users found!") {
        console.log("No users found!");
        return;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `${currentDomain}/api/users/user-data/${userId}`
      );
      console.log("User deleted sucdessfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const deletingUser = () => {
    handleDeleteUser(userIDToDelete);
    getUsers();
    setUserIDToDelete(null);
    setUserNameToDelete(null);
    setShowDeleteConfirmation(false);
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

  const login = (
    <div className="w-full h-[100vh]">
      <div className="flex flex-col items-center h-[100vh] md:flex-row">
        <Header />
        <section className="w-3/4 h-2/3 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row items-center justify-center p-1 rounded-md menu-border"
          >
            <div className="flex flex-col items-center justify-center menu">
              <span className="flex flex-row border-neutral-950 text-neutral-950 bg-slate-400 border-2 w-full items-center justify-center menu">
                <Link to="/" className="pl-1 hover:cursor-pointer">
                  <p className="rounded-xl duration-100 ease-in px-1 menu-button border-2 border-slate-600 my-1 mr-5 md:mr-0">
                    Back
                  </p>
                </Link>
                <p className="flex items-center justify-center text-center text-lg w-full hover:cursor-default">
                  Admin Login
                </p>
                <p className="pr-1 hover:cursor-pointer" onClick={handleSubmit}>
                  <p className="rounded-xl duration-100 ease-in px-1 menu-button border-2 border-slate-600 my-1 ml-5 md:ml-0">
                    Next
                  </p>
                </p>
              </span>
              <div className="flex flex-row items-center pr-6 relative">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col px-2 py-1 md:flex-row"
                >
                  <button type="submit" />
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    autoComplete="off"
                    onChange={handleChange}
                    className="mx-2 mt-1 mb-2 text-center outline-none text-black h-7 md:my-1"
                  />
                  <span className="flex flex-row items-center justify-center">
                    <input
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
              <span className="w-48 text-center">{error && error}</span>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );

  const deleteConfirmation = (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute z-20 w-full h-full bg-slate-400 bg-opacity-70"
      key={"delete-confirmation"}
    >
      <Navbar />
      <section className="w-full h-3/4 flex items-center justify-center">
        <div className="bg-slate-300 p-1">
          <div className="bg-red-900">
            <h1 className="px-3 p-1 text-2xl border-b-2 ">
              Deleting: {userNameToDelete}...
            </h1>
            <p className="px-3 p-1 text-md text-center ">Are you sure?</p>
            <span className="flex items-center justify-between px-7 pb-1">
              <button
                className="bg-gradient-to-tr from-red-800 to-red-700 rounded-lg border-2 border-slate-400 px-1 w-10 hover:from-red-600 hover:to-red-500"
                onClick={deletingUser}
              >
                Yes
              </button>
              <button
                className="bg-gradient-to-tr from-red-800 to-red-700 rounded-lg border-2 border-slate-400 px-1 w-10 hover:from-red-600 hover:to-red-500"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                }}
              >
                No
              </button>
            </span>
          </div>
        </div>
      </section>
    </motion.section>
  );

  const administrative = loading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full h-full">
      <Navbar />
      <AnimatePresence>
        {showDeleteConfirmation && deleteConfirmation}
      </AnimatePresence>
      <div className="flex flex-col w-full relative top-32 items-center">
        <h1
          className={`px-2 text-lg border-b-2 mb-4 duration-500 ease-in-out ${
            darkMode
              ? "text-slate-200 border-slate-200"
              : "text-neutral-950 border-neutral-950"
          }`}
        >
          Manage user data
        </h1>
        <section
          className={`px-2 py-1 rounded-lg border-2 menu duration-500 ${
            darkMode ? "border-slate-200" : "border-sakura-hover-text"
          }`}
        >
          <div className="flex flex-row px-2 py-1 items-center justify-center">
            <ul className="border-2 border-slate-200">
              <li classname="">
                <p className="px-2">User ID</p>
              </li>
              {userData !== null ? (
                userData
                  .slice((pageNumber - 1) * 10, pageNumber * 10)
                  .map((user) => (
                    <li
                      key={user.uid}
                      className="flex flex-row border-t-2 border-slate-200 items-center px-2"
                    >
                      {user.uid}
                    </li>
                  ))
              ) : (
                <></>
              )}
            </ul>
            <ul className="border-2 border-l-0 border-slate-200">
              <li classname="">
                <p className="px-2">Username</p>
              </li>
              {Array.isArray(userData) ? (
                userData
                  .slice((pageNumber - 1) * 10, pageNumber * 10)
                  .map((user) => (
                    <li
                      key={user.uid}
                      className="flex flex-row border-t-2 border-slate-200 items-center px-2 justify-between"
                    >
                      {user.username === "" ? "*NULL*" : user.username}{" "}
                      <Trash2
                        className="ml-2 scale-90 hover:cursor-pointer"
                        name={`delete-${user.uid}`}
                        onClick={() => {
                          setShowDeleteConfirmation(true);
                          setUserIDToDelete(user.uid);
                          setUserNameToDelete(user.username);
                        }}
                      />
                    </li>
                  ))
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="menu-border">
            <div className="flex flex-row items-center justify-between w-full border-2 py-1 menu">
              <span className="flex flex-row items-center justify-center">
                <ChevronsLeft
                  className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                  onClick={() => {
                    setPageNumber(1);
                  }}
                />
                <ChevronLeft
                  className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    }
                  }}
                />
              </span>

              <p className="cursor-default select-none">
                - Page {pageNumber} of {Math.ceil(userData.length / 10)} -
              </p>
              <span className="flex flex-row items-center justify-center">
                <ChevronRight
                  className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                  onClick={() => {
                    if (pageNumber < Math.ceil(userData.length / 10)) {
                      setPageNumber(pageNumber + 1);
                    }
                  }}
                />

                <ChevronsRight
                  className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                  onClick={() => {
                    setPageNumber(Math.ceil(userData.length / 10));
                  }}
                />
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return <>{loggedIn ? administrative : login}</>;
};

export default Admin;
