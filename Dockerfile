# syntax=docker/dockerfile:1.7

# Uses node:22-alpine
FROM node@sha256:cb3143549582cc5f74f26f0992cdef4a422b22128cb517f94173a5f910fa4ee7 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG APP_ENV_DIGEST=local
RUN --mount=type=secret,id=app_env,target=/app/.env,required=true \
    test -n "$APP_ENV_DIGEST" && corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Set the correct permission for prerender cache
RUN mkdir -p .next && chown node:node .next

# Remove this line if you do not have this folder
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/resumes ./resumes
# COPY --from=builder /app/media ./media

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
