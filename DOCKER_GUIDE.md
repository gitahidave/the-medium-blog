# Docker Deployment Guide

## 🐳 Docker Setup for The Echo It Blog

This guide covers deploying the The Echo It Blog application using Docker in various configurations.

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Production
docker-compose up -d

# Development with hot reload
docker-compose -f docker-compose.dev.yml up
```

### Option 2: Docker CLI

```bash
# Build
docker build -t the-medium-blog .

# Run
docker run -p 3000:3000 the-medium-blog
```

---

## 📁 Docker Files Overview

### Available Dockerfiles

1. **Dockerfile** - Standard production build
2. **Dockerfile.optimized** - Optimized with better layer caching and non-root user
3. **Dockerfile.dev** - Development setup with hot reload

### Configuration Files

- **docker-compose.yml** - Production orchestration
- **docker-compose.dev.yml** - Development orchestration
- **.dockerignore** - Files to exclude from Docker builds

---

## 🚀 Production Deployment

### Using Docker Compose

**Step 1: Start the container**
```bash
docker-compose up -d
```

**Step 2: View logs**
```bash
docker-compose logs -f
```

**Step 3: Stop the container**
```bash
docker-compose down
```

### Using Docker CLI

**Build the image:**
```bash
docker build -t the-medium-blog:latest .
```

**Run the container:**
```bash
docker run -d \
  --name the-medium-blog \
  -p 3000:3000 \
  --restart unless-stopped \
  modern-blog:latest
```

**Check status:**
```bash
docker ps
docker logs the-medium-blog
```

**Stop and remove:**
```bash
docker stop the-medium-blog
docker rm the-medium-blog
```

---

## 🔧 Development Setup

### Hot Reload Development

**Using Docker Compose:**
```bash
docker-compose -f docker-compose.dev.yml up
```

**Using Docker CLI:**
```bash
# Build dev image
docker build -f Dockerfile.dev -t the-medium-blog:dev .

# Run with volume mounting
docker run -it \
  -p 3000:3000 \
  -v $(pwd)/app:/app/app \
  -v /app/node_modules \
  the-medium-blog:dev
```

This setup:
- ✅ Mounts source code for hot reload
- ✅ Watches for file changes
- ✅ Rebuilds automatically
- ✅ Preserves node_modules in container

---

## 📊 Image Optimization

### Multi-Stage Build Benefits

The Dockerfile uses multi-stage builds:

```dockerfile
# Stage 1: Build dependencies
FROM node:20-alpine AS deps
...

# Stage 2: Build application
FROM node:20-alpine AS builder
...

# Stage 3: Production runtime
FROM node:20-alpine AS runner
...
```

**Benefits:**
- ✅ Smaller final image (~150MB vs ~1GB)
- ✅ No build tools in production
- ✅ Better layer caching
- ✅ Security: runs as non-root user

### Image Size Comparison

| Dockerfile | Size | Use Case |
|------------|------|----------|
| Standard | ~200MB | Simple production |
| Optimized | ~150MB | Optimized production |
| Development | ~400MB | Development with tools |

---

## 🔒 Security Best Practices

### Non-Root User (Dockerfile.optimized)

```dockerfile
# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

# Switch to non-root user
USER tanstack
```

**Benefits:**
- ✅ Reduced attack surface
- ✅ Container isolation
- ✅ Best security practice

### Minimal Base Image

Using `node:20-alpine`:
- ✅ Small footprint (~50MB base)
- ✅ Fewer vulnerabilities
- ✅ Faster pulls and builds

---

## 🌐 Environment Configuration

### Environment Variables

**In docker-compose.yml:**
```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - DATABASE_URL=postgresql://...
  - API_URL=https://api.example.com
```

**Using .env file:**
```bash
# Create .env file
echo "NODE_ENV=production" > .env
echo "PORT=3000" >> .env

# Run with env file
docker-compose --env-file .env up
```

**Command line:**
```bash
docker run -e NODE_ENV=production -e PORT=3000 modern-blog
```

---

## 💾 Data Persistence

### Using Volumes

**Update docker-compose.yml:**
```yaml
services:
  blog-app:
    volumes:
      - blog-data:/app/data
      - blog-uploads:/app/uploads

volumes:
  blog-data:
    driver: local
  blog-uploads:
    driver: local
```

**Using bind mounts:**
```bash
docker run -v $(pwd)/data:/app/data modern-blog
```

---

## 🔍 Health Checks

### Built-in Health Check

The Dockerfile includes health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', ...)"
```

**Check health status:**
```bash
docker inspect --format='{{.State.Health.Status}}' modern-blog
```

---

## 📈 Scaling with Docker

### Multiple Instances

**docker-compose.yml with scaling:**
```yaml
services:
  blog-app:
    deploy:
      replicas: 3
    # ... rest of config
```

**Scale using CLI:**
```bash
docker-compose up -d --scale blog-app=3
```

### Load Balancer (Nginx)

**docker-compose.yml:**
```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - blog-app

  blog-app:
    build: .
    expose:
      - "3000"
    deploy:
      replicas: 3
```

---

## 🛠️ Useful Docker Commands

### Building

```bash
# Build with custom tag
docker build -t the-medium-blog:v1.0.0 .

# Build without cache
docker build --no-cache -t the-medium-blog .

# Build optimized version
docker build -f Dockerfile.optimized -t the-medium-blog:optimized .
```

### Running

```bash
# Run in background
docker run -d -p 3000:3000 the-medium-blog

# Run with name
docker run -d --name my-blog -p 3000:3000 the-medium-blog

# Run with auto-restart
docker run -d --restart always -p 3000:3000 the-medium-blog

# Run with resource limits
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  -p 3000:3000 \
  modern-blog
```

### Monitoring

```bash
# View logs
docker logs the-medium-blog

# Follow logs
docker logs -f the-medium-blog

# Last 100 lines
docker logs --tail 100 the-medium-blog

# Container stats
docker stats the-medium-blog

# Inspect container
docker inspect the-medium-blog
```

### Maintenance

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove everything unused
docker system prune -a --volumes

# Update container
docker-compose pull
docker-compose up -d
```

---

## 🚢 CI/CD Integration

### GitHub Actions

**.github/workflows/docker.yml:**
```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t modern-blog .
      
      - name: Run tests
        run: docker run modern-blog npm test
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker tag modern-blog username/the-medium-blog:latest
          docker push username/modern-blog:latest
```

---

## 🌍 Deployment Platforms

### Docker Hub

```bash
# Tag image
docker tag modern-blog username/the-medium-blog:latest

# Push to Docker Hub
docker push username/the-medium-blog:latest

# Pull and run
docker pull username/the-medium-blog:latest
docker run -p 3000:3000 username/the-medium-blog:latest
```

### AWS ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag the-medium-blog:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/the-medium-blog:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/the-medium-blog:latest
```

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/the-medium-blog

# Deploy
gcloud run deploy modern-blog \
  --image gcr.io/PROJECT_ID/the-medium-blog \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### DigitalOcean

```bash
# Install doctl
doctl registry login

# Push image
docker tag modern-blog registry.digitalocean.com/my-registry/modern-blog
docker push registry.digitalocean.com/my-registry/the-medium-blog

# Deploy to App Platform
doctl apps create --spec app.yaml
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Container exits immediately**
```bash
# Check logs
docker logs the-medium-blog

# Common causes:
# - Build failed
# - Port already in use
# - Missing dependencies
```

**Issue: Port already in use**
```bash
# Find process using port 3000
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Use different port
docker run -p 8080:3000 the-medium-blog
```

**Issue: Out of disk space**
```bash
# Clean up
docker system prune -a
docker volume prune
```

**Issue: Slow builds**
```bash
# Use BuildKit
export DOCKER_BUILDKIT=1
docker build -t the-medium-blog .

# Or in docker-compose
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
```

**Issue: Cannot connect to app**
```bash
# Check container is running
docker ps

# Check port mapping
docker port the-medium-blog

# Check logs
docker logs the-medium-blog

# Enter container
docker exec -it the-medium-blog sh
```

---

## 📋 Production Checklist

Before deploying to production:

- [ ] Use multi-stage build (Dockerfile.optimized)
- [ ] Run as non-root user
- [ ] Set proper environment variables
- [ ] Configure health checks
- [ ] Set up logging
- [ ] Configure restart policy
- [ ] Set resource limits
- [ ] Use .dockerignore
- [ ] Test container locally
- [ ] Set up monitoring
- [ ] Configure backups (if using volumes)
- [ ] Use secrets management
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules

---

## 🎯 Quick Commands Reference

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up -d

# Rebuild
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Shell access
docker exec -it the-medium-blog sh

# Copy files from container
docker cp the-medium-blog:/app/data ./local-data

# Update and restart
docker-compose pull && docker-compose up -d
```

---

## 🎓 Next Steps

1. **Set up monitoring** - Prometheus, Grafana
2. **Add database** - PostgreSQL, MongoDB
3. **Configure SSL** - Let's Encrypt, Nginx
4. **Implement CI/CD** - GitHub Actions, GitLab CI
5. **Set up backups** - Automated volume backups
6. **Load testing** - Apache Bench, k6

Happy Dockerizing! 🐳
