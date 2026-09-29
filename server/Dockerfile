FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY server ./server
RUN npm run build:server
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server/dist ./server/dist
EXPOSE 4000
CMD ["node","server/dist/server.js"]
