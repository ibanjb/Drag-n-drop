# base image
FROM node:9.11
ENV NODE_ENV production

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# the base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# add '/usr/src/app/node_modules/.bin' to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy all local files into working directory
COPY . /usr/src/app

# install and cache app dependencies
RUN npm install --silent

# create bundler
RUN npm run build

# install 'serve' to run the application.
RUN npm install serve -g --silent

# set the command to start the node server.
CMD serve -s build

# tell Docker about the port we will run on.
EXPOSE 5000
