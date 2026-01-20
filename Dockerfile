FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copier uniquement les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Le code sera monté via volume
EXPOSE 3000

# Lancer Next.js en mode dev
CMD ["npm", "run", "dev"]