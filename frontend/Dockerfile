# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

RUN apk add --no-cache make gcc g++ python git
COPY package*.json ./
RUN npm install
#COPY node-modules ./
COPY . .

#RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app /usr/share/nginx/html
EXPOSE 8080
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
