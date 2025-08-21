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
sed -i 's/4000/443/g' dist/index.html
sed -i 's/5000/443/g' dist/index.html
sed -i 's/localhost/osca.onepointltd.ai/g' dist/index.html

# Replace the server with the staging server
cp src/lib/server_staging.ts src/lib/server.ts

# Replace the token with sed
sed -i '/ONE_TIME_TOKEN/s/"[^"]*"/"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVwb2ludGx0ZCIsIm5hbWUiOiJvbmVwb2ludGx0ZCIsImlhdCI6MTc1NTUwMzMxMiwiZW1haWwiOiJvc2NhQG9uZXBvaW50bHRkLmNvbSIsInBlcm1pc3Npb25zIjpbInJlYWQiXX0.0r1g_L5WNN8bdiy58mTKn8Ktt3OUj6ZI6nbFJVSeJbdwwFJT6pe2pX4crLyUR-zprePcVIgjIpol320hB-7ksw"/' src/lib/constants.ts

# Compile the server
cd ..
$YARN_PATH
$YARN_PATH build
# Run the server
$YARN_PATH start