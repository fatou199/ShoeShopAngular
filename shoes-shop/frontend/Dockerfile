FROM node:18.19 as builder

WORKDIR /app

COPY shoes-frontend/package*.json ./

RUN npm install

COPY shoes-frontend ./

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/shoes-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  

