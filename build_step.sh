#!/bin/bash

echo "Build script"

npm install

cd ./client

npm install

cd ../

npm run build:ui

npm run start