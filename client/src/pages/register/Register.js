import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "./../../services/authService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    authService
      .register(username, email, password)
      .then((res) => {
        if (res && res.data && res.data.userName) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("userName", JSON.stringify(res.data.userName));
        }
        console.log(res.data.username);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <form className="flex flex-col" onSubmit={handleRegister}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-[400px] p-[15px]  border-[1px] border-greyBorder mb-[18px] rounded-[15px] outline-none"
          />
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
            Sign up
          </button>
          <Link
            to="/login"
            className="text-center mt-[15px] mx-auto py-[15px] text-[16px] leading-none "
          >
            You have account. Let's Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
