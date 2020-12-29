# FROM node:12.18.1-slim

# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "run", "start:dev"]

FROM node:12.18.1-slim as base

LABEL org.opencontainers.image.nodeversion=$NODE_VERSION

ENV NODE_ENV=production PORT=4000
ENV FORCE_COLOR=1
EXPOSE ${PORT}
WORKDIR /app
COPY package*.json ./
ENV PATH /node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
RUN mkdir temp
CMD ["node", "dist/index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development && npm cache clean --force
USER root
COPY . .
CMD ["npm", "run", "start:dev"]
