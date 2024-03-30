import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_POSTER, USER_AVATAR } from "../utils/Constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null); // Reference is created by react 'ref' using useRef. Can use state vairables / reference. To reference a tag/field
  const password = useRef(null);

  const toggleSignInForm = () => {
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; // Got from user object
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Header />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black">
        <img
          className="relative w-full h-full -z-10 "
          src={BG_POSTER}
          alt="Netflix_Background_Image"
        />
      </div>
      <div className="w-4/12 min-w-fit p-12 mt-20 bg-black opacity-85 text-white rounded-md">
        <h1 className="font-bold text-3xl mb-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form
          className="flex flex-col w-full"
          onSubmit={(e) => e.preventDefault()}>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
          />
          <p className="text-red-600 font-bold">{errorMessage}</p>
          <button
            className="p-3 my-4 rounded-md bg-red-600 font-semibold w-full"
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-3" onClick={toggleSignInForm}>
          {isSignInForm ? (
            <>
              New to Netflix?{" "}
              <span className="font-semibold hover:underline cursor-pointer">
                Sign Up Now.
              </span>
            </>
          ) : (
            <>
              Already a user?{" "}
              <span className="font-semibold hover:underline cursor-pointer">
                Sign In Now.
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
