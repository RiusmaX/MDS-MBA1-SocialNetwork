import React, { useState, useEffect } from "react";
import Avatar from "../Profile/Avatar";
import { BsCalendarDate } from "react-icons/bs";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@apollo/client";

const RepostListItem = ({ repostItem }) => {
  const navigate = useNavigate();

  const {
    state: { user },
  } = useAuth();

  return (
    <div className="postItem" style={{ position: "relative", width: "100%" }}>
      <div className="postItem-avatar">
        {/* Here we pass the avatar object to the Avatar component */}
        <Avatar
          avatar={
            repostItem.attributes?.user?.data?.attributes?.avatar?.data
              ?.attributes
          }
        />
      </div>
      <div className="postItem-content">
        <div className="postItem-content_pseudo">
          <p>{repostItem.attributes?.user?.data?.attributes?.username}</p>
          <p>{repostItem.attributes?.user?.data?.attributes?.firstName}</p>
        </div>
        {repostItem.attributes?.medias?.data?.[0]?.attributes?.url && (
          <div className="postItem-content_image">
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}${repostItem.attributes?.medias?.data?.[0]?.attributes?.url}`}
              // alt={repostItem.attributes?.image?.data?.attributes?.name}
            />
          </div>
        )}
        <div className="postItem-content_text">
          <p>{repostItem.attributes?.content}</p>
        </div>

        <div className="postItem-content_infos">
          <p>
            <BsCalendarDate />
            {format(new Date(repostItem.attributes?.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepostListItem;
