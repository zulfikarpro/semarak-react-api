FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN mkdir -p /etc/pictures 

WORKDIR /home/node/app

COPY package.json /home/node/app

USER root

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install bcrypt

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm install

COPY --chown=node:node . .

EXPOSE 5021

CMD [ "node", "app.js" ]