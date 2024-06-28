import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { Navbar, LoadingSpinner } from "../components/index";
import { AuthContext } from "../context/authContext";
import { Search } from "react-feather";
import axios from "axios";

interface User {
  username: string;
  uid: string;
}

interface GameStatistics {
  game: string;
  category: number;
  plays: number;
  highscore: number;
}

const Statistics = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 0 : 1); //0 for mobile, 1 for desktop
  const [userSearch, setUserSearch] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userStatistics, setUserStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentDomain, darkMode } = useContext(AuthContext);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const handleListClick = (userId: string, username: string) => {
    setUserSearch(username);
    setCurrentUser(username);
    getUserStatistics(userId);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${currentDomain}/api/users/user-data`);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const getUserStatistics = async (userId: string) => {
    try {
      const res = await axios.get(
        `${currentDomain}/api/users/user-statistics/${userId}`
      );
      setUserStatistics(res.data);
      console.log(res.data);
    } catch (err) {
      setUserStatistics([]);
      console.log(err);
    }
  };

  const renderGameTitle = (gameCode: string) => {
    switch (gameCode) {
      case "tzfe":
        return 2048;
      case "ttt":
        return "Tick Tac Toe";
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      {loading && <LoadingSpinner />}
      {!loading && (
        <section className="absolute top-18 w-full flex flex-col md:flex-row items-center justify-center pt-7">
          <div className="flex flex-col text-sm bg-navy-purple border-cyan-200 border-2 rounded-sm sm:absolute top-7 left-5">
            <h1 className="font-mono flex flex-row text-slate-100 px-1 items-center justify-center">
              Search for users <Search className="scale-90 pl-1" />
            </h1>
            <input
              type="text"
              placeholder="search..."
              value={userSearch}
              autoComplete="on"
              onChange={handleSearch}
              className="text-slate-950 px-1 m-0.5 border-2 border-slate-400 rounded-sm focus:outline-none"
            />
            <ul className="bg-sakura h-52 overflow-y-scroll">
              {userData
                .filter((user: User) => user.username.includes(userSearch))
                .map((user: User) => (
                  <li
                    key={user.uid}
                    className="px-1 hover:bg-sakura-hover ease-in duration-100 hover:cursor-pointer focus:text-sakura-hover-text"
                    onClick={(e) => handleListClick(user.uid, user.username)}
                  >
                    {user.username}
                  </li>
                ))}
            </ul>
          </div>
          <div
            className={`flex flex-col font-mono pt-3 sm:pt-0 ${
              darkMode ? "text-auto border-auto" : "text-neutral-950"
            }`}
          >
            {currentUser === "" ? (
              ""
            ) : (
              <h1
                className={`text-center border-b-2 mb-2 ease-in-out duration-500 ${
                  darkMode ? "border-slate-200" : "border-black"
                }`}
              >
                Data for {currentUser}
              </h1>
            )}
            {currentUser === ""
              ? ""
              : userStatistics.length !== 0
              ? userStatistics.map((gameStats: GameStatistics) => (
                  <div>
                    <h2
                      className={`text-center bg-opacity-30 px-2 duration-500 ease-in-out ${
                        darkMode ? "bg-cyan-200" : "bg-stone-800"
                      }`}
                    >
                      {renderGameTitle(gameStats.game)} - {gameStats.category}x
                      {gameStats.category}
                    </h2>
                    <p className="text-center ease-in-out duration-500">
                      {gameStats.game === "tzfe"
                        ? "High-score"
                        : gameStats.game === "ttt"
                        ? "Plays"
                        : ""}
                      {": "}
                      {gameStats.game === "tzfe"
                        ? gameStats.highscore
                        : gameStats.game === "ttt"
                        ? gameStats.plays
                        : ""}
                    </p>
                  </div>
                ))
              : "No data found!"}
          </div>
        </section>
      )}
    </div>
  );
};

export default Statistics;
