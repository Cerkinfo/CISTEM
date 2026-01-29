#build
FROM node:22 AS build

WORKDIR /base
COPY . .
#COPY package.json .
#COPY yarn.lock .
#COPY turbo.json .
#COPY ./apps/CISTEM/package.json apps/CISTEM/
#COPY ./apps/CISTEM apps/CISTEM
#COPY ./interfaces interfaces
RUN yarn install
RUN yarn turbo telemetry disable
RUN yarn compile
RUN yarn build
#RUN yarn start --port 80
#RUN yarn run dev

#webserver
FROM nginx:stable-alpine
COPY --from=build /base/apps/CISTEM/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
