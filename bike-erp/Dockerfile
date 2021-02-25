# Base Image
FROM node:12

# Create app directory
WORKDIR /app

# Copy source code and static files
COPY . .

# Install app dependencies
RUN sh install.sh

#build dist file in backend
RUN sh buildBackend.sh

# Tell Docker about the port we'll run on.
EXPOSE 3000
EXPOSE 3001
EXPOSE 4000
EXPOSE 3306