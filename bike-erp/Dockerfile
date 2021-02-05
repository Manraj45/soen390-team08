# Base Image
FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source code and static files
COPY . .

# Tell Docker about the port we'll run on.
EXPOSE 3000

CMD [ "npm", "start" ]