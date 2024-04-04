FROM node:18.17.0 AS development

WORKDIR /republike/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000