FROM node:12-alpine as builder

WORKDIR /usr/src/app/
USER root
COPY package.json ./

COPY ./ ./

FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]