# Compile the UI
cd onepoint-chat-ui
yarn
yarn build

# Compile the server
cd ..
yarn
yarn build

# Run the server
yarn start