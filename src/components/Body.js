import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"

const Body = () => {

  const dispatch = useDispatch()

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user // Got from user object
        dispatch(addUser({uid, email, displayName, photoURL})) // Once user signed in -> Navigate to browse page  
      } else {
        // User is signed out
        dispatch(removeUser())
      }
    });
  },[])

  return (
    <div className="w-full h-screen">
      <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
