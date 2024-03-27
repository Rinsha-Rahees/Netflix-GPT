import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="flex w-full h-full justify-center">
      <Header />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black">
        <img
          className="relative w-full h-fit -z-10 "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="Netflix_Background_Image"
        />
      </div>
      <div className="w-4/12 min-w-fit absolute top-24 p-12 bg-black opacity-80 text-white rounded-md">
        <h1 className="font-bold text-3xl mb-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form className="flex flex-col w-full">
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-4 w-full bg-slate-800 rounded-md border border-white"
          />
          <button className="p-3 my-4 rounded-md bg-red-700 font-semibold w-full">
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
