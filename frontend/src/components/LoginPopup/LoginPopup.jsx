import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully")
      setShowLogin(false);
    }else{
      toast.error(response.data.message);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 grid bg-black/70 backdrop-blur-sm">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[90vw] max-w-[420px] bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
      >
        <div className="flex items-center justify-between text-black mb-8">
          <h2 className="text-2xl font-bold">{currentState}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img
              src={assets.cross_icon}
              alt="Close"
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="space-y-6">
          {currentState === "Login" ? (
            <></>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-800 transition-all mt-8"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-start gap-3 mt-6">
          <input type="checkbox" required className="mt-1 rounded border-gray-300" />
          <p className="text-sm text-gray-600">By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <div className="mt-6 text-center">
          {currentState === "Login" ? (
            <p className="text-gray-600">
              Create a new account?{" "}
              <button 
                type="button"
                onClick={() => setCurrentState("Sign Up")} 
                className="text-black font-semibold hover:underline cursor-pointer"
              >
                Click here
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => setCurrentState("Login")} 
                className="text-black font-semibold hover:underline cursor-pointer"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
