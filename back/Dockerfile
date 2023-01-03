FROM node:16-alpine

WORKDIR /Users/medamine/Workspace/server/back

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]