#!/bin/bash
# MongoDB Docker Container Startup Script
# Uses official MongoDB image from https://hub.docker.com/_/mongo/

DOCKCONTAINER="mathbloom-mongo"
MONGO_PORT=27018
MONGO_IMAGE="mongo:latest"

echo "Starting MongoDB container..."
echo "Container name: ${DOCKCONTAINER}"
echo "Port mapping: localhost:${MONGO_  PORT} -> container:27017"
echo ""

# Pull the latest MongoDB image
sudo docker pull ${MONGO_IMAGE}

# Run MongoDB container
sudo docker run \
  --name ${DOCKCONTAINER} \
  --restart=always \
  -d \
  -p ${MONGO_PORT}:27017 \
  ${MONGO_IMAGE} \
  mongod --bind_ip_all

echo "✓ MongoDB container started successfully!"
echo ""
echo "Connection details:"
echo "  - Local connection: mongodb://localhost:${MONGO_PORT}"
echo "  - Container name: ${DOCKCONTAINER}"
echo ""
echo "Useful commands:"
echo "  - View logs: sudo docker logs ${DOCKCONTAINER}"
echo "  - Stop container: sudo docker stop ${DOCKCONTAINER}"
echo "  - Start container: sudo docker start ${DOCKCONTAINER}"
echo "  - Connect inside container: sudo docker exec -it ${DOCKCONTAINER} mongosh"
echo "  - Remove container: sudo docker rm ${DOCKCONTAINER}"
echo ""
echo "To install MongoDB client tools locally (Ubuntu 22):"
echo "  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -"
echo "  echo 'deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse' | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list"
echo "  sudo apt-get update && sudo apt-get install -y mongodb-mongosh"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "HOW TO CONNECT TO MONGODB FROM HOST SHELL:"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "METHOD 1: Connect via Docker (Recommended - No client needed)"
echo "  sudo docker exec -it ${DOCKCONTAINER} mongosh"
echo ""
echo "METHOD 2: Connect from host shell (Requires mongosh installed)"
echo "  mongosh mongodb://localhost:${MONGO_PORT}"
echo ""
echo "METHOD 3: Using Node.js driver"
echo "  const { MongoClient } = require('mongodb');"
echo "  const client = new MongoClient('mongodb://localhost:${MONGO_PORT}');"
echo ""
echo "METHOD 4: Using Python driver (pymongo)"
echo "  from pymongo import MongoClient"
echo "  client = MongoClient('mongodb://localhost:${MONGO_PORT}')"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Optional: Set up authentication (uncomment to use)
# echo ""
# echo "Setting up admin user..."
# sleep 2
# sudo docker exec -i ${DOCKCONTAINER} mongosh << EOF
# use admin
# db.createUser({user:"admin",pwd:"password",roles:[{role:"root",db:"admin"}]})
# exit
# EOF
# echo "✓ Admin user created"
