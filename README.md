# OpenMind

Produkční MVP aplikace **OpenMind** — fullscreen mapa České republiky postavená na Next.js 15, MapLibre GL JS + OpenStreetMap, s autentizací (Auth.js/NextAuth Credentials), PostgreSQL + Prisma a rolí ADMIN/NPC.

## Funkce

- Fullscreen mapa ČR (MapLibre GL JS + OpenStreetMap)
- Zoom, posouvání a fullscreen ovládání
- Responzivní desktop i mobil
- Světlý a tmavý režim
- Uložení poslední pozice a zoomu do `localStorage`
- Autentizace přes e-mail/heslo (bcrypt + Zod, JWT session)
- Role `ADMIN` a `NPC`
  - Nepřihlášený → `/login`
  - `NPC` → pouze `/map`
  - `ADMIN` → `/map` a `/admin`
- Admin dashboard: počet všech uživatelů, ADMIN účtů a NPC účtů

## Seed účty

| E-mail                 | Heslo          | Role  |
| ---------------------- | -------------- | ----- |
| admin@openmind.local   | ChangeMe123!   | ADMIN |
| npc@openmind.local     | ChangeMe123!   | NPC   |

## Lokální spuštění

Požadavky: Node.js 20+, Docker (pro PostgreSQL).

1. Nainstaluj závislosti:

   ```bash
   npm install
   ```

2. Připrav prostředí:

   ```bash
   cp .env.example .env
   ```

3. Spusť PostgreSQL:

   ```bash
   docker compose up -d db
   ```

4. Aplikuj migrace a seed:

   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```

5. Spusť vývojový server:

   ```bash
   npm run dev
   ```

   Aplikace běží na <http://localhost:3000>.

## Produkční build

```bash
npm run prisma:generate
npm run build
npm start
```

## Docker

```bash
docker compose up --build
```

## Nasazení na Vercel (openmind.vercel.app)

1. Vytvoř Vercel projekt napojený na tento repozitář.
2. Nastav environment proměnné:
   - `DATABASE_URL` — PostgreSQL připojení (např. Neon, Supabase, Railway).
   - `AUTH_SECRET` — náhodný tajný řetězec.
   - `AUTH_TRUST_HOST=true`
3. Aplikuj migrace a seed na produkční databázi:

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. Deploy proběhne automaticky při push.

## Skripty

- `npm run dev` — vývojový server
- `npm run build` — produkční build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript kontrola
- `npm run prisma:generate` — generování Prisma klienta
- `npm run prisma:migrate` — migrace (dev)
- `npm run db:seed` — seed účtů
