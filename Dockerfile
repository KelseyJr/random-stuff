FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install

COPY . .

EXPOSE 3333

CMD ["pnpm", "run", "dev"]