import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CakeIcon from "@mui/icons-material/Cake";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import * as userService from "../../services/userService";
const Friends = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [loginUser, setloginUser] = useState({});

  useEffect(() => {
    if (token) {
      userService
        .getProfileUser({ username: username, accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.user) {
            setloginUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

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
  // console.log(currentUser.followings);

  useEffect(() => {
    userService
      .getAllAccountUser({ accessToken: token })
      .then((res) => {
        if (res && res.data && res.data.user) {
          setAllUsers(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, token]);
  // console.log(allUsers);
  const strangerPeople = allUsers.filter((user) => {
    return (
      currentUser &&
      currentUser.followings &&
      !currentUser.followings.includes(user._id)
    );
  });
  // console.log(strangerPeople);

  // console.log(followed);
  const handleFollowUser = async (userid) => {
    try {
      if (loginUser?.followings?.includes(currentUser._id)) {
        const options = {
          method: "PUT",
          url: `${process.env.REACT_APP_BASE_URL}/user/${userid}/unfollow`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios(options);
        window.location.reload(true);
        return res;
      } else {
        const options = {
          method: "PUT",
          url: `${process.env.REACT_APP_BASE_URL}/user/${userid}/follow`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios(options);
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row justify-between ">
      <div className="basis-1/4 px-[20px] py-[20px] bg-white h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold">Friends</h1>
          <div
            className="w-10 h-10 bg-backGroundColor 
          flex items-center justify-center rounded-full cursor-pointer hover:bg-hoverSidebar"
          >
            <SettingsIcon />
          </div>
        </div>
        <ul className="mt-[15px]">
          <li className="flex items-center  px-[20px] py-[15px] bg-backGroundColor rounded-[8px] cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-[10px]">
              <GroupIcon className="  text-white flex items-center justify-center cursor-pointer" />
            </div>
            <span className="text-[20px] font-medium">Home</span>
          </li>
          <li className="flex items-center justify-between px-[20px] py-[15px] hover:bg-backGroundColor rounded-[8px] cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-greyBorder flex items-center justify-center mr-[10px]">
                <Diversity1Icon />
              </div>
              <span className="text-[20px] font-medium">All friends</span>
            </div>
            <KeyboardArrowRightIcon />
          </li>
          <li className="flex items-center justify-between px-[20px] py-[15px] hover:bg-backGroundColor rounded-[8px] cursor-pointer ">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-greyBorder flex items-center justify-center mr-[10px]">
                <CakeIcon />
              </div>
              <span className="text-[20px] font-medium">Birthdays</span>
            </div>
            <KeyboardArrowRightIcon />
          </li>
        </ul>
      </div>
      <div className="basis-3/4  pt-[40px] pr-[20px] pl-[40px]">
        <div className="flex justify-between items-center mb-[20px]">
          <p className="text-[26px] font-semibold">People You May Know</p>
          <Link className="text-primary text-[16px]">See all</Link>
        </div>
        <ul className="grid gap-6  grid-cols-5">
          {strangerPeople &&
            strangerPeople.length > 0 &&
            strangerPeople.map((user) => (
              <li
                className="bg-white rounded-[8px] border-[1px] shadow-xl border-greyBorder"
                key={user._id}
              >
                <Link to={`/profile/${user.username}`}>
                  {user.profilePicture ? (
                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${user.profilePicture}`}
                      alt=""
                      className="w-full h-[240px] object-cover rounded-tl-[8px]
                       rounded-tr-[8px] cursor-pointer border-b-[1px] border-b-greyBorder"
                    />
                  ) : (
                    <img
                      src="https://i.stack.imgur.com/l60Hf.png"
                      alt=""
                      className="w-full h-[240px] object-cover rounded-tl-[8px]
                       rounded-tr-[8px] cursor-pointer border-b-[1px] border-b-greyBorder"
                    />
                  )}
                </Link>
                <div
                  className="relative  mx-[15px] my-[5px] cursor-pointer
                mb-[25px] hover:underline"
                >
                  <p className="text-[20px] font-medium mb-[6px] pb-[6px]">
                    {user.username}
                  </p>
                  {user.followings && user.followings.length > 0 && (
                    <div className="absolute bottom-[-18px] text-hoverItem text-[15px] font-light">
                      {user.followings.length}{" "}
                      {user.followings.length === 1
                        ? "following"
                        : "followings"}
                    </div>
                  )}
                </div>
                <div
                  className="bg-blueLighter text-center mx-[15px] py-[8px] 
             rounded-[6px] cursor-pointer hover:bg-hoverBlueLighter"
                  onClick={() => handleFollowUser(user._id)}
                >
                  <button className="w-full text-primary text-[18px] font-medium ">
                    {loginUser?.followings?.includes(currentUser._id)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>

                <div
                  className="bg-backGroundColor text-center mx-[15px] my-[10px] py-[8px] 
            rounded-[6px] cursor-pointer hover:bg-hoverSidebar"
                >
                  <button className="w-full text-black text-[18px] font-medium ">
                    Remove
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
