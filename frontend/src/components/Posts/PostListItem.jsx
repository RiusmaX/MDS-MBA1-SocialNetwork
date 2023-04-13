import Avatar from "../Profile/Avatar";
import "../../styles/PostListItem.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { format } from "date-fns";

const PostListItem = ({ post }) => {
  return (
    <div className="postItem">
      <div className="postItem-avatar">
        {/* Here we pass the avatar object to the Avatar component */}
        <Avatar
          avatar={
            post.attributes?.user?.data?.attributes?.avatar?.data?.attributes
          }
        />
      </div>
      <div className="postItem-content">
        <div className="postItem-content_pseudo">
          {/* Display the username and firstname */}
          <h3>{post.attributes?.user?.data?.attributes?.username}</h3>
          <h4>{post.attributes?.user?.data?.attributes?.firstName}</h4>
        </div>
        <div className="postItem-content_image">
          {/* Display the image */}
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}${post.attributes?.medias?.data[0]?.attributes?.url}`}
            alt={post.attributes?.image?.data?.attributes?.name}
          />
        </div>
        <div className="postItem-content_text">
          {/* Display the content */}
          <p>{post.attributes?.content}</p>
        </div>
        <div className="postItem-content_infos">
          {/* Display the number of likes and the date of creation */}
          <p>
            <AiOutlineHeart />
            {post.attributes?.likers?.data[0].id}
          </p>
          <p>
            <BsCalendarDate />
            {format(new Date(post.attributes?.createdAt), "dd/MM/yyyy")}
            {/* {post.attributes?.createdAt} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
