ARG NODE_ENV=16.10.0-alpine

#################################################################
### Build stage (Install Deps and build app).
#################################################################
FROM node:${NODE_ENV} AS build

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL  https://gobinaries.com/tj/node-prune | sh

# Install pnpm
RUN corepack enable && corepack prepare pnpm@7.11.0 --activate 

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml .npmrc ./

# install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# build application
RUN pnpm build

# remove development dependencies
RUN pnpm prune --prod

# run node prune
RUN node-prune /usr/src/app/node_modules

#################################################################
### Main stage (Copy public files and express app).
#################################################################
FROM node:${NODE_ENV}

WORKDIR /usr/src/app

# Copy pruned node_modules
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Copy express server
COPY --from=build --chown=node:node /usr/src/app/index.js ./index.js

# Change html files to ejs for express
RUN mv ./dist/index.html ./dist/index.ejs

EXPOSE 3001
CMD ["node", "index.js"]
