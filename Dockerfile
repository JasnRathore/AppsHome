FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3003

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3003

CMD ["node", "server.js"]
