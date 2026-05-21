const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

const app  = express();
const PORT = Number(process.env.PORT) || 3000;

// ── Config (change these before going live) ──────────────────────────
const DASHBOARD_USER     = process.env.DASHBOARD_USER     || 'admin';
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'embriture2025';
const API_SECRET         = process.env.API_SECRET         || 'emb-api-key-2025';
// ─────────────────────────────────────────────────────────────────────

const LEADS_FILE = path.join(__dirname, 'leads.json');

app.use(express.json());

// CORS — allow chatbot on any origin to submit leads
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── Storage helpers ───────────────────────────────────────────────────
function readLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); }
  catch { return []; }
}

function writeLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// ── Middleware: API key (for chatbot submissions) ─────────────────────
function requireApiKey(req, res, next) {
  if (req.headers['x-api-key'] !== API_SECRET) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
}

// ── Middleware: Basic Auth (for dashboard & lead reads) ───────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="eMBriture Dashboard"');
    return res.status(401).send('Login required');
  }
  const decoded = Buffer.from(authHeader.slice(6), 'base64').toString();
  const [user, pass] = decoded.split(':');
  if (user !== DASHBOARD_USER || pass !== DASHBOARD_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="eMBriture Dashboard"');
    return res.status(401).send('Incorrect credentials');
  }
  next();
}

// ── Routes ────────────────────────────────────────────────────────────

// POST /api/leads  — chatbot submits a new lead
app.post('/api/leads', requireApiKey, (req, res) => {
  const { name, role, level, subject, subjectRaw, countries, budget, ielts, phone, email, meetingPref, referralCode } = req.body;

  if (!name) return res.status(400).json({ error: 'name is required' });

  const leads = readLeads();

  // Deduplicate: same name within the last 15 minutes → update instead of insert
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const dupIdx = leads.findIndex(l =>
    l.name && l.name.toLowerCase() === name.toLowerCase() && l.createdAt > cutoff
  );
  if (dupIdx !== -1) {
    // Merge any new info into the existing lead
    const dup = leads[dupIdx];
    if (phone)       dup.phone       = phone;
    if (email)       dup.email       = email;
    if (meetingPref) dup.meetingPref = meetingPref;
    if (referralCode) dup.referralCode = referralCode;
    dup.updatedAt = new Date().toISOString();
    writeLeads(leads);
    console.log(`[${new Date().toLocaleTimeString()}] Duplicate merged: ${name}`);
    return res.json({ success: true, id: dup.id, duplicate: true });
  }

  const lead = {
    id:          crypto.randomUUID(),
    createdAt:   new Date().toISOString(),
    status:      'new',
    notes:       '',
    name,
    role:        role        || null,
    level:       level       || null,
    subject:     subjectRaw  || subject || null,
    countries:   Array.isArray(countries) ? countries : [],
    budget:      budget      || null,
    ielts:       ielts       !== undefined ? ielts : null,
    phone:       phone       || null,
    email:       email       || null,
    meetingPref: meetingPref || null,
    referralCode: referralCode || null,
  };

  leads.unshift(lead);
  writeLeads(leads);

  console.log(`[${new Date().toLocaleTimeString()}] New lead: ${lead.name} (${lead.role || 'unknown role'})`);
  res.json({ success: true, id: lead.id });
});

// GET /api/leads  — dashboard fetches all leads (with optional filters)
app.get('/api/leads', requireAuth, (req, res) => {
  let leads = readLeads();
  const { status, role, country, budget, q } = req.query;

  if (status)  leads = leads.filter(l => l.status === status);
  if (role)    leads = leads.filter(l => l.role === role);
  if (budget)  leads = leads.filter(l => l.budget === budget);
  if (country) leads = leads.filter(l => l.countries.includes(country));
  if (q) {
    const qlo = q.toLowerCase();
    leads = leads.filter(l =>
      (l.name    || '').toLowerCase().includes(qlo) ||
      (l.subject || '').toLowerCase().includes(qlo)
    );
  }

  res.json(leads);
});

// PATCH /api/leads/:id  — update status or notes
app.patch('/api/leads/:id', requireAuth, (req, res) => {
  const leads = readLeads();
  const idx   = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });

  const allowed = ['status', 'notes', 'counsellorName', 'callDate', 'phone', 'email', 'meetingPref', 'referralCode'];
  allowed.forEach(k => { if (req.body[k] !== undefined) leads[idx][k] = req.body[k]; });
  leads[idx].updatedAt = new Date().toISOString();

  writeLeads(leads);
  res.json(leads[idx]);
});

// DELETE /api/leads/:id
app.delete('/api/leads/:id', requireAuth, (req, res) => {
  let leads = readLeads();
  const before = leads.length;
  leads = leads.filter(l => l.id !== req.params.id);
  if (leads.length === before) return res.status(404).json({ error: 'Lead not found' });
  writeLeads(leads);
  res.json({ success: true });
});

// GET /dashboard/logout — logout and clear credentials
app.get('/dashboard/logout', (req, res) => {
  res.set('WWW-Authenticate', 'Basic realm="eMBriture Dashboard"');
  res.status(401).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Logged Out</title>
      <script>
        window.location.href = "/";
      </script>
    </head>
    <body>
      <p>Logged out successfully. Redirecting to <a href="/">Home</a>...</p>
    </body>
    </html>
  `);
});

// GET /dashboard  — serve the dashboard HTML
app.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// GET /  — serve the main site
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────
function startServer(preferredPort) {
  const server = app.listen(preferredPort, () => {
    console.log('');
    console.log('  eMBriture server started');
    console.log(`  Site:      http://localhost:${preferredPort}`);
    console.log(`  Dashboard: http://localhost:${preferredPort}/dashboard`);
    console.log(`  User: ${DASHBOARD_USER}  |  Password: ${DASHBOARD_PASSWORD}`);
    console.log('');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = preferredPort + 1;
      console.warn(`Port ${preferredPort} is in use. Retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }
    throw err;
  });
}

startServer(PORT);
