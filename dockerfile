FROM node:18

RUN mkdir -p /var/app

WORKDIR /var/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]

