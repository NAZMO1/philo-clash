# ⚡ PhiloClash — Philosophie vs Pop Culture

[![Démo en ligne](https://img.shields.io/badge/Démo-En%20ligne%20sur%20GitHub%20Pages-success?style=for-the-badge&logo=github)](https://NAZMO1.github.io/philo-clash/)
[![Licence : MIT](https://img.shields.io/badge/Licence-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Technologies](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Généré par IA](https://img.shields.io/badge/Pipeline%20Données-Google%20AI%20Studio%20(Gemini)-8E75C2?style=for-the-badge&logo=google)](https://aistudio.google.com/)

> **« Est-ce Nietzsche qui a dit ça… ou Damso ? Socrate ou Fight Club ? »**

**PhiloClash** est un jeu de quiz web dynamique et chronométré qui jette un pont entre la philosophie classique et la pop culture moderne (punchlines de rap, cinéma culte, science-fiction). Il associe une mécanique de jeu rapide à un volet pédagogique immédiat.

---

## 🎯 Fonctionnalités

- ⏱️ **Compte à rebours de 12 secondes :** jauge animée en temps réel qui passe au rouge sous la barre des 3,5 secondes.
- 💡 **Micro-fiches pédagogiques :** révélation immédiate de l'œuvre d'origine, de la date et d'une explication vulgarisée du concept en 2 à 3 phrases.
- 🤖 **Pipeline de données structurées par IA :** jeu de données généré et validé en JSON strict via **Google AI Studio (Gemini 2.5 Flash)**.
- 📱 **Conception pensée pour mobile :** interface adaptative épurée conçue avec **Tailwind CSS**.
- 🚀 **Zéro dépendance lourde :** architecture légère en JavaScript natif (*Vanilla JS*), exécutable directement dans tout navigateur moderne.

---

## 🛠️ Stack technique

- **Front-end :** HTML5, JavaScript moderne (ES6+)
- **Mise en page :** Tailwind CSS (via CDN)
- **Source de données :** Fichier JSON statique (`questions.json`)
- **Génération des données :** Google AI Studio (*Structured Output* Gemini)
- **Hébergement :** GitHub Pages / Vercel

---

## 📂 Structure du projet

```text
philo-clash/
├── index.html        # Interface principale, logique de jeu et chronomètre
├── questions.json    # Base de données des citations et micro-leçons
└── README.md         # Documentation du projet