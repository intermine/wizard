FROM node:alpine
LABEL maintainer="Ank"
WORKDIR /app
ADD package.json /app
ADD package-lock.json /app
RUN cd /app && npm install
ADD . ./
ENV PORT 8080
RUN npm run build
CMD ["npm", "start"]
