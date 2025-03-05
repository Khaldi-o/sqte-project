# Migre le schéma vers la BDD
npx prisma migrate dev --name init

# Importe les types
npx prisma generate

# Seed developpement database
npx prisma db seed -- --environment development