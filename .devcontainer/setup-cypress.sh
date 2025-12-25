#!/bin/bash

# Cypress DevContainer Setup Script
echo "Setting up Cypress for devcontainer..."

# Start D-Bus service (required for Cypress)
echo "Starting D-Bus service..."
service dbus start > /dev/null 2>&1

# Kill any existing Xvfb processes
pkill Xvfb > /dev/null 2>&1

# Start Xvfb display server in the background
echo "Starting Xvfb display server..."
export DISPLAY=:99
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &

# Wait for Xvfb to start
sleep 2

# Unset custom cache folder to use default
unset CYPRESS_CACHE_FOLDER

# Install Cypress binary if not already installed
echo "Ensuring Cypress binary is installed..."
./node_modules/.bin/cypress install > /dev/null 2>&1

# Verify Cypress can run
echo "Testing Cypress installation..."
if DISPLAY=:99 ./node_modules/.bin/cypress verify > /dev/null 2>&1; then
    echo "✅ Cypress is installed and working"
else 
    echo "❌ Cypress verification failed. Run 'yarn install' first."
    exit 1
fi

echo "✅ Cypress devcontainer setup complete!"
echo ""
echo "Available commands:"
echo "  yarn test:e2e:headless - Run Cypress tests (recommended)"  
echo "  yarn test:e2e         - Run Cypress tests"
echo "  yarn test:e2e:open    - Open Cypress Test Runner (if X11 forwarding available)"
echo ""
echo "Environment:"
echo "  DISPLAY=$DISPLAY"
echo "  D-Bus service: running"
echo "  Xvfb running on display :99"
echo ""
echo "Note: Start your React dev server with 'yarn start' before running tests."