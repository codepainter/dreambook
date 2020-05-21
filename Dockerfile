FROM mhart/alpine-node:12.6 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

FROM mhart/alpine-node:slim-12.6

WORKDIR /app
COPY --from=build /app .
COPY . .
CMD ["node", "server.js"]
