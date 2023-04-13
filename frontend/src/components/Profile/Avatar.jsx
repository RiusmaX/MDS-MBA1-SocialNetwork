import "../../styles/Avatar.scss";

const Avatar = ({ avatar }) => {
  return (
    <img
      className="avatar"
      src={`${process.env.REACT_APP_IMAGES_URL}${avatar?.url}`}
    />
  );
};

export default Avatar;
