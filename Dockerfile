FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . . 

EXPOSE 3000

RUN yarn typeorm migration:run

CMD ["yarn", "start"]