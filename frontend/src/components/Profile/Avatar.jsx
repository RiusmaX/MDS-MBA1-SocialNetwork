import "../../styles/Avatar.scss";

const Avatar = ({ avatar }) => {
  if (!avatar?.url) return null;

  return (
    <img
      className="avatar"
      src={`${process.env.REACT_APP_IMAGES_URL}${avatar?.url}`}
      alt="avatar"
    />
  );
};

export default Avatar;
