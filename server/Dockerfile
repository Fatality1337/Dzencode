FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY server ./server
RUN npx prisma generate --schema server/prisma/schema.prisma
RUN npm run build:server
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/prisma ./server/prisma
EXPOSE 4000
CMD ["sh","-c","npx prisma migrate deploy --schema server/prisma/schema.prisma && node server/dist/server.js"]
