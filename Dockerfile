# Use the official Node.js LTS image
FROM "node:21-alpine3.18"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json / yarn.lock first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of your codebase
COPY . .

RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on (change if needed)
EXPOSE 8000

# Set the default command to run your app
CMD ["node", "dist/index.js"]
