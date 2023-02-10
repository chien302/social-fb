import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../services/userService";

const FriendsUser = ({ currentUser }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (token && currentUser) {
      userService
        .getFollowingUser({ userId: currentUser._id, accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            setFriends(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser._id, token]);
  // console.log(friends);
  return (
    <div className="flex flex-col px-[20px] mt-[20px] py-[20px] bg-white rounded-[15px] border-[1px] border-hoverSidebar left-bar mb-[100px]">
      <strong className="text-[26px] font-semibold">Followings</strong>
      {friends.length > 0 && (
        <>
          <span className="text-[15px] pb-[10px]">
            {friends.length} Followings
          </span>
        </>
      )}
      <div className=" grid gap-x-8 gap-y-4 grid-cols-3">
        {friends.map((friend) => (
          <Link key={friend._id} to={`/profile/${friend.username}`}>
            {friend.profilePicture ? (
              <img
                src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${friend.profilePicture}`}
                alt=""
                className="w-full h-[106px] object-cover rounded-[8px] shadow-md"
              />
            ) : (
              <img
                src="https://i.stack.imgur.com/l60Hf.png"
                alt=""
                className="w-full h-[106px] object-cover rounded-[8px] shadow-md"
              />
            )}
            <h3 className="mt-[5px] text-[14px] font-medium leading-none">
              {friend.username}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendsUser;
