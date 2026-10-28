# ⚡ PhiloClash — Philosophie × Pop Culture

**Quiz de citations : philosophie, rap et cinéma, avec 12 secondes pour répondre.**

[![Jouer en ligne](https://img.shields.io/badge/▶-Jouer_à_PhiloClash-22c55e?style=for-the-badge)](https://NAZMO1.github.io/philo-clash/) ![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white) [![MIT](https://img.shields.io/badge/Licence-MIT-blue)](LICENSE)

*Une citation : est-ce un philosophe, un artiste ou une réplique de cinéma ?*

**PhiloClash** met en relation des idées philosophiques et des références culturelles contemporaines dans un jeu web court et interactif. Chaque question se termine par une explication permettant d'aller au-delà de la bonne réponse.

### [▶ Essayer la démo en ligne](https://NAZMO1.github.io/philo-clash/)

## 🎯 Fonctionnalités

- Questions à **choix multiples** alimentées par un fichier JSON.
- **Chronomètre de 12 secondes** et jauge visuelle qui devient rouge en fin de temps.
- **Score et progression** mis à jour au fil du jeu.
- Retour immédiat indiquant la bonne réponse, le contexte et une **mini-leçon**.
- Résultat final et bouton **Rejouer**.
- Interface responsive avec **Tailwind CSS**, sans framework JavaScript.

## 🕹️ Comment jouer ?

1. Lire la citation affichée.
2. Choisir son auteur ou son œuvre parmi les propositions avant l'expiration du chronomètre.
3. Consulter la fiche explicative après la validation.
4. Continuer jusqu'au score final, puis rejouer.

## 🛠️ Stack et architecture

| Élément | Technologie | Utilisation |
| --- | --- | --- |
| Interface | HTML5 | Structure de l'application |
| Logique | JavaScript natif | État, score, minuteur et interactions |
| Design | Tailwind CSS via CDN | Styles et mise en page |
| Données | `questions.json` | Citations, réponses et explications |
| Hébergement | GitHub Pages | Application web statique |

Le navigateur charge `questions.json` via `fetch`, génère les boutons de réponse puis met à jour l'interface à partir des variables d'état du jeu. Aucun serveur applicatif ni base de données n'est nécessaire.

## 🚀 Exécution locale

```bash
git clone https://github.com/NAZMO1/philo-clash.git
cd philo-clash
python -m http.server 8000
```

Ouvrir **http://localhost:8000**.

Un petit serveur HTTP évite les restrictions de lecture locale de `questions.json` avec `file://`. Une connexion internet est nécessaire pour charger Tailwind depuis son CDN.

## 📁 Structure du projet

```text
philo-clash/
├── index.html        # Interface, styles et logique JavaScript
├── questions.json    # Citations, propositions et mini-leçons
├── LICENSE           # Licence MIT
└── README.md
```

## 📝 Structure des données

Le tableau `questions.json` utilise les champs `id`, `quote`, `author`, `type`, `choices`, `context` et `mini_lesson`. Pour ajouter une question, respecter ces champs et inclure la réponse `author` dans les `choices`.

Les questions sont actuellement jouées **dans l'ordre du fichier**, sans tirage aléatoire. Le contenu éditorial peut être préparé avec des outils d'IA, mais les citations et leurs attributions doivent être **vérifiées humainement** avant toute utilisation comme source fiable.

## 💡 Compétences mises en pratique

Manipulation du DOM, programmation événementielle, gestion d'état en JavaScript, temporisation, données structurées en JSON et réalisation d'une interface responsive pour un site statique.

## 🛣️ Améliorations envisagées

- [ ] Mélanger les questions et les choix à chaque partie.
- [ ] Ajouter des catégories, des niveaux et un mode sans chronomètre.
- [ ] Documenter et vérifier les sources de toutes les citations.
- [ ] Améliorer l'accessibilité et ajouter des tests.
- [ ] Ajouter des captures d'écran et une courte vidéo de démonstration.

## 📄 Licence

Code publié sous licence [MIT](LICENSE). Les droits éventuels sur les citations et œuvres évoquées sont distincts de la licence du code.

---

**Projet personnel mêlant développement web, philosophie et culture populaire.**
