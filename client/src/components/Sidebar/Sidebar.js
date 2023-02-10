import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import * as userService from "../../services/userService";

const Sidebar = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const listSidebar = [
    { title: "Groups", icon: Groups2RoundedIcon },
    { title: "Friends", icon: PeopleRoundedIcon, url: "/friends" },
    { title: "Watch", icon: SmartDisplayRoundedIcon },
    { title: "Page", icon: FlagRoundedIcon },
    { title: "Favorites", icon: StarRateRoundedIcon },
    { title: "Questions", icon: HelpRoundedIcon },
    { title: "Jobs", icon: WorkRoundedIcon },
    { title: "Events", icon: InsertInvitationRoundedIcon },
    { title: "Courses", icon: SchoolRoundedIcon },
  ];
  const listGroupSidebar = [
    {
      img: "https://images.unsplash.com/photo-1603815210222-16aed3c10dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
      title: "Khảo thí - KMA",
    },
    {
      img: "https://images.unsplash.com/photo-1608200765700-ba7ff78b6dd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      title: "Giáo dục thể chất KMA (AT17 CT5 DT4)",
    },
    {
      img: "https://images.unsplash.com/photo-1573495612890-430e48b164df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      title: "Tuyển dụng thực tập IT",
    },
    {
      img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Lập Trình C,C++,C#,Java, Python,PHP...",
    },
    {
      img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Hội lầy lội Official",
    },
    {
      img: "https://images.unsplash.com/photo-1612878010854-1250dfc5000a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Nghệ cả vườn",
    },
    {
      img: "https://images.unsplash.com/photo-1618502232228-1c3f0fe786b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "MrBeast",
    },
    {
      img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "ĐÔNG ANH NEWS - GROUP",
    },
    {
      img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Hội lầy lội Official",
    },
    {
      img: "https://images.unsplash.com/photo-1612878010854-1250dfc5000a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Nghệ cả vườn",
    },
    {
      img: "https://images.unsplash.com/photo-1618502232228-1c3f0fe786b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "MrBeast",
    },
    {
      img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "ĐÔNG ANH NEWS - GROUP",
    },
  ];

  const [currentUser, setCurrentUser] = useState({});
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
  return (
    <div className="fixed overflow-y-scroll z-10 top-[56px] bottom-0 left-0  basis-1/4 mt-[15px] hover:overflow-y-auto">
      <div className="border-b-[1px]  border-greyBorder ">
        <span className="flex items-center px-[20px] py-[10px] cursor-pointer hover:bg-hoverSidebar">
          <HomeRoundedIcon className="text-[30px]" />
          <p className="ml-[16px]">Home</p>
        </span>
        <Link
          to={`/profile/${username}`}
          className="flex items-center px-[20px] py-[10px] cursor-pointer hover:bg-hoverSidebar"
        >
          {currentUser.profilePicture ? (
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.profilePicture}`}
              alt=""
              className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
            />
          ) : (
            <img
              src="https://i.stack.imgur.com/l60Hf.png"
              alt=""
              className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
            />
          )}
          <p className="ml-[10px]">{currentUser.username}</p>
        </Link>
      </div>
      <div className="border-b-[1px] border-greyBorder my-[20px]">
        {listSidebar.map((item, index) => (
          <Link
            to={item.url}
            key={index}
            className="flex items-center py-[10px] px-[20px]  cursor-pointer hover:bg-hoverSidebar"
          >
            <item.icon />
            <span className="ml-[16px]">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="my-[20px]">
        {listGroupSidebar.map((item, index) => (
          <div
            key={index}
            className="flex items-center py-[10px] px-[20px]  cursor-pointer hover:bg-hoverSidebar"
          >
            <img
              className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
              src={item.img}
              alt="Group"
            />
            <span className="ml-[16px]">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
