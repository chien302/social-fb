import React, { useState } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublicIcon from "@mui/icons-material/Public";
import * as uploadService from "../../services/uploadService";
const Background = ({ currentUser, loginUser }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const [showMenu, setShowMenu] = useState(false);
  const [changePic, setChangePic] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);

  const [file, setFile] = useState("");
  const [previewCoverPicture, setPreviewCoverPicture] = useState("");
  const [previewAvatarPicture, setPreviewAvatarPicture] = useState("");

  const [coverPic, setCoverPic] = useState("");

  const handleShowMenu = (e) => {
    setShowMenu(!showMenu);
  };
  const handlePreviewCoverPicture = (e) => {
    setChangePic(!changePic);
    const file = e.target.files[0];
    setCoverPic(file);
    file.preview = URL.createObjectURL(file);
    setPreviewCoverPicture(file);
    e.target.value = null;
  };

  const handlePreviewAvatar = (e) => {
    setChangeAvatar(!changeAvatar);
    const files = e.target.files[0];
    setFile(files);
    files.preview = URL.createObjectURL(files);

    setPreviewAvatarPicture(files);
    console.log(previewAvatarPicture);
    e.target.value = null;
  };

  const handleUpdateCoverPicture = async (e) => {
    e.preventDefault();
    let filename;
    if (coverPic) {
      const data = new FormData();
      filename = Date.now() + coverPic.name;
      data.append("name", filename);
      data.append("file", coverPic);
      uploadService
        .uploadFile({ data: data, accessToken: token })
        .then((res) => {
          if (res) {
            // setImgPreview(filename);
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const cover = {
      coverPicture: filename,
    };
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/user/${currentUser._id}`,
      data: cover,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(options);
    window.location.reload(true);
    return res;
  };
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    let filename;
    if (file) {
      const data = new FormData();
      filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      uploadService
        .uploadFile({ data: data, accessToken: token })
        .then((res) => {
          if (res) {
            // setImgPreview(filename);
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const avatar = {
      profilePicture: filename,
    };
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/user/${currentUser._id}`,
      data: avatar,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(options);
    window.location.reload(true);
  };

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
        const res = await axios(options);
        window.location.reload(true);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative mb-[100px]">
        {currentUser.coverPicture && !changePic && (
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.coverPicture}`}
            alt=""
            className="relative h-[348px] w-full object-cover rounded-b-[15px]"
          />
        )}
        {!currentUser.coverPicture && !changePic && (
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.coverPicture}`}
            alt=""
            className="relative h-[348px] w-full object-cover rounded-b-[15px]"
          />
        )}
        {previewCoverPicture && previewCoverPicture.preview && (
          <img
            src={previewCoverPicture.preview}
            alt=""
            className="relative h-[348px] w-full object-cover rounded-b-[15px]"
          />
        )}

        {previewCoverPicture && (
          <div className="absolute top-0  bg-darkOverlay flex justify-between items-center w-full px-[20px] py-[15px]">
            <div className="text-white">
              <PublicIcon />
              <span>Your cover photo is public.</span>
            </div>
            <div className="text-white">
              <button
                className="bg-secondButton px-[30px] py-[10px] rounded-[10px]"
                onClick={() => {
                  setPreviewCoverPicture("");
                  setChangePic(!changePic);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary px-[30px] py-[10px] rounded-[10px] ml-[15px]"
                onClick={handleUpdateCoverPicture}
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {!changePic && currentUser.username === username && (
          <form>
            <label htmlFor="file3">
              <div
                className="absolute flex items-center cursor-pointer bottom-[20px] 
        right-[40px] px-[12px] py-[8px] rounded-[10px] bg-greyBorder hover:opacity-90"
              >
                <LocalSeeIcon className="p-[1.5px]" />
                <span className="ml-[5px] text-[18px] font-normal">
                  Edit cover photo
                </span>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="file3"
                name="file3"
                accept=".png,.jpeg,.jpg"
                onChange={handlePreviewCoverPicture}
              />
            </label>
          </form>
        )}

        <div className=" flex flex-col items-center absolute translate-y-[-50%] translate-x-1/2 right-1/2">
          {currentUser.profilePicture ? (
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${currentUser.profilePicture}`}
              alt=""
              className="opacity-100 w-[168px] h-[168px] border-[3px] border-white rounded-full object-cover cursor-pointer "
            />
          ) : (
            <img
              src="https://i.stack.imgur.com/l60Hf.png"
              alt=""
              className="opacity-100 w-[168px] h-[168px] border-[3px] border-white rounded-full object-cover cursor-pointer "
            />
          )}
          {username === currentUser.username && (
            <span
              onClick={handleShowMenu}
              className="absolute right-0 bottom-14 bg-hoverSidebar border-[1px] rounded-full w-[30px] h-[30px] cursor-pointer flex items-center justify-center"
            >
              <LocalSeeIcon className="p-[1.5px]" />
            </span>
          )}

          <h2 className="text-[30px] font-bold">{currentUser.username}</h2>
        </div>
        {currentUser.username !== username && (
          <div className="absolute right-0 mt-11 flex">
            <div
              className={`mx-[15px] px-[25px] py-[6px] ${
                loginUser?.followings?.includes(currentUser._id)
                  ? "bg-hoverSidebar hover:bg-greyBorder"
                  : "bg-primary"
              }  rounded-[10px] cursor-pointer hover:bg-opacity-90`}
              onClick={() => handleFollowUser(currentUser._id)}
            >
              {/* {loading ? (
                <div>loading</div>
              ) : ( */}
              <button
                className={`${
                  loginUser?.followings?.includes(currentUser._id)
                    ? "font-medium"
                    : "text-white"
                }  text-[17px]`}
              >
                {loginUser?.followings?.includes(currentUser._id)
                  ? `Following`
                  : `Follow`}

                {loginUser?.followings?.includes(currentUser._id) ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  ""
                )}
              </button>
              {/* )} */}
            </div>
            <div
              className={`px-[25px] py-[6px] ${
                !loginUser?.followings?.includes(currentUser._id)
                  ? "bg-hoverSidebar hover:bg-greyBorder"
                  : "bg-primary"
              }  rounded-[10px] cursor-pointer hover:bg-opacity-90`}
            >
              <button
                className={`${
                  !loginUser?.followings?.includes(currentUser._id)
                    ? "font-medium"
                    : "text-white"
                }  text-[17px]`}
              >
                Message
              </button>
            </div>
          </div>
        )}
      </div>

      {showMenu && (
        <form className="absolute right-[50%] top-[20%] px-[20px] py-[20px]  w-[700px] translate-x-[50%] shadow-lg shadow-indigo-500/40 bg-white rounded-[15px]">
          <label htmlFor="file2">
            <div
              className="py-[10px] px-[15px] mx-[20px] mt-[20px] cursor-pointer rounded-[10px] bg-blueLighter
             flex items-center justify-center hover:bg-hoverColor"
            >
              <CloudUploadIcon className="text-primary" />
              <span className="text-primary ml-[10px]">Upload Photo</span>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              id="file2"
              name="file2"
              accept=".png,.jpeg,.jpg"
              onChange={handlePreviewAvatar}
            />
          </label>

          {previewAvatarPicture && previewAvatarPicture.preview && (
            <div className="flex justify-center  rounded-full  mt-[40px]">
              <img
                src={previewAvatarPicture.preview}
                alt="no img"
                className="rounded-full w-[250px] h-[250px] object-cover border-[1px] border-hoverItem"
              />
            </div>
          )}

          <div className="text-right mt-[20px]">
            <button
              className="py-[8px] px-[10px] w-[90px] text-[18px] mr-[20px] bg-white text-primary rounded-[10px] hover:bg-hoverColor"
              onClick={() => {
                setShowMenu(!showMenu);
                setChangeAvatar(!changeAvatar);
                setPreviewAvatarPicture("");
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleUploadPhoto}
              className="py-[8px] px-[10px] w-[90px] text-[18px]  bg-primary rounded-[10px] text-white"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Background;
