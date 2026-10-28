'use strict';
const $ = id => document.getElementById(id);
const labels = {clash:'Qui pense quoi ?',concept:'Le concept caché',dilemma:'À ta place…'};
let bank = [], deck = [], mode = 'concept', index = 0, score = 0, answered = false, timer = null, timed = false, visited = [];
const shuffle = items => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
};
function show(screen) {
  ['home','game','result'].forEach(id => $(id).hidden = id !== screen);
  $('home-button').hidden = screen === 'home';
  window.scrollTo({top:0,behavior:'instant'});
}
function stopTimer() { clearInterval(timer); timer = null; }
async function load() {
  $('retry').hidden = true;
  $('load-status').textContent = 'Chargement des idées…';
  try {
    const response = await fetch('./questions.json');
    if (!response.ok) throw new Error('HTTP');
    const data = await response.json();
    const fields = ['id','work','medium','thinker','reference','concept','scene','idea','origin','bridge','nuance','everyday','dilemma','discussion'];
    if (!Array.isArray(data) || data.length < 4 || new Set(data.map(q => q.id)).size !== data.length || data.some(q => fields.some(f => typeof q[f] !== 'string' || !q[f]) || !Array.isArray(q.positions) || q.positions.length !== 2 || q.positions.some(p => typeof p !== 'string'))) throw new Error('Format');
    bank = data;
    document.querySelectorAll('[data-mode]').forEach(button => button.disabled = false);
    $('load-status').textContent = `${bank.length} passerelles à explorer · Scènes reformulées, sans prérequis.`;
  } catch {
    $('load-status').textContent = 'Les questions n’ont pas pu être chargées. Vérifie ta connexion puis réessaie.';
    $('retry').hidden = false;
  }
}
function start(selectedMode) {
  stopTimer(); mode = selectedMode; index = 0; score = 0; visited = [];
  timed = $('timed').checked && mode !== 'dilemma';
  deck = shuffle(bank).slice(0, mode === 'dilemma' ? 5 : 8);
  show('game'); renderQuestion();
}
function choicesFor(q) {
  if (mode === 'dilemma') return q.positions.map(text => ({text,correct:false}));
  if (mode === 'concept') return shuffle([q.concept,...shuffle(bank.filter(x => x.concept !== q.concept).map(x => x.concept)).slice(0,3)]).map(text => ({text,correct:text === q.concept}));
  // Alternate real origins and shared ideas: “both” is not the answer to every round.
  const kind = index % 3;
  const correct = kind === 0 ? q.thinker : kind === 1 ? q.work : q.origin;
  const texts = kind === 0 ? [q.thinker,...shuffle(bank.filter(x => x.thinker !== q.thinker).map(x => x.thinker)).slice(0,2),q.work] : kind === 1 ? [q.work,...shuffle(bank.filter(x => x.work !== q.work).map(x => x.work)).slice(0,2),q.thinker] : [q.origin,'Philosophie uniquement','Pop culture uniquement','Aucun des deux'];
  return shuffle(texts).map(text => ({text,correct:text === correct}));
}
function renderQuestion() {
  stopTimer(); answered = false;
  const q = deck[index];
  $('lesson').hidden = true;
  $('mode-label').textContent = labels[mode];
  $('progress').textContent = `${mode === 'dilemma' ? 'Dilemme' : 'Question'} ${index + 1} / ${deck.length}`;
  $('score').textContent = mode === 'dilemma' ? 'Sans bonne ou mauvaise réponse' : `Score : ${score}`;
  $('progress-bar').style.width = `${index / deck.length * 100}%`;
  $('question-tag').textContent = mode === 'clash' ? 'Les idées voyagent' : `${q.medium} · ${q.work}`;
  $('game-title').textContent = mode === 'dilemma' ? q.dilemma : mode === 'concept' ? 'Quelle idée se cache dans cette scène ?' : index % 3 === 0 ? 'Quel penseur fait écho à cette idée ?' : index % 3 === 1 ? 'Dans quelle œuvre retrouve-t-on cette situation ?' : 'Cette question traverse quels univers ?';
  $('prompt').textContent = mode === 'dilemma' ? q.scene : mode === 'clash' && index % 3 !== 1 ? q.idea : q.scene;
  $('choices').replaceChildren();
  choicesFor(q).forEach(({text,correct}) => {
    const button = document.createElement('button'); button.className = 'choice'; button.textContent = text; button.dataset.correct = String(correct);
    button.addEventListener('click', () => answer(button)); $('choices').append(button);
  });
  $('clock').hidden = !timed;
  if (timed) {
    const end = performance.now() + 20000;
    const tick = () => {
      const remaining = Math.max(0,end - performance.now());
      $('time-label').textContent = `${Math.ceil(remaining / 1000)} s restantes`;
      $('timer-bar').style.width = `${remaining / 200}%`;
      $('timer-bar').style.background = remaining < 5000 ? '#ff9caa' : 'var(--lime)';
      if (!remaining) answer(null);
    };
    timer = setInterval(tick,100); tick();
  }
  $('game-title').focus();
}
function answer(selected) {
  if (answered) return;
  answered = true; stopTimer();
  const q = deck[index], correct = selected?.dataset.correct === 'true';
  if (correct) score++;
  const buttons = [...$('choices').children];
  buttons.forEach(button => {
    button.disabled = true;
    if (mode !== 'dilemma' && button.dataset.correct === 'true') {button.classList.add('correct'); button.textContent += ' — Bonne réponse';}
    else if (button === selected) {button.classList.add(mode === 'dilemma' ? 'chosen' : 'wrong');button.textContent += mode === 'dilemma' ? ' — Ton choix' : ' — Ta réponse';}
  });
  $('score').textContent = mode === 'dilemma' ? 'Une question, plusieurs perspectives' : `Score : ${score}`;
  $('answer-status').textContent = mode === 'dilemma' ? 'Ton choix ouvre la discussion.' : correct ? 'Bien vu ! Voici le lien.' : selected ? 'Découvrons le lien ensemble.' : 'Temps écoulé. Prends le temps de découvrir le lien.';
  $('connection').textContent = `${q.work} ↔ ${q.thinker}`;
  $('bridge').textContent = mode === 'dilemma' ? `${q.discussion} ${q.bridge}` : q.bridge;
  $('nuance').textContent = q.nuance; $('daily').textContent = q.everyday; $('reference').textContent = q.reference;
  $('lesson').querySelector('details').open = false;
  $('next').textContent = index === deck.length - 1 ? 'Voir mon bilan →' : 'Continuer →';
  $('lesson').hidden = false;
  visited.push(q);
  $('next').focus({preventScroll:true});
}
function finish() {
  stopTimer(); show('result');
  $('result-title').textContent = mode === 'dilemma' ? '5 dilemmes. Des pistes à explorer.' : `${score} / ${deck.length} — et de nouvelles connexions.`;
  $('result-description').textContent = 'Les œuvres ne donnent pas toutes les réponses. Elles nous aident à poser les questions. Retrouve les idées explorées et choisis celle que tu veux garder en tête.';
  $('recap').replaceChildren();
  visited.forEach(q => {
    const article = document.createElement('article'), heading = document.createElement('h2'), paragraph = document.createElement('p');
    heading.textContent = `${q.work} × ${q.concept}`; paragraph.textContent = q.everyday; article.append(heading,paragraph); $('recap').append(article);
  });
  $('result-title').focus();
}
function home() {stopTimer();show('home');document.querySelector('[data-mode]').focus();}
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click',() => start(button.dataset.mode)));
$('next').addEventListener('click',() => {if (!answered) return; index++; index < deck.length ? renderQuestion() : finish();});
$('home-button').addEventListener('click',home);$('other-mode').addEventListener('click',home);
$('replay').addEventListener('click',() => start(mode));$('retry').addEventListener('click',load);
load();
