# We'll use the Node slim image as a base cos it's light and nice
FROM node:14-alpine

WORKDIR /usr/src/services/api

# Copy package.json & package-lock.json to the root of the api dir
COPY package*.json ./

# Create an .env file by copying the .env.example file
COPY .env.example .env

# Add node_modules to the envionmental path variable so we can run binaries easily
ENV PATH /usr/src/services/api/node_modules/.bin:$PATH

USER root

# Install PM modules and get Adonis CLI in the game
# RUN npm install --no-optional
RUN npm install
# RUN npm i -g @adonisjs/cli

RUN npm i -g pm2

# Install bash
# RUN apk update && apk add bash

# Copy everything to the root of the API service docker volume, and expose port to the outside world
COPY --chown=node:node . .

# Let all incoming connections use the port below
EXPOSE 1379

CMD npm run pm2:start
# CMD npm run dev