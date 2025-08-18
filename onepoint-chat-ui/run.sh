#!/bin/bash

export PATH=/home/ubuntu/.nvm/versions/node/v22.12.0/bin:$PATH

# Change to the script's directory
cd "$(dirname "$0")"

# Set yarn path
YARN_PATH='/home/ubuntu/.nvm/versions/node/v22.12.0/bin/yarn'

# Compile the UI
cd onepoint-chat-ui
$YARN_PATH
$YARN_PATH build

# Change the port variable in .\onepoint-chat-ui\dist\index.html to 8084
sed -i 's/4000/8086/g' dist/index.html
sed -i 's/5000/8088/g' dist/index.html
sed -i 's/"localhost"/"176.34.128.143"/g' dist/index.html

# Compile the server
cd ..
$YARN_PATH
$YARN_PATH build
# Run the server
$YARN_PATH start