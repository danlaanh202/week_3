FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm install concurrently
CMD ["npm", "run", "dev:watch"]