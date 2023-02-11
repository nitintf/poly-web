ARG NODE_VER=16.10.0-alpine

FROM node:${NODE_VER} 

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@7.11.0 --activate 

COPY package.json .npmrc ./

RUN pnpm install

COPY . /app

EXPOSE 7337

CMD ["pnpm", "dev"]
