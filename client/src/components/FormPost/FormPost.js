import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormData from "form-data";
import PermMediaRoundedIcon from "@mui/icons-material/PermMediaRounded";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import * as uploadService from "../../services/uploadService";
import axios from "axios";
const FormPost = ({ user }) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    let newPost = {
      userId: user._id,
      desc: desc,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      console.log(fileName);
      console.log(newPost);

      uploadService
        .uploadFile({ data: data, accessToken: token })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/post`,
      data: newPost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(options);
    window.location.reload(true);
    // postService
    //   .createPost({ newPost: newPost, accessToken: token })
    //   .then((res) => {
    //     console.log(res);
    //     window.location.reload(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className=" px-[15px] py-[15px] rounded-[15px] shadow-lg shadow-indigo-500/40  bg-white mb-[25px]">
      <div className="flex items-center mb-[20px] pb-[20px] border-b-[1px] border-greyBorder">
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
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={`What's on your mind, ${user.username}?`}
          className="ml-[15px] outline-none w-full"
        />
      </div>
      <form
        onSubmit={handleSubmitPost}
        className="flex justify-between items-center"
      >
        <ul className="flex 	">
          <label
            htmlFor="file"
            className="mr-[15px] py-[8px] px-[10px] rounded-[8px] hover:bg-hoverColor cursor-pointer"
          >
            <PermMediaRoundedIcon htmlColor="tomato" />
            <span className="ml-[5px]">Photo or Video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <li className="mr-[15px] py-[8px] px-[10px] rounded-[8px] hover:bg-hoverColor cursor-pointer">
            <LabelIcon htmlColor="blue" />
            <span className="ml-[5px]">Tag</span>
          </li>
          <li className="mr-[15px] py-[8px] px-[10px] rounded-[8px] hover:bg-hoverColor cursor-pointer">
            <LocationOnIcon htmlColor="green" />
            <span className="ml-[5px]">Location</span>
          </li>
          <li className="mr-[15px] py-[8px] px-[10px] rounded-[8px] hover:bg-hoverColor cursor-pointer">
            <EmojiEmotionsIcon htmlColor="goldenrod" />
            <span className="ml-[5px]">Fellings</span>
          </li>
        </ul>
        <button
          type="submit"
          className="py-[10px] px-[30px] cursor-pointer bg-primary text-white rounded-[8px]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default FormPost;
