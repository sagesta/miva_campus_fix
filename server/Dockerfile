FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose API port
EXPOSE 4000

# Start server with migrations
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
