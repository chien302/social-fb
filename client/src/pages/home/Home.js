import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FormPost from "../../components/FormPost/FormPost";
import PostHome from "../../components/PostHome/PostHome";

import RightBar from "../../components/RightBar/RightBar";

import * as postService from "../../services/postService";
import * as userService from "../../services/userService";

const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (!token && !username) {
      navigate("/login");
    }
  }, [currentUser, token, navigate]);

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
  useEffect(() => {
    if (token) {
      postService
        .getFollowingPost({ accessToken: token })
        .then((res) => {
          if (res && res.data && res.data.posts && res.data.posts.length > 0) {
            setPosts(
              res.data.posts.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  // console.log(posts);

  useEffect(() => {
    document.title = "facebook";
  }, [currentUser._id, currentUser.username]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="basis-2/3 px-[40px]">
          <FormPost user={currentUser} />
          <div>
            {posts &&
              posts.length > 0 &&
              posts.map((post) => (
                <PostHome key={post._id} post={post} user={currentUser} />
              ))}
          </div>
        </div>
        <div className="fixed right-[15px] w-[344px]">
          <RightBar currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default Home;
