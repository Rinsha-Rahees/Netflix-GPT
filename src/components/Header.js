import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/Constants";
import MenuItems from "./MenuItems";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [menuClicked, setMenuClicked] = useState(false)

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

  const handleClick = () => {
    setMenuClicked(!menuClicked)
  }

  return (
    <div className="flex fixed justify-between w-full h-fit top-0 p-6 px-6 z-30 bg-black md:bg-transparent md:bg-gradient-to-b from-black text-white">
      <div className="w-28">
        <img 
        className="w-full"
        src={LOGO} alt="Netflix Logo" />
      </div>
      {user && (
        <>
        <div className="hidden md:flex">
          <MenuItems />
        </div>
          <img 
          onClick={handleClick}
          className="flex md:hidden w-7 h-7 cursor-pointer" 
          src="/menu.png"/>
          {menuClicked && <div className="flex md:hidden border border-white rounded-md bg-black w-[80%] h-fit absolute right-5 top-5">
            <img  
            onClick={handleClick}
            className="cursor-pointer w-6 absolute right-3 top-3" 
            src="/close.png" />
            <MenuItems />
          </div>}
        </>
      )}
    </div>
  );
}

export default Header;
