# 🇩🇿 MACDI (ماكدي) - Comparateur Solidaire de Prix Alimentaires en Algérie

> **Application Mobile-First & PWA** "grand-parent friendly" pour comparer les prix alimentaires du quotidien en Algérie, avec cartographie interactive haute définition, certification GPS des magasins et modération communautaire anti-spam (cooldown 15 minutes).

---

## 🛍️ Fonctionnalités Clés

1. **Expérience Fluide Sans Chiffres d'Étapes** :
   - **Sélection du Produit** : Recherche vocale bilingue 🎙️ (Arabe dialectal & Français) + carrousel d'articles populaires (*Lait Soummam 1L, Huile Elio 5L, Sucre Cevital 1kg, Semoule Sim, Tomate Benamor, etc.*).
   - **Zone & Rayon** : Détection GPS en 1 clic ou communes clés (*Bab Ezzouar, Kouba, Alger Centre, Hydra, Boufarik, Blida...*) + 3 touches tactiles géantes (**3 km 🚶**, **15 km 🚗**, **30 km 🛣️**).
   - **Carte Haute Définition & Prix Directs** : Design de carte épuré CartoDB Voyager avec bulles de prix en Dinars (**95 DA en vert** avec badge **"Le moins cher"** en Français ou **"الأرخص"** en Arabe, jaune pour la moyenne, rouge pour les prix élevés, or pour les promos) + itinéraire Google Maps direct.

2. **Ajout de Magasin / Marché Libre avec GPS Obligatoire** :
   - Tout commerçant ou citoyen peut déclarer un magasin ou un marché libre avec son prix promotionnel.
   - **Certification GPS de l'appareil OBLIGATOIRE** : Impossible de publier sans activer et certifier la position réelle de l'appareil (empêche la création de magasins fantômes à distance).

3. **Moteur de Confiance Communautaire & Anti-Spam** :
   - Votes citoyens `👍 Prix Exact` vs `👎 Prix Faux` avec score de fiabilité en temps réel.
   - **Verrou Anti-Spam de 15 minutes** : Compte à rebours dynamique (`⏳ 14:45`) bloquant les votes répétés sur un même produit.

4. **PWA Standalone** :
   - Épinglable directement sur l'écran d'accueil du smartphone (Android Chrome & iPhone Safari) sans passer par le Play Store.
   - Nouvel icône sac de courses aux couleurs algériennes.

---

## 🚀 Lancement en Local

```bash
cd as3ar-dz
npm install
npm run dev
```
Accès local : `http://localhost:5173`

Pour lancer le serveur de production Express :
```bash
npm run build
npm start
```
Accès : `http://localhost:3000`

---

## 🌐 Déploiement sur GitHub & Render

* **Dépôt GitHub officiel** : [https://github.com/vvazzim/MACDI.git](https://github.com/vvazzim/MACDI.git)
* **Déploiement Render** :
  1. Rendez-vous sur [dashboard.render.com](https://dashboard.render.com).
  2. Cliquez sur **New +** ➔ **Web Service**.
  3. Sélectionnez le dépôt `vvazzim/MACDI`.
  4. Render détectera automatiquement le fichier `render.yaml` :
     - **Build Command** : `npm install && npm run build`
     - **Start Command** : `node server.js`
  5. Cliquez sur **Deploy**. Votre URL publique `https://macdi.onrender.com` sera en ligne en 2 minutes !
