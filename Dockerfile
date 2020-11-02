FROM node:12-alpine

WORKDIR /usr/app/avatars

COPY . ./

RUN npm install

ENV AVATARS_PORT=3002

USER node

CMD ["npm", "run", "start"]