# base image
FROM node:9.11
ENV NODE_ENV production

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add '/usr/src/app/node_modules/.bin' to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy source code
COPY . /usr/src/app

# install and cache app dependencies
RUN npm install --production --silent
RUN npm run build
RUN npm install -g apidoc 
RUN npm run docs
RUN ls -la /usr/src/app/dist

# start app
# CMD node /usr/src/app/dist/server.js

EXPOSE 3000