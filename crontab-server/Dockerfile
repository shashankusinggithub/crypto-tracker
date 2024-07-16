FROM node:22-alpine

WORKDIR /cronjob

COPY package*.json ./

RUN npm install

COPY . .


CMD [ "node", "index.js" ]
