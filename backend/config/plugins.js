module.exports = ({ env }) => ({
  "io": {
    "enabled": true,
    "config": {
      "IOServerOptions" :{
        "cors": { "origin": "http://localhost:3000", "methods": ["GET"] },
      },
      "contentTypes": {
        "post": "*",
        "message": "*",
      },
      "events":[
        {
          "name": "connection",
          "handler": ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
          },
        },
      ]
    },
  },
});
