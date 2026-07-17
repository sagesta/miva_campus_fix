FROM node:20-alpine

# Install OpenSSL for Prisma's Rust engines on Alpine
RUN apk add --no-cache openssl

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

# Push schema to postgres and start server
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run seed && npm start"]
