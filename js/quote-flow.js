/* ─────────────────────────────────────────────────────────────
   iConnect Pre-Owned — shared trade-in / sell quote flow
   Requires data.js + main.js loaded first. Call
   renderQuoteFlow('quoteFlow', 'trade-in') or ('quoteFlow','sell').
   ───────────────────────────────────────────────────────────── */

function renderQuoteFlow(containerId, goal){
  const container = document.getElementById(containerId);
  const state = { step:'category', category:null, model:null, answers:{}, contact:{name:'',email:'',phone:'',notes:''} };
  const stepOrder = ['category','model',0,1,2,3,'quote','contact','done'];
  const escapeHTML = str => String(str || '').replace(/[&"'<>]/g, c => ({'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'})[c]);

  function totalDeduction(){ return Object.values(state.answers).reduce((s,a)=>s+a.deduction,0); }
  function estimatedValue(){
    if(!state.model) return 0;
    const raw = state.model.base * (1 - Math.min(totalDeduction(), 0.85));
    const multiplier = goal === 'trade-in' ? 1.05 : 1;
    return Math.max(300, Math.round((raw*multiplier)/50)*50);
  }

  function progress(){
    const idx = stepOrder.indexOf(state.step);
    return Math.round(((idx+1)/(stepOrder.length-1))*100);
  }

  function goBack(){
    const idx = stepOrder.indexOf(state.step);
    if(idx>0){ state.step = stepOrder[idx-1]; render(); }
  }

  function render(){
    const idx = stepOrder.indexOf(state.step);
    let body = '';

    if(state.step === 'category'){
      body = `
        <h2 style="font-size:1.3rem; font-weight:700;">What device do you have?</h2>
        <div class="quote-option-grid">
          ${Object.keys(TRADE_IN_CATALOG).map(cat => `
            <button class="quote-cat-btn" data-cat="${cat}">
              ${deviceIcon(cat, 26)}
              <span style="font-size:.85rem; font-weight:600;">${cat}</span>
            </button>`).join('')}
        </div>`;
    }

    else if(state.step === 'model'){
      body = `
        <h2 style="font-size:1.3rem; font-weight:700;">Which ${state.category} model?</h2>
        <div>${TRADE_IN_CATALOG[state.category].map(m => `
          <button class="quote-model-btn" data-model='${JSON.stringify(m).replace(/'/g,"&apos;")}'>
            <span style="font-size:.88rem; font-weight:600;">${m.model}</span>
            <span style="font-size:.75rem; color:rgb(var(--ink-faint));">Up to ${fmtZAR(m.base)}</span>
          </button>`).join('')}</div>`;
    }

    else if(typeof state.step === 'number'){
      const q = QUOTE_QUESTIONS[state.step];
      body = `
        <p class="quote-step-label">Question ${state.step+1} of ${QUOTE_QUESTIONS.length}</p>
        <h2 style="font-size:1.3rem; font-weight:700; margin-top:.4rem;">${q.title}</h2>
        <div>${q.options.map((opt,i) => `<button class="quote-answer-btn" data-qkey="${q.key}" data-idx="${i}">${opt.label}</button>`).join('')}</div>`;
    }

    else if(state.step === 'quote'){
      const pct = Math.round((1-Math.min(totalDeduction(),0.85))*100);
      const value = estimatedValue();
      body = `
        <div style="text-align:center;">
          <div class="ring-wrap">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(var(--line))" stroke-width="8"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(var(--accent))" stroke-width="8" stroke-linecap="round" stroke-dasharray="${2*Math.PI*42}" stroke-dashoffset="${2*Math.PI*42*(1-pct/100)}" transform="rotate(-90 50 50)"/>
            </svg>
            <div class="ring-label"><span class="num">${pct}%</span><span class="unit">condition score</span></div>
          </div>
          <p style="margin-top:1.25rem; font-size:.88rem; font-weight:600; color:rgb(var(--ink-soft));">Your estimated ${goal==='trade-in'?'trade-in credit':'cash offer'}</p>
          <p style="font-size:2.4rem; font-weight:800; margin-top:.25rem;">${fmtZAR(value)}</p>
          <p style="max-width:24rem; margin:.75rem auto 0; font-size:.85rem; color:rgb(var(--ink-faint));">For your ${state.model.model}. This quote is honoured as long as the device matches what you told us — final confirmation happens after inspection.</p>
          <button class="btn btn-primary btn-lg btn-block" id="lockQuoteBtn" style="margin-top:2rem;">${goal==='trade-in' ? 'Lock in my trade-in credit' : 'Get paid for my device'}</button>
        </div>`;
    }

    else if(state.step === 'contact'){
      const escapeHTML = str => String(str || '').replace(/[&"'<>]/g, c => ({'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'})[c]);
      const errorMessage = state.submissionError ? `<div role="alert" tabindex="-1" data-quote-status style="margin-top:.75rem; color:rgb(var(--caution)); font-weight:700;">${escapeHTML(state.submissionError)}</div>` : '';
      body = `
        <h2 style="font-size:1.3rem; font-weight:700;">Almost done</h2>
        <p style="margin-top:.25rem; font-size:.85rem; color:rgb(var(--ink-soft));">We'll send your free courier bag or drop-off details.</p>
        ${errorMessage}
        <form id="quoteContactForm" style="margin-top:1.5rem;">
          <div class="field"><label for="qf-name">Full name</label><input id="qf-name" required value="${escapeHTML(state.contact.name)}"></div>
          <div class="field"><label for="qf-email">Email</label><input id="qf-email" type="email" required value="${escapeHTML(state.contact.email)}"></div>
          <div class="field"><label for="qf-phone">Phone number</label><input id="qf-phone" type="tel" required placeholder="082 000 0000" value="${escapeHTML(state.contact.phone)}"></div>
          <div class="field" style="margin-bottom:0;"><label for="qf-notes">Anything else we should know <span class="optional">(optional)</span></label><textarea id="qf-notes" rows="3">${escapeHTML(state.contact.notes)}</textarea></div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" style="margin-top:1.5rem;">Confirm my ${fmtZAR(estimatedValue())} quote</button>
        </form>`;
    }

    else if(state.step === 'done'){
      body = `
        <div style="text-align:center;">
          <div style="width:64px; height:64px; border-radius:999px; background:rgb(var(--positive)/.12); color:rgb(var(--positive)); display:flex; align-items:center; justify-content:center; margin:0 auto;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div role="status" tabindex="-1" data-quote-status>
            <h2 style="font-size:1.5rem; font-weight:800; margin-top:1.25rem;">Quote confirmed</h2>
            <p style="max-width:24rem; margin:.5rem auto 0; font-size:.9rem; color:rgb(var(--ink-soft));">We've emailed ${escapeHTML(state.contact.email || 'you')} your prepaid courier details for your ${escapeHTML(state.model.model)}. Your ${fmtZAR(estimatedValue())} ${goal==='trade-in'?'credit':'payout'} is reserved for 14 days.</p>
          </div>
        </div>`;
    }

    container.innerHTML = `
      <div class="card quote-card">
        ${state.step!=='done' ? `<div class="quote-progress"><div class="quote-progress-fill" style="width:${progress()}%"></div></div>` : ''}
        ${idx>0 && state.step!=='done' ? `<button class="quote-back" id="quoteBackBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Back</button>` : ''}
        <div style="margin-top:${idx>0 && state.step!=='done' ? '1rem' : (state.step!=='done' ? '0' : '0')};">${body}</div>
      </div>`;

    bindEvents();
    const statusEl = container.querySelector('[data-quote-status]');
    if(statusEl) statusEl.focus();
  }

  function bindEvents(){
    const back = document.getElementById('quoteBackBtn');
    if(back) back.addEventListener('click', goBack);

    container.querySelectorAll('.quote-cat-btn').forEach(btn => btn.addEventListener('click', function(){
      state.category = this.dataset.cat; state.step = 'model'; render();
    }));

    container.querySelectorAll('.quote-model-btn').forEach(btn => btn.addEventListener('click', function(){
      state.model = JSON.parse(this.dataset.model.replace(/&apos;/g,"'")); state.step = 0; render();
    }));

    container.querySelectorAll('.quote-answer-btn').forEach(btn => btn.addEventListener('click', function(){
      const q = QUOTE_QUESTIONS.find(q => q.key === this.dataset.qkey);
      const opt = q.options[Number(this.dataset.idx)];
      state.answers[q.key] = opt;
      const next = (typeof state.step === 'number' ? state.step : 0) + 1;
      state.step = next < QUOTE_QUESTIONS.length ? next : 'quote';
      render();
    }));

    const lockBtn = document.getElementById('lockQuoteBtn');
    if(lockBtn) lockBtn.addEventListener('click', () => { state.step = 'contact'; render(); });

    const form = document.getElementById('quoteContactForm');
    if(form) form.addEventListener('submit', async function(e){
      e.preventDefault();
      state.contact = {
        name: document.getElementById('qf-name').value,
        email: document.getElementById('qf-email').value,
        phone: document.getElementById('qf-phone').value,
        notes: document.getElementById('qf-notes').value,
      };
      state.submissionError = null;
      const payload = {
        goal,
        model: state.model,
        answers: state.answers,
        contact: state.contact,
        estimatedValue: estimatedValue(),
      };
      const result = await submitQuote(payload);
      if(result.success){
        state.step = 'done';
      } else {
        state.submissionError = result.message || 'Unable to submit your quote right now. Please try again.';
      }
      render();
    });
  }

  async function submitQuote(payload){
    // Demo-only submission path. Replace this with a real API call for production.
    return new Promise(resolve => {
      setTimeout(() => resolve({ success: false, demo: true, message: 'Demo only: quote was not submitted.' }), 250);
    });
  }

  render();
}
