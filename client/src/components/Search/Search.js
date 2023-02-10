import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HeadLess from "@tippyjs/react/headless";
import { Link, NavLink, Navigate } from "react-router-dom";
import * as userService from "../../services/userService";
import { useDebouned } from "../../hook";
const Search = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));

  const [searchText, setSearchText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const debouned = useDebouned(searchText, 500);

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchText(searchValue);
    }
  };

  const handleHideResult = () => {
    setShowResult(!showResult);
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchUser = async () => {
      userService
        .searchUser({ searchText: debouned, accessToken: token })
        .then((res) => {
          if (
            res &&
            res.data &&
            res.data.searchUser &&
            res.data.searchUser.length > 0
          ) {
            setSearchResult(res.data.searchUser);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUser();
  }, [debouned, username, token]);
  return (
    <HeadLess
      placement="top-start"
      interactive={true}
      zIndex
      visible={showResult}
      render={(attrs) => (
        <div
          className=" w-[700px] bg-white rounded-[10px] shadow-lg p-[10px]"
          tabIndex="-1"
          {...attrs}
        >
          {searchResult &&
            searchResult.length > 0 &&
            searchResult.map((item) => (
              <Link
                to={`/profile/${item.username}`}
                className="flex items-center p-[8px] hover:bg-hoverSidebar cursor-pointer rounded-[10px]"
              >
                {item.profilePicture ? (
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${item.profilePicture}`}
                    alt=""
                    className="w-[44px] h-[44px] rounded-full border-[1px] border-greyBorder object-cover mr-[10px]"
                  />
                ) : (
                  <img
                    src="https://i.stack.imgur.com/l60Hf.png"
                    alt=""
                    className="w-[44px] h-[44px] rounded-full border-[1px] border-greyBorder object-cover mr-[10px]"
                  />
                )}
                <span className="text-[18px] font-medium">{item.username}</span>
              </Link>
            ))}

          {!searchResult && searchResult.length === 0 && (
            <div>Not Found User: {searchText}</div>
          )}

          <div className=" p-[18px] flex text-primary rounded-[10px] hover:bg-hoverSidebar cursor-pointer ">
            <SearchIcon />
            <span>Search for </span>{" "}
            <h2 className="ml-[5px] font-medium">{searchText}</h2>
          </div>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className="flex items-center py-[6px] px-[15px] bg-white rounded-[50px]">
        <SearchIcon className="" />
        <input
          type="text"
          className="outline-none ml-[5px] w-full text-[14px]"
          alt=""
          value={searchText}
          onChange={handleChangeSearch}
          onFocus={() => setShowResult(!showResult)}
          placeholder="Search Facebook"
        />
      </div>
    </HeadLess>
  );
};

export default Search;
