/* ==========================================
   Heróis de Tatuí - JavaScript
   1. Menu mobile
   2. Checklist do herói
   3. Quiz
   4. Imagens
   ========================================== */

/* ---------- 1. Menu mobile ---------- */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}

menuBtn.addEventListener('click', toggleMenu);
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

/* ---------- 2. Checklist do herói ---------- */
const checkboxes = document.querySelectorAll('#checklist input');
const progressText = document.getElementById('progress');
const checkMessage = document.getElementById('checkMsg');
const STORAGE_KEY = 'herois-tatui-checklist';

// Lê o que foi salvo no navegador (se der erro, começa vazio)
function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveChecklist() {
  const values = [...checkboxes].map((box) => box.checked);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch (error) {
    // sem localStorage: o checklist só não fica salvo
  }
}

function updateProgress() {
  const done = [...checkboxes].filter((box) => box.checked).length;
  const total = checkboxes.length;

  progressText.textContent = `${done}/${total}`;
  checkMessage.textContent =
    done === total
      ? '★ Missão cumprida! Volte na próxima semana.'
      : 'Missão recorrente. Proteção contínua.';
}

function handleCheckChange() {
  updateProgress();
  saveChecklist();
}

const savedValues = loadChecklist();
checkboxes.forEach((box, index) => {
  box.checked = Boolean(savedValues[index]);
  box.addEventListener('change', handleCheckChange);
});
updateProgress();

/* ---------- 3. Quiz ---------- */
const options = document.querySelectorAll('.opt');
const quizResult = document.getElementById('quizResult');
const quizTitle = document.getElementById('quizTitle');
const quizState = document.getElementById('quizState');
const resetButton = document.getElementById('quizReset');

function answerQuiz(chosen) {
  const isCorrect = chosen.dataset.correct === 'true';

  options.forEach((option) => {
    option.disabled = true;
    if (option.dataset.correct === 'true') option.classList.add('correct');
  });

  if (!isCorrect) chosen.classList.add('wrong');

  quizTitle.textContent = isCorrect
    ? 'CONHECIMENTO DESBLOQUEADO!'
    : 'QUASE! APRENDA ESTE DETALHE:';
  quizResult.hidden = false;
  quizState.hidden = false;
}

function resetQuiz() {
  options.forEach((option) => {
    option.disabled = false;
    option.classList.remove('correct', 'wrong');
  });
  quizResult.hidden = true;
  quizState.hidden = true;
}

options.forEach((option) => option.addEventListener('click', () => answerQuiz(option)));
resetButton.addEventListener('click', resetQuiz);

/* ---------- 4. Imagens que faltam ---------- */
// Se a imagem não carregar, o placeholder xadrez continua aparecendo
document.querySelectorAll('img.ph').forEach((img) => {
  img.addEventListener('error', () => {
    img.removeAttribute('src');
    img.style.minHeight = '180px';
    img.alt = img.dataset.ph || img.alt;
  });
});
