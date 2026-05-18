#!/bin/bash
# HACKATHON PRE-INSTALL SCRIPT
# Run tonight BEFORE the hackathon. Takes ~5 min.
# Usage: chmod +x SETUP.sh && ./SETUP.sh

set -e
echo "=== HACKATHON ENV SETUP ==="

# ── Python backends ──────────────────────────────────────
echo "[1/6] Installing Python backend packages..."
pip3 install fastapi uvicorn flask flask-cors python-dotenv 2>/dev/null || \
  pip install fastapi uvicorn flask flask-cors python-dotenv
echo "  OK: fastapi, uvicorn, flask, flask-cors, python-dotenv"

# ── Node globals ─────────────────────────────────────────
echo "[2/6] Installing Node global tools..."
npm install -g create-vite tsx nodemon
echo "  OK: create-vite, tsx, nodemon"

# ── Pre-install common npm packages (cached for offline) ──
echo "[3/6] Caching common npm packages..."
mkdir -p /tmp/npm-cache-warmup && cd /tmp/npm-cache-warmup
npm install express cors dotenv better-sqlite3 uuid 2>/dev/null
cd /home/diyorbek/hacathon-akhu
echo "  OK: express, cors, dotenv, better-sqlite3, uuid cached"

# ── Vite + React + Tailwind skeleton ─────────────────────
echo "[4/6] Scaffolding React+Tailwind skeleton..."
if [ ! -d "skeletons/react-express" ]; then
  mkdir -p skeletons
  npm create vite@latest skeletons/react-express -- --template react --yes 2>/dev/null || \
    npx create-vite skeletons/react-express --template react
  cd skeletons/react-express
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  # Patch tailwind.config.js
  cat > tailwind.config.js << 'EOF'
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
EOF
  # Patch index.css to include Tailwind
  cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
  cd /home/diyorbek/hacathon-akhu
  echo "  OK: skeletons/react-express ready"
else
  echo "  SKIP: skeleton already exists"
fi

# ── Backend skeleton ──────────────────────────────────────
echo "[5/6] Scaffolding Express backend skeleton..."
if [ ! -d "skeletons/express-sqlite" ]; then
  mkdir -p skeletons/express-sqlite/{routes,db}
  cd skeletons/express-sqlite
  npm init -y
  npm install express cors dotenv better-sqlite3
  cat > index.js << 'EOF'
import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const db = new Database(join(__dirname, "db/app.sqlite"));

app.use(cors());
app.use(express.json());

// Apply schema on startup
try {
  const schema = readFileSync(join(__dirname, "db/schema.sql"), "utf8");
  db.exec(schema);
} catch(e) { console.warn("Schema file not found, skipping"); }

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Routes loaded here
// import itemsRouter from "./routes/items.js";
// app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));
EOF
  # package.json with type:module
  node -e "
    const pkg = JSON.parse(require('fs').readFileSync('package.json','utf8'));
    pkg.type = 'module';
    pkg.scripts = { start: 'node index.js', dev: 'nodemon index.js' };
    require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  "
  touch db/schema.sql db/seed.sql
  cd /home/diyorbek/hacathon-akhu
  echo "  OK: skeletons/express-sqlite ready"
else
  echo "  SKIP: backend skeleton already exists"
fi

# ── Verify ────────────────────────────────────────────────
echo "[6/6] Verifying installs..."
python3 -c "import fastapi, uvicorn, flask; print('  Python packages: OK')"
node -e "console.log('  Node: OK')"
sqlite3 --version | head -1 | xargs echo "  SQLite:"

echo ""
echo "=== SETUP COMPLETE ==="
echo "Skeletons ready:"
echo "  Frontend : skeletons/react-express/"
echo "  Backend  : skeletons/express-sqlite/"
echo ""
echo "At hackathon start, copy a skeleton:"
echo "  cp -r skeletons/react-express frontend && cp -r skeletons/express-sqlite backend"
