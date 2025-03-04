# Étape de construction
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Image finale
FROM node:18-alpine
WORKDIR /app
# Copier tout le résultat de la build, y compris le dossier statique "out"
COPY --from=builder /app ./
RUN npm prune --production
EXPOSE 3000
CMD ["npx", "serve", "out"]