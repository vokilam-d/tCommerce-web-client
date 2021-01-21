### Build stage
FROM node:12-alpine as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build:prod

COPY pm2-main.json ./dist


### Run stage
FROM node:12-alpine

ENV TZ 'Europe/Kiev'

RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3002
#EXPOSE 9229

CMD ["pm2-runtime", "dist/pm2-main.json"]
#CMD ["node", "--inspect=0.0.0.0:9229", "dist/server/main.js"]
