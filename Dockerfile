# tells Docker to use the official Docker Node image version 18 through
FROM node:21

# sets the context for subsequent commands
WORKDIR /src/app

# copies the package.json and package-lock.json files to the container
COPY package*.json ./

# will install all dependencies
RUN npm install

# copy all the code from our project (current root directory) to our WORKDIR , which is /app
COPY . .

# tells the container that out app runs on the port 3000
EXPOSE 3000

# ask the container to start the development server.
CMD npm run dev


#HOW TO RUN THE DOCKERFILE
# docker build -t tsk-website-frontend .