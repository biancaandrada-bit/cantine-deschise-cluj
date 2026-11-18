'use strict';
const templates = {
  primarie: {
    email: 'registratura@primariaclujnapoca.ro',
    note: 'În atenția primarului Emil Boc, Consiliului Local și compartimentelor competente. Solicităm înregistrarea și repartizarea mesajului.',
    subject: 'Solicitare: păstrarea accesului la mese accesibile în cantinele municipale',
    body: `Stimate domnule primar, stimați membri ai Consiliului Local,

Vă scriu în legătură cu relatările din 17–18 noiembrie 2026 privind posibila restrângere, din ianuarie 2027, a accesului publicului larg la Memo 10, Emile Zola și Hoia.

Am luat act și de precizările lui Emil Boc, publicate în presă la 18 noiembrie, potrivit cărora nu a fost adoptată o decizie de închidere a Memo 10, iar activitatea va continua după 1 ianuarie 2027. Vă rog să confirmați explicit dacă acest lucru înseamnă păstrarea accesului publicului larg și să clarificați separat situația Emile Zola și Hoia.

Consider că accesul la o masă caldă la un preț accesibil merită protejat. Vă solicit să analizați și să prezentați public soluțiile legale prin care acest serviciu poate continua pentru publicul larg, fără afectarea sprijinului pentru persoanele vulnerabile și a hranei pentru școli.

Vă rog să clarificați:
1. Există o decizie adoptată? Care sunt numărul, data, autoritatea emitentă și efectele pentru fiecare locație?
2. Ce anume a solicitat Consiliul Concurenței? Vă rog să publicați documentele relevante, cu anonimizarea informațiilor protejate, și temeiul concret invocat.
3. Ce alternative de organizare și finanțare au fost evaluate pentru păstrarea accesului publicului? Care este impactul estimat asupra utilizatorilor?
4. Veți organiza o consultare publică și veți prezenta un calendar al soluției înaintea oricărei restrângeri a accesului?

Solicit păstrarea accesului în condițiile permise de lege până la clarificarea situației și identificarea unei soluții. Vă rog să comunicați explicit regimul de funcționare și categoriile de beneficiari prevăzute pentru 2027.

Vă rog să înregistrați mesajul, să îl înaintați compartimentelor competente și să îmi comunicați numărul de înregistrare și răspunsul prin email.`
  },
  concurenta: {
    email: 'office@consiliulconcurentei.ro',
    note: 'Solicitare de clarificare către instituție. Alternativ, folosește formularele de solicitări din portalul oficial, indicat în surse.',
    subject: 'Clarificări privind cantinele municipale Cluj-Napoca: Memo 10, Emile Zola, Hoia',
    body: `Stimați reprezentanți ai Consiliului Concurenței,

Vă solicit clarificări privind relatările din 17–18 noiembrie 2026 care atribuie instituției dumneavoastră solicitări ce ar conduce la restrângerea accesului publicului larg la cantinele municipale din Cluj-Napoca: Memo 10, Emile Zola și Hoia.

Vă rog să precizați:
1. A fost emisă o decizie, recomandare sau altă adresă referitoare la aceste unități? Care sunt numărul, data și natura juridică a documentului?
2. S-a solicitat expres oprirea servirii publicului larg sau remedierea unor condiții de finanțare ori funcționare? Care sunt măsurile și termenele efectiv cerute?
3. Care sunt prevederile legale invocate și problemele concrete identificate?
4. Vă rog să comunicați documentele publice relevante sau versiunile neconfidențiale, precum și stadiul procedurii.
5. Ce condiții trebuie îndeplinite, în limitele competenței instituției, pentru ca municipalitatea să poată menține accesul publicului la mese accesibile?

Susțin identificarea unei soluții care să respecte regulile de concurență și să păstreze accesul oamenilor la hrană accesibilă. Solicit clarificarea faptelor și a opțiunilor existente.

Vă rog să îmi comunicați numărul de înregistrare și răspunsul prin email. Dacă această solicitare trebuie adresată unui alt compartiment sau transmisă printr-un formular dedicat, vă rog să mă îndrumați.`
  },
  cantina: {
    email: 'cantinacluj@cantinacluj.ro',
    note: 'În atenția conducerii Cantinei de Ajutor Social și Pensiune. Director indicat pe site-ul Primăriei: Vișan Vasile-Gheorghe.',
    subject: 'Solicitare de informații: accesul publicului la Memo 10, Emile Zola și Hoia în 2027',
    body: `Stimate domnule director, stimați reprezentanți ai Cantinei de Ajutor Social și Pensiune,

În urma relatărilor din 17–18 noiembrie 2026 despre o posibilă modificare a activității Memo 10, Emile Zola și Hoia, vă rog să comunicați situația concretă pentru fiecare locație.

Precizarea publică privind continuarea activității Memo 10 după 1 ianuarie 2027 este binevenită; vă rog să confirmați dacă include păstrarea accesului publicului larg.

Vă rog să precizați:
1. Care este programul actual și ce modificări sunt confirmate pentru 2027 în privința accesului publicului larg?
2. Ce act sau instrucțiune stă la baza eventualelor modificări și de la ce dată se aplică?
3. Ce servicii vor continua pentru publicul larg, persoanele vulnerabile și unitățile de învățământ? Care vor fi condițiile de acces?
4. Ce alternative de mese accesibile și ce măsuri de continuitate au fost propuse municipalității?
5. Unde va fi publicat anunțul oficial pentru utilizatori?

Vă solicit să susțineți identificarea unei soluții legale pentru păstrarea accesului publicului la mese accesibile, alături de protejarea serviciilor sociale existente.

Vă rog să îmi comunicați numărul de înregistrare și răspunsul prin email și să înaintați întrebările care vă depășesc competența instituției responsabile.`
  }
};
// Unele servicii (ex. Yahoo) afișează greșit diacriticele în linkurile mailto.
const plain = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u2013\u2014]/g, '-').replace(/[\u201e\u201c\u201d]/g, '"');
Object.values(templates).forEach(t => { t.subject = plain(t.subject); t.body = plain(t.body); });
const byId = id => document.getElementById(id);
const drafts = {};
let current = 'primarie';
function render() {
  const target = templates[current];
  byId('recipient').textContent = target.email;
  byId('recipient-note').textContent = target.note;
  byId('subject').value = drafts[current]?.subject ?? target.subject;
  byId('body').value = drafts[current]?.body ?? target.body;
  byId('status').textContent = '';
}
document.querySelectorAll('input[name="target"]').forEach(input => input.addEventListener('change', () => {
  drafts[current] = {subject: byId('subject').value, body: byId('body').value};
  current = input.value;
  render();
}));
byId('name').addEventListener('input', () => { byId('name').setCustomValidity(''); byId('signature').textContent = byId('name').value.trim() || '[numele tău]'; });
byId('reset').addEventListener('click', () => {
  if ((byId('body').value !== templates[current].body || byId('subject').value !== templates[current].subject) && !window.confirm('Înlocuiești modificările tale cu modelul inițial pentru această instituție?')) return;
  delete drafts[current]; render();
});
function message() { return plain(byId('body').value.trim() + '\n\nCu respect,\n' + byId('name').value.trim()); }
function subject() { return plain(byId('subject').value); }
function valid() {
  byId('name').setCustomValidity(byId('name').value.trim() ? '' : 'Completează numele tău.');
  return byId('form').reportValidity();
}
byId('form').addEventListener('submit', event => {
  event.preventDefault(); if (!valid()) return;
  window.location.href = 'mailto:' + templates[current].email + '?subject=' + encodeURIComponent(subject()) + '&body=' + encodeURIComponent(message());
  byId('status').textContent = 'Am cerut deschiderea aplicației de email. Mesajul nu este trimis automat. Dacă nu se deschide, folosește Gmail sau copiază mesajul.';
});
byId('gmail').addEventListener('click', () => {
  if (!valid()) return;
  const query = new URLSearchParams({view:'cm',fs:'1',to:templates[current].email,su:subject(),body:message()});
  window.open('https://mail.google.com/mail/?' + query.toString(), '_blank', 'noopener,noreferrer');
  byId('status').textContent = 'Verifică ciorna în Gmail și confirmă tu trimiterea. Dacă nu se deschide o filă, copiază mesajul.';
});
byId('copy').addEventListener('click', async () => {
  if (!valid()) return;
  const text = 'Catre: ' + templates[current].email + '\nSubiect: ' + subject() + '\n\n' + message();
  try { await navigator.clipboard.writeText(text); byId('status').textContent = 'Destinatarul, subiectul și mesajul au fost copiate. Le poți lipi în emailul tău.'; }
  catch { const field = document.createElement('textarea'); field.value = text; field.readOnly = true; field.setAttribute('aria-label','Mesaj pentru copiere manuală'); byId('status').replaceChildren(document.createTextNode('Copierea automată nu este disponibilă. Selectează și copiază textul de mai jos.'), field); field.select(); }
});
render();
byId('share-link').addEventListener('click', async () => {
  const url = 'https://biancaandrada-bit.github.io/cantine-deschise-cluj/';
  try { await navigator.clipboard.writeText(url); byId('share-status').textContent = 'Linkul a fost copiat.'; }
  catch { byId('share-status').textContent = url; }
});
