import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as userService from "../../services/userService";

const RightBar = ({ currentUser }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [friends, setFriends] = useState([]);

  // const listUser = [
  //   {
  //     id: 1,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1580128660010-fd027e1e587a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  //     username: "Safak Kocaoglu",
  //   },
  //   {
  //     id: 2,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  //     username: "Janell Shrum",
  //   },
  //   {
  //     id: 3,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //     username: "Alex Durden",
  //   },
  //   {
  //     id: 4,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //     username: "Dora Hawks",
  //   },
  //   {
  //     id: 5,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
  //     username: "Thomas Holden",
  //   },
  //   {
  //     id: 6,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  //     username: "Shirley Beauchamp",
  //   },
  //   {
  //     id: 7,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //     username: "Travis Bennett",
  //   },
  //   {
  //     id: 8,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  //     username: "Kristen Thomas",
  //   },
  //   {
  //     id: 9,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1500832333538-837287aad2b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //     username: "Gary Duty",
  //   },
  //   {
  //     id: 10,
  //     profilePicture:
  //       "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1044&q=80",
  //     username: "Safak Kocaoglu",
  //   },
  // ];

  useEffect(() => {
    userService
      .getFollowingUser({ userId: currentUser._id, accessToken: token })
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setFriends(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser._id, token]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-[19px] font-medium">Contacts</p>
        <ul className="flex items-center justify-between">
          <li className="mr-[15px] p-[5px] hover:bg-hoverSidebar cursor-pointer rounded-full">
            <VideoCallIcon />
          </li>
          <li className="mr-[15px] p-[5px] hover:bg-hoverSidebar cursor-pointer rounded-full">
            <SearchIcon />
          </li>
          <li className=" p-[5px] hover:bg-hoverSidebar cursor-pointer rounded-full">
            <MoreHorizIcon />
          </li>
        </ul>
      </div>
      <div>
        {friends.map((item, index) => (
          <div
            className="px-[8px] py-[5px] rounded-[10px] hover:bg-hoverSidebar"
            key={index}
          >
            <Link className="flex flex-row items-center w-full">
              {item.profilePicture ? (
                <img
                  src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${item.profilePicture}`}
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
              <span className="ml-[15px] py-[10px]">{item.username}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RightBar;
