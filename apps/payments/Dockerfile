###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine AS development
# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install -g pnpm

RUN pnpm i

# Bundle app source
COPY  apps/payments apps/payments
COPY libs libs


RUN pnpm run build

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./


RUN npm instal -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node" , "dist/apps/payments/main.js"]
