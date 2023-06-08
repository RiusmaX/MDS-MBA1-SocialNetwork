import RepostListItem from "./RepostListItem";

const RepostList = ({ reposts }) => {
  console.log(reposts);

  if (!reposts || reposts.length < 1) {
    return <h4>No data...</h4>;
  }

  return (
    <div className="postListContainer">
      {reposts?.map((repost) => {
        // list of reposts
        return <RepostListItem key={repost.id} repostItem={repost} />;
      })}
    </div>
  );
};

export default RepostList;
