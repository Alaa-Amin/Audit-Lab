(function () {
  const ICONS = {
    doc: `<svg viewBox="0 0 80 80"><rect x="14" y="8" width="44" height="60" rx="3" fill="var(--paper-white)" stroke="var(--ink-soft)" stroke-width="1.5"/><path d="M46 8v10h12z" fill="var(--manila-dark)"/><rect x="20" y="14" width="20" height="4" rx="1" fill="var(--green)"/><rect x="20" y="24" width="26" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="30" width="26" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="36" width="18" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="46" width="26" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="52" width="20" height="2.5" rx="1" fill="var(--line)"/><circle cx="54" cy="58" r="12" fill="none" stroke="var(--brass)" stroke-width="2"/><text x="54" y="61" font-family="IBM Plex Mono, monospace" font-size="8" font-weight="700" fill="var(--brass)" text-anchor="middle">PO</text></svg>`,
    scale: `<svg viewBox="0 0 80 80"><rect x="14" y="8" width="44" height="60" rx="3" fill="var(--paper-white)" stroke="var(--ink-soft)" stroke-width="1.5"/><rect x="20" y="16" width="26" height="4" rx="1" fill="var(--green)"/><rect x="20" y="26" width="26" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="32" width="26" height="2.5" rx="1" fill="var(--line)"/><rect x="20" y="38" width="20" height="2.5" rx="1" fill="var(--line)"/><g transform="translate(28,46)" fill="none" stroke="var(--brass)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 0v20M0 4l-6 10a5 5 0 0010 0zM16 4l-6 10a5 5 0 0010 0zM0 4h16M4 24h8"/></g></svg>`,
    building: `<svg viewBox="0 0 80 80"><rect x="16" y="30" width="48" height="38" fill="var(--paper-white)" stroke="var(--ink-soft)" stroke-width="1.5"/><path d="M12 32L40 12l28 20" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-linejoin="round"/><rect x="24" y="40" width="8" height="8" fill="var(--brass)"/><rect x="36" y="40" width="8" height="8" fill="var(--brass)"/><rect x="48" y="40" width="8" height="8" fill="var(--brass)"/><rect x="24" y="52" width="8" height="8" fill="var(--green)"/><rect x="48" y="52" width="8" height="8" fill="var(--green)"/><rect x="35" y="54" width="10" height="14" fill="var(--ink-soft)"/></svg>`,
    mail: `<svg viewBox="0 0 80 80"><rect x="10" y="20" width="60" height="42" rx="4" fill="var(--paper-white)" stroke="var(--ink-soft)" stroke-width="1.5"/><path d="M10 24l30 22 30-22" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="60" cy="20" r="11" fill="var(--red)"/><text x="60" y="24" font-family="IBM Plex Mono, monospace" font-size="12" font-weight="700" fill="var(--paper)" text-anchor="middle">!</text></svg>`,
    lock: `<svg viewBox="0 0 80 80"><rect x="22" y="38" width="36" height="30" rx="4" fill="var(--manila-dark)" stroke="var(--ink-soft)" stroke-width="1.5"/><path d="M30 38v-8a10 10 0 0120 0v8" fill="none" stroke="var(--ink-soft)" stroke-width="2.5"/><circle cx="40" cy="52" r="4" fill="var(--ink-soft)"/><rect x="38" y="54" width="4" height="8" fill="var(--ink-soft)"/></svg>`,
  };

  const PORTRAITS = {
    ahmad: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="var(--manila-dark)"/><path d="M20 100c0-18 13-30 30-30s30 12 30 30z" fill="var(--green)"/><circle cx="50" cy="40" r="20" fill="#D9AE82"/><path d="M30 34a20 20 0 0140-2c0-10-9-18-20-18s-20 8-20 18z" fill="#3B2A1E"/><path d="M42 74l8 8 8-8" fill="none" stroke="var(--paper)" stroke-width="2"/></svg>`,
    fatima: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="var(--manila-dark)"/><path d="M22 100c0-18 13-30 28-30s28 12 28 30z" fill="var(--green)"/><path d="M50 14c-16 0-26 12-26 28 0 10 4 18 10 24h32c6-6 10-14 10-24 0-16-10-28-26-28z" fill="var(--brass)"/><circle cx="50" cy="42" r="16" fill="#D9AE82"/></svg>`,
    noor: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="var(--manila-dark)"/><path d="M22 100c0-18 13-30 28-30s28 12 28 30z" fill="var(--brass)"/><path d="M50 14c-16 0-26 12-26 28 0 10 4 18 10 24h32c6-6 10-14 10-24 0-16-10-28-26-28z" fill="var(--green-light)"/><circle cx="50" cy="42" r="16" fill="#D9AE82"/></svg>`,
    hamad: `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="var(--manila-dark)"/><path d="M20 100c0-18 13-30 30-30s30 12 30 30z" fill="var(--ink)"/><circle cx="50" cy="40" r="20" fill="#D9AE82"/><path d="M30 30a20 20 0 0140 2v-4c0-10-9-18-20-18s-20 8-20 18z" fill="#2A2018"/><rect x="38" y="47" width="24" height="5" rx="2" fill="#2A2018"/><path d="M42 74l8 8 8-8" fill="none" stroke="var(--paper)" stroke-width="2"/></svg>`,
  };

  const HERO = `<svg viewBox="0 0 220 160"><rect x="0" y="120" width="220" height="40" fill="var(--manila-dark)"/><rect x="30" y="70" width="120" height="70" rx="4" fill="var(--green)"/><rect x="40" y="60" width="100" height="16" rx="2" fill="var(--green-light)"/><rect x="45" y="80" width="90" height="6" fill="var(--paper)"/><rect x="45" y="92" width="70" height="6" fill="var(--paper)"/><rect x="45" y="104" width="80" height="6" fill="var(--paper)"/><g transform="translate(140,30)"><circle cx="0" cy="0" r="22" fill="none" stroke="var(--brass)" stroke-width="5"/><line x1="16" y1="16" x2="40" y2="40" stroke="var(--brass)" stroke-width="6" stroke-linecap="round"/></g><g transform="translate(165,95) rotate(-12)"><circle cx="0" cy="0" r="24" fill="none" stroke="var(--red)" stroke-width="3"/><text x="0" y="4" font-family="IBM Plex Mono, monospace" font-size="9" font-weight="700" fill="var(--red)" text-anchor="middle">CASE</text></g></svg>`;
  const heroSlot = document.getElementById('cover-hero');
  if (heroSlot) heroSlot.innerHTML = HERO;

  let lang = localStorage.getItem('auditlab-lang') || 'en';
  let studentId = null;
  let caseId = null;
  let progress = null;
  let activeTab = 'case';
  let activePersona = null;
  let openDoc = null;

  const el = (id) => document.getElementById(id);
  const CASE = () => window.CASES[caseId];
  function t(key, ...args) {
    const v = window.UI_STRINGS[lang][key];
    return typeof v === 'function' ? v(...args) : v;
  }
  function fieldLabel(key) {
    const fld = window.FINDING_FIELDS.find((f) => f.key === key);
    return fld ? fld.label[lang] : key;
  }

  function blankFinding() { return { title: '', criteria: '', condition: '', cause: '', effect: '', recommendation: '', evidence: [] }; }

  async function api(path, opts) {
    const res = await fetch(path, opts);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Request failed (${res.status})`);
    }
    return res.json();
  }

  async function loadState() {
    progress = await api(`/api/state?studentId=${encodeURIComponent(studentId)}&caseId=${encodeURIComponent(caseId)}`);
    if (!progress.findings || progress.findings.length === 0) progress.findings = [blankFinding()];
  }

  async function saveState(patch) {
    Object.assign(progress, patch);
    await api('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, caseId, patch }),
    });
  }

  function switchTab(tab) { activeTab = tab; renderApp(); }

  // ---------- Language ----------
  function applyDir() {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
  }

  function applyStaticText() {
    el('cover-title').textContent = t('app_title');
    el('cover-sub').textContent = t('cover_sub');
    el('cover-desc').textContent = t('cover_desc');
    el('student-name').placeholder = t('name_placeholder');
    el('start-btn').textContent = t('continue_btn');
    el('universe-sub').textContent = t('universe_sub');
    el('choose-case-title').textContent = t('choose_case');
    el('back-to-cases').textContent = t('all_cases');
    el('reset-case').textContent = t('reset_case');
    document.querySelectorAll('.lang-toggle-btn').forEach((b) => { b.textContent = t('lang_toggle'); });
  }

  function toggleLang() {
    lang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('auditlab-lang', lang);
    applyDir();
    applyStaticText();
    if (!el('case-select-screen').classList.contains('app-hidden')) renderCaseList();
    if (!el('app-shell').classList.contains('app-hidden')) {
      el('app-case-title').textContent = CASE().title[lang];
      el('app-case-meta-line').textContent = `${CASE().caseNumber} \u00b7 ${CASE().company[lang]}`;
      updateProgressPill();
      renderApp();
    }
  }

  // ---------- Case selection screen ----------
  function renderCaseList() {
    const listEl = el('case-list');
    listEl.innerHTML = window.CASE_LIST.map((c) => `
      <div class="case-pick" data-case="${c.id}">
        <div class="case-pick-meta mono">${c.caseNumber} &middot; ${c.department[lang]}</div>
        <div class="case-pick-title">${c.title[lang]}</div>
        <div class="case-pick-blurb">${c.listBlurb[lang]}</div>
      </div>
    `).join('');
    [...listEl.querySelectorAll('.case-pick')].forEach((n) => n.addEventListener('click', () => openCase(n.dataset.case)));
  }

  async function openCase(id) {
    caseId = id;
    activePersona = Object.keys(CASE().personas)[0];
    openDoc = null; activeTab = 'case';
    try {
      await loadState();
      el('case-select-screen').classList.add('app-hidden');
      const shell = el('app-shell');
      shell.classList.remove('app-hidden');
      shell.classList.add('app-fade-in');
      el('app-case-title').textContent = CASE().title[lang];
      el('app-case-meta-line').textContent = `${CASE().caseNumber} \u00b7 ${CASE().company[lang]}`;
      updateProgressPill();
      renderApp();
    } catch (e) {
      alert(t('could_not_open') + e.message);
    }
  }

  function backToCaseList() {
    caseId = null; progress = null;
    el('app-shell').classList.add('app-hidden');
    const sel = el('case-select-screen');
    sel.classList.remove('app-hidden');
    sel.classList.add('app-fade-in');
  }

  // ---------- Tabs ----------
  function renderTabs() {
    const defs = [['case', t('tab_case')], ['interview', t('tab_interview')], ['findings', t('tab_findings')], ['verdict', t('tab_verdict')]];
    el('tabs').innerHTML = defs.map(([id, label]) => {
      const lockedDoc = CASE().documents.find((d) => d.locked);
      const dot = id === 'case' && lockedDoc && progress.unlocked.includes(lockedDoc.id) ? '<span class="dot"></span>' : '';
      return `<div class="tab ${activeTab === id ? 'active' : ''}" data-tab="${id}">${label}${dot}</div>`;
    }).join('');
    [...el('tabs').querySelectorAll('.tab')].forEach((n) => n.addEventListener('click', () => switchTab(n.dataset.tab)));
  }

  function renderCaseFile() {
    const docs = CASE().documents;
    if (openDoc) {
      const doc = docs.find((d) => d.id === openDoc);
      const dl = doc[lang];
      return `
        <div class="back-link" id="back-link">${t('back_to_case_file')}</div>
        <div class="mono" style="font-size:10px;color:var(--brass);text-transform:uppercase;">${dl.tag}</div>
        <h2 style="margin:4px 0 12px 0;font-size:18px;">${dl.title}</h2>
        <div class="doc-detail"><table>${dl.rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
      `;
    }
    const cards = docs.map((d) => {
      const locked = !progress.unlocked.includes(d.id);
      const dl = d[lang];
      return `
        <div class="doc-card ${locked ? 'locked' : ''}" data-doc="${d.id}">
          <div class="doc-icon">${locked ? ICONS.lock : ICONS[d.icon]}</div>
          <div>
            <div class="doc-tag">${dl.tag}</div>
            <div class="doc-title">${locked ? t('doc_restricted') : dl.title}</div>
            <div class="doc-hint">${locked ? t('doc_locked_hint') : t('doc_open_hint')}</div>
          </div>
        </div>`;
    }).join('');
    return `<div class="brief"><span class="mono">${t('audit_brief')}</span>${CASE().brief[lang]}</div><div class="doc-grid">${cards}</div>`;
  }

  function renderInterview() {
    const personas = CASE().personas;
    const msgs = (progress.messages[activePersona] || []);
    const msgHtml = msgs.length ? msgs.map((m) => {
      if (m.unlock) {
        const doc = CASE().documents.find((d) => d.id === m.unlock);
        return `<div class="unlock-note">${ICONS.lock}<span>${t('evidence_unlocked')} ${doc ? doc[lang].title : m.unlock}</span></div>`;
      }
      return `
        <div class="msg ${m.role === 'user' ? 'student' : 'persona'}">
          ${m.role === 'user' ? '' : `<div class="avatar small">${PORTRAITS[activePersona] || ''}</div>`}
          <div class="bubble">${m.text}</div>
        </div>`;
    }).join('') : `<div class="msg-empty">${t('interview_not_started', personas[activePersona][lang].name)}</div>`;

    const personaButtons = Object.entries(personas).map(([id, def]) => `
      <div class="persona-btn ${activePersona === id ? 'active' : ''}" data-persona="${id}">
        <div class="avatar">${PORTRAITS[id] || ''}</div>
        ${def[lang].name} - ${def[lang].role}
      </div>`).join('');

    return `
      <div class="persona-select">${personaButtons}</div>
      <div class="chat-window" id="chat-window">${msgHtml}</div>
      <div class="chat-input-row">
        <input type="text" id="chat-text" placeholder="${t('ask_placeholder')}" />
        <button class="btn" id="chat-send">${t('ask_btn')}</button>
      </div>
    `;
  }

  function renderFindings() {
    const fields = window.FINDING_FIELDS;
    const docs = CASE().documents;
    const blocks = progress.findings.map((f, i) => `
      <div class="finding-block">
        <div class="finding-num">${i + 1}${progress.findings.length > 1 ? `<span class="remove" data-remove="${i}">${t('remove')}</span>` : ''}</div>
        ${fields.map((fld) => `
          <div class="field">
            <label>${fld.label[lang]}</label>
            ${fld.kind === 'input'
              ? `<input type="text" data-f="${i}" data-k="${fld.key}" value="${(f[fld.key] || '').replace(/"/g, '&quot;')}" />`
              : `<textarea rows="2" data-f="${i}" data-k="${fld.key}">${f[fld.key] || ''}</textarea>`}
          </div>`).join('')}
        <div class="field">
          <label>${t('evidence_referenced')}</label>
          <div class="evidence-list">
            ${docs.filter((d) => progress.unlocked.includes(d.id)).map((d) => `
              <div class="evidence-chip ${f.evidence.includes(d.id) ? 'checked' : ''}" data-f="${i}" data-ev="${d.id}">${d[lang].title}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
    return `
      ${blocks}
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn secondary" id="add-finding">${t('add_finding')}</button>
        <button class="btn" id="submit-verdict">${t('submit_grading')}</button>
      </div>
    `;
  }

  function renderVerdict() {
    if (!progress.verdict) return `<div class="verdict-empty">${t('no_verdict')}</div>`;
    if (progress.verdict === 'loading') return `<div class="verdict-empty loading-text">${t('grading_loading')}</div>`;
    const v = progress.verdict;
    const cls = v.verdict === 'PASS' ? 'pass' : 'needswork';
    const stampLabel = v.verdict === 'PASS' ? t('stamp_pass') : t('stamp_needswork');
    return `
      <div class="stamp ${cls}">${stampLabel}</div>
      <div class="score-line">${t('score_line', v.overall_score, v.root_cause_identified)}</div>
      ${Object.entries(v.component_feedback).map(([k, val]) => `<div class="comp"><span class="mono">${fieldLabel(k)}</span><p>${val}</p></div>`).join('')}
      <div class="summary-block">${v.summary}</div>
    `;
  }

  function renderApp() {
    renderTabs();
    const panel = el('panel');
    panel.className = 'panel app-fade-in';
    if (activeTab === 'case') panel.innerHTML = renderCaseFile();
    else if (activeTab === 'interview') panel.innerHTML = renderInterview();
    else if (activeTab === 'findings') panel.innerHTML = renderFindings();
    else panel.innerHTML = renderVerdict();
    attachEvents();
  }

  function attachEvents() {
    if (activeTab === 'case') {
      const back = el('back-link');
      if (back) back.addEventListener('click', () => { openDoc = null; renderApp(); });
      document.querySelectorAll('.doc-card').forEach((c) => c.addEventListener('click', () => {
        if (c.classList.contains('locked')) return;
        openDoc = c.dataset.doc; renderApp();
      }));
    }

    if (activeTab === 'interview') {
      document.querySelectorAll('.persona-btn').forEach((b) => b.addEventListener('click', () => { activePersona = b.dataset.persona; renderApp(); }));
      const win = el('chat-window'); win.scrollTop = win.scrollHeight;
      const send = el('chat-send'); const input = el('chat-text');
      const doSend = async () => {
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        send.disabled = true;
        try {
          await api('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, caseId, persona: activePersona, text, lang }),
          });
          await loadState();
          renderApp();
        } catch (e) {
          alert(e.message);
        } finally {
          send.disabled = false; send.textContent = t('ask_btn');
          const c = el('chat-window'); if (c) c.scrollTop = c.scrollHeight;
        }
      };
      send.addEventListener('click', doSend);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSend(); });
    }

    if (activeTab === 'findings') {
      document.querySelectorAll('[data-f][data-k]').forEach((n) => {
        n.addEventListener('input', () => { progress.findings[n.dataset.f][n.dataset.k] = n.value; });
        n.addEventListener('blur', () => saveState({ findings: progress.findings }));
      });
      document.querySelectorAll('[data-ev]').forEach((n) => n.addEventListener('click', () => {
        const f = progress.findings[n.dataset.f];
        const idx = f.evidence.indexOf(n.dataset.ev);
        if (idx > -1) f.evidence.splice(idx, 1); else f.evidence.push(n.dataset.ev);
        saveState({ findings: progress.findings }); renderApp();
      }));
      document.querySelectorAll('[data-remove]').forEach((n) => n.addEventListener('click', () => {
        progress.findings.splice(n.dataset.remove, 1); saveState({ findings: progress.findings }); renderApp();
      }));
      const add = el('add-finding');
      if (add) add.addEventListener('click', () => { progress.findings.push(blankFinding()); saveState({ findings: progress.findings }); renderApp(); });
      const submit = el('submit-verdict');
      if (submit) submit.addEventListener('click', async () => {
        progress.verdict = 'loading'; activeTab = 'verdict'; renderApp();
        const docs = CASE().documents;
        const findingsWithTitles = progress.findings.map((f) => ({
          ...f,
          evidenceTitles: f.evidence.map((id) => { const d = docs.find((x) => x.id === id); return d ? d[lang].title : id; }),
        }));
        try {
          const verdict = await api('/api/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, caseId, findings: findingsWithTitles, lang }),
          });
          progress.verdict = verdict;
        } catch (e) {
          progress.verdict = { overall_score: 0, verdict: 'NEEDS WORK', root_cause_identified: false, component_feedback: { criteria: '-', condition: '-', cause: '-', effect: '-', recommendation: '-' }, summary: e.message };
        }
        renderApp();
      });
    }
  }

  function updateProgressPill() {
    const total = CASE().documents.length;
    const unlocked = progress.unlocked.length;
    el('progress-pill').textContent = `${unlocked} / ${total}`;
  }

  async function startFlow() {
    const nameInput = el('student-name');
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    studentId = name.toLowerCase().replace(/\s+/g, '-');
    el('cover-screen').classList.add('app-hidden');
    const sel = el('case-select-screen');
    sel.classList.remove('app-hidden');
    sel.classList.add('app-fade-in');
    renderCaseList();
  }

  el('start-btn').addEventListener('click', startFlow);
  el('student-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') startFlow(); });
  el('back-to-cases').addEventListener('click', backToCaseList);
  document.querySelectorAll('.lang-toggle-btn').forEach((b) => b.addEventListener('click', toggleLang));
  el('reset-case').addEventListener('click', async () => {
    if (!confirm(t('reset_confirm'))) return;
    const defaults = { unlocked: CASE().documents.filter((d) => !d.locked).map((d) => d.id), messages: {}, findings: [blankFinding()], verdict: null };
    Object.keys(CASE().personas).forEach((id) => { defaults.messages[id] = []; });
    await saveState(defaults);
    openDoc = null; activeTab = 'case';
    updateProgressPill();
    renderApp();
  });

  applyDir();
  applyStaticText();
})();
