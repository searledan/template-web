# syntax=docker/dockerfile:1

# =============================================================================
# Multi-stage Dockerfile for Vite React application
# Suitable for local development and Azure deployment
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Dependencies
# Install all dependencies in a separate stage for better caching
# -----------------------------------------------------------------------------
FROM node:24-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 2: Build
# Build the application
# -----------------------------------------------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Build the application
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Production
# Serve the built application using a lightweight Node.js server
# -----------------------------------------------------------------------------
FROM node:24-alpine AS production

WORKDIR /app

# Install serve globally for serving static files
RUN npm install -g serve@latest

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Change ownership to non-root user
RUN chown -R appuser:nodejs /app

# Switch to non-root user
USER appuser

# Expose port (Azure App Service uses 8080 by default)
EXPOSE 8080

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start the server
# -s: Single-page application mode (rewrites to index.html)
# -l: Listen on specified port
CMD ["serve", "-s", "dist", "-l", "8080"]
