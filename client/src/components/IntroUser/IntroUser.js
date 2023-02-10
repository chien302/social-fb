import React, { useState } from "react";
import axios from "axios";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PublicIcon from "@mui/icons-material/Public";
import RssFeedIcon from "@mui/icons-material/RssFeed";
const IntroUser = ({ data }) => {
  // console.log(data);
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));
  const [bio, setBio] = useState();
  const [showMenu, setShowMenu] = useState(false);
  // const [valueReducer, forceUpdate] = useReducer((x) => x + 1, 0);

  // console.log(data);
  const handleAddBio = () => {
    setShowMenu(!showMenu);
  };
  const handleUpdateBio = async () => {
    const newDesc = {
      desc: bio,
    };
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/user/${data._id}`,
      data: newDesc,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(options);
    setShowMenu(!showMenu);
    window.location.reload(true);
    // forceUpdate();
    return res;
  };

  return (
    <div className="flex flex-col px-[20px] py-[20px] bg-white rounded-[15px] border-[1px] border-hoverSidebar">
      <strong className="text-[26px] font-semibold ">Intro</strong>

      {showMenu ? (
        <div className="mt-[20px]">
          <label>
            <textarea
              className="outline-none border-[1px] w-full rounded-[8px]
               text-center border-greyBorder bg-backGroundColor px-[15px] py-[8px]"
              rows="4"
              cols="50"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            >
              {data.desc}
            </textarea>
          </label>
          <div className="text-right">
            <span className="text-[15px] text-hoverBlueLighter">
              87 characters remaining
            </span>
          </div>
          <div className="flex items-center justify-between mt-[8px]">
            <div className="flex items-center text-[19px]">
              <PublicIcon />
              <span className="font-medium ml-[8px]">Public</span>
            </div>
            <div className="text-[17px]">
              <button
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                className="px-[14px] py-[8px] bg-greyBorder font-medium rounded-[8px]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBio}
                className="px-[14px] py-[8px] bg-greyBorder font-medium rounded-[8px] ml-[10px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            {data.desc ? (
              <span className="text-center pt-[6px]">{data.desc}</span>
            ) : (
              ""
            )}
            {data.username === username && (
              <button
                className="w-full px-[15px] py-[8px] mt-[14px] bg-hoverSidebar rounded-[8px] hover:bg-greyBorder"
                onClick={handleAddBio}
              >
                Add bio
              </button>
            )}
          </div>
        </>
      )}

      <ul>
        <li className="flex items-center mt-[15px] justify-between">
          <div className="">
            <HouseIcon className="text-iconColor" />
            <span className="ml-[12px] text-textColor">City: {data.city}</span>
          </div>
        </li>
        <li className="flex items-center mt-[15px] justify-between">
          <div className="">
            <LocationOnIcon className="text-iconColor" />
            <span className="ml-[12px] text-textColor">From: {data.from}</span>
          </div>
        </li>
        <li className="flex items-center mt-[15px]">
          <FavoriteIcon className="text-iconColor" />
          <span className="ml-[12px] text-textColor">Relationship: Single</span>
        </li>
        {data && data.followers && data.followers.length > 0 && (
          <li className="flex items-center mt-[15px]">
            <RssFeedIcon className="text-iconColor" />
            <span className="ml-[12px] text-textColor">
              Followed by: {data?.followers.length} people
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default IntroUser;
