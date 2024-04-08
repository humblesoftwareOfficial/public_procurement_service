# syntax=docker/dockerfile:1
FROM node:20-alpine AS build

WORKDIR /usr/src/publicprocurementservice

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/publicprocurementservice

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=build /usr/src/publicprocurementservice/dist ./dist

CMD ["node", "dist/main"]