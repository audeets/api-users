FROM node:20.10-alpine3.19
COPY . /usr/app
EXPOSE 6443 6080
WORKDIR /usr/app
CMD ["npm", "run", "start"]
