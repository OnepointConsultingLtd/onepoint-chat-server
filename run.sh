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
sed -i 's/4000/8084/g' dist/index.html
sed -i 's/5000/8088/g' dist/index.html
sed -i 's/localhost/176.34.128.143/g' dist/index.html

# Replace the server with the staging server
cp src/lib/server_staging.ts src/lib/server.ts

# Replace the token with sed
sed -i '/ONE_TIME_TOKEN/s/"[^"]*"/"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheml6aV9iYW5rIiwibmFtZSI6ImF6aXppX2JhbmsiLCJpYXQiOjE3NDk3NDU4NjUsImVtYWlsIjoibXVydGF6YS5oYXNzYW5pQG9uZXBvaW50bHRkLmNvbSJ9.xvKGivWBWqRc5e4iMSZ18Qls-YnpbCljYDfVF7s0zpiHFEMmOIQHkWOf9tc_cOhP7eKjeKdFE0tgM1g5vvMzfg"/' src/lib/constants.ts

# Compile the server
cd ..
$YARN_PATH
$YARN_PATH build
# Run the server
$YARN_PATH start