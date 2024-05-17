# Build stage
FROM node:20-alpine3.16 AS builder

WORKDIR /app

## Copy package files and install dependencies
COPY package*.json ./
RUN npm install

## Copy other necessary files
COPY tsconfig.json .
COPY ecosystem.config.js .
COPY .env.development .
COPY ./src ./src

## Build the application
RUN npm run build

# Start stage
FROM node:20-alpine3.16

WORKDIR /app

## Install Python and PM2 globally
RUN apk add --no-cache python3 && \
    npm install pm2 -g

## Create a non-root user and switch to it
RUN adduser -D appuser

## Copy built artifacts and other necessary files from the builder stage
COPY --from=builder /app .
RUN chown -R appuser:appuser /app

## Expose the port the app runs on
EXPOSE 4000

## Command to run the app
CMD ["pm2-runtime", "start", "ecosystem.config.js"]