FROM alpine:3.9

RUN apk add --update nginx nodejs npm bash

RUN mkdir -p /tmp/nginx/marky
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

COPY /nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY /nginx_config/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /tmp/nginx/marky

COPY . .

RUN npm install

RUN npm run build

RUN npm start

RUN cp -r dist/* /var/www/html

RUN chown nginx:nginx /var/www/html

CMD ["nginx", "-g", "daemon off;"]
