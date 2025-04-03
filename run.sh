#!/bin/bash

# Change to the script's directory
cd "$(dirname "$0")"

# Set yarn path
alias yarn='/home/ubuntu/.nvm/versions/node/v22.12.0/bin/yarn'

# Compile the UI
cd onepoint-chat-ui
yarn
yarn build

# Change the port variable in .\onepoint-chat-ui\dist\index.html to 8084
sed -i 's/4000/8084/g' dist/index.html
sed -i 's/5000/8080/g' dist/index.html
sed -i 's/"localhost"/"176.34.128.143"/g' dist/index.html

# Compile the server
cd ..
yarn
yarn build

# Run the server
yarn start 