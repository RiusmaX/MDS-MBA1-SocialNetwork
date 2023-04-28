import io from "socket.io-client";

const socket = io("http://localhost:1337");

export const subscribeToPosts = (setPosts) => {
  // Listening to socket events for new posts
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

  // receive new posts sent by the server
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

export const subscribeToMessages = (setMessages) => {
  // Listening to socket events for new messages
  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("message:create", (data) => {
    console.log("New message received", data);
    data = data.data
    setMessages((prevMessages) => {
      const find = prevMessages.findIndex((_data) => parseInt(_data.id) === parseInt(data.id))
      if(find === -1){
        return [
          ...prevMessages,
          {
            id: String(data.id),
            attributes: data.attributes
          },
        ]
      }
      return [
        ...prevMessages,
      ]
    });
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("message");
    socket.off("message:create");
  };
};

export default socket;
