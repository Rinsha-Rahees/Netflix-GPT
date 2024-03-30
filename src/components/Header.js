import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/Constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/LanguageConstants";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config?.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // navigate("/error")
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Listens for this event
      if (user) {
        const { uid, email, displayName, photoURL } = user; // Got from user object
        dispatch(addUser({ uid, email, displayName, photoURL })); // Once user signed in -> Navigate to browse page
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribes when component unmounts -> onAuthStateChanged already returns an unsubscribe fn
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="flex fixed justify-between w-full h-fit top-0 p-6 px-6 z-10 bg-black md:bg-transparent md:bg-gradient-to-b from-black text-white">
      <div className="w-28">
        <img src={LOGO} alt="Netflix Logo" />
      </div>
      {user && (
        <div className="flex items-center">
          <select
            className="bg-gray-500 px-2 py-0.5 rounded-sm"
            onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang?.identifier} value={lang?.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleGptSearchClick}
            className="px-3 py-0.5 mx-2 bg-purple-600 text-white rounded-sm font-semibold">
            {showGptSearch ? lang[langKey].home : lang[langKey].askGpt }
          </button>
          <img
            className="mr-2 w-7"
            src={user?.photoURL}
            alt="Profile Photo Avatar"
          />
          <button onClick={handleSignOut} className="font-bold">{`( ${lang[langKey].signOut} )`}
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
