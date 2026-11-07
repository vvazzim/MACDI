# 🇩🇿 As3ar DZ - Comparateur Solidaire de Prix Alimentaires en Algérie

> **Prototype PWA Mobile-First** ultra-simple ("grand-parent friendly") conçu pour le marché algérien, avec récupération asynchrone des prix, cartographie interactive et moteur de modération communautaire anti-spam (verrou 15 minutes).

---

## 📱 Fonctionnalités Clés

1. **Parcours en 3 Étapes Ultra-Simple** :
   - **Étape 1 : Le Produit** : Recherche vocale assistée par IA / navigateur (Arabe dialectal & Français) + 6 grandes tuiles thématiques + carrousel des produits indispensables (Lait Soummam 1L, Huile Elio 5L, Sucre Cevital 1kg, etc.).
   - **Étape 2 : La Zone & le Rayon** : Détection GPS automatique en 1 clic ou sélecteur de Wilaya / Communes (Bab Ezzouar, Kouba, Alger Centre, Hydra, Boufarik, Blida...) + 3 touches tactiles géantes (3 km 🚶, 15 km 🚗, 30 km 🛣️).
   - **Étape 3 : Carte Épurée & Prix Directs** : Carte interactive Leaflet avec bulles de prix en Dinars (🟢 Vert = Le moins cher, 🟡 Jaune = Prix moyen, 🔴 Rouge = Plus cher, ⚡ Or = Promo Commerçant). Fiche détaillée en bas avec itinéraire Google Maps direct.

2. **Moteur de Confiance Communautaire & Anti-Spam** :
   - **Vote citoyen** : `👍 Prix Exact` vs `👎 Faux Prix` avec calcul du score de confiance (ex: *94% vérifié par 24 voisins*).
   - **Verrou Anti-Spam strict de 15 minutes** : Impossible pour un utilisateur ou concurrent d'inonder un produit de faux avis. Un compte à rebours dynamique s'affiche (`⏳ Patientez 14:32`).
   - **Espace Promo Commerçant** : Les supérettes peuvent déclarer des prix réduits officiels avec durée de validité et mise en avant dorée sur la carte.

3. **PWA (Progressive Web App)** :
   - Installable directement sur l'écran d'accueil du smartphone sans passer par le Play Store (`display: standalone`).
   - Service Worker pour chargement instantané en cache et tolérance aux déconnexions 3G/4G.
   - Bilingue Français / Arabe (RTL fluide).

---

## 🚀 Lancement en Local

```bash
cd as3ar-dz
npm install
npm run dev
```
Ouvrez `http://localhost:5173` dans votre navigateur (ou depuis votre smartphone sur le même réseau WiFi via l'IP locale affichée par Vite).

Pour tester le serveur de production Express :
```bash
npm run build
npm start
```
Accessible sur `http://localhost:3000`.

---

## 🌐 Déploiement sur Render (render.com)

Le projet est 100% prêt pour **Render** avec le fichier [`render.yaml`](file:///C:/career/as3ar-dz/render.yaml) et le serveur Node.js [`server.js`](file:///C:/career/as3ar-dz/server.js).

### Option 1 : Via GitHub (Recommandé)
1. Créez un dépôt sur GitHub (ex: `as3ar-dz`).
2. Poussez ce dossier vers votre dépôt :
   ```bash
   git remote add origin https://github.com/<votre-user>/as3ar-dz.git
   git branch -M main
   git push -u origin main
   ```
3. Sur [dashboard.render.com](https://dashboard.render.com) :
   - Cliquez sur **New +** ➔ **Web Service**
   - Sélectionnez votre dépôt `as3ar-dz`
   - Les paramètres sont détectés automatiquement :
     - **Build Command** : `npm install && npm run build`
     - **Start Command** : `node server.js`
     - **Environment** : `Node`
4. Cliquez sur **Deploy Web Service**. Votre URL publique `https://as3ar-dz.onrender.com` sera active en ~2 minutes !

### Option 2 : Déploiement Blueprint 1-Clic
Render détectera automatiquement le fichier `render.yaml` pour configurer le service web gratuitement sur la région Francfort (la plus proche d'Alger pour une latence minimale).

---

## 📲 Comment l'épingler sur son écran de téléphone

* **Sur Android (Google Chrome)** :
  1. Ouvrez le lien du site sur Chrome.
  2. Touchez les 3 points verticaux en haut à droite.
  3. Sélectionnez **"Ajouter à l'écran d'accueil"** puis **"Installer"**.
* **Sur iPhone (Safari)** :
  1. Ouvrez le lien sur Safari.
  2. Touchez l'icône de partage (carré avec flèche vers le haut).
  3. Faites défiler et touchez **"Sur l'écran d'accueil"** puis **"Ajouter"**.
