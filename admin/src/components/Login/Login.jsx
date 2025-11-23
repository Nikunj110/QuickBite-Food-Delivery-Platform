import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import {useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const navigate=useNavigate();
  const {admin,setAdmin,token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
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
    const response = await axios.post(url + "/api/user/login", data);
    if (response.data.success) {
      if (response.data.role === "admin") {
        setToken(response.data.token);
        setAdmin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", true);
        toast.success("Login Successfully");
        navigate("/add")
      }else{
        toast.error("You are not an admin");
      }
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(()=>{
    if(admin && token){
       navigate("/add");
    }
  },[])
  return (
    <div className="w-full">
      <div className="max-w-md mx-auto bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm text-neutral-600">Sign in to access the admin panel</p>
        </div>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <input
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <input
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-neutral-800">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
