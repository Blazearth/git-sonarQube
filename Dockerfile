# Stage 1: Build frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with a lightweight web server
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
