import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import * as userService from "../../services/userService";
import Search from "../Search/Search";

const Header = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      userService
        .getProfileUser({ username: username, accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.user) {
            setCurrentUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username, token]);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    document.title = "facebook";
    navigate("/login");
  };
  // console.log(currentUser);

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-[8px] z-40 shadow-lg shadow-indigo-500/40 w-[400px] py-[14px]">
        <div className="mx-[15px]   shadow-lg  rounded-[8px]">
          <Link
            to={`/profile/${currentUser.username}`}
            className="flex items-center p-[14px]  rounded-[8px] hover:bg-hoverColor m-[4px]"
          >
            {currentUser.profilePicture ? (
              <img
                src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.profilePicture}`}
                alt=""
                className="w-[40px] h-[40px] mr-[12px] object-cover rounded-full cursor-pointer"
              />
            ) : (
              <img
                src="https://i.stack.imgur.com/l60Hf.png"
                alt=""
                className="w-[40px] h-[40px] mr-[12px] object-cover rounded-full cursor-pointer"
              />
            )}
            <span className="text-[20px] font-medium">
              {currentUser.username}
            </span>
          </Link>
          <div className="py-[14px] mx-[14px] border-t-[2px] border-y-greyBorder">
            <p className="cursor-pointer text-primary text-[17px] font-medium">
              See all profiles
            </p>
          </div>
        </div>
        <ul tabIndex="-1" className="cursor-pointer  mt-[20px] ">
          <li className="py-[13px] px-[15px] mb-[6px]  hover:bg-hoverColor rounded-[8px]  mx-[5px]">
            <Link to="/update" className="py-[13px] pr-[150px]">
              <SettingsIcon className="p-[2px] mr-[10px] bg-hoverSidebar rounded-full" />
              <span>Setting & privacy</span>
            </Link>
          </li>
          <li
            className="py-[13px] px-[15px]  hover:bg-hoverColor rounded-[8px]  mx-[5px]"
            onClick={handleSignOut}
          >
            <Link className="py-[13px] pr-[250px]">
              <LogoutIcon className="p-[2px] mr-[10px] bg-hoverSidebar rounded-full" />
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-row flex-wrap px-[15px] mt-[6px]">
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Privacy -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Terms -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Advertising -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Ad Choices -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Cookies -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            More -
          </li>
          <li className="mr-[5px] text-[14px] text-iconColor cursor-pointer hover:underline decoration-1">
            Meta © 2023 -
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div
      className="fixed z-20  top-0 left-0 right-0 flex items-center justify-between h-[56px]
     bg-primary px-[20px]"
    >
      <Link to="/" className="">
        <span className="text-white leading-none text-[26px] font-bold cursor-pointer">
          Facebook
        </span>
      </Link>
      <div className="w-2/5">
        <Search />
      </div>
      <div className="flex items-center">
        {/* <div className="relative mr-[20px] cursor-pointer">
          <SmsRoundedIcon className="text-white" />
          <span className="absolute top-[-8px] right-[-8px]  w-[16px] h-[16px] rounded-full bg-red text-[12px] text-white leading-none flex items-center justify-center">
            2
          </span>
        </div>
        <div className="relative mr-[20px] cursor-pointer">
          <NotificationsRoundedIcon className="text-white" />
          <span className="absolute top-[-8px] right-[-8px]  w-[16px] h-[16px] rounded-full bg-red text-[12px] text-white leading-none flex items-center justify-center">
            10
          </span>
        </div> */}
        {currentUser.profilePicture ? (
          <Tippy render={renderPreview} interactive placement="bottom-start">
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.profilePicture}`}
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
            />
          </Tippy>
        ) : (
          <Tippy render={renderPreview} interactive placement="bottom-start">
            <img
              src="https://i.stack.imgur.com/l60Hf.png"
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
              onClick={handleSignOut}
            />
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default Header;
