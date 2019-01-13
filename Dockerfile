FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install 

# Install pm2 *globally* so we can run our application
RUN npm install -g pm2
# Install typescript for pm2 so pm2 can interpret ts files
RUN pm2 install typescript

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]