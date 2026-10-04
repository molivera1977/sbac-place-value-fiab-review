/* ═══════════════════════════════════════════════════════
   SBAC FIAB REVIEW · Place Value & Multidigit Whole Numbers
   script.js — engine copied from Math Module 1 Review,
   extended with the SBAC interim item types:
     • type:"grid"   — True/False and Yes/No row grids
     • type:"entry"  — typed numeric answer
     • type:"symbol" — <  >  =  comparison pad
   (no type) = 4-choice multiple choice, unchanged
   PIN: 9377 (Teacher override)
═══════════════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────────────── */
const REVIEW_OPEN   = true;   // false = students locked out; only Teacher Access works. Set true to open.
const INSTRUCT_SECS = 20;
const READ_SECS     = 12;
const NEXT_SECS     = 8;
const STORAGE_KEY   = 'pvfiab_session_v1';
const SCORES_KEY    = 'pvfiab_scores_v1';
const PVFIAB_SESSION_ID_KEY = 'pvfiab_session_id_v1';
const SESSION_ID = (() => {
  let id = localStorage.getItem(PVFIAB_SESSION_ID_KEY);
  if (!id) { id = 'PV-' + Math.random().toString(36).slice(2, 9).toUpperCase(); localStorage.setItem(PVFIAB_SESSION_ID_KEY, id); }
  return id;
})();

/* ── SHEET SUBMISSION ───────────────────────────────── */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzv8CWv1yyi8NeH04now9UxVL4IZm5yMqqsEGMcgGdrcAOWVB-aSp5siTvSSJXIUpzFMA/exec';

let tabSwitchCount = 0;

/* One saved miss: "[ID] (Skill) question (picked: answer)". The dashboard reads the
   pick to show which wrong choice each student chose; " | " separates entries, so
   it is swapped out of the pick just in case. */
function missEntry(m) {
  const picked = m.yourAnswer == null || m.yourAnswer === '' ? '' :
    ` (picked: ${String(m.yourAnswer).replace(/\s*\|\s*/g, ' / ').replace(/\s+/g, ' ').trim()})`;
  return `[${m.id}] (${m.skill || 'Unsorted'}) ${m.q}${picked}`;
}

function submitScorePartial() {
  const pts = bankPoints(app.currentBank);
  const pct = pts ? Math.round((app.score / pts) * 100) : 0;
  fetch(SHEET_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action:    'submit',
      game:      'pvfiab' + (app.currentForm || '?').toLowerCase() + '-review',
      sessionId: SESSION_ID + '-' + (app.currentForm || 'x') + '-A' + (app.currentAttemptNum || 1),
      name:      app.studentName || 'Unknown',
      form:      'Form ' + (app.currentForm || '?'),
      score:     app.score,
      total:     pts,
      percent:   pct,
      status:    `In Progress (Q${app.currentIndex + 1}/${app.currentBank.length})`,
      done:           false,
      elapsed:        app.timerSeconds,
      tabSwitches:    tabSwitchCount,
      wrongQuestions: (app.missedQuestions||[]).map(missEntry).join(' | '),
      missedSkills:   skillTally(app.missedQuestions),
      startedAt:      app.startedAt || '',
      finishedAt:     app.finishedAt || '',
      events:         JSON.stringify(app.events || []),
      timestamp:      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    })
  }).catch(() => {});
}

function submitScoreFinal() {
  const pts = bankPoints(app.currentBank);
  const pct = pts ? Math.round((app.score / pts) * 100) : 0;
  fetch(SHEET_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action:    'submit',
      game:      'pvfiab' + (app.currentForm || '?').toLowerCase() + '-review',
      sessionId: SESSION_ID + '-' + (app.currentForm || 'x') + '-A' + (app.currentAttemptNum || 1),
      name:      app.studentName || 'Unknown',
      form:      'Form ' + (app.currentForm || '?'),
      attempt:   app.currentAttemptNum || 1,
      score:     app.score,
      total:     pts,
      percent:   pct,
      status:    'Complete',
      done:           true,
      elapsed:        app.timerSeconds,
      tabSwitches:    tabSwitchCount,
      wrongQuestions: (app.missedQuestions||[]).map(missEntry).join(' | '),
      missedSkills:   skillTally(app.missedQuestions),
      startedAt:      app.startedAt || '',
      finishedAt:     app.finishedAt || '',
      events:         JSON.stringify(app.events || []),
      timestamp:      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    })
  }).catch(() => {});
}

/* ── ROSTER ─────────────────────────────────────────── */
const ROSTER = [
  { name: "Mr. O (Teacher)",           id: "9377" },
  { name: "Avery, Jo'Von",             id: "10053632" },
  { name: "Belasquez Bonilla, Eduin",  id: "10058674" },
  { name: "Castaneda, Kelvin",         id: "10053248" },
  { name: "Chicas-Santos, Allison",    id: "10066737" },
  { name: "Collado, Roniel",           id: "10060249" },
  { name: "Dejesus, Michael",          id: "10049434" },
  { name: "Dock, Fakeem",              id: "10059720" },
  { name: "Douglas, Iyana",            id: "10070980" },
  { name: "Dumphrey, Christopher",     id: "10060696" },
  { name: "Flores, Kiara",             id: "10052834" },
  { name: "Johnson, Destiny",          id: "10052926" },
  { name: "Jones, Tahji",              id: "10060315" },
  { name: "Lawrence, Eric",            id: "10057451" },
  { name: "Madero, Jovany",            id: "10076374" },
  { name: "Pettway, Lanaura",          id: "10060616" },
  { name: "Polanco Soriano, Thiara",   id: "10060503" },
  { name: "Roberts, Robyn",            id: "10060925" },
  { name: "Rojas, Alanie",             id: "10076388" },
  { name: "Sanchez Rodriguez, Johanelyz", id: "10076767" },
  { name: "Vega, Taishmara",           id: "10054043" },
  { name: "Watts, Autumn",             id: "10039032" },
  { name: "Zelaya-Osorto, Nazareth",   id: "10053626" }
];

const GUEST_SLOTS = {
  '937701': 'Guest 1', '937702': 'Guest 2', '937703': 'Guest 3',
  '937704': 'Guest 4', '937705': 'Guest 5', '937706': 'Guest 6',
  '937707': 'Guest 7', '937708': 'Guest 8', '937709': 'Guest 9',
  '937710': 'Guest 10'
};

/* ── BUILD DROPDOWN ─────────────────────────────────── */
(function buildRoster() {
  const sel = document.getElementById('name-select');
  ROSTER.forEach(s => {
    const o = document.createElement('option');
    o.value = s.name; o.textContent = s.name;
    sel.appendChild(o);
  });
  const div = document.createElement('option');
  div.disabled = true; div.textContent = '── Guest Slots ──';
  sel.appendChild(div);
  Object.entries(GUEST_SLOTS).forEach(([code, label]) => {
    const o = document.createElement('option');
    o.value = `GUEST:${code}`; o.textContent = `🙋 ${label}`;
    sel.appendChild(o);
  });
})();

/* ── STATE ──────────────────────────────────────────── */
let loggedInName    = '';
let unlockedForms   = new Set();
let pinModalCallback = null;
let activeSpeakBtn  = null;
let reviewMode      = false;
let reviewAutoRun   = false;

/* ── MATH HELPERS ───────────────────────────────────── */
function frac(n, d) {
  return `<span class="fraction"><span class="frac-top">${n}</span><span class="frac-bottom">${d}</span></span>`;
}
function mixed(w, n, d) {
  return `<span class="mixed-num">${w}<span class="fraction"><span class="frac-top">${n}</span><span class="frac-bottom">${d}</span></span></span>`;
}
function formatMathText(raw) {
  if (!raw) return '';
  let s = raw;
  s = s.replace(/(\d+)\s+(\d+)\/(\d+)/g, (_, w, n, d) => mixed(w, n, d));
  s = s.replace(/(\d+)\/(\d+)/g, (_, n, d) => frac(n, d));
  s = s.replace(/\bx\b/g, '×');
  // the ◻ placeholder in comparison and missing-digit items —
  // enlarged so it reads as the slot the student has to fill
  s = s.replace(/&#9723;/g, '<span class="cmp-box">&#9723;</span>');
  return s;
}

const ORDINALS = {
  '2':'halves','3':'thirds','4':'fourths','5':'fifths','6':'sixths',
  '7':'sevenths','8':'eighths','9':'ninths','10':'tenths',
  '12':'twelfths','16':'sixteenths','100':'hundredths'
};
const SINGULAR_DENOM = {
  'halves':'half','thirds':'third','fourths':'fourth','fifths':'fifth',
  'sixths':'sixth','sevenths':'seventh','eighths':'eighth','ninths':'ninth',
  'tenths':'tenth','twelfths':'twelfth','sixteenths':'sixteenth','hundredths':'hundredth'
};
function denomToWord(d) { return ORDINALS[d] || `over ${d}`; }
function numToWord(n) {
  const w = ['zero','one','two','three','four','five','six','seven','eight','nine',
             'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
             'seventeen','eighteen','nineteen','twenty'];
  return w[parseInt(n)] !== undefined ? w[parseInt(n)] : n;
}
function convertToSpokenText(raw) {
  return raw
    // The \u25fb placeholder must be SPOKEN, not handed to the voice as a raw
    // HTML entity (voices read "&#9723;" as digits, which lands exactly
    // where the missing digit goes). "blank" names the slot without
    // hinting at the answer.
    .replace(/&#9723;|\u25fb/g, ' blank ')
    .replace(/\u00a0{2,}/g, ', ')
    .replace(/(\d+)\s+(\d+)\/(\d+)/g, (_, w, n, d) => {
      const dWord = denomToWord(d), nNum = parseInt(n);
      const dFinal = nNum === 1 ? (SINGULAR_DENOM[dWord] || dWord) : dWord;
      return `${w} and ${numToWord(n)} ${dFinal}`;
    })
    .replace(/(\d+)\/(\d+)/g, (_, n, d) => {
      const dWord = denomToWord(d), nNum = parseInt(n);
      const dFinal = nNum === 1 ? (SINGULAR_DENOM[dWord] || dWord) : dWord;
      return `${numToWord(n)} ${dFinal}`;
    })
    .replace(/×/g, ' times ')
    .replace(/\bx\b/g, ' times ');
}

/* ── LETTER GRADE ───────────────────────────────────── */
function letterGrade(pct) {
  if (pct >= 97) return 'A+';
  if (pct >= 93) return 'A';
  if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+';
  if (pct >= 83) return 'B';
  if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+';
  if (pct >= 73) return 'C';
  if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+';
  if (pct >= 63) return 'D';
  if (pct >= 60) return 'D-';
  return 'F';
}

/* ── HELPERS ────────────────────────────────────────── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getFirstName(name) {
  if (!name) return 'Student';
  if (name.includes(' - ')) return name.split(' - ').pop().trim();
  const parts = name.split(',');
  return parts.length > 1 ? parts[1].trim().split(' ')[0] : name.split(' ')[0];
}

let hlTimer = null;
function stopActiveSpeech() {
  clearTimeout(hlTimer);
  window.speechSynthesis.cancel();
  document.querySelectorAll('.wrd.hl').forEach(e => e.classList.remove('hl'));
  if (activeSpeakBtn) { activeSpeakBtn.textContent = '🔊'; activeSpeakBtn = null; }
}

/* ── HIGHLIGHT FALLBACK ─────────────────────────────
   Some voices (and some browsers) never fire word-boundary
   events, so the highlight would never move. If no boundary
   arrives shortly after speaking starts, step through the
   words on a timer paced by word length and speech rate. */
function addHighlightFallback(u, spans) {
  let fired = false, i = 0;
  const prevB = u.onboundary, prevE = u.onend;
  u.onboundary = e => { if (e.name === 'word' && !fired) { fired = true; clearTimeout(hlTimer); } if (prevB) prevB(e); };
  u.onend = e => { clearTimeout(hlTimer); spans.forEach(s => s.classList.remove('hl')); if (prevE) prevE(e); };
  const step = () => {
    if (fired) return;
    spans.forEach(s => s.classList.remove('hl'));
    if (i >= spans.length) return;
    const w = spans[i++];
    w.classList.add('hl');
    const len = (w.textContent || '').replace(/[^A-Za-z0-9]/g, '').length;
    hlTimer = setTimeout(step, Math.max(280, len * 70 + 120) / (u.rate || 1));
  };
  clearTimeout(hlTimer);
  hlTimer = setTimeout(step, 500);
}

/* ── ITEM-TYPE HELPERS ──────────────────────────────
   Typed answers are compared with commas, spaces and
   dollar signs stripped, so "47,400" and "47400" both
   count as correct. */
function normalizeEntry(s) {
  return String(s == null ? '' : s).trim().toLowerCase().replace(/[,\s$]/g, '');
}

/* ── SESSION EVENT LOG ───────────────────────────────
   Records what happened and when, so an attempt can be read
   as a chronology: started, left, returned, resumed, finished.
   elapsed is time ON TASK (the clock pauses while the page is
   hidden), which is why it differs from wall-clock span. */
function logEvent(kind, extra) {
  if (!app.events) app.events = [];
  app.events.push(Object.assign({
    at: new Date().toISOString(),
    e:  kind,
    q:  (app.currentIndex || 0) + 1,
    on: app.timerSeconds || 0
  }, extra || {}));
  if (app.events.length > 200) app.events.splice(0, app.events.length - 200);
}

/* Points available in a bank. A grid is worth one point PER ROW,
   so each statement is scored and reported on its own — that is
   what makes the wrong-answer report usable for reteaching. */
function bankPoints(bank) {
  return (bank || []).reduce((t, q) => t + (q.type === 'grid' ? q.rows.length : 1), 0);
}

/* Group missed elements by skill, most-missed first.
   Returns [{ skill, count }] — the reteaching list. */
function skillBreakdown(missed) {
  const counts = {};
  (missed || []).forEach(m => {
    const k = m.skill || 'Unsorted';
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count || a.skill.localeCompare(b.skill));
}

/* Flat "Rounding x3, Expanded form x1" for the Google Sheet,
   so the column is readable even without the dashboard. */
function skillTally(missed) {
  return skillBreakdown(missed).map(s => `${s.skill} x${s.count}`).join(', ');
}

/* Skill tag for a scored element. Grids carry one skill per row. */
function skillFor(q, rowIdx) {
  const s = (window.SKILLS || {})[q.id];
  if (Array.isArray(s)) return s[rowIdx] || s[0] || 'Unsorted';
  return s || 'Unsorted';
}

/* Every control a student can answer with — used by the
   read lock and by confirm to freeze the item. */
function answerControls() {
  return document.querySelectorAll('.answer-btn, .grid-cell, #entry-input');
}

function lockControl(el, locked) {
  el.disabled = locked;
  el.classList.toggle('locked-choice', locked);
}

/* ── ATTEMPT TRACKING ───────────────────────────────── */
function getFormAttempts(name) {
  const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
  const counts = { A: 0, B: 0, C: 0 };
  scores.filter(s => s.name === name && s.done).forEach(s => {
    if (counts[s.form] !== undefined) counts[s.form]++;
  });
  return counts;
}

function allFormsCompletedOnce(name) {
  const a = getFormAttempts(name);
  return a.A >= 1 && a.B >= 1 && a.C >= 1;
}

function applyFormLocks(name) {
  const attempts = getFormAttempts(name);
  const allDone1 = allFormsCompletedOnce(name);

  ['A', 'B', 'C'].forEach(form => {
    const btn = document.getElementById(`btn-form-${form}`);
    if (!btn) return;
    const done = attempts[form];
    const sub  = btn.querySelector('.form-btn-sub');

    if (done === 0) {
      btn.classList.remove('locked');
      sub.textContent = '15 questions';
    } else if (done === 1 && !allDone1) {
      btn.classList.add('locked');
      sub.textContent = '✅ Done · finish other forms to retry';
    } else if (done === 1 && allDone1) {
      btn.classList.remove('locked');
      sub.textContent = '🔁 Attempt 2 available';
    } else {
      btn.classList.add('locked');
      sub.textContent = '🔒 2/2 attempts used';
    }
  });
}

/* ── SPEAK DIRECTIONS ───────────────────────────────── */
function speakDir(btn) {
  if (activeSpeakBtn === btn) { stopActiveSpeech(); return; }
  stopActiveSpeech();

  const p = btn.closest('.dir-section').querySelector('.dir-text');
  if (!p) return;
  if (!p.querySelector('.wrd')) p.innerHTML = wrapWords(p.innerHTML);

  const spans = Array.from(p.querySelectorAll('.wrd'));
  if (!spans.length) return;

  activeSpeakBtn = btn;
  btn.textContent = '⏹';

  const speechText = spans.map(s => s.textContent).join(' ');
  let hlIdx = 0;
  const u = new SpeechSynthesisUtterance(speechText);
  u.lang = 'en-US'; u.rate = 0.92;

  u.onboundary = e => {
    if (e.name !== 'word') return;
    document.querySelectorAll('.dir-text .wrd.hl').forEach(el => el.classList.remove('hl'));
    if (spans[hlIdx]) spans[hlIdx].classList.add('hl');
    hlIdx++;
  };
  u.onend = () => {
    document.querySelectorAll('.dir-text .wrd.hl').forEach(el => el.classList.remove('hl'));
    if (activeSpeakBtn === btn) { btn.textContent = '🔊'; activeSpeakBtn = null; }
  };
  addHighlightFallback(u, spans);
  window.speechSynthesis.speak(u);
}

function wrapWords(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  let idx = 0;
  function walk(node) {
    if (node.nodeType === 3) {
      const text = node.textContent.replace(/—/g, ' — ').replace(/  +/g, ' ');
      const words = text.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(part => {
        if (/\S/.test(part)) {
          const sp = document.createElement('span');
          sp.className = 'wrd'; sp.dataset.wi = idx++; sp.textContent = part;
          frag.appendChild(sp);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else {
      [...node.childNodes].forEach(walk);
    }
  }
  walk(tmp);
  return tmp.innerHTML;
}

/* ══════════════════════════════════════════════════════
   APP OBJECT
══════════════════════════════════════════════════════ */
const app = {

  /* ── state ── */
  studentName:       '',
  currentForm:       '',
  currentBank:       [],
  currentIndex:      0,
  score:             0,
  streak:            0,
  missedQuestions:   [],
  currentAttemptNum: 1,
  selectedAnswer:    null,
  questionLocked:    false,
  timerSeconds:      0,
  timerInterval:     null,
  timerOn:           false,
  instructInterval:  null,
  readInterval:      null,
  nextInterval:      null,

  /* ── screens ── */
  show(id) {
    ['start-screen','readaloud-screen','directions-screen','quiz-screen','end-screen','scoreboard-screen']
      .forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    window.scrollTo(0, 0);   // every new screen starts at the top
    window.speechSynthesis.cancel();
  },

  /* ── INIT ── */
  init() {
    this.show('start-screen');
    document.getElementById('welcome-panel').classList.remove('hidden');
    document.getElementById('student-login-panel').classList.add('hidden');
  },

  /* ── READ ALOUD INTRO ── */
  showReadAloudIntro() {
    if (!REVIEW_OPEN) return;
    document.getElementById('welcome-panel').classList.add('hidden');
    this.show('readaloud-screen');
    const btn   = document.getElementById('readaloud-btn');
    const fill  = document.getElementById('readaloud-fill');
    const count = document.getElementById('readaloud-count');
    btn.disabled = true; btn.style.opacity = '0.45'; btn.style.cursor = 'not-allowed';
    count.textContent = 6;
    fill.style.transition = 'none';
    fill.style.width = '100%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = 'width 6s linear';
      fill.style.width = '0%';
    }));
    let remaining = 6;
    const iv = setInterval(() => {
      remaining--;
      count.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(iv);
        btn.disabled = false; btn.style.opacity = '1';
        btn.style.cursor = 'pointer'; btn.textContent = "✅ Got It — Show Me the Directions!";
      }
    }, 1000);
  },

  /* ── DIRECTIONS ── */
  showDirections() {
    this.show('directions-screen');
    this.startInstructionsTimer();
  },

  showLogin() {
    if (this.instructInterval) { clearInterval(this.instructInterval); this.instructInterval = null; }
    window.speechSynthesis.cancel();
    document.querySelectorAll('.dir-text .wrd.hl').forEach(e => e.classList.remove('hl'));
    this.studentName = '';
    loggedInName = '';
    document.getElementById('resume-container').classList.add('hidden');
    document.getElementById('form-select-section').classList.add('hidden');
    const loginCard = document.getElementById('login-step-card');
    if (loginCard) loginCard.classList.remove('hidden');
    this.show('start-screen');
    document.getElementById('welcome-panel').classList.add('hidden');
    document.getElementById('student-login-panel').classList.remove('hidden');
  },

  /* ── NAME SELECT ── */
  onNameSelect() {
    const val = document.getElementById('name-select').value;
    const pinSec   = document.getElementById('pin-section');
    const guestSec = document.getElementById('guest-name-section');
    document.getElementById('login-error').textContent = '';
    if (!val) { pinSec.classList.add('hidden'); return; }
    pinSec.classList.remove('hidden');
    if (val.startsWith('GUEST:')) {
      guestSec.classList.remove('hidden');
      document.getElementById('pin-label').textContent = '🔒 Enter guest code:';
    } else {
      guestSec.classList.add('hidden');
      document.getElementById('pin-label').textContent = '🔒 Enter your student number:';
    }
    setTimeout(() => document.getElementById('student-pin').focus(), 80);
  },

  /* ── LOGIN ── */
  attemptLogin() {
    const selVal = document.getElementById('name-select').value;
    const pin    = document.getElementById('student-pin').value.trim();
    const errEl  = document.getElementById('login-error');
    errEl.textContent = ''; errEl.style.color = '#c0392b';

    if (!selVal) { errEl.textContent = '⚠️ Please select your name.'; return; }
    if (!pin)    { errEl.textContent = '⚠️ Please enter your student number.'; return; }

    let matched = false, displayName = '';

    if (selVal.startsWith('GUEST:')) {
      const code = selVal.replace('GUEST:', '');
      if (pin === code) {
        const firstName = (document.getElementById('guest-display-name').value || '').trim();
        if (!firstName) { errEl.textContent = '⚠️ Please enter your first name.'; return; }
        matched = true;
        displayName = firstName + ' (Guest)';
      } else {
        errEl.textContent = '❌ Incorrect guest code. Try again.'; return;
      }
    } else {
      const student = ROSTER.find(s => s.name === selVal);
      if (student && student.id === pin) {
        matched = true; displayName = selVal;
      } else {
        errEl.textContent = '❌ Incorrect student number. Try again.'; return;
      }
    }

    if (matched) {
      loggedInName     = displayName;
      this.studentName = displayName;
      document.getElementById('student-pin').value = '';
      document.getElementById('login-error').textContent = '';
      const loginCard = document.getElementById('login-step-card');
      if (loginCard) loginCard.classList.add('hidden');
      document.getElementById('form-select-section').classList.remove('hidden');
      applyFormLocks(displayName);
      this.checkResume();
    }
  },

  /* ── ATTEMPT START ── */
  attemptStart(form) {
    if (!this.studentName) return;
    const attempts = getFormAttempts(this.studentName);
    const done     = attempts[form];
    const allDone1 = allFormsCompletedOnce(this.studentName);
    const name1    = getFirstName(this.studentName);

    if (done === 0) {
      this.startSession(form);
    } else if (done === 1 && !allDone1) {
      alert(`⚠️ ${name1}, you need to finish all three forms before you can retry Form ${form}. Complete the remaining forms first!`);
    } else if (done === 1 && allDone1) {
      this.startSession(form);
    } else if (done >= 2 && !unlockedForms.has(form)) {
      this.showPinModal(
        `🔓 Unlock Form ${form}`,
        `${name1} has already used both attempts for Form ${form}. Enter Teacher PIN to allow an extra retry.`,
        () => { unlockedForms.add(form); this.startSession(form); }
      );
    } else {
      this.startSession(form);
    }
  },

  /* ── TEACHER REVIEW MODE ── */
  promptTeacherReview() {
    const pin = prompt('Enter Teacher PIN to access Review Mode:');
    if (pin !== '9377') { if (pin !== null) alert('Incorrect PIN.'); return; }
    this.studentName = 'Mr. O (Teacher)';
    reviewMode = true;
    localStorage.removeItem(STORAGE_KEY);
    this._showReviewPicker();
  },

  _showReviewPicker() {
    const form = prompt('Choose a form to review:\n1 — Form A\n2 — Form B\n3 — Form C\n\nEnter 1, 2, or 3:');
    const map = { '1': 'A', '2': 'B', '3': 'C' };
    if (!map[form]) { alert('Invalid choice.'); reviewMode = false; return; }
    const mode = prompt('Choose review mode:\n1 — Manual (tap Next each question)\n2 — Auto-run (fully automatic)\n\nEnter 1 or 2:');
    if (mode !== '1' && mode !== '2') { alert('Invalid choice.'); reviewMode = false; return; }
    reviewAutoRun = (mode === '2');
    this.startSession(map[form]);
  },

  exitReviewMode() {
    reviewMode    = false;
    reviewAutoRun = false;
    this.stopTimerEngine();
    const banner = document.getElementById('review-mode-banner');
    if (banner) banner.classList.add('hidden');
    this.show('start-screen');
    document.getElementById('welcome-panel').classList.remove('hidden');
    document.getElementById('student-login-panel').classList.add('hidden');
  },

  _autoAnswer() {
    const q = this.currentBank[this.currentIndex];
    if (q.type === 'grid') {
      q.rows.forEach((r, i) => {
        const cell = document.querySelector(`.grid-cell[data-row="${i}"][data-val="${r.answer}"]`);
        if (cell) this._selectGridCell(i, r.answer, cell);
      });
    } else if (q.type === 'entry') {
      const input = document.getElementById('entry-input');
      if (input) input.value = q.answer;
    } else {
      document.querySelectorAll('.answer-btn').forEach(btn => {
        if (btn.dataset.answer === q.answer) {
          this._selectChoice(q.answer, btn);
        }
      });
    }
    setTimeout(() => this.confirmAnswer(), 600);
  },

  /* ── START SESSION ── */
  startSession(form) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PVFIAB_SESSION_ID_KEY);
    tabSwitchCount     = 0;
    const warnBanner = document.getElementById('tab-warning-banner');
    if (warnBanner) warnBanner.classList.add('hidden');
    this.currentForm   = form;
    this.score         = 0;
    this.streak        = 0;
    this.missedQuestions = [];
    this.currentIndex  = 0;
    this.questionLocked = false;   // a finished form leaves it set
    this.timerSeconds  = 0;
    // Fixed up front so the progress row and the final row share one
    // sessionId — the Apps Script then overwrites the progress row
    // instead of leaving it behind as a second row.
    this.events        = [];
    this.startedAt     = new Date().toISOString();
    this.finishedAt    = '';
    this.currentAttemptNum = reviewMode ? 1 :
      JSON.parse(localStorage.getItem(SCORES_KEY) || '[]')
        .filter(s => s.name === this.studentName && s.form === form && s.done).length + 1;

    const rawBank = [...window['FORM_' + form]];

    const shuffleQ = q => {
      // Grids, typed entry and the < > = pad keep their fixed order.
      if (q.type) return { ...q };
      const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
      return { ...q, choices: shuffled };
    };
    this.currentBank = rawBank.map(shuffleQ);
    shuffle(this.currentBank);

    const banner = document.getElementById('review-mode-banner');
    if (banner) {
      banner.classList.toggle('hidden', !reviewMode);
      const label = banner.querySelector('span');
      if (label) label.textContent = reviewAutoRun
        ? '🔍 Teacher Review Mode — auto-run'
        : '🔍 Teacher Review Mode — tap Next to advance';
    }

    this.show('quiz-screen');
    logEvent('start', { form: form });
    this.startTimer();
    this.renderQuestion();
  },

  /* ── RESUME ── */
  checkResume() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const rc = document.getElementById('resume-container');
    const formSelect = document.getElementById('form-select-section');
    if (saved && rc) {
      const data = JSON.parse(saved);
      if (this.studentName && data.studentName === this.studentName) {
        rc.classList.remove('hidden');
        document.getElementById('resume-detail').textContent =
          `Form ${data.currentForm} — Q${data.currentIndex + 1} of ${data.currentBank.length}`;
        if (formSelect) formSelect.classList.add('hidden');
      } else {
        rc.classList.add('hidden');
        if (formSelect && this.studentName) formSelect.classList.remove('hidden');
      }
    } else if (rc) {
      rc.classList.add('hidden');
      if (formSelect && this.studentName) formSelect.classList.remove('hidden');
    }
  },

  resumeSession() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    this.studentName    = saved.studentName;
    this.currentForm    = saved.currentForm;
    this.currentBank    = saved.currentBank;
    this.currentIndex   = saved.currentIndex;
    this.score          = saved.score;
    this.streak         = saved.streak || 0;
    this.missedQuestions = saved.missedQuestions || [];
    this.timerSeconds   = saved.timerSeconds || 0;
    this.currentAttemptNum = saved.currentAttemptNum || 1;
    this.events         = saved.events || [];
    this.startedAt      = saved.startedAt || new Date().toISOString();
    logEvent('resume');
    this.show('quiz-screen');
    this.startTimer();
    // Saved right after answering the last question → nothing left to ask
    if (this.currentIndex >= this.currentBank.length) { this._finishSession(); return; }
    this.renderQuestion();
  },

  saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      studentName:     this.studentName,
      currentForm:     this.currentForm,
      currentBank:     this.currentBank,
      currentIndex:    this.questionLocked ? this.currentIndex + 1 : this.currentIndex, // answered → resume at the next one
      score:           this.score,
      streak:          this.streak,
      missedQuestions: this.missedQuestions,
      timerSeconds:    this.timerSeconds,
      currentAttemptNum: this.currentAttemptNum,
      events:          this.events,
      startedAt:       this.startedAt
    }));
  },

  discardProgress() {
    this.showPinModal(
      '🗑️ Discard Progress',
      'Enter Teacher PIN to clear the current in-progress session. The student will start fresh.',
      () => {
        localStorage.removeItem(STORAGE_KEY);
        document.getElementById('resume-container').classList.add('hidden');
        applyFormLocks(this.studentName);
        this.checkResume();
      }
    );
  },

  /* ── OVERALL TIMER ── */
  startTimer() {
    this.stopTimerEngine();
    this.timerOn = true;
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this._tickTimer();
      if (this.timerSeconds % 30 === 0) this.saveProgress();
    }, 1000);
  },

  stopTimerEngine() {
    if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }
    this.timerOn = false;
  },

  _tickTimer() {
    const m = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
    const s = String(this.timerSeconds % 60).padStart(2, '0');
    const el = document.getElementById('timer-display');
    if (el) el.textContent = `${m}:${s}`;
  },

  /* ── INSTRUCTIONS LOCK (20s) ── */
  startInstructionsTimer() {
    if (this.instructInterval) { clearInterval(this.instructInterval); this.instructInterval = null; }
    const btn   = document.getElementById('ready-btn');
    const fill  = document.getElementById('instruct-fill');
    const count = document.getElementById('instruct-count');
    if (!btn) return;
    if (reviewMode) {
      btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
      btn.textContent = "✅ Got It — Let's Begin!";
      return;
    }
    btn.disabled = true;
    btn.style.opacity = '0.45';
    btn.style.cursor  = 'not-allowed';
    if (count) count.textContent = INSTRUCT_SECS;
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '100%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        fill.style.transition = `width ${INSTRUCT_SECS}s linear`;
        fill.style.width = '0%';
      }));
    }
    let remaining = INSTRUCT_SECS;
    this.instructInterval = setInterval(() => {
      remaining--;
      if (count) count.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(this.instructInterval);
        this.instructInterval = null;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor  = 'pointer';
        btn.textContent   = "✅ Got It — Let's Begin!";
      }
    }, 1000);
  },

  /* ── READING LOCK TIMER (12s) ── */
  startReadTimer() {
    if (this.readInterval) { clearInterval(this.readInterval); this.readInterval = null; }
    const bar   = document.getElementById('reading-timer-bar');
    const fill  = document.getElementById('reading-fill');
    const count = document.getElementById('reading-count');

    if (reviewMode) {
      bar.classList.add('hidden');
      answerControls().forEach(b => lockControl(b, false));
      setTimeout(() => this._autoAnswer(), 300);
      return;
    }

    bar.classList.remove('hidden');
    count.textContent = READ_SECS;

    // Single CSS transition — truly smooth over full duration
    fill.style.transition = 'none';
    fill.style.width = '100%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${READ_SECS}s linear`;
      fill.style.width = '0%';
    }));

    answerControls().forEach(b => lockControl(b, true));

    let remaining = READ_SECS;
    this.readInterval = setInterval(() => {
      remaining--;
      count.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(this.readInterval);
        this.readInterval = null;
        bar.classList.add('hidden');
        answerControls().forEach(b => lockControl(b, false));
        const entry = document.getElementById('entry-input');
        if (entry) entry.focus();
        document.getElementById('confirm-btn').classList.remove('hidden');
      }
    }, 1000);
  },

  /* ── NEXT SOAK TIMER (8s) ── */
  startNextTimer() {
    if (this.nextInterval) { clearInterval(this.nextInterval); this.nextInterval = null; }
    const bar   = document.getElementById('next-timer-bar');
    const fill  = document.getElementById('next-fill');
    const count = document.getElementById('next-count');

    if (reviewMode) {
      bar.classList.add('hidden');
      if (reviewAutoRun) {
        setTimeout(() => this.nextQuestion(), 800);
      } else {
        document.getElementById('next-btn').classList.remove('hidden');
      }
      return;
    }

    bar.classList.remove('hidden');
    count.textContent = NEXT_SECS;

    // Single CSS transition — truly smooth over full duration
    fill.style.transition = 'none';
    fill.style.width = '100%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${NEXT_SECS}s linear`;
      fill.style.width = '0%';
    }));

    let remaining = NEXT_SECS;
    this.nextInterval = setInterval(() => {
      remaining--;
      count.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(this.nextInterval);
        this.nextInterval = null;
        bar.classList.add('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
      }
    }, 1000);
  },

  /* ── RENDER QUESTION ── */
  renderQuestion() {
    const q     = this.currentBank[this.currentIndex];
    const total = this.currentBank.length;

    document.getElementById('progress-text').textContent = `Question ${this.currentIndex + 1} of ${total}`;
    document.getElementById('score-text').textContent    = `${getFirstName(this.studentName)} · ${this.score}`;
    document.getElementById('progress-fill').style.width = `${(this.currentIndex / total) * 100}%`;

    this._renderStreak();

    // Question text
    const qtEl = document.getElementById('question-text');
    let qHTML = formatMathText(q.q);
    if (q.hint) qHTML += `<div style="font-size:0.85rem;color:#666;background:#f0f0f0;border-radius:8px;padding:6px 10px;margin-top:8px;">💡 Hint: ${q.hint}</div>`;
    qtEl.innerHTML = qHTML;

    // Reset feedback / buttons
    const fb = document.getElementById('feedback');
    fb.className = 'feedback-box';
    fb.style.display = 'none';
    fb.textContent = '';

    document.getElementById('confirm-btn').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('next-timer-bar').classList.add('hidden');

    // Build the answer area — MC, grid, typed entry or symbol pad
    this.selectedAnswer  = null;
    this.gridSelections  = null;
    this.questionLocked  = false;
    const wrap = document.getElementById('answers');
    wrap.innerHTML = '';
    wrap.className = 'options-grid';

    if (q.type === 'grid')       this._renderGrid(q, wrap);
    else if (q.type === 'entry') this._renderEntry(q, wrap);
    else if (q.type === 'symbol')this._renderSymbol(q, wrap);
    else                         this._renderChoices(q, wrap);

    if (this.currentIndex > 0 && this.currentIndex % 5 === 0) submitScorePartial();
    this.saveProgress();
    this.startReadTimer();
  },

  /* ── MULTIPLE CHOICE (unchanged from the Module 1 engine) ── */
  _renderChoices(q, wrap) {
    q.choices.forEach((text, i) => {
      const row = document.createElement('div');
      row.className = 'answer-row';

      const speakBtn = document.createElement('button');
      speakBtn.className = 'choice-speak-btn';
      speakBtn.textContent = '🔊';
      speakBtn.title = 'Read this choice aloud';
      speakBtn.onclick = e => {
        e.stopPropagation();
        if (activeSpeakBtn === speakBtn) { stopActiveSpeech(); return; }
        stopActiveSpeech();

        // Wrap choice words in spans on first speak for word-by-word highlighting
        if (!btn.querySelector('.wrd')) {
          const parts = text.split(/(\s+)/);
          let choiceHTML = `<strong>${['A','B','C','D'][i]}.</strong>&nbsp;`;
          parts.forEach(w => { choiceHTML += /^\s+$/.test(w) ? w : (w ? `<span class="wrd">${formatMathText(w)}</span>` : ''); });
          btn.innerHTML = choiceHTML.trim();
        }
        const hlSpans = Array.from(btn.querySelectorAll('.wrd'));

        activeSpeakBtn = speakBtn;
        speakBtn.textContent = '⏹';

        let hlIdx = 0;
        const u = new SpeechSynthesisUtterance(convertToSpokenText(text));
        u.lang = 'en-US'; u.rate = 0.9;
        u.onboundary = e => {
          if (e.name !== 'word') return;
          btn.querySelectorAll('.wrd.hl').forEach(el => el.classList.remove('hl'));
          if (hlSpans[hlIdx]) hlSpans[hlIdx].classList.add('hl');
          hlIdx++;
        };
        u.onend = () => {
          btn.querySelectorAll('.wrd.hl').forEach(el => el.classList.remove('hl'));
          if (activeSpeakBtn === speakBtn) { speakBtn.textContent = '🔊'; activeSpeakBtn = null; }
        };
        addHighlightFallback(u, hlSpans);
        window.speechSynthesis.speak(u);
      };

      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.dataset.answer = text;
      btn.innerHTML = `<strong>${['A','B','C','D'][i]}.</strong>&nbsp;${formatMathText(text)}`;
      btn.onclick = () => this._selectChoice(text, btn);

      row.appendChild(speakBtn);
      row.appendChild(btn);
      wrap.appendChild(row);
    });
  },

  /* ── TRUE/FALSE · YES/NO GRID ──────────────────────
     One choice per row; the item is only correct when
     every row is right, matching how SBAC scores grids. */
  _renderGrid(q, wrap) {
    this.gridSelections = q.rows.map(() => null);
    wrap.className = 'options-grid grid-item';

    const table = document.createElement('div');
    table.className = 'tf-grid';

    const head = document.createElement('div');
    head.className = 'tf-row tf-head';
    head.innerHTML = `<div class="tf-statement"></div>` +
      q.cols.map(c => `<div class="tf-col">${c}</div>`).join('');
    table.appendChild(head);

    q.rows.forEach((r, i) => {
      const row = document.createElement('div');
      row.className = 'tf-row';

      const stmt = document.createElement('div');
      stmt.className = 'tf-statement';

      // Speaker sits to the LEFT of the text it reads
      const speakBtn = document.createElement('button');
      speakBtn.className = 'choice-speak-btn';
      speakBtn.textContent = '🔊';
      speakBtn.title = 'Read this statement aloud';
      const label = document.createElement('span');
      label.className = 'tf-text';
      label.innerHTML = formatMathText(r.text);
      speakBtn.onclick = e => {
        e.stopPropagation();
        if (activeSpeakBtn === speakBtn) { stopActiveSpeech(); return; }
        stopActiveSpeech();
        if (!label.querySelector('.wrd')) label.innerHTML = wrapWords(label.innerHTML);
        const spans = Array.from(label.querySelectorAll('.wrd'));
        activeSpeakBtn = speakBtn;
        speakBtn.textContent = '⏹';
        let hlIdx = 0;
        const u = new SpeechSynthesisUtterance(convertToSpokenText(r.text));
        u.lang = 'en-US'; u.rate = 0.9;
        u.onboundary = e2 => {
          if (e2.name !== 'word') return;
          spans.forEach(el => el.classList.remove('hl'));
          if (spans[hlIdx]) spans[hlIdx].classList.add('hl');
          hlIdx++;
        };
        u.onend = () => {
          spans.forEach(el => el.classList.remove('hl'));
          if (activeSpeakBtn === speakBtn) { speakBtn.textContent = '🔊'; activeSpeakBtn = null; }
        };
        addHighlightFallback(u, spans);
        window.speechSynthesis.speak(u);
      };

      stmt.appendChild(speakBtn);
      stmt.appendChild(label);
      row.appendChild(stmt);

      q.cols.forEach(col => {
        const cellWrap = document.createElement('div');
        cellWrap.className = 'tf-col';
        const cell = document.createElement('button');
        cell.className = 'grid-cell';
        cell.dataset.row = i;
        cell.dataset.val = col;
        cell.textContent = col;
        cell.setAttribute('aria-label', `${r.text} — ${col}`);
        cell.onclick = () => this._selectGridCell(i, col, cell);
        cellWrap.appendChild(cell);
        row.appendChild(cellWrap);
      });

      table.appendChild(row);
    });

    wrap.appendChild(table);
  },

  _selectGridCell(rowIdx, val, cell) {
    if (this.questionLocked) return;
    document.querySelectorAll(`.grid-cell[data-row="${rowIdx}"]`)
      .forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    this.gridSelections[rowIdx] = val;
  },

  /* ── TYPED NUMERIC ENTRY ───────────────────────────── */
  _renderEntry(q, wrap) {
    wrap.className = 'options-grid entry-item';
    const box = document.createElement('div');
    box.className = 'entry-box';
    box.innerHTML = `<label class="entry-label" for="entry-input">✏️ Type your answer:</label>`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'entry-input';
    input.className = 'entry-input';
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'off');
    input.placeholder = q.placeholder || 'Your answer…';
    input.onkeydown = e => {
      if (e.key === 'Enter' && !this.questionLocked && !input.disabled) this.confirmAnswer();
    };

    box.appendChild(input);
    const note = document.createElement('div');
    note.className = 'entry-note';
    note.textContent = 'You may type commas or leave them out — both are accepted.';
    box.appendChild(note);
    wrap.appendChild(box);
  },

  /* ── < > = COMPARISON PAD ──────────────────────────── */
  _renderSymbol(q, wrap) {
    wrap.className = 'options-grid symbol-item';
    const pad = document.createElement('div');
    pad.className = 'sym-pad';
    const SYMS = [
      { s: '<', word: 'is less than' },
      { s: '>', word: 'is greater than' },
      { s: '=', word: 'is equal to' }
    ];
    SYMS.forEach(({ s, word }) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn sym-btn';
      btn.dataset.answer = s;
      btn.innerHTML = `<span class="sym-glyph">${s}</span><span class="sym-word">${word}</span>`;
      btn.onclick = () => this._selectChoice(s, btn);
      pad.appendChild(btn);
    });
    wrap.appendChild(pad);
  },

  _selectChoice(text, btn) {
    if (this.questionLocked) return;
    document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
    this.selectedAnswer = text;
    btn.classList.add('selected');
  },

  _renderStreak() {
    const el = document.getElementById('streak-bar');
    if (this.streak >= 3) {
      el.textContent = '🔥'.repeat(Math.min(this.streak, 8)) + ` ${this.streak} in a row!`;
    } else {
      el.textContent = '';
    }
  },

  /* ── CONFIRM ANSWER ── */
  _warn(msg) {
    let el = document.getElementById('answer-warning');
    if (!el) {
      el = document.createElement('div');
      el.id = 'answer-warning';
      el.className = 'answer-warning';
      document.getElementById('answers').appendChild(el);
    }
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(this._warnTimer);
    this._warnTimer = setTimeout(() => el.classList.add('hidden'), 2600);
  },

  confirmAnswer() {
    const q = this.currentBank[this.currentIndex];
    if (this.questionLocked) return;

    let correct, yourAnswerStr, correctAnswerStr;
    let pointsEarned = 0, rowsRight = 0, rowsTotal = 1;

    if (q.type === 'grid') {
      if (!this.gridSelections || this.gridSelections.some(v => v === null)) {
        this._warn('⚠️ Answer every row before you confirm.');
        return;
      }
      // Each row scores on its own and is reported on its own.
      rowsTotal    = q.rows.length;
      rowsRight    = q.rows.filter((r, i) => this.gridSelections[i] === r.answer).length;
      pointsEarned = rowsRight;
      correct      = rowsRight === rowsTotal;
      q.rows.forEach((r, i) => {
        if (this.gridSelections[i] !== r.answer) {
          this.missedQuestions.push({
            id: `${q.id}.${i + 1}`,
            q: r.text,
            skill: skillFor(q, i),
            yourAnswer: this.gridSelections[i],
            correct: r.answer,
            explanation: q.explanation || ''
          });
        }
      });
      yourAnswerStr    = q.rows.map((r, i) => `${r.text} → ${this.gridSelections[i]}`).join(' · ');
      correctAnswerStr = q.rows.map(r => `${r.text} → ${r.answer}`).join(' · ');
    } else if (q.type === 'entry') {
      const input = document.getElementById('entry-input');
      const val   = input ? input.value.trim() : '';
      if (!val) { this._warn('⚠️ Type your answer before you confirm.'); return; }
      correct = normalizeEntry(val) === normalizeEntry(q.answer);
      yourAnswerStr    = val;
      correctAnswerStr = q.answer;
    } else {
      if (!this.selectedAnswer) return;
      correct = this.selectedAnswer === q.answer;
      yourAnswerStr    = this.selectedAnswer;
      correctAnswerStr = q.answer;
    }

    this.questionLocked = true;

    if (q.type !== 'grid') {
      pointsEarned = correct ? 1 : 0;
      if (!correct) {
        this.missedQuestions.push({
          id: q.id, q: q.q, skill: skillFor(q),
          yourAnswer: yourAnswerStr, correct: correctAnswerStr,
          explanation: q.explanation || ''
        });
      }
    }

    this.score += pointsEarned;
    this.streak = correct ? this.streak + 1 : 0;

    // Freeze the item and mark it up
    answerControls().forEach(el => { el.disabled = true; });

    if (q.type === 'grid') {
      document.querySelectorAll('.grid-cell').forEach(cell => {
        const i = Number(cell.dataset.row);
        const isKey      = cell.dataset.val === q.rows[i].answer;
        const isSelected = cell.dataset.val === this.gridSelections[i];
        if (isKey) cell.classList.add('correct');
        else if (isSelected) cell.classList.add('incorrect');
      });
    } else if (q.type === 'entry') {
      const input = document.getElementById('entry-input');
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    } else {
      document.querySelectorAll('.answer-btn').forEach(btn => {
        if (btn.dataset.answer === q.answer)               btn.classList.add('correct');
        else if (btn.dataset.answer === this.selectedAnswer) btn.classList.add('incorrect');
      });
    }

    const partial = q.type === 'grid' && rowsRight > 0 && rowsRight < rowsTotal;
    const fb = document.getElementById('feedback');
    fb.className = 'feedback-box ' + (correct ? 'correct' : partial ? 'partial' : 'incorrect');
    fb.style.display = 'block';
    if (correct) {
      fb.innerHTML = `✅ <strong>Correct!</strong>${q.type === 'grid' ? ` You got all ${rowsTotal} rows right.` : ''}<br>${formatMathText(q.explanation)}`;
    } else if (partial) {
      fb.innerHTML = `⚠️ <strong>${rowsRight} of ${rowsTotal} rows right.</strong> You earned ${rowsRight} ${rowsRight === 1 ? 'point' : 'points'}. Check the rows marked in red.<br>${formatMathText(q.explanation)}`;
    } else {
      fb.innerHTML = `❌ <strong>Not quite.</strong> The correct answer is: <strong>${formatMathText(correctAnswerStr)}</strong><br>${formatMathText(q.explanation)}`;
    }

    // Feedback read-aloud button
    const fbSpeakBtn = document.createElement('button');
    fbSpeakBtn.className = 'speak-btn';
    fbSpeakBtn.style.cssText = 'float:left;margin:0 10px 4px 0;';
    fbSpeakBtn.textContent = '🔊';
    // Wrap feedback words in spans for word-by-word highlighting (skip emoji-only tokens)
    fb.innerHTML = wrapWords(fb.innerHTML);
    const fbSpans = Array.from(fb.querySelectorAll('.wrd')).filter(s => /[A-Za-z0-9]/.test(s.textContent));
    const spokenFb = convertToSpokenText(fbSpans.map(s => {
      const gap = s.nextSibling && s.nextSibling.nodeType === 3 && /\u00a0{2,}/.test(s.nextSibling.textContent);
      return s.textContent + (gap ? ',' : '');
    }).join(' '));
    fbSpeakBtn.onclick = () => {
      if (activeSpeakBtn === fbSpeakBtn) { stopActiveSpeech(); return; }
      stopActiveSpeech();
      activeSpeakBtn = fbSpeakBtn; fbSpeakBtn.textContent = '⏹';
      const u = new SpeechSynthesisUtterance(spokenFb);
      u.lang = 'en-US'; u.rate = 0.9;
      let hlIdx = 0;
      u.onboundary = e => {
        if (e.name !== 'word') return;
        fbSpans.forEach(el => el.classList.remove('hl'));
        if (fbSpans[hlIdx]) fbSpans[hlIdx].classList.add('hl');
        hlIdx++;
      };
      u.onend = () => {
        fbSpans.forEach(el => el.classList.remove('hl'));
        fbSpeakBtn.textContent = '🔊'; if (activeSpeakBtn === fbSpeakBtn) activeSpeakBtn = null;
      };
      addHighlightFallback(u, fbSpans);
      window.speechSynthesis.speak(u);
    };
    fb.prepend(fbSpeakBtn);

    document.getElementById('confirm-btn').classList.add('hidden');
    document.getElementById('score-text').textContent = `${getFirstName(this.studentName)} · ${this.score}`;
    this._renderStreak();
    this.saveProgress();
    this.startNextTimer();
  },

  /* ── NEXT QUESTION ── */
  nextQuestion() {
    stopActiveSpeech();
    this.currentIndex++;
    if (this.currentIndex >= this.currentBank.length) {
      this._finishSession();
    } else {
      this.renderQuestion();
    }
  },

  /* ── FINISH SESSION ── */
  _finishSession() {
    this.finishedAt = new Date().toISOString();
    logEvent('finish');
    this.stopTimerEngine();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PVFIAB_SESSION_ID_KEY);

    const total = bankPoints(this.currentBank);
    const pct   = Math.round((this.score / total) * 100);
    const date  = new Date();

    const scores   = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
    const attemptNum = this.currentAttemptNum || 1;

    if (!reviewMode) {
      scores.push({
        name:    this.studentName,
        form:    this.currentForm,
        attempt: attemptNum,
        score:   this.score,
        total,
        pct,
        elapsed: this.timerSeconds,
        date:    date.toLocaleDateString(),
        time:    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        done:    true
      });
      localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
    }

    submitScoreFinal();

    let letter = 'F', msg = "Let's practice more! 📚";
    if (pct === 100) { letter = 'A+'; msg = "⭐ PERFECT SCORE! ⭐"; }
    else if (pct >= 90) { letter = 'A'; msg = "Outstanding Work! 🌟"; }
    else if (pct >= 80) { letter = 'B'; msg = "Great Job! 👏"; }
    else if (pct >= 70) { letter = 'C'; msg = "Good Effort! 💪"; }
    else if (pct >= 60) { letter = 'D'; msg = "Keep Practicing! 🔄"; }

    this.show('end-screen');

    const reviewNextBtn = document.getElementById('review-next-btn');
    if (reviewNextBtn) reviewNextBtn.classList.toggle('hidden', !reviewMode);

    document.getElementById('final-score-sub').textContent =
      `Form ${this.currentForm} · Attempt ${attemptNum} · ${this.studentName}`;
    document.getElementById('final-msg').textContent = msg;

    const pctEl = document.getElementById('final-percent');
    pctEl.innerHTML = `${this.score}/${total}<br><small style="font-size:0.5em;color:${pct>=70?'var(--correct)':'var(--danger)'};">${pct}% · ${letter}</small>`;
    setTimeout(() => pctEl.classList.add('revealed'), 50);

    // ── Skills to reteach — grouped, most-missed first ──
    const skillSec = document.getElementById('skill-section');
    if (skillSec) {
      const breakdown = skillBreakdown(this.missedQuestions);
      if (breakdown.length) {
        const worst = breakdown[0].count;
        skillSec.classList.remove('hidden');
        document.getElementById('skill-items').innerHTML = breakdown.map(s => {
          const pctWidth = Math.round((s.count / worst) * 100);
          return `<div class="skill-row">
            <div class="skill-name">${s.skill}</div>
            <div class="skill-bar-wrap"><div class="skill-bar" style="width:${pctWidth}%"></div></div>
            <div class="skill-count">${s.count} missed</div>
          </div>`;
        }).join('');
      } else {
        skillSec.classList.add('hidden');
      }
    }

    const missedSec = document.getElementById('missed-section');
    if (this.missedQuestions.length) {
      missedSec.classList.remove('hidden');
      document.getElementById('missed-items').innerHTML =
        this.missedQuestions.map(m =>
          `<div class="missed-item">
            <div class="mi-label">${m.id}${m.skill ? ` · <span class="mi-skill">${m.skill}</span>` : ''}</div>
            <div style="margin:3px 0;">${formatMathText(m.q)}</div>
            <div>Your answer: <span style="color:var(--danger);">${formatMathText(m.yourAnswer)}</span> &nbsp; ✅ Correct: <strong style="color:var(--correct);">${formatMathText(m.correct)}</strong></div>
            ${m.explanation ? `<div style="margin-top:5px;font-size:0.85rem;color:#555;font-style:italic;">💡 ${formatMathText(m.explanation)}</div>` : ''}
          </div>`
        ).join('');
    } else {
      missedSec.classList.add('hidden');
    }

    if (pct >= 70) startConfetti(pct);

    if (!reviewMode && allFormsCompletedOnce(this.studentName)) {
      setTimeout(() => this.showScores(true), 3000);
    }
  },

  /* ── SPEAK QUESTION ── */
  speakQuestion() {
    const qBtn = document.getElementById('speak-q-btn');
    if (activeSpeakBtn === qBtn) { stopActiveSpeech(); return; }
    stopActiveSpeech();
    activeSpeakBtn = qBtn;
    qBtn.textContent = '⏹';

    const q = this.currentBank[this.currentIndex];
    if (!q) return;

    const spokenText = convertToSpokenText(q.q);
    const qtEl = document.getElementById('question-text');
    const originalWords = q.q.split(/\s+/);

    let qHTML = '';
    originalWords.forEach((w, i) => {
      qHTML += `<span class="wrd" id="wrd${i}">${formatMathText(w)}</span> `;
    });
    if (q.hint) qHTML += `<div style="font-size:0.85rem;color:#666;background:#f0f0f0;border-radius:8px;padding:6px 10px;margin-top:8px;">💡 Hint: ${q.hint}</div>`;
    qtEl.innerHTML = qHTML;

    const hlSpans = originalWords.map((_, i) => document.getElementById('wrd' + i));
    let hlIdx = 0;

    const u = new SpeechSynthesisUtterance(spokenText);
    u.lang = 'en-US'; u.rate = 0.92;

    u.onboundary = e => {
      if (e.name !== 'word') return;
      document.querySelectorAll('#question-text .wrd.hl').forEach(el => el.classList.remove('hl'));
      if (hlSpans[hlIdx]) hlSpans[hlIdx].classList.add('hl');
      hlIdx++;
    };
    u.onend = () => {
      document.querySelectorAll('#question-text .wrd.hl').forEach(el => el.classList.remove('hl'));
      if (activeSpeakBtn === qBtn) { qBtn.textContent = '🔊'; activeSpeakBtn = null; }
    };
    addHighlightFallback(u, hlSpans.filter(Boolean));
    window.speechSynthesis.speak(u);
  },

  /* ── SCORES ── */
  showScores(autoShow = false) {
    this.show('scoreboard-screen');
    const teacherBtns = document.getElementById('teacher-score-btns');
    if (teacherBtns) teacherBtns.style.display = this.studentName === 'Mr. O (Teacher)' ? 'flex' : 'none';
    if (!reviewMode) this._startScoreLock(autoShow ? 60 : 0);

    const all    = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
    const listEl = document.getElementById('score-list');
    const noEl   = document.getElementById('no-scores-msg');

    if (!all.length) {
      listEl.innerHTML = '';
      noEl.style.display = 'block';
      return;
    }
    noEl.style.display = 'none';

    const forms = ['A', 'B', 'C'];

    const summaryCards = forms.map(form => {
      const best = all.filter(s => s.form === form && s.done)
        .reduce((b, r) => (!b || r.pct > b.pct) ? r : b, null);
      if (!best) {
        return `<div class="sb-summary-card">
          <div class="sb-summary-label">Form ${form}</div>
          <div class="sb-summary-grade" style="color:#ccc;">—</div>
          <div class="sb-summary-score" style="color:#aaa;">Not yet completed</div>
        </div>`;
      }
      const grade = letterGrade(best.pct);
      const gc = best.pct>=90?'#27ae60':best.pct>=80?'#2980b9':best.pct>=70?'#f39c12':best.pct>=60?'#e67e22':'#e74c3c';
      return `<div class="sb-summary-card">
        <div class="sb-summary-label">Form ${form}</div>
        <div class="sb-summary-grade" style="color:${gc};">${grade}</div>
        <div class="sb-summary-score">${best.score}/${best.total} · ${best.pct}%</div>
        <div class="sb-summary-attempt">Best of ${all.filter(s=>s.form===form&&s.done).length} attempt(s)</div>
      </div>`;
    }).join('');

    const details = forms.map(form => {
      const rows = all.filter(s => s.form === form && s.done);
      if (!rows.length) return '';
      const att1 = rows.filter(r => (r.attempt||1) === 1);
      const att2 = rows.filter(r => (r.attempt||1) >= 2);

      const buildTable = (attempts, label, headerColor) => {
        if (!attempts.length) return '';
        return `<div style="margin-bottom:14px;">
          <div style="display:inline-block;background:${headerColor};color:white;
                      font-size:0.72rem;font-weight:bold;letter-spacing:1px;
                      text-transform:uppercase;border-radius:6px;padding:3px 10px;
                      margin-bottom:6px;">${label}</div>
          <table class="scoreboard-table">
            <thead><tr><th>Score</th><th>%</th><th>Grade</th><th>Time</th><th>Date</th></tr></thead>
            <tbody>${attempts.map(r => {
              const grade = letterGrade(r.pct);
              const cls   = r.pct>=90?'score-good':r.pct>=70?'score-ok':'score-bad';
              return `<tr>
                <td>${r.score}/${r.total}</td>
                <td class="${cls}">${r.pct}%</td>
                <td class="${cls}" style="font-weight:800;">${grade}</td>
                <td>${r.time||'—'}</td>
                <td>${r.date}</td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>`;
      };

      return `<h3 style="color:var(--primary);margin:22px 0 8px;border-bottom:2px solid #e0e0e0;padding-bottom:6px;">Form ${form}</h3>
        ${buildTable(att1,'Attempt 1','#d35400')}
        ${buildTable(att2,'Attempt 2','#f39c12')}`;
    }).join('');

    listEl.innerHTML = `
      <div style="margin-bottom:6px;font-size:0.8rem;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1px;">Your Best Scores</div>
      <div class="sb-summary-row">${summaryCards}</div>
      <div style="margin-top:24px;">${details}</div>`;
  },

  _startScoreLock(secs) {
    const bar     = document.getElementById('sb-lock-bar');
    const fill    = document.getElementById('sb-lock-fill');
    const count   = document.getElementById('sb-lock-count');
    const buttons = document.querySelectorAll('#scoreboard-screen button:not(#sb-lock-bar button)');
    if (!secs || secs <= 0) { if (bar) bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');
    fill.style.width = '100%';
    count.textContent = secs;
    buttons.forEach(b => { b.disabled = true; b.style.opacity = '0.4'; });
    let remaining = secs;
    const iv = setInterval(() => {
      remaining--;
      count.textContent = remaining;
      fill.style.width = (remaining / secs * 100) + '%';
      if (remaining <= 0) {
        clearInterval(iv);
        bar.classList.add('hidden');
        buttons.forEach(b => { b.disabled = false; b.style.opacity = '1'; });
      }
    }, 1000);
  },

  clearScores() {
    const panel = document.getElementById('clear-confirm-panel');
    panel.classList.remove('hidden');
    document.getElementById('clear-pin-input').value = '';
    document.getElementById('clear-pin-error').textContent = '';
    setTimeout(() => document.getElementById('clear-pin-input').focus(), 80);
  },

  confirmClearScores() {
    const pin = document.getElementById('clear-pin-input').value.trim();
    if (pin === '9377') {
      localStorage.removeItem(SCORES_KEY);
      document.getElementById('clear-confirm-panel').classList.add('hidden');
      this.showScores();
    } else {
      document.getElementById('clear-pin-error').textContent = '❌ Incorrect PIN. Try again.';
      document.getElementById('clear-pin-input').value = '';
      document.getElementById('clear-pin-input').focus();
    }
  },

  cancelClearScores() {
    document.getElementById('clear-confirm-panel').classList.add('hidden');
  },

  printResults() {
    const all = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
    if (!all.length) { alert('No scores to print yet!'); return; }
    const rows = ['A','B','C'].flatMap(form =>
      all.filter(s => s.form === form).map(r => {
        const cc  = r.pct >= 80 ? 'good' : r.pct >= 60 ? 'ok' : 'bad';
        const att = r.attempt || 1;
        const attStyle = att === 1
          ? 'background:#d35400;color:white;padding:2px 7px;border-radius:4px;font-size:0.8em;'
          : 'background:#f39c12;color:#5a3000;padding:2px 7px;border-radius:4px;font-size:0.8em;';
        return `<tr>
          <td>${r.name||'—'}</td>
          <td>Form ${r.form}</td>
          <td><span style="${attStyle}">Attempt ${att}</span></td>
          <td>${r.score}/${r.total}</td>
          <td class="${cc}">${r.pct}%</td>
          <td>${r.time||'—'}</td>
          <td>${r.date}</td>
        </tr>`;
      })
    ).join('');
    const html = `<html><head><title>Place Value FIAB Review Scores</title>
      <style>body{font-family:Arial;padding:20px;}h2{color:#1d4ed8;}
      table{width:100%;border-collapse:collapse;margin-top:12px;}
      th,td{border:1px solid #ccc;padding:8px 12px;text-align:center;}
      th{background:#1d4ed8;color:white;}
      .good{color:green;font-weight:bold;}.ok{color:orange;font-weight:bold;}.bad{color:red;font-weight:bold;}</style>
      </head><body>
      <h2>🔢 SBAC Practice — Place Value &amp; Multidigit Whole Numbers — Score Report</h2>
      <p>Printed: ${new Date().toLocaleString()}</p>
      <table><tr><th>Name</th><th>Form</th><th>Attempt</th><th>Score</th><th>%</th><th>Time</th><th>Date</th></tr>${rows}</table>
      </body></html>`;
    const w = window.open('', '_blank');
    w.document.write(html); w.document.close(); w.print();
  },

  /* ── END SCREEN ACTIONS ── */
  tryAgain() {
    stopConfetti();
    this.timerSeconds = 0;
    this.show('start-screen');
    document.getElementById('welcome-panel').classList.add('hidden');
    document.getElementById('student-login-panel').classList.remove('hidden');
    applyFormLocks(this.studentName);
    this.checkResume();
  },

  restart() {
    stopConfetti();
    this.stopTimerEngine();
    this.timerSeconds   = 0;
    this.studentName    = '';
    loggedInName        = '';
    unlockedForms       = new Set();
    document.getElementById('name-select').value = '';
    document.getElementById('student-pin').value = '';
    document.getElementById('pin-section').classList.add('hidden');
    document.getElementById('form-select-section').classList.add('hidden');
    document.getElementById('resume-container').classList.add('hidden');
    document.getElementById('login-error').textContent = '';
    const loginCard = document.getElementById('login-step-card');
    if (loginCard) loginCard.classList.remove('hidden');
    this.show('start-screen');
    document.getElementById('welcome-panel').classList.remove('hidden');
    document.getElementById('student-login-panel').classList.add('hidden');
  },

  /* ── GLOBAL PIN MODAL ── */
  showPinModal(title, msg, onSuccess) {
    pinModalCallback = onSuccess;
    document.getElementById('pin-modal-title').textContent = title;
    document.getElementById('pin-modal-msg').textContent   = msg;
    document.getElementById('pin-modal-input').value       = '';
    document.getElementById('pin-modal-error').textContent = '';
    document.getElementById('pin-modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('pin-modal-input').focus(), 80);
  },

  confirmPinModal() {
    const pin = document.getElementById('pin-modal-input').value.trim();
    if (pin === '9377') {
      document.getElementById('pin-modal').classList.add('hidden');
      const cb = pinModalCallback;
      pinModalCallback = null;
      if (cb) cb();
    } else {
      document.getElementById('pin-modal-error').textContent = '❌ Incorrect PIN. Try again.';
      document.getElementById('pin-modal-input').value = '';
      document.getElementById('pin-modal-input').focus();
    }
  },

  cancelPinModal() {
    document.getElementById('pin-modal').classList.add('hidden');
    pinModalCallback = null;
  }
};

/* ── VISIBILITY / UNLOAD ─────────────────────────────── */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (!app.timerOn) return;
    tabSwitchCount++;
    logEvent('leave');
    app.stopTimerEngine();
    app.saveProgress();
    if (app.instructInterval) { clearInterval(app.instructInterval); }
    if (app.readInterval)     { clearInterval(app.readInterval); app.readInterval = null; app._readLockPaused = true; }
    app._wasTimerRunning = true;
  } else {
    if (!app._wasTimerRunning) return;
    app._wasTimerRunning = false;
    logEvent('return');
    const warnBanner = document.getElementById('tab-warning-banner');
    if (warnBanner) warnBanner.classList.remove('hidden');
    app.stopTimerEngine();
    app.timerInterval = setInterval(() => {
      app.timerSeconds++;
      app._tickTimer();
      if (app.timerSeconds % 30 === 0) app.saveProgress();
    }, 1000);
    app.timerOn = true;
    // The read lock stopped while the page was hidden; start it over so the
    // answers unlock again (left alone they stayed locked until a refresh).
    if (app._readLockPaused) { app._readLockPaused = false; app.startReadTimer(); }
  }
});

window.addEventListener('beforeunload', () => {
  if (app.timerOn) { logEvent('close'); app.saveProgress(); }
});

/* ── CONFETTI ────────────────────────────────────────── */
const canvas = document.getElementById('confetti-canvas');
const ctx    = canvas.getContext('2d');
let particles = [], animId = null;

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

function startConfetti(pct) {
  particles = [];
  let count, cols;
  if (pct === 100) {
    count = 300;
    cols = ['#FFD700','#FFA500','#FFFACD','#f39c12','#ffffff','#FFD700'];
  } else if (pct >= 90) {
    count = 220;
    cols = ['#d35400','#f39c12','#2ecc71','#3498db','#9b59b6','#e74c3c','#FFD700'];
  } else if (pct >= 80) {
    count = 160;
    cols = ['#d35400','#f39c12','#2ecc71','#3498db','#e74c3c','#9b59b6'];
  } else {
    count = 80;
    cols = ['#d35400','#f39c12','#7f8c8d','#95a5a6','#bdc3c7'];
  }
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      c: cols[~~(Math.random() * cols.length)],
      s: Math.random() * 5 + 3,
      d: Math.random() * 5 + 2,
      r: Math.random() * Math.PI * 2
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r += 0.05);
    ctx.fillStyle = p.c; ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s);
    ctx.restore();
    p.y += p.d; p.x += Math.sin(p.r) * 1.5;
    if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
  });
  animId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
  if (animId) cancelAnimationFrame(animId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animId = null;
}

/* ── BOOT ────────────────────────────────────────────── */
app.init();

/* ── CLOSED-TO-STUDENTS LOCK ────────────────────────── */
(function applyReviewLock() {
  if (REVIEW_OPEN) return;
  const btn = document.querySelector('.lgs-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.classList.add('locked');
  btn.textContent = '🔒 Not Open Yet';
  const note = document.createElement('p');
  note.className = 'locked-note';
  note.textContent = "Mr. O will let you know when this review is ready!";
  btn.insertAdjacentElement('afterend', note);
})();
