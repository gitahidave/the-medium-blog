.PHONY: help build run stop clean dev prod logs shell test

# Default target
help:
	@echo "The Echo It Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development server with hot reload"
	@echo "  make dev-build    - Rebuild and start development server"
	@echo ""
	@echo "Production:"
	@echo "  make prod         - Start production server"
	@echo "  make prod-build   - Rebuild and start production server"
	@echo "  make build        - Build production Docker image"
	@echo ""
	@echo "Management:"
	@echo "  make logs         - View container logs"
	@echo "  make shell        - Access container shell"
	@echo "  make stop         - Stop containers"
	@echo "  make clean        - Remove containers and images"
	@echo "  make restart      - Restart containers"
	@echo ""
	@echo "Utilities:"
	@echo "  make ps           - Show running containers"
	@echo "  make stats        - Show container stats"
	@echo "  make prune        - Clean up Docker system"

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up

dev-build:
	docker-compose -f docker-compose.dev.yml up --build

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Production commands
prod:
	docker-compose up -d

prod-build:
	docker-compose up -d --build

build:
	docker build -t the-medium-blog:latest .

build-optimized:
	docker build -f Dockerfile.optimized -t the-medium-blog:optimized .

# Management commands
logs:
	docker-compose logs -f

logs-prod:
	docker logs -f the-medium-blog

shell:
	docker exec -it the-medium-blog sh

stop:
	docker-compose down

stop-all:
	docker-compose down && docker-compose -f docker-compose.dev.yml down

restart:
	docker-compose restart

restart-prod:
	docker-compose down && docker-compose up -d

# Cleanup commands
clean:
	docker-compose down -v
	docker rmi modern-blog:latest || true

clean-all:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker rmi modern-blog:latest the-medium-blog:dev modern-blog:optimized || true

prune:
	docker system prune -af --volumes

# Utility commands
ps:
	docker ps

stats:
	docker stats the-medium-blog

inspect:
	docker inspect the-medium-blog

health:
	docker inspect --format='{{.State.Health.Status}}' the-medium-blog

# Testing
test:
	docker run --rm the-medium-blog npm test

# Push to registry (customize with your registry)
push:
	docker tag modern-blog:latest your-registry/the-medium-blog:latest
	docker push your-registry/the-medium-blog:latest

# Pull from registry
pull:
	docker pull your-registry/the-medium-blog:latest
	docker tag your-registry/the-medium-blog:latest modern-blog:latest
