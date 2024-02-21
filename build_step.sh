#!/bin/bash

echo "Build script"

npm install

cd ./client && npm install --production=false && npm run build

cd ../ && npm run start