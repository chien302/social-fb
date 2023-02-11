import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as authService from "./../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const currentUser = localStorage.getItem("username");
    if (!currentUser) {
      authService
        .login(email, password)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("userName", JSON.stringify(res.data.userName));

          document.title = "facebook";
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="mr-[12px]">
        <h1 className="text-[60px] text-primary font-bold">facebook</h1>
        <p className="text-[25px] font-normal">
          Facebook helps you connect and share <br></br> with the people in your
          life
        </p>
      </div>
      <div className="p-[20px] bg-white ml-[12px] rounded-[15px]">
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            placeholder="Email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-[400px] p-[15px]  border-[1px] border-greyBorder mb-[18px] rounded-[15px] outline-none"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="p-[15px]  border-[1px] border-greyBorder mb-[18px] rounded-[15px] outline-none"
          />
          <button
            type="submit"
            className="py-[15px] bg-primary rounded-[15px] text-white text-[20px] leading-none"
          >
            Log in
          </button>
          <Link
            to="forgot-password"
            className="text-center mt-[8px] text-[15px] text-primary"
          >
            Forgotten Password
          </Link>
          <Link
            to="/register"
            className="text-center mt-[15px] bg-greenColor w-[60%] mx-auto  border-t-[1px] border-greyBorder py-[15px] text-white text-[18px] leading-none rounded-[15px]"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
