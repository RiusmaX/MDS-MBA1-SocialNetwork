module.exports = ({ env }) => ({
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { origin: ['http://localhost:3000', 'https://social-network.sergent.dev'], methods: ['GET', 'POST', 'UPDATE', 'DELETE'] }
      },
      contentTypes: {
        post: '*',
        message: '*'
      },
      events: [
        {
          name: 'connection',
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`)
          }
        }
      ]
    }
  }
})
