FROM node:18-alpine AS builder
WORKDIR /app

# Build client
COPY client/package.json client/
COPY client/ /app/client/
WORKDIR /app/client
RUN npm install
RUN npm run build

# Build server dependencies
WORKDIR /app
COPY server/package.json server/
COPY server/ /app/server/
WORKDIR /app/server
RUN npm install --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/server /app/server
COPY --from=builder /app/client/dist /app/server/public
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]
