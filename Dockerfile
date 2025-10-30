FROM node:20.19-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20.19-alpine

WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "dist/main.js"]
