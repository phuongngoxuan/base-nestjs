FROM node:14.18.1 as builder
WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock ./
RUN chown -R node:node /app
#RUN chmod +x /usr/src/app/docker-entrypoint.sh
# COPY . .
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["yarn","start:dev"]