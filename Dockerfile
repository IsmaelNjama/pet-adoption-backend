FROM node:20-alpine AS base

# Create app user and group
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Set working directory
WORKDIR /app

# Copy package files and set ownership
COPY --chown=appuser:appgroup package*.json ./

# Development stage
FROM base AS development
RUN npm install
USER appuser
COPY --chown=appuser:appgroup . .
EXPOSE 8080
CMD [ "node", "index.js" ]

# Production stage
FROM base AS production
RUN npm ci --only=production
USER appuser
COPY --chown=appuser:appgroup . .
EXPOSE 8080
CMD ["node", "index.js"]



