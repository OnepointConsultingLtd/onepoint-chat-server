#!/bin/bash

export PATH=/home/ubuntu/.nvm/versions/node/v22.12.0/bin:$PATH

# Change to the script's directory
cd "$(dirname "$0")"

# Set yarn path
YARN_PATH='/home/ubuntu/.nvm/versions/node/v22.12.0/bin/yarn'

# Compile the UI
cd onepoint-chat-ui

# Replace the server with the staging server
cp src/lib/server_staging.ts src/lib/server.ts

# Replace the token with sed
sed -i '/ONE_TIME_TOKEN/s/"[^"]*"/"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtdXJ0YXphIiwibmFtZSI6Ik11cnRhemEiLCJpYXQiOjE3NTkxMzA3NDMsImVtYWlsIjoibXVydGF6YUBnbWFpbC5jb20iLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiXX0.Okbw0pfpEB4cNE2Qopu6Ckpl3lNwZiwXAfrY0CgdLZn_3IBTAv1dvXfs7BicXahgVl8Et7Rlm2ASjbDOCvkKoQ"/' src/lib/constants.ts

$YARN_PATH
$YARN_PATH build

# Change the port variable in .\onepoint-chat-ui\dist\index.html to 8084
sed -i 's/4000/443/g' dist/index.html
sed -i 's/5000/443/g' dist/index.html
sed -i 's/localhost/osca.onepointltd.ai/g' dist/index.html

# Compile the server
cd ..
$YARN_PATH
$YARN_PATH build
# Run the server
$YARN_PATH start