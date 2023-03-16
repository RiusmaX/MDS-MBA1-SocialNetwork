FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]