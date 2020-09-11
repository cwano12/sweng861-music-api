# build
FROM  node:12-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --development

COPY . .

RUN npm run build


# production
FROM  node:12-slim AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8010

CMD ["npm", "start"]