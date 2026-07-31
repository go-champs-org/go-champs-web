FROM node:20.18.1

# Install Cypress dependencies
RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xfonts-cyrillic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-base \
    xfonts-scalable \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm (matches packageManager pin in root package.json)
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Set display for Cypress
ENV DISPLAY=:99

EXPOSE 3000