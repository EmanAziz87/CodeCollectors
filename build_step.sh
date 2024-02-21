#!/bin/bash

echo "Build script"

npm install

cd ./client && npm install --include=dev && npm run build

cd ../ && npm run start