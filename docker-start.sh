#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   The Echo It Docker Quick Start       ║"
echo "╔═══════════════════════════════════════╗"
echo -e "${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Prompt user for deployment type
echo -e "${YELLOW}Select deployment type:${NC}"
echo "1) Development (with hot reload)"
echo "2) Production (standard)"
echo "3) Production with Nginx (load balanced)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo -e "${BLUE}🚀 Starting Development Environment...${NC}"
        docker-compose -f docker-compose.dev.yml up --build
        ;;
    2)
        echo -e "${BLUE}🚀 Starting Production Environment...${NC}"
        docker-compose up -d --build
        echo ""
        echo -e "${GREEN}✅ Application started!${NC}"
        echo -e "📍 Access at: ${BLUE}http://localhost:3000${NC}"
        echo ""
        echo "Useful commands:"
        echo "  View logs:    docker-compose logs -f"
        echo "  Stop:         docker-compose down"
        echo "  Restart:      docker-compose restart"
        ;;
    3)
        echo -e "${BLUE}🚀 Starting Production with Nginx...${NC}"
        docker-compose -f docker-compose.nginx.yml up -d --build
        echo ""
        echo -e "${GREEN}✅ Application started with load balancing!${NC}"
        echo -e "📍 Access at: ${BLUE}http://localhost${NC}"
        echo ""
        echo "Useful commands:"
        echo "  View logs:    docker-compose -f docker-compose.nginx.yml logs -f"
        echo "  Stop:         docker-compose -f docker-compose.nginx.yml down"
        echo "  Scale:        docker-compose -f docker-compose.nginx.yml up -d --scale blog-app=5"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}📚 For more information, see DOCKER_GUIDE.md${NC}"
