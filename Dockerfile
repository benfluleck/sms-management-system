FROM node:8

ENV TEST_CLIENT=process.env.TEST_CLIENT
ENV DEVELOPMENT_CLIENT=process.env.DEVELOPMENT_CLIENT
ENV DEVELOPMENT_DB_URL=process.env.DEVELOPMENT_DB_URL




# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "yarn", "test" ]
