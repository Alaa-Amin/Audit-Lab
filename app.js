(function () {
  const S = window.SCENARIO;
  const ICONS = {
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M5 7l-3 6a3 3 0 006 0zM19 7l-3 6a3 3 0 006 0zM5 7h14M9 21h6"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 21V6l8-4 8 4v15"/><path d="M9 21v-6h6v6M9 10h.01M12 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
  };

  let studentId = null;
  let progress = null;
  let activeTab = 'case';
  let activePersona = 'ahmad';
  let openDoc = null;

  const el = (id) => document.getElementById(id);

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
    progress = await api(`/api/state?studentId=${encodeURIComponent(studentId)}`);
    if (!progress.findings || progress.findings.length === 0) progress.findings = [blankFinding()];
  }

  async function saveState(patch) {
    Object.assign(progress, patch);
    await api('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, patch }),
    });
  }

  function switchTab(t) { activeTab = t; renderApp(); }

  function renderTabs() {
    const defs = [['case', 'Case File'], ['interview', 'Interview'], ['findings', 'Findings'], ['verdict', 'Verdict']];
    el('tabs').innerHTML = defs.map(([id, label]) => {
      const dot = id === 'case' && progress.unlocked.includes('email-042') ? '<span class="dot"></span>' : '';
      return `<div class="tab ${activeTab === id ? 'active' : ''}" data-tab="${id}">${label}${dot}</div>`;
    }).join('');
    [...el('tabs').querySelectorAll('.tab')].forEach((n) => n.addEventListener('click', () => switchTab(n.dataset.tab)));
  }

  function renderCaseFile() {
    if (openDoc) {
      const doc = S.documents.find((d) => d.id === openDoc);
      return `
        <div class="back-link" id="back-link">&larr; back to case file</div>
        <div class="mono" style="font-size:10px;color:#9C7A3C;text-transform:uppercase;">${doc.tag}</div>
        <h2 style="margin:4px 0 12px 0;font-size:18px;">${doc.title}</h2>
        <div class="doc-detail"><table>${doc.rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
      `;
    }
    const cards = S.documents.map((d) => {
      const locked = !progress.unlocked.includes(d.id);
      return `
        <div class="doc-card ${locked ? 'locked' : ''}" data-doc="${d.id}">
          <div class="doc-icon">${locked ? ICONS.lock : ICONS[d.icon]}</div>
          <div>
            <div class="doc-tag">${d.tag}</div>
            <div class="doc-title">${locked ? 'Restricted' : d.title}</div>
            <div class="doc-hint">${locked ? 'Not yet available - keep interviewing' : 'Click to open'}</div>
          </div>
        </div>`;
    }).join('');
    return `<div class="brief"><span class="mono">Audit brief</span>${S.brief}</div><div class="doc-grid">${cards}</div>`;
  }

  function renderInterview() {
    const p = S.personas;
    const msgs = progress.messages[activePersona] || [];
    const msgHtml = msgs.length ? msgs.map((m) => {
      if (m.unlock) {
        const doc = S.documents.find((d) => d.id === m.unlock);
        return `<div class="unlock-note">${ICONS.lock}<span>New evidence unlocked in the Case File: ${doc ? doc.title : m.unlock}</span></div>`;
      }
      const persona = p[activePersona];
      return `
        <div class="msg ${m.role === 'user' ? 'student' : 'persona'}">
          ${m.role === 'user' ? '' : `<div class="avatar" style="background:${persona.color}">${persona.initials}</div>`}
          <div class="bubble">${m.text}</div>
        </div>`;
    }).join('') : `<div class="msg-empty">Interview not started. Ask ${p[activePersona].name} a question about the three purchase orders.</div>`;

    const personaButtons = Object.entries(p).map(([id, def]) => `
      <div class="persona-btn ${activePersona === id ? 'active' : ''}" data-persona="${id}">
        <div class="avatar" style="background:${def.color}">${def.initials}</div>
        ${def.name} - ${def.role}
      </div>`).join('');

    return `
      <div class="persona-select">${personaButtons}</div>
      <div class="chat-window" id="chat-window">${msgHtml}</div>
      <div class="chat-input-row">
        <input type="text" id="chat-text" placeholder="Ask a question..." />
        <button class="btn" id="chat-send">Ask</button>
      </div>
    `;
  }

  function renderFindings() {
    const blocks = progress.findings.map((f, i) => `
      <div class="finding-block">
        <div class="finding-num">FINDING ${i + 1}${progress.findings.length > 1 ? `<span class="remove" data-remove="${i}">remove</span>` : ''}</div>
        ${S.findingFields.map((fld) => `
          <div class="field">
            <label>${fld.label}</label>
            ${fld.kind === 'input'
              ? `<input type="text" data-f="${i}" data-k="${fld.key}" value="${(f[fld.key] || '').replace(/"/g, '&quot;')}" />`
              : `<textarea rows="2" data-f="${i}" data-k="${fld.key}">${f[fld.key] || ''}</textarea>`}
          </div>`).join('')}
        <div class="field">
          <label>Evidence referenced</label>
          <div class="evidence-list">
            ${S.documents.filter((d) => progress.unlocked.includes(d.id)).map((d) => `
              <div class="evidence-chip ${f.evidence.includes(d.id) ? 'checked' : ''}" data-f="${i}" data-ev="${d.id}">${d.title}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
    return `
      ${blocks}
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn secondary" id="add-finding">+ Add another finding</button>
        <button class="btn" id="submit-verdict">Submit for grading</button>
      </div>
    `;
  }

  function renderVerdict() {
    if (!progress.verdict) return `<div class="verdict-empty">No submission graded yet.<br>Complete your finding(s) and submit from the Findings tab.</div>`;
    if (progress.verdict === 'loading') return `<div class="verdict-empty loading-text">Reviewing your submission against the case facts...</div>`;
    const v = progress.verdict;
    const cls = v.verdict === 'PASS' ? 'pass' : 'needswork';
    return `
      <div class="stamp ${cls}">${v.verdict}</div>
      <div class="score-line">SCORE: ${v.overall_score} / 100 &middot; Root cause identified: ${v.root_cause_identified ? 'Yes' : 'No'}</div>
      ${Object.entries(v.component_feedback).map(([k, val]) => `<div class="comp"><span class="mono">${k}</span><p>${val}</p></div>`).join('')}
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
        send.disabled = true; send.textContent = '...';
        try {
          const result = await api('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, persona: activePersona, text }),
          });
          await loadState();
          renderApp();
          if (result.unlocked) {
            // brief highlight handled via the unlock-note already rendered in history
          }
        } catch (e) {
          alert(e.message);
        } finally {
          send.disabled = false; send.textContent = 'Ask';
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
        try {
          const verdict = await api('/api/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, findings: progress.findings }),
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
    const total = S.documents.length;
    const unlocked = progress.unlocked.length;
    el('progress-pill').textContent = `${unlocked} / ${total} evidence unlocked`;
  }

  async function startCase() {
    const nameInput = el('student-name');
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    studentId = name.toLowerCase().replace(/\s+/g, '-');
    const startBtn = el('start-btn');
    startBtn.disabled = true; startBtn.textContent = 'Opening case file...';
    try {
      await loadState();
      el('cover-screen').classList.add('app-hidden');
      const shell = el('app-shell');
      shell.classList.remove('app-hidden');
      shell.classList.add('app-fade-in');
      updateProgressPill();
      renderApp();
    } catch (e) {
      alert('Could not open the case: ' + e.message);
      startBtn.disabled = false; startBtn.textContent = 'Open Case File';
    }
  }

  el('start-btn').addEventListener('click', startCase);
  el('student-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') startCase(); });
  el('reset-case').addEventListener('click', async () => {
    if (!confirm('Reset all progress for this case? This cannot be undone.')) return;
    await saveState({ unlocked: ['po-1042', 'po-1043', 'po-1044', 'policy', 'vendor'], messages: { ahmad: [], fatima: [] }, findings: [blankFinding()], verdict: null });
    openDoc = null; activeTab = 'case';
    updateProgressPill();
    renderApp();
  });
})();
