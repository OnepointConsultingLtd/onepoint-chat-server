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
sed -i 's/"localhost"/"176.34.128.143"/g' dist/index.html

# Replace the server with the staging server
cp src/lib/server_staging.ts src/lib/server.ts

# Replace the token with sed
sed '/ONE_TIME_TOKEN/s/"[^"]*"/"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVwb2ludGx0ZCIsIm5hbWUiOiJvbmVwb2ludGx0ZCIsImlhdCI6MTc1NDg1MjkzNSwiZW1haWwiOiJnaWwuZmVybmFuZGVzQG9uZXBvaW50bHRkLmNvbSIsInBlcm1pc3Npb25zIjpbInJlYWQiLCJ3cml0ZSJdfQ.UvoQl7o6A1FhOfYxwzPbOy-cRU5l3ZwrY37TAJ-bn96rqR8QcGKLbjr9K8jm84U3fYtOD3rEQl2-Y4rOM31OJw"/' onepoint-chat-ui/src/lib/constants.ts

# Compile the server
cd ..
$YARN_PATH
$YARN_PATH build
# Run the server
$YARN_PATH start