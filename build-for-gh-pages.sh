#!/bin/bash
# Build script for GitHub Pages deployment

echo "Building the project for GitHub Pages..."

# Install dependencies
npm install

# Build the project
npm run build

echo "Build complete! Files are in the 'dist' folder."

# Create a .nojekyll file to bypass GitHub Pages Jekyll processing
touch dist/.nojekyll

echo ".nojekyll file created to prevent Jekyll processing."

echo "You can now push the 'dist' folder contents to the 'gh-pages' branch."