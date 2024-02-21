#!/bin/bash

echo "Build script"

npm install


cd ./client && npm run build

cd ../ && npm run start