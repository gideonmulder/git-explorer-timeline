# git-explorer-timeline
WIP 

# Goal
view your git repository through graphical timeline

# Getting Started
This project is based on vite-express-single-port-boilerplate

**Install dependencies**:
   ```bash
   npm install
   cd app && npm install
   cd ../server && npm install
   ```

**Run in development mode**:
   ```bash
   npm run dev
   ```
   - Open your browser and navigate to `http://localhost:5173`.

**Build for production**:
   ```bash
   npm run build
   ```

**Serve in production mode**:
   ```bash
   npm run serve
   ```
   - Open your browser and navigate to `http://localhost:5000`.

# Directory Structure

```
git-explorer-timeline/
├── app/                  # Frontend (Vite + React + TypeScript)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── routes/
│   │       ├── Home.tsx
│   │       └── About.tsx
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── package.json
│   ├── vite.config.ts
├── server/               # Backend (Express + TypeScript)
│   ├── node_modules/
│   ├── src/
│   │   └── index.ts
│   ├── dist/
│   ├── tsconfig.json
│   ├── package.json
├── node_modules/
├── package.json
```

---