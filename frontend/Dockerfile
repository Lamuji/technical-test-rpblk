FROM node:18.17.0 AS development

WORKDIR /republike/frontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000