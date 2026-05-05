FROM node:latest AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y dos2unix

# Build-time env for Vite frontend compilation
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

# Copy dependency manifests first for better layer caching
COPY package.json yarn.lock ./
COPY onepoint-chat-ui/package.json onepoint-chat-ui/yarn.lock ./onepoint-chat-ui/
COPY docker/run_frpc.sh /app/run_frpc.sh
COPY docker/run.sh /app/run.sh

RUN dos2unix /app/run_frpc.sh && chmod +x /app/run_frpc.sh
RUN dos2unix /app/run.sh && chmod +x /app/run.sh

# Install dependencies for root and UI projects
RUN yarn install --frozen-lockfile
RUN yarn --cwd onepoint-chat-ui install --frozen-lockfile

# Copy source after dependencies are installed
COPY . .

# Build UI first, then backend
RUN yarn --cwd onepoint-chat-ui build
RUN yarn build


FROM node:latest AS runtime

# 1. Prepare frpc
RUN mkdir -p /frpc/
COPY docker/run_frpc.sh /frpc/
ADD https://github.com/fatedier/frp/releases/download/v0.68.1/frp_0.68.1_linux_amd64.tar.gz /tmp/frp.tar.gz
RUN tar -xzf /tmp/frp.tar.gz -C /tmp/ && \
    mv /tmp/frp_0.68.1_linux_amd64/frpc /frpc/frpc && \
    chmod +x /frpc/frpc /frpc/run_frpc.sh && \
    rm -rf /tmp/frp.tar.gz /tmp/frp_0.68.1_linux_amd64

WORKDIR /app

# Runtime metadata and dependencies
COPY package.json yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Compiled backend and required runtime assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/onepoint-chat-ui/dist ./onepoint-chat-ui/dist
COPY --from=builder /app/run_frpc.sh ./run_frpc.sh
COPY --from=builder /app/run.sh ./run.sh

RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix /app/run.sh && chmod +x /app/run.sh
RUN dos2unix /app/run_frpc.sh && chmod +x /app/run_frpc.sh


EXPOSE 5000

CMD ["/app/run.sh"]
