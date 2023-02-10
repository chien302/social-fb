import React, { useState } from "react";
import axios from "axios";
import * as userService from "../../services/userService";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import TabletAndroidOutlinedIcon from "@mui/icons-material/TabletAndroidOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import "./Update.css";
const Update = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const [currentUser, setCurrentUser] = useState({});

  const [editFrom, setEditFrom] = useState(false);
  const [editCity, setEditCity] = useState(false);

  const [from, setFrom] = useState(currentUser?.from);
  const [city, setCity] = useState(currentUser?.city);

  document.title = "settings";

  userService
    .getProfileUser({ username: username, accessToken: token })
    .then((res) => {
      if (res && res.data && res.data.user) {
        setCurrentUser(res.data.user);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const handleUpdateFrom = async () => {
    console.log(123);

    setEditFrom(!editFrom);
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/user/${currentUser._id}`,
      data: { from },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(options);
  };
  const handleUpdateCity = async () => {
    console.log(123);
    setEditCity(!editCity);
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/user/${currentUser._id}`,
      data: { city },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(options);
  };
  return (
    <div className="flex flex-row  h-screen">
      <div className=" px-[15px] basis-1/4 pb-[20px] border-r-[4px] border-greyBorder">
        <header className="fixed text-[28px] font-semibold mt-[25px] w-full">
          Settings
        </header>
        <div
          className="fixed overflow-y-scroll top-[116px] bottom-0 left-0  
        pr-[88px] mt-[15px] ml-[30px]"
        >
          <ul className=" border-b-[1px] border-greyBorder py-[8px]">
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer bg-hoverSidebar hover:bg-hoverSidebar rounded-[6px]">
              <SettingsOutlinedIcon />
              <span className="ml-[10px]">General</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <VerifiedUserOutlinedIcon />
              <span className="ml-[10px]">Security and login</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <FacebookRoundedIcon />
              <span className="ml-[10px]">Your Facebook information</span>
            </li>
          </ul>
          <ul className="border-b-[1px] border-greyBorder py-[8px]">
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <LockPersonOutlinedIcon />
              <span className="ml-[10px]">Privacy</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <LocalOfferOutlinedIcon />
              <span className="ml-[10px]">Profile and tagging</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <MarkUnreadChatAltOutlinedIcon />
              <span className="ml-[10px]">Public posts</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <NoAccountsIcon />
              <span className="ml-[10px]">Blocking</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <LocationOnOutlinedIcon />
              <span className="ml-[10px]">Location</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <LanguageOutlinedIcon />
              <span className="ml-[10px]">Language and Region</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <AutoStoriesOutlinedIcon />
              <span className="ml-[10px]">Stories</span>
            </li>
          </ul>

          <ul className="border-b-[1px] border-greyBorder py-[8px]">
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <NotificationsOutlinedIcon />
              <span className="ml-[10px]">Notifications</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <PhoneIphoneOutlinedIcon />
              <span className="ml-[10px]">Mobile</span>
            </li>
          </ul>
          <ul className="border-b-[1px] border-greyBorder py-[8px]">
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <ViewInArOutlinedIcon />
              <span className="ml-[10px]">Apps and Websites</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <BusinessCenterOutlinedIcon />
              <span className="ml-[10px]">Business Integrations</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <TabletAndroidOutlinedIcon />
              <span className="ml-[10px]">Ads</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <CreditCardOutlinedIcon />
              <span className="ml-[10px]">Ads Payments</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <CreditScoreOutlinedIcon />
              <span className="ml-[10px]">Orders and payments</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <ContactSupportOutlinedIcon />
              <span className="ml-[10px]">Support Inbox</span>
            </li>
            <li className="py-[10px] px-[10px] flex items-center text-[20px] cursor-pointer hover:bg-hoverSidebar rounded-[6px]">
              <VideoLibraryOutlinedIcon />
              <span className="ml-[10px]">Videos</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-3/4 px-[55px] ml-[70px]">
        <header className="mt-[25px] text-[28px] font-semibold">
          General Account Settings
        </header>
        <table className="flex mt-[30px]">
          <tr className="flex flex-col text-left ">
            <th>
              <span className="  text-[18px] font-medium">Username</span>
            </th>
            <th>
              {" "}
              <span className="  text-[18px] font-medium">Email</span>
            </th>
            <th>
              <span className="  text-[18px] font-medium">From</span>
            </th>
            <th>
              <span className="  text-[18px] font-medium">City</span>
            </th>
            <th>
              <span className="  text-[18px] font-medium">
                Memorialization settings
              </span>
            </th>
            <th>
              <span className="  text-[18px] font-medium">
                Identity confirmationView
              </span>
            </th>
          </tr>
          <tr className="flex flex-col ">
            <td>
              <span className="  text-[18px]">chien</span>
            </td>
            <td>
              {" "}
              <span className="  text-[18px]">
                chienvuong302@gmail.com
              </span>{" "}
            </td>
            <td>
              {" "}
              <span className="  text-[18px]">
                {editFrom ? (
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                    className=" outline-none rounded-[8px] bg-hoverSidebar px-[10px]"
                  />
                ) : (
                  `${currentUser.from}`
                )}
                {!currentUser.from && !editFrom && "Nothing"}
              </span>
            </td>
            <td>
              {" "}
              <span className="  text-[18px]">
                {editCity ? (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className=" outline-none rounded-[8px] bg-hoverSidebar px-[10px]"
                  />
                ) : (
                  `${currentUser.city}`
                )}
                {!currentUser.city && !editCity && "Nothing"}
              </span>
            </td>
            <td>
              <span className="  text-[18px]">
                Decide what happens to your main Facebook profile after you pass
                away.
              </span>
            </td>
            <td>
              <span className="  text-[18px]">
                Confirm your identity to do things like run ads about social
                issues, elections or politics.
              </span>
            </td>
          </tr>
          <tr className="flex flex-col ">
            <td>
              <span className="  text-[18px] text-hoverItem ">Edit</span>
            </td>
            <td>
              <span className="  text-[18px] text-hoverItem ">Edit</span>
            </td>
            <td>
              <span
                onClick={handleUpdateFrom}
                className="  text-[18px] text-primary cursor-pointer"
              >
                {editFrom ? `Save` : "Edit"}
                {editFrom && (
                  <span
                    onClick={() => {
                      setEditFrom(!editFrom);
                      setFrom(currentUser.from);
                    }}
                    className="ml-[10px] text-hoverItem"
                  >
                    Cancel
                  </span>
                )}
              </span>
            </td>
            <td>
              {" "}
              <span
                onClick={handleUpdateCity}
                className="  text-[18px] text-primary cursor-pointer"
              >
                {editCity ? "Save" : "Edit"}
                {editCity && (
                  <span
                    onClick={() => {
                      setEditCity(!editCity);
                      setCity(currentUser.city);
                    }}
                    className="ml-[10px] text-hoverItem"
                  >
                    Cancel
                  </span>
                )}
              </span>
            </td>
            <td>
              <span className="  text-[18px] text-hoverItem ">View</span>
            </td>
            <td>
              <span className="  text-[18px] text-hoverItem ">View</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Update;
