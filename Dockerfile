# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:16.13 as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./frontend /usr/local/app/
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build --prod


# Stage 3: Install Python
RUN apt-get update &&\
  apt-get install python -y

# Stage 4: Install Backend
FROM node:latest
WORKDIR /usr/src/app/backend

RUN apt-get update &&\
  apt-get install python -y

COPY ./backend /usr/src/app/backend
RUN npm install

RUN npm rebuild

COPY --from=build /usr/local/app/dist/frontend /usr/src/app/backend/frontend



CMD ["server.js"]

EXPOSE 9000


