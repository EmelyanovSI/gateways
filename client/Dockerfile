FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm install --global serve
ENTRYPOINT ["serve", "-s", "build"]
