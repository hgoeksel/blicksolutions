# BlickSolutions Catering Shop 🛒

Ein einfacher Web-Shop für Catering-Produkte, gebaut mit **React 19**, **Material-UI 7**, **Vite**, **Express** und **MongoDB**.  

---

## Features

- Anzeige von Produkten mit Bild, Beschreibung und Preis
- Warenkorb mit **sofortiger Mengenaktualisierung** (Plus/Minus Buttons)
- Badge im Menü zeigt aktuelle Anzahl der Produkte im Warenkorb
- Gesamtsumme im Warenkorb
- Produktbilder werden korrekt zugeschnitten
- Persistente Speicherung in MongoDB

---

## Tech-Stack

- **Frontend:** React 19, Material-UI 7, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Datenbank:** MongoDB
- **Dev-Tools:** ESLint, Vite

---

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/hgoeksel/blicksolutions.git
cd blicksolutions-catering

### 2. Backend installieren
cd backend
npm install

### 3. Frontend installieren
cd ../frontend
npm install

### Backend starten
cd backend
# Server auf Port 4000 starten
npm run dev

### Frontend starten
cd frontend

### Seed-Daten (Produkte einfügen)
cd backend
ts-node seed.ts
npm run dev
