#!/bin/sh
set -e

# Run the application directly from source location
# This ensures config.py resolves paths relative to /opt/graphrag_kb_server

# Start frpc in background if FRPC environment variables are set
if [ -n "${FRPC_SERVER_ADDR}" ] && [ -n "${FRPC_SERVER_PORT}" ] && \
   [ -n "${FRPC_TOKEN}" ] && [ -n "${FRPC_PROXY_NAME}" ] && \
   [ -n "${FRPC_LOCAL_PORT}" ] && [ -n "${FRPC_REMOTE_PORT}" ]; then
    echo "=== Starting frpc service ==="
    /frpc/run_frpc.sh &
else
    echo "=== FRPC environment variables not set, skipping frpc ==="
fi

cd /app
# Run directly from source, not from installed package
exec node dist/index.js