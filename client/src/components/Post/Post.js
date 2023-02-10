import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import RecommendIcon from "@mui/icons-material/Recommend";
import * as postService from "../../services/postService";
const Post = ({ post, user }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const date = new Date(post.updatedAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  let thang = month;
  switch (thang) {
    case 1:
      thang = "January";
      break;
    case 2:
      thang = "February";
      break;
    case 3:
      thang = "March";
      break;
    case 4:
      thang = "April";
      break;
    case 5:
      thang = "May";
      break;
    case 6:
      thang = "June";
      break;
    case 7:
      thang = "July";
      break;
    case 8:
      thang = "August";
      break;
    case 9:
      thang = "September";
      break;
    case 10:
      thang = "October";
      break;
    case 11:
      thang = "November";
      break;
    case 12:
      thang = "December";
      break;
    default:
  }
  const handleDeletePost = async () => {
    if (window.confirm("Do you want delete post?") === true) {
      postService
        .deletePost({ postId: post._id, accessToken: token })
        .then((res) => {
          console.log(res);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleLikePost = async () => {
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/post/${post._id}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios(options);
      window.location.reload(true);
    } catch (error) {}
  };

  return (
    <div className=" bg-white rounded-[15px] shadow-lg shadow-indigo-500/40  mb-[25px]">
      {user && (
        <>
          <div className="flex flex-row items-center justify-between pt-[20px] pb-[12px] px-[15px]">
            <div className="flex flex-row items-center">
              <Link to={`/profile/${user.username}`}>
                {user.profilePicture ? (
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${user.profilePicture}`}
                    alt=""
                    className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <img
                    src="https://i.stack.imgur.com/l60Hf.png"
                    alt=""
                    className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
                  />
                )}
              </Link>
              <span className="flex flex-col ml-[10px]">
                <Link to={`/profile/${user.username}`}>
                  <h3 className="text-[16px] font-semibold leading-2">
                    {user.username}
                  </h3>
                </Link>
                <p className="text-[13px]">{`${thang} ${day}`}</p>
              </span>
            </div>
            <div>
              <span>
                <MoreHorizIcon
                  style={{ fontSize: "32px" }}
                  className="mr-[20px] cursor-pointer hover:bg-hoverColor rounded-full"
                />
              </span>
              <span onClick={handleDeletePost}>
                <ClearIcon
                  style={{ fontSize: "32px" }}
                  className="mr-[14px] cursor-pointer hover:bg-hoverColor rounded-full"
                />
              </span>
            </div>
          </div>
        </>
      )}
      {post && (
        <>
          <div className=" px-[15px]">
            <h4 className="text-[16px] font-normal mb-[16px]">{post.desc}</h4>
          </div>
          <div className="mb-[40px] border-t-[1px] border-greyBorder">
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${post.img}`}
              alt=""
              className="w-full h-[750px] object-cover"
            />
          </div>
          <div className=" px-[15px]">
            <ul className="flex flex-row justify-center   border-t-[1px] border-t-greyBorder">
              <li
                onClick={handleLikePost}
                className="relative basis-1/3 text-center py-[8px] my-[5px] rounded-[10px] cursor-pointer hover:bg-backGroundColor"
              >
                <ThumbUpOffAltIcon
                  className={
                    post.likes.includes(user._id) ? "text-primary" : ""
                  }
                />
                <span
                  className={`ml-[5px] font-semibold ${
                    post.likes.includes(user._id) ? "text-primary" : ""
                  }`}
                >
                  Like
                </span>
                {post.likes.length > 0 && (
                  <div className="absolute top-[-35px] left-0 flex items-center">
                    <RecommendIcon htmlColor="blue" />
                    <span className="ml-[8px]">{post.likes.length}</span>
                  </div>
                )}
              </li>
              <li className="basis-1/3 text-center py-[8px] my-[5px] rounded-[10px] cursor-pointer hover:bg-backGroundColor">
                <ChatBubbleOutlineIcon />
                <span className="ml-[5px] font-semibold">Comment</span>
              </li>
              <li className="relative basis-1/3 text-center py-[8px] my-[5px] rounded-[10px] cursor-pointer hover:bg-backGroundColor">
                <ReplyIcon />
                <span className="ml-[5px] font-semibold">Share</span>
                <div className="absolute top-[-35px] right-0 flex items-center">
                  <span className="mr-[15px]">102 comments</span>
                  <span> 25 shares</span>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
