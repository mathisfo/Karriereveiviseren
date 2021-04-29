FROM node:12.20.2-alpine3.10

WORKDIR /inn01-project/

#Install dependencies
COPY package.json yarn.lock /inn01-project/

RUN yarn

# Add rest of the client code
COPY . /inn01-project/

EXPOSE 3000

CMD yarn start