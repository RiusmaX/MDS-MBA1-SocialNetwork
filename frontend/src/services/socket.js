import io from "socket.io-client";

const socket = io("http://localhost:1337");

export const subscribeToPosts = (setPosts) => {
  // Écoute des événements de socket pour les nouveaux posts
  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("post:create", (data) => {
    console.log("New post received", data);
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: String(data.id), attributes: data },
    ]);
  });

  socket.on("post:update", (data) => {
    console.log("Post updated", data);
    setPosts((prevPosts) => {
      const index = prevPosts.findIndex(
        (post) => Number(post.id) === Number(data.id)
      );
      prevPosts.splice(index, 1);
      return prevPosts;
    });
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: String(data.id), attributes: data },
    ]);
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("post");
    socket.off("post:create");
    socket.off("post:update");
  };
};

export default socket;
