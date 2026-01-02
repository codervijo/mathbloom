FROM debian:latest

# Update and install base dependencies
RUN apt-get -y update && apt-get -y upgrade && \
    apt-get -y install git vim wget curl build-essential autoconf autotools-dev procps net-tools ssh bash \
    # Go toolchain (for `server/`)
    golang

# Set Bash as the default shell
SHELL ["/bin/bash", "-c"]
# Ensure Bash is the default shell for interactive sessions
RUN ln -sf /bin/bash /bin/sh

# Install nvm and Node.js
ENV NVM_DIR=/root/nvm

RUN mkdir -p $NVM_DIR && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    nvm install node && \
    nvm use node && \
    nvm alias default node && \
    ln -sf $NVM_DIR/versions/node/$(nvm version node)/bin/node /usr/local/bin/node && \
    ln -sf $NVM_DIR/versions/node/$(nvm version node)/bin/npm /usr/local/bin/npm

# Install pnpm globally
RUN npm install -g pnpm


# Set up application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Install Vite globally using pnpm

# Expose application port (Vite default port)
EXPOSE 5173

# Default command to run the React app using Vite
CMD ["pnpm", "vite"]
