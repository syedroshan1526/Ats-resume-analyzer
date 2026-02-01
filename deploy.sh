#!/bin/bash
# Deployment script for ATS Resume Analyzer

echo "Building and deploying ATS Resume Analyzer..."

# Build the containers
echo "Building containers..."
docker-compose build

# Bring up the services
echo "Starting services..."
docker-compose up -d

echo "Deployment complete!"
echo "Access your ATS Resume Analyzer at http://localhost"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the application:"
echo "  docker-compose down"