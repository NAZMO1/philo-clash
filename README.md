# PhiloClash — Philosophie × Pop culture

Un jeu en français pour découvrir des concepts philosophiques à partir de Matrix, Naruto, One Piece, Soul, Spider-Man, Animal Crossing et d’autres œuvres.

[Jouer sur GitHub Pages](https://NAZMO1.github.io/philo-clash/)

## Trois modes

- **Qui pense quoi ?** : huit questions alternant penseur, œuvre et idée commune. Les propositions mêlent philosophie et pop culture.
- **Le concept caché** : huit scènes à relier à un concept philosophique.
- **À ta place…** : cinq dilemmes sans bonne ou mauvaise réponse, suivis de pistes de discussion.

Chaque manche propose un lien œuvre/penseur, une nuance, une question du quotidien et un repère bibliographique. Le bilan reprend les concepts explorés. Questions et réponses sont mélangées ; un chrono facultatif de 20 secondes est disponible dans les deux quiz. Les explications restent lisibles sans limite de temps.

## Contenu éditorial

Les scènes et idées sont **reformulées**, sans prétendre citer les œuvres. Les rapprochements sont des propositions de lecture, pas des preuves d’influence. Le fichier `questions.json` contient huit passerelles, chacune avec sa référence philosophique et les limites du parallèle. Les anciennes citations et paroles à attribution incertaine ont été remplacées. Les dilemmes invitent à argumenter plutôt qu’à évaluer une personnalité.

## Lancer en local

```bash
python -m http.server 8000
```

Ouvrir http://localhost:8000. Aucun build, compte ou service externe n’est nécessaire. Les styles sont locaux ; un serveur HTTP permet de charger les données JSON.

## Structure

- `index.html` : accueil, partie et bilan, structure accessible.
- `style.css` : identité visuelle, responsive et prise en compte de la réduction des animations.
- `app.js` : chargement avec possibilité de réessayer, mélange, modes, score et chrono.
- `questions.json` : scènes, idées, concepts, références, nuances et dilemmes.
- `tests/smoke.cjs` : tests navigateur des parcours et des cas limites (Playwright).

## Vérification

Avec Node.js et Playwright installés, lancer le serveur sur le port 8000, puis :

```bash
node tests/smoke.cjs
```

Le test parcourt les trois modes, vérifie le bilan, le chrono, le retour à l’accueil, les erreurs de chargement et l’affichage mobile.

Code sous licence MIT. Les œuvres évoquées restent la propriété de leurs ayants droit.
