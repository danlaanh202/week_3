FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install concurrently
CMD ["npm", "run", "dev:watch"]