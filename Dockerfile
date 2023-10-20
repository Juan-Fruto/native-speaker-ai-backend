# image
FROM node:18-alpine3.18

# project directory in the container
WORKDIR /usr/src/app

# copy the package.json and pakcge-lock.json files to the container workdir
COPY package*.json .

# clean installation
RUN npm ci

# copy current local dir to the container workdir
COPY . .

# build the javascript code
RUN npm run build