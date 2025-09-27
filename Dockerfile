# ---------- Base image ----------
FROM node:22-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm

# ---------- Builder stage ----------
FROM base AS builder
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json drizzle.config.ts ./
RUN pnpm install
COPY . .
RUN pnpm build

# ---------- Production stage ----------
FROM base AS prod
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json drizzle.config.ts ./
EXPOSE 3333
CMD ["node", "dist/server.js"]
