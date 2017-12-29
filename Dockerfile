# Stage 1 - the build process
FROM node:8 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
WORKDIR /usr/src/app/node_modules/browser-sync
RUN yarn
RUN ./node_modules/.bin/tsc
WORKDIR /usr/src/app
RUN yarn build-all

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/public /usr/share/nginx/html/public
COPY --from=build-deps /usr/src/app/public-html /usr/share/nginx/html/public-html
COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
