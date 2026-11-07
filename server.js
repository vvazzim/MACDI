import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API health check for Render
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'as3ar-dz', timestamp: new Date().toISOString() });
});

// Serve Vite build files from /dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for Single Page Application client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 As3ar-DZ PWA en cours d'exécution sur le port ${PORT}`);
  console.log(`🌍 Accès local : http://localhost:${PORT}`);
});
