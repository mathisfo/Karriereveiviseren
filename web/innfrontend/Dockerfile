# Again, double check this file, had some issue with figuring out the node version so used what worked on my local computer
FROM node:12.20.2-alpine3.10
USER root
WORKDIR /innfrontend
COPY package.json /innfrontend
RUN yarn install
COPY . /innfrontend

CMD ["yarn", "run", "start"]
