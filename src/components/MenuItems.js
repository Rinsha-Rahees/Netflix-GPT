import React from 'react'
import { LOGOUT, SUPPORTED_LANGUAGES } from "../utils/Constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/LanguageConstants";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "../utils/Firebase";


function MenuItems() {
    const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
    const langKey = useSelector((store) => store.config?.lang);
    const dispatch = useDispatch();
    
    const handleSignOut = () => {
        signOut(auth)
          .then(() => {})
          .catch((error) => {
            // navigate("/error")
          });
      };
    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
      };
    
      const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
      };
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center pl-4 my-3 md:my-0">
    <select
      className="bg-gray-500 px-2 py-0.5 rounded-sm cursor-pointer"
      onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang?.identifier} value={lang?.identifier}>
          {lang.name}
        </option>
      ))}
    </select>
    <button
      onClick={handleGptSearchClick}
      className="px-3 py-0.5 md:my-0 md:mx-2 my-5 bg-purple-600 text-white rounded-sm font-semibold">
      {showGptSearch ? lang[langKey].home : lang[langKey].askGpt }
    </button>
    <img
      className="mr-2 w-7 cursor-pointer"
      src={LOGOUT}
      alt="Logout button"
      onClick={handleSignOut}
    />
  </div>
  )
}

export default MenuItems