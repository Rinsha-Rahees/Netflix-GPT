import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/Constants";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        // navigate("/error")
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {   // Listens for this event
      if (user) {
        const {uid, email, displayName, photoURL} = user // Got from user object
        dispatch(addUser({uid, email, displayName, photoURL})) // Once user signed in -> Navigate to browse page  
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });

    // Unsubscribes when component unmounts -> onAuthStateChanged already returns an unsubscribe fn
    return () => unsubscribe()
  },[])

  return (
    <div className="flex justify-between w-full h-fit absolute top-0 p-6 px-6 z-10 bg-black md:bg-transparent text-white">
      <div className="w-28">
        <img
          src= {LOGO}
          alt="Netflix Logo"
        />
      </div>
      {user && (
        <div className="flex items-center">
          <img className="w-6 h-6" src={user?.photoURL} alt="Profile Photo Avatar" />
          <button onClick={handleSignOut} className="w-28 font-bold">
            ( Sign Out )
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
