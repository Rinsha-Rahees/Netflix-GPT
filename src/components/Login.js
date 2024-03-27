import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            photoURL:
              "https://e7.pngegg.com/pngimages/168/827/png-clipart-computer-icons-user-profile-avatar-profile-woman-desktop-wallpaper-thumbnail.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; // Got from user object
              dispatch(
                addUser({ 
                  uid, 
                  email, 
                  displayName, 
                  photoURL 
                })); // Once user signed in -> Navigate to browse page
              navigate("/browse");
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
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="flex w-full h-full justify-center">
      <Header />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black">
        <img
          className="relative w-full h-full -z-10 "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="Netflix_Background_Image"
        />
      </div>
      <div className="w-4/12 min-w-fit absolute top-24 p-12 bg-black opacity-85 text-white rounded-md">
        <h1 className="font-bold text-3xl mb-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col w-full">
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
            className="p-3 my-4 rounded-md bg-red-700 font-semibold w-full"
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="my-4" onClick={toggleSignInForm}>
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
