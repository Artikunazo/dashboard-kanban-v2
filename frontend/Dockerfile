# Get official node 20 image in alpine version
FROM node:20-alpine AS build

# Define workdir
WORKDIR /app

#Copy dependecy files
COPY package.json ./
COPY package-lock.json ./

# Install all project dependencies
RUN npm install

# Copy all project files to container application
COPY . .

# Build the project
RUN npm run build -- --configuration production

# Get official nginx image
FROM nginx:alpine

# Copy the build output to nginx default html directory
COPY --from=build /app/dist/dashboard-kanban-v2/browser /usr/share/nginx/html
