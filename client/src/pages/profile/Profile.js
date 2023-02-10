import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormPost from "../../components/FormPost/FormPost";
import Background from "../../components/Background/Background";
import Post from "../../components/Post/Post";
import IntroUser from "../../components/IntroUser/IntroUser";
import FriendsUser from "../../components/FriendsUser/FriendsUser";
import * as userService from "../../services/userService";
import * as postService from "../../services/postService";
import "./Profile.css";
const Profile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const params = useParams();
  const [profilePosts, setProfilePosts] = useState([]);
  const [file, setFile] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [previewCoverPicture, setPreviewCoverPicture] = useState("");
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
        .getProfileUser({ username: params.username, accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.user) {
            setCurrentUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.username, token, file]);
  // console.log(currentUser);

  useEffect(() => {
    if (token) {
      postService
        .getProfilePost({ username: params.username, accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.posts && res.data.posts.length > 0) {
            setProfilePosts(
              res.data.posts.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.username, token]);

  useEffect(() => {
    document.title = currentUser.username;
    return () => {
      document.title = "";
    };
  }, [currentUser._id, currentUser.username]);

  useEffect(() => {
    return () => {
      previewCoverPicture && URL.revokeObjectURL(previewCoverPicture.preview);
    };
  }, [previewCoverPicture]);

  return (
    <div className="relative flex justify-center flex-col w-3/5 m-auto ">
      <Background currentUser={currentUser} loginUser={loginUser} />
      <div className="flex flex-row mt-[20px] pt-[30px] border-t-[1px] border-hoverSidebar">
        <div className=" w-2/5 pr-[12px]">
          <IntroUser data={currentUser} />
          <FriendsUser currentUser={currentUser} />
        </div>
        <div className="w-3/5 pl-[12px] ">
          {currentUser.username === username && <FormPost user={currentUser} />}

          <div className="">
            {profilePosts &&
              profilePosts.length > 0 &&
              profilePosts.map((post) => (
                <Post key={post._id} post={post} user={currentUser} />
              ))}
            {profilePosts.length === 0 && (
              <div className="text-center text-[24px] font-semibold bg-white rounded-[15px] border-[1px] border-hoverSidebar py-[15px]">
                No Posts Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
