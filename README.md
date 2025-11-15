# BlindTestMaker
Cooperated blind test maker that allows multiple users to create a unique deezer playlist by adding their songs

Deployement url : https://blindtestmaker.pages.dev/

## Fonctionnalités
* Le mj se rend sur l'url et crée une nouvelle session. Cela demande de se connecter à Deezer. Puis un code qr ou une url est générée pour que les autres puissent ajouter leurs chansons.
* les autres joueurs se connectent via l'url qui contient les données du web socket permettant de transmettre les chansons au mj
* les joueurs recherchent une chanson et la sélectionnent. la recherche se fait via l'api Deezer et on peut prévisualiser la chanson.
* le mj choisit le nombre de chansons par joueur
* les joueurs entrent leur nom
* quand les joueurs ont fini les chansons son envoyées au mj avec le nom du joueur
* quand tout le monde a envoyé ses chansons le mj valide la création de la playlist sur son compte deezer 

## Configuration React (ajoutée)

Le projet contient maintenant une configuration minimale pour utiliser React + Vite.

- Fichiers ajoutés: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `.gitignore`

Pour installer les dépendances et lancer le serveur de développement, exécutez dans le répertoire du projet:

```powershell
npm install
npm run dev
```

Puis ouvrez `http://localhost:5173` (ou l'URL affichée) pour voir l'application React.

Si vous souhaitez reconstruire pour la production:

```powershell
npm run build
npm run preview
```
