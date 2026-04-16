#!/bin/sh
set -e

# Check if FRPC environment variables are set
if [ -z "${FRPC_SERVER_ADDR}" ] || [ -z "${FRPC_SERVER_PORT}" ] || \
   [ -z "${FRPC_TOKEN}" ] || [ -z "${FRPC_PROXY_NAME}" ] || \
   [ -z "${FRPC_LOCAL_PORT}" ] || [ -z "${FRPC_REMOTE_PORT}" ]; then
    echo "WARNING: FRPC environment variables not set. Skipping frpc startup."
    echo "Required: FRPC_SERVER_ADDR, FRPC_SERVER_PORT, FRPC_TOKEN, FRPC_PROXY_NAME, FRPC_LOCAL_PORT, FRPC_REMOTE_PORT"
    exit 0
fi

# Generate frpc.toml from environment variables
cat > /frpc/frpc.toml <<EOF
serverAddr = "${FRPC_SERVER_ADDR}"
serverPort = ${FRPC_SERVER_PORT}
auth.method = "token"
auth.token = "${FRPC_TOKEN}"

[[proxies]]
name = "${FRPC_PROXY_NAME}"
type = "tcp"
localIP = "127.0.0.1"
localPort = ${FRPC_LOCAL_PORT}
remotePort = ${FRPC_REMOTE_PORT}
EOF

# Start frpc
exec /frpc/frpc -c /frpc/frpc.toml