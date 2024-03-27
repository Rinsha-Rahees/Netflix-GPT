import React from "react";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // navigate("/error")
      });
  };

  return (
    <div className="flex justify-between w-full h-fit p-4 z-10 text-white">
      <div className="w-28">
        <img
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>
      {user && (
        <div className="flex items-center">
          <img className="w-6 h-6" src={user?.photoURL} alt="Profile Photo" />
          <button onClick={handleSignOut} className="w-28 p-1 font-bold">
            ( Sign Out )
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
