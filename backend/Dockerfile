FROM node:latest AS development

WORKDIR /republike/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN curl -v https://registry.npmjs.com/

RUN npm install

COPY . .

CMD /bin/sh -c "npx prisma generate && npx prisma migrate dev --name init && npm run start:dev"

EXPOSE 3000
