// Part 2 — destinations, services, audiences, insights, legal
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.embriture.org';
const PHONE = '+971 543 953 695';
const EMAIL = 'info@embriture.org';

function head(t, desc, canonical, extraLd = '', kw = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#16213d">
<title>${t}</title>
<meta name="description" content="${desc}">
${kw ? `<meta name="keywords" content="${kw}">` : ''}
<meta name="author" content="eMBriture FZC">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/logo.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${desc}">
<link rel="icon" type="image/svg+xml" href="/assets/logo.svg">
<link rel="apple-touch-icon" href="/assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
${extraLd}
</head>`;
}

const NAV = `<body>
<div id="cur"></div><div id="ring"></div>
<div class="anc">✦  Trusted by 600+ families across UAE, India &amp; GCC  ·  <b>Free 30-min consultation</b>  ·  <a href="/contact.html">Book now →</a></div>
<nav class="site-nav" id="main-nav">
  <a href="/" class="n-logo"><img src="/assets/logo.svg" alt="eMBriture logo" width="38" height="42"><span class="n-brand">e<b>MB</b>riture<small>Empowerment · Brighter Future</small></span></a>
  <ul class="n-links">
    <li><a href="/about.html">About</a></li>
    <li class="has-drop"><a href="/services.html">Services</a><ul class="dropdown"><li><a href="/services/admissions.html">Admissions Mentorship</a></li><li><a href="/services/career-counselling.html">Career Counselling</a></li><li><a href="/services/scholarships.html">Scholarships &amp; Aid</a></li><li><a href="/services/visa-support.html">Visa &amp; Pre-departure</a></li><li><a href="/services/phd-mentorship.html">PhD Mentorship</a></li><li><a href="/services/test-prep.html">Test Preparation</a></li></ul></li>
    <li class="has-drop"><a href="/destinations.html">Destinations</a><ul class="dropdown"><li><a href="/destinations/uk.html">United Kingdom</a></li><li><a href="/destinations/usa.html">United States</a></li><li><a href="/destinations/canada.html">Canada</a></li><li><a href="/destinations/australia.html">Australia</a></li><li><a href="/destinations/uae.html">UAE</a></li><li><a href="/destinations/malaysia.html">Malaysia</a></li><li><a href="/destinations/singapore.html">Singapore</a></li></ul></li>
    <li class="has-drop"><a href="/for-students.html">For You</a><ul class="dropdown"><li><a href="/for-students.html">For Students</a></li><li><a href="/for-parents.html">For Parents</a></li><li><a href="/for-professionals.html">For Professionals</a></li></ul></li>
    <li><a href="/insights.html">Insights</a></li>
    <li><a href="/faq.html">FAQs</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
  <a href="/#hero" class="n-cta" onclick="scrollToChat();return false">Free Consultation →</a>
  <button class="ham" id="nav-burger" aria-label="Open menu">☰</button>
</nav>
<div class="drawer" id="nav-drawer">
  <button class="drawer-close" aria-label="Close menu" onclick="document.getElementById('nav-drawer').classList.remove('open');document.getElementById('nav-burger').classList.remove('open');document.body.classList.remove('drawer-open')">✕</button>
  <div class="drawer-links"><a href="/">Home</a><a href="/about.html">About</a><a href="/approach.html">Our Approach</a><a href="/services.html">Services</a><a href="/destinations.html">Destinations</a><a href="/team.html">Team</a><a href="/insights.html">Insights</a><a href="/faq.html">FAQs</a><a href="/contact.html">Contact</a></div>
</div>
<button id="float-chat" onclick="scrollToChat()" title="Chat with AI Education Advisor" aria-label="Chat with AI Education Advisor">🎓</button>`;

const FOOTER = `<footer class="site-footer"><div class="f-inner"><div class="f-grid">
<div class="f-col f-brand"><a href="/" class="n-logo" style="margin-bottom:18px"><img src="/assets/logo.svg" alt="" width="38" height="42"><span class="n-brand">e<b>MB</b>riture</span></a><p>Independent global education consultants empowering students, parents and professionals to architect careers across seven countries.</p><address>Block B-B07-98, SRTIP<br>University City, Sharjah, UAE</address><p><a href="tel:+971543953695">${PHONE}</a><br><a href="mailto:${EMAIL}">${EMAIL}</a></p></div>
<div class="f-col"><h4>Services</h4><a href="/services/admissions.html">Admissions Mentorship</a><a href="/services/career-counselling.html">Career Counselling</a><a href="/services/scholarships.html">Scholarships &amp; Aid</a><a href="/services/visa-support.html">Visa Support</a><a href="/services/phd-mentorship.html">PhD Mentorship</a><a href="/services/test-prep.html">Test Preparation</a></div>
<div class="f-col"><h4>Destinations</h4><a href="/destinations/uk.html">United Kingdom</a><a href="/destinations/usa.html">United States</a><a href="/destinations/canada.html">Canada</a><a href="/destinations/australia.html">Australia</a><a href="/destinations/uae.html">UAE</a><a href="/destinations/malaysia.html">Malaysia</a><a href="/destinations/singapore.html">Singapore</a></div>
<div class="f-col f-newsletter"><h4>Monthly Insights</h4><p>New scholarships, application deadlines and admissions updates — once a month.</p><form class="nl-row" onsubmit="return subscribeNewsletter(event)"><input type="email" placeholder="you@example.com" required aria-label="Email"><button type="submit" aria-label="Subscribe">→</button></form></div></div>
<div class="f-bottom"><p>© 2025–2026 eMBriture FZC · Sharjah, UAE · All rights reserved.</p><div class="f-legal"><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/refunds.html">Refunds</a><a href="/dashboard">Team Login</a></div></div></div></footer>
<script src="/assets/js/site.js" defer></script></body></html>`;

function heroBlock(crumbs, tag, title, sub, ctas='') {
  const crumbsHtml = crumbs.map((c,i)=>i===crumbs.length-1?`<span>${c.t}</span>`:`<a href="${c.h}">${c.t}</a><span>/</span>`).join('');
  return `<section class="page-hero"><div class="ph-inner"><nav class="breadcrumbs" aria-label="Breadcrumb">${crumbsHtml}</nav><span class="ph-tag">${tag}</span><h1 class="ph-title">${title}</h1><p class="ph-sub">${sub}</p>${ctas?`<div class="ph-ctas">${ctas}</div>`:''}</div></section>`;
}

function page(file, title, desc, bodyHtml, extraLd='', kw='') {
  const canonical = SITE + '/' + file.replace(/^\.\//,'').replace(/\\/g,'/');
  const html = head(title, desc, canonical, extraLd, kw) + NAV + bodyHtml + FOOTER;
  const full = path.join(__dirname, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  console.log('✓', file);
}

const ctaBlock = (text='Ready to plan your journey?', sub='Book a free 30-minute consultation and we\'ll map the right universities, scholarships and timelines for you.') => `
<section class="section narrow" style="text-align:center"><div class="reveal"><h2 class="s-title">${text}</h2><p class="s-sub" style="margin:14px auto 28px">${sub}</p><div class="ph-ctas" style="justify-content:center"><a href="/contact.html" class="btn-p">Book free consultation →</a><a href="https://wa.me/971543953695" class="btn-g">WhatsApp us</a></div></div></section>`;

// ═══════════════════════════════════════════════════════════════
// DESTINATION PAGES — 7 countries
// ═══════════════════════════════════════════════════════════════

function destinationPage(opts) {
  const { slug, flag, country, title, desc, kw, intro, snapshot, unis, process, visa, scholarships, living, faqs } = opts;
  const uniRows = unis.map(u => `<tr><td><strong>${u.name}</strong><br><span style="color:var(--muted);font-size:12px">QS #${u.qs}${u.city?' · '+u.city:''}</span></td><td>${u.ug||'—'}</td><td>${u.pg||'—'}</td><td>${u.ielts||'—'}</td><td>${u.scholar||'—'}</td></tr>`).join('');
  const processSteps = process.map(p => `<div><h4>${p.t}</h4><p>${p.p}</p></div>`).join('');
  const faqsHtml = faqs.map(f => `<div class="faq-item reveal"><button class="faq-q">${f.q}<span>+</span></button><div class="faq-a">${f.a}</div></div>`).join('');
  const body = heroBlock(
    [{t:'Home',h:'/'},{t:'Destinations',h:'/destinations.html'},{t:country}],
    `${flag}  ${country}`,
    title,
    intro,
    '<a href="/contact.html" class="btn-p">Book free consultation →</a><a href="#universities" class="btn-g">Jump to universities</a>'
  ) + `
<section class="stats-strip reveal">${snapshot.map(s => `<div><strong>${s.v}</strong><span>${s.l}</span></div>`).join('')}</section>
<section class="section" id="universities">
  <div class="reveal"><span class="s-tag">Top partner universities</span><h2 class="s-title">Where ${country} <em>sends its best</em>.</h2><p class="s-sub">Tuition bands and IELTS requirements below are indicative for 2026 entry. Scholarship details are typical starting points — we identify dozens more for each applicant.</p></div>
  <div class="uni-table-wrap reveal"><table class="uni-table"><thead><tr><th>University</th><th>UG tuition</th><th>PG tuition</th><th>IELTS</th><th>Scholarships</th></tr></thead><tbody>${uniRows}</tbody></table></div>
</section>
<section class="section"><div class="reveal" style="max-width:780px"><span class="s-tag">Application process</span><h2 class="s-title">Your path to ${country}, <em>in six moves</em>.</h2></div>
<div class="process-list reveal">${processSteps}</div></section>
<section class="section"><div class="two-col reveal">
  <div><span class="s-tag">Visa &amp; post-study work</span><h2 class="s-title">The <em>${country}</em> visa route in plain English.</h2></div>
  <div class="two-col-body">${visa.map(v => `<p><strong>${v.t}.</strong> ${v.p}</p>`).join('')}</div>
</div></section>
<section class="section"><div class="two-col reveal reverse">
  <div><span class="s-tag">Living &amp; costs</span><h2 class="s-title">What it actually <em>costs</em> to live here.</h2></div>
  <div class="two-col-body">${living.map(l => `<p><strong>${l.t}.</strong> ${l.p}</p>`).join('')}</div>
</div></section>
<section class="section"><div class="two-col reveal">
  <div><span class="s-tag">Scholarships &amp; funding</span><h2 class="s-title">The funded routes into <em>${country}</em>.</h2></div>
  <div class="two-col-body">${scholarships.map(s => `<p><strong>${s.t}.</strong> ${s.p}</p>`).join('')}</div>
</div></section>
<section class="section narrow"><div class="reveal" style="text-align:center;margin-bottom:36px"><span class="s-tag" style="justify-content:center">${country} FAQs</span><h2 class="s-title">Questions families ask <em>first</em>.</h2></div>
<div class="faq-list">${faqsHtml}</div></section>
` + ctaBlock(`Ready to plan your move to ${country}?`, 'Book a free 30-minute consultation and we\'ll design a shortlist, scholarship outlook and visa timeline specific to your profile.');
  const canonical = `${SITE}/destinations/${slug}.html`;
  const ld = `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Place","name":`Study in ${country}`,"url":canonical,"image":`${SITE}/assets/logo.svg`})}</script>`;
  page(`destinations/${slug}.html`, title, desc, body, ld, kw);
}

destinationPage({
  slug:'uk', flag:'🇬🇧', country:'United Kingdom',
  title:'Study in the UK | eMBriture — Oxford, Cambridge, Imperial, UCL, Edinburgh',
  desc:'Complete 2026 guide to studying in the United Kingdom from the UAE. Top universities, UCAS timeline, tuition and living costs, Graduate Route visa, Chevening and Clarendon scholarships.',
  kw:'study in UK from UAE, UCAS 2026, UK admissions consultant Sharjah, UK scholarships UAE students, Graduate Route visa, Oxford Cambridge admissions Dubai',
  intro:'From three-year undergraduates at Oxbridge to one-year Master\'s at Imperial and the Graduate Route visa, the UK remains the single deepest bench of world-class education for UAE students.',
  snapshot:[{v:'4',l:'QS Top-10 universities'},{v:'70+',l:'QS Top-100 programmes'},{v:'2–3 yrs',l:'Graduate Route visa'},{v:'£22k+',l:'Average UG tuition'},{v:'Sept / Jan',l:'Intakes'}],
  unis:[
    {name:'University of Oxford',qs:3,city:'Oxford',ug:'£35,260–£59,260',pg:'£27,000–£40,000',ielts:'7.0–7.5',scholar:'Clarendon, Rhodes, Reach Oxford'},
    {name:'University of Cambridge',qs:2,city:'Cambridge',ug:'£24,507–£63,990',pg:'£25,000–£45,000',ielts:'7.5',scholar:'Gates Cambridge, Cambridge Trust'},
    {name:'Imperial College London',qs:8,city:'London',ug:'£35,100–£45,950',pg:'£19,000–£38,000',ielts:'6.5–7.0',scholar:'President\'s Scholarships, Schroder'},
    {name:'UCL',qs:9,city:'London',ug:'£24,600–£38,500',pg:'£19,000–£36,000',ielts:'6.5–7.5',scholar:'UCL Global, Denys Holland'},
    {name:'University of Edinburgh',qs:27,city:'Edinburgh',ug:'£24,800–£35,800',pg:'£19,000–£34,000',ielts:'6.5',scholar:'Global Research Scholarships'},
    {name:'King\'s College London',qs:40,city:'London',ug:'£23,000–£39,000',pg:'£20,000–£34,000',ielts:'7.0',scholar:'King\'s International Scholarships'},
    {name:'University of Manchester',qs:34,city:'Manchester',ug:'£23,000–£30,000',pg:'£18,000–£30,000',ielts:'6.5',scholar:'Humanitarian Scholarships'},
    {name:'University of Warwick',qs:69,city:'Coventry',ug:'£23,000–£33,000',pg:'£19,500–£28,000',ielts:'6.5',scholar:'Chancellor\'s International'},
  ],
  process:[
    {t:'Decide course &amp; university shortlist',p:'Shortlist 5 UCAS choices (UG) or 6–8 PG courses across stretch, fit and safety tiers. We start this in Year 11 or 12.'},
    {t:'Sit required tests',p:'IELTS / TOEFL for English; LNAT, UCAT, BMAT, TSA, MAT or STEP depending on subject. All prep through our test-prep cohorts.'},
    {t:'Write personal statement &amp; get references',p:'4,000-character personal statement through multiple senior-editor drafts. Two academic references for UG; three for most PG programmes.'},
    {t:'Submit UCAS or direct application',p:'UCAS deadline 29 January 2026 for most courses, 15 October for Oxbridge/medicine. PG applications rolling — apply early for scholarships.'},
    {t:'Interviews &amp; offers',p:'Oxbridge, medicine, some UCL programmes interview. Mock interviews with admissions alumni included in our packages.'},
    {t:'CAS &amp; Student Visa',p:'Once you accept, university issues CAS. Apply online, submit biometrics at VFS Dubai, pay IHS, attend collection. Typical processing: 15 working days.'},
  ],
  visa:[
    {t:'Student Visa (Tier 4)',p:'Granted on issue of CAS. Valid for duration of course + a few months. Work up to 20 hours/week in term-time, full-time in vacations.'},
    {t:'Graduate Route',p:'2 years of open work permission after Bachelor\'s or Master\'s (3 years after PhD). No sponsor needed, no salary threshold.'},
    {t:'Skilled Worker Visa',p:'After the Graduate Route, most students switch onto this with a sponsoring employer. Leads to ILR (settlement) after 5 years.'},
    {t:'Immigration Health Surcharge',p:'IHS is £776/year for students — paid up front as part of the visa application. Covers full NHS access.'},
  ],
  scholarships:[
    {t:'Clarendon (Oxford)',p:'Full tuition + stipend for outstanding Master\'s/DPhil applicants. Open to UAE nationals and residents.'},
    {t:'Gates Cambridge',p:'Full funding for outstanding applicants from outside the UK. Highly competitive, strong focus on leadership and impact.'},
    {t:'Rhodes Scholarship',p:'Full funding for Oxford postgraduate study. Open to UAE residents; global competition.'},
    {t:'Chevening',p:'Fully funded UK government scholarship for one-year Master\'s. UAE is on the Chevening country list. Strong essays are decisive.'},
    {t:'University-specific awards',p:'Imperial\'s President\'s Scholarships, Edinburgh Global, UCL Denys Holland, Warwick Chancellor\'s — dozens of partial and full awards. We map the full landscape for each applicant.'},
  ],
  living:[
    {t:'Monthly budget',p:'London £1,500–£2,200 all-in; other cities £1,000–£1,400. Rent is the biggest variable — university halls bundle bills, private rentals don\'t.'},
    {t:'Accommodation',p:'First-year UG is almost always in university halls (guaranteed). PG students choose between university halls and private student blocks (Urbanest, iQ, Unite).'},
    {t:'Banking',p:'Open a UK student account (Santander, HSBC, Monzo) once you arrive. Many can be opened online with your BRP and enrolment letter.'},
    {t:'Travel',p:'16–25 Railcard saves 33% on train fares. London students should get a 30-day student Oyster photocard.'},
  ],
  faqs:[
    {q:'What is the UCAS deadline for 2026 entry?',a:'29 January 2026 for most UK undergraduate courses, and 15 October 2025 for Oxford, Cambridge, medicine, dentistry and veterinary science applications. Late UCAS applications are accepted until 30 June but most universities prioritise on-time applicants.'},
    {q:'Do UAE students need IELTS for UK universities?',a:'Yes in most cases — typical requirement is IELTS 6.5–7.5 depending on the programme. Students from UAE who completed an English-medium CBSE/IB/A-level with sufficiently high English scores can sometimes waive IELTS, subject to the university\'s policy.'},
    {q:'How much does it cost to study in the UK for one year?',a:'Plan for £35,000–£55,000 all-in per year: £23,000–£40,000 tuition plus £12,000–£22,000 living. London and STEM/medicine sit at the top; regional universities and humanities near the bottom. Our cost models break this down per university.'},
    {q:'Is the Graduate Route visa still available?',a:'Yes. As of 2026, the Graduate Route remains in place — 2 years of open work permission after UG/PG, 3 years after PhD. No job offer or sponsor required to switch onto it.'},
    {q:'Can parents travel with their child?',a:'A parent cannot get a dependent visa on a student route for UG or taught PG courses. Parents can visit on standard Visitor Visas (up to 6 months at a time). PhD students can bring spouses and children as dependants.'},
  ],
});

destinationPage({
  slug:'usa', flag:'🇺🇸', country:'United States',
  title:'Study in the USA | eMBriture — MIT, Harvard, Stanford, Ivy + State',
  desc:'2026 guide to studying in the United States from the UAE. Ivy League admissions, Common App timeline, need-blind aid, F-1 + OPT + STEM-OPT and the real costs of US universities.',
  kw:'study in USA from UAE, Common App 2026, Ivy League admissions consultant Sharjah, STEM OPT, need-blind aid UAE students, Harvard MIT Stanford admissions',
  intro:'Four thousand institutions. Need-blind aid at the elite privates. The longest post-study-work runway of any major destination via OPT + STEM-OPT. The US rewards applicants who can show substance over polish.',
  snapshot:[{v:'5',l:'QS Top-10 universities'},{v:'150+',l:'QS Top-100 programmes'},{v:'1–3 yrs',l:'F-1 + OPT + STEM-OPT'},{v:'$30k+',l:'Average UG tuition'},{v:'Fall / Spring',l:'Intakes'}],
  unis:[
    {name:'MIT',qs:1,city:'Cambridge, MA',ug:'$57,986',pg:'$59,750',ielts:'varies',scholar:'Need-blind for intl (100% demonstrated need)'},
    {name:'Harvard University',qs:4,city:'Cambridge, MA',ug:'$59,076',pg:'$52,000–60,000',ielts:'varies',scholar:'Need-blind for intl (100% demonstrated need)'},
    {name:'Stanford University',qs:6,city:'Stanford, CA',ug:'$61,731',pg:'$56,000–77,000',ielts:'7.0',scholar:'Need-based aid for intl'},
    {name:'Princeton University',qs:17,city:'Princeton, NJ',ug:'$62,400',pg:'$59,000',ielts:'7.0',scholar:'Need-blind for intl'},
    {name:'Columbia University',qs:23,city:'New York, NY',ug:'$65,340',pg:'$50,000+',ielts:'7.0',scholar:'Need-based aid'},
    {name:'Yale University',qs:16,city:'New Haven, CT',ug:'$62,250',pg:'$48,000+',ielts:'7.0',scholar:'Need-blind for intl'},
    {name:'UC Berkeley',qs:12,city:'Berkeley, CA',ug:'$46,000',pg:'$32,000+',ielts:'6.5',scholar:'Merit + need-based'},
    {name:'Cornell University',qs:20,city:'Ithaca, NY',ug:'$66,000',pg:'$40,000+',ielts:'7.0',scholar:'Need-based for intl'},
  ],
  process:[
    {t:'Decide between Common App, Coalition App or direct',p:'Most top privates + many state schools accept Common App. Some accept Coalition or have their own portal. For PG, direct applications via graduate schools.'},
    {t:'Sit SAT/ACT (UG) or GRE/GMAT (PG)',p:'Test-optional is still widely in place in 2026, but strong scores remain a differentiator. Plus IELTS/TOEFL.'},
    {t:'Craft essays and recommendations',p:'Common App + supplemental essays (5–15 per school). Two teacher recs + counsellor rec. For PG, 2–3 academic/professional recs + SOP + research statement.'},
    {t:'Shortlist by aid policy, not just ranking',p:'US financial aid varies wildly by school. Need-blind for internationals is a narrow club (HYPSM + ~5 others). We shortlist around aid fit, not just brand.'},
    {t:'Apply Early Action / Early Decision',p:'Nov 1–15 deadlines for EA/ED. Regular Decision is Jan 1–15. ED is binding — we only recommend it for a clear first-choice with affordable aid fit.'},
    {t:'I-20 &amp; F-1 visa interview',p:'Once you accept, university issues I-20. Book F-1 visa interview at US Consulate Dubai. SEVIS fee, DS-160, visa fee. Plan 4–6 weeks for the full process.'},
  ],
  visa:[
    {t:'F-1 Student Visa',p:'Valid for duration of studies. On-campus work up to 20 hrs/week. CPT available from second year for internships.'},
    {t:'OPT (Optional Practical Training)',p:'12 months of open work permission after graduation — can be started during or after study. Any job in your field qualifies.'},
    {t:'STEM OPT extension',p:'Additional 24 months if your degree is on the STEM designated list. Total: 36 months of open work permission for STEM graduates. Employer must be E-Verify registered.'},
    {t:'H-1B lottery',p:'For long-term stay, most students apply for H-1B (sponsored work visa) during OPT. Lottery-based and competitive — which is why OPT matters so much.'},
  ],
  scholarships:[
    {t:'Need-blind institutions',p:'MIT, Harvard, Yale, Princeton, Amherst, Bowdoin, Dartmouth plus NYU Abu Dhabi treat internationals identically to US applicants for aid — they cover 100% of demonstrated need.'},
    {t:'Need-aware but generous',p:'Stanford, Columbia, Cornell, Duke, Brown, Johns Hopkins and many others offer significant need-based aid to internationals. Expected family contribution is calculated from CSS Profile.'},
    {t:'Merit scholarships',p:'Less common at Ivies; significant at public flagships and mid-ranked privates. USC Presidential, Vanderbilt Cornelius, Duke Robertson, WashU Danforth can cover full tuition.'},
    {t:'Graduate funding',p:'STEM PhDs are routinely fully funded (tuition + $28–40K stipend). Terminal Master\'s rarely funded — expect to pay sticker price or seek assistantships.'},
  ],
  living:[
    {t:'Monthly budget',p:'New York/Boston/SF $2,500–$4,000; mid-size cities $1,500–$2,500; college towns $1,200–$1,800. Rent dominates.'},
    {t:'Accommodation',p:'First-year UG usually in dorms. PG students split between university housing, off-campus shared apartments, and purpose-built student accommodation.'},
    {t:'Health insurance',p:'Mandatory — most universities offer a plan for $1,500–$3,500/year. Don\'t skip this: a single ER visit can run into five figures.'},
    {t:'Travel',p:'Public transport is good only in a handful of cities. In most, a used car ($3,000–$8,000) is practical after your first semester.'},
  ],
  faqs:[
    {q:'What is the Common App deadline for Fall 2026?',a:'Early Action / Early Decision deadlines are typically November 1–15 (2025). Regular Decision is January 1–15 (2026). Rolling admissions schools accept applications through spring. Graduate applications vary — top PhD programmes often close December 1–15.'},
    {q:'Do I need SAT/ACT for US undergrad applications in 2026?',a:'Many top US universities (including MIT and most Ivies) have returned to requiring SAT/ACT. Some remain test-optional. Even where optional, strong scores strengthen competitive applications — we recommend sitting at least one.'},
    {q:'Is the US affordable compared to the UK?',a:'Sticker price is higher, but need-based aid at elite privates can make the US cheaper than the UK for lower-income families. For middle-income families without aid, UK is usually cheaper; USA offers a longer post-study work runway.'},
    {q:'What is STEM OPT and why is it important?',a:'STEM OPT adds 24 months of work permission to the standard 12-month OPT if your degree is on the US STEM designated list. Computer science, engineering, data science, finance (increasingly), many sciences and even some business analytics degrees qualify. This 36-month window is what makes H-1B sponsorship feasible.'},
    {q:'Can I work in the US during studies?',a:'Yes. On-campus work up to 20 hours/week during term, full-time in vacations. Off-campus CPT available from second year for course-related internships. OPT unlocks full off-campus work after graduation.'},
  ],
});

destinationPage({
  slug:'canada', flag:'🇨🇦', country:'Canada',
  title:'Study in Canada | eMBriture — Toronto, UBC, McGill, Waterloo + PGWP',
  desc:'2026 guide to studying in Canada from the UAE. Top universities, 3-year PGWP post-study work, PR pathways via Express Entry, and honest math on Canadian tuition and living.',
  kw:'study in Canada from UAE, PGWP 2026, Canada PR after study, Toronto UBC McGill Waterloo admissions, Canada education consultant Sharjah',
  intro:'Three-year post-study work permits, clear PR pathways and a welcoming immigration stance other countries have quietly lost. Canada has become the default "affordable plus runway" choice for UAE families.',
  snapshot:[{v:'3',l:'QS Top-50 universities'},{v:'30+',l:'QS Top-100 programmes'},{v:'Up to 3 yrs',l:'PGWP post-study work'},{v:'CAD 30k+',l:'Average UG tuition'},{v:'Sept / Jan / May',l:'Intakes'}],
  unis:[
    {name:'University of Toronto',qs:25,city:'Toronto, ON',ug:'CAD 57,020–70,000',pg:'CAD 25,000–60,000',ielts:'6.5',scholar:'Lester B. Pearson (full funding UG)'},
    {name:'UBC',qs:46,city:'Vancouver, BC',ug:'CAD 38,000–55,000',pg:'CAD 22,000–45,000',ielts:'6.5',scholar:'International Major Entrance (up to CAD 40k)'},
    {name:'McGill University',qs:29,city:'Montreal, QC',ug:'CAD 35,000–65,000',pg:'CAD 20,000–40,000',ielts:'6.5',scholar:'McCall MacBain, Entrance Scholarships'},
    {name:'University of Waterloo',qs:112,city:'Waterloo, ON',ug:'CAD 46,000–72,000',pg:'CAD 16,000–42,000',ielts:'6.5',scholar:'President\'s Scholarships, IMEA'},
    {name:'McMaster University',qs:176,city:'Hamilton, ON',ug:'CAD 35,000–65,000',pg:'CAD 12,000–38,000',ielts:'6.5',scholar:'McMaster International'},
    {name:'University of Alberta',qs:93,city:'Edmonton, AB',ug:'CAD 30,000–45,000',pg:'CAD 10,000–30,000',ielts:'6.5',scholar:'International Leader Award'},
    {name:'Western University',qs:120,city:'London, ON',ug:'CAD 40,000–60,000',pg:'CAD 20,000–40,000',ielts:'6.5',scholar:'International President\'s Entrance'},
    {name:'Queen\'s University',qs:209,city:'Kingston, ON',ug:'CAD 55,000–65,000',pg:'CAD 20,000–40,000',ielts:'6.5',scholar:'Queen\'s Excellence, D.G. Sinclair'},
  ],
  process:[
    {t:'Shortlist universities and programmes',p:'Canada weighs academic grades and programme fit heavily. We build a mix of stretch (Toronto, McGill, UBC), fit (Waterloo, Western, McMaster, Queen\'s) and safety options.'},
    {t:'Take IELTS / TOEFL',p:'Most require IELTS 6.5 overall (no band below 6.0). Some French-language McGill programmes accept TEF/TEFAQ.'},
    {t:'Apply via OUAC (Ontario) or direct',p:'Ontario UG: OUAC by mid-January. Other provinces: direct to each university. PG: direct, deadlines from December (top schools) to March.'},
    {t:'SOP, LORs and portfolio',p:'Personal essays are shorter than US apps but carry weight. 2–3 academic/professional recommendations. Portfolio/research proposal for design &amp; PhD programmes.'},
    {t:'Receive offer + GIC + proof of funds',p:'Canadian study permits require a GIC (CAD 20,635 for 2026) plus proof of tuition paid or funds for first year.'},
    {t:'Study Permit application',p:'Online via IRCC. Biometrics at VFS Dubai. Typical processing: 6–10 weeks. SDS (Student Direct Stream) available to UAE students with qualifying profiles — processing as quick as 20 days.'},
  ],
  visa:[
    {t:'Study Permit',p:'Valid for duration of studies plus 90 days. Work up to 24 hours/week during studies (20 pre-2024 rule revised). Full-time in vacations.'},
    {t:'PGWP (Post-Graduation Work Permit)',p:'Open work permit for 1–3 years based on programme length. A 2-year Master\'s → 3-year PGWP; a 1-year Master\'s → 1-year PGWP. Only available for eligible PGWP-approved institutions.'},
    {t:'Express Entry &amp; PR',p:'After 1+ year of Canadian work experience, most graduates qualify for PR through Canadian Experience Class via Express Entry. Points for age, education, English, work experience — Master\'s adds significant points.'},
    {t:'Spouse Open Work Permit',p:'Spouses of Master\'s and PhD students get an open work permit. As of 2024, spouses of most UG students no longer qualify — check current rules before committing.'},
  ],
  scholarships:[
    {t:'Lester B. Pearson (UofT)',p:'Canada\'s flagship full-ride international UG scholarship. Covers tuition, books, residence, meals. Extremely competitive — principal nomination from school required.'},
    {t:'McCall MacBain (McGill)',p:'Full-funding Master\'s scholarship at McGill for applicants with leadership impact.'},
    {t:'Entrance Scholarships',p:'Virtually every Canadian university offers automatic entrance awards — CAD 5,000–30,000 — based on school grades. We identify the ones you qualify for and how to stack them.'},
    {t:'Vanier Canada Graduate Scholarships',p:'CAD 50,000/year for 3 years for doctoral students. Combined with university funding often covers the entire PhD.'},
  ],
  living:[
    {t:'Monthly budget',p:'Toronto/Vancouver CAD 1,800–2,800; Montreal/Ottawa CAD 1,400–2,000; smaller cities CAD 1,200–1,600.'},
    {t:'Accommodation',p:'First-year UG often in residence (CAD 11,000–15,000/year incl. meal plan). Off-campus shared apartments are the norm after year one.'},
    {t:'Healthcare',p:'Mandatory provincial or university-provided insurance. BC\'s MSP, Ontario\'s UHIP and Alberta\'s AHCIP cover the basics.'},
    {t:'Winter realities',p:'Winters are real. Budget CAD 400–800 for a proper winter jacket, boots and layers. Toronto and Vancouver are milder than the prairies.'},
  ],
  faqs:[
    {q:'What is the SDS (Student Direct Stream) and am I eligible?',a:'SDS is an accelerated study permit route for UAE residents who meet specific criteria: IELTS 6.0+ each band (or CAEL equivalent), tuition paid upfront for first year, GIC (CAD 20,635), and a letter of acceptance from a designated learning institution. Processing can be as quick as 20 calendar days.'},
    {q:'Is Canada still a good destination after recent rule changes?',a:'Yes, but with nuance. 2024 reforms capped total study permits, tightened PGWP eligibility to specific programmes, and ended spouse work permits for most UG programmes. Top universities and career-aligned programmes remain strong. We recalibrate shortlists against current rules in every consultation.'},
    {q:'Can I apply for PR while studying?',a:'You can prepare your Express Entry profile during studies, but you need Canadian work experience (typically 1 year of skilled work after graduation on PGWP) for the Canadian Experience Class. Some provinces have Provincial Nominee streams with faster paths.'},
    {q:'How much does it cost to study in Canada for one year?',a:'Plan CAD 45,000–70,000 all-in per year: CAD 30,000–55,000 tuition + CAD 15,000–25,000 living. UBC and Toronto programmes trend higher; McMaster, Alberta, Queen\'s PG programmes can be cheaper.'},
    {q:'Do I need to take IELTS or is UAE English school-leaver sufficient?',a:'Most Canadian universities require IELTS 6.5 regardless of school medium. A handful waive for CBSE English 12 grades above a threshold. Submit IELTS by default — it strengthens both admission and SDS eligibility.'},
  ],
});

destinationPage({
  slug:'australia', flag:'🇦🇺', country:'Australia',
  title:'Study in Australia | eMBriture — Melbourne, UNSW, ANU, Monash + 485 Visa',
  desc:'2026 guide to studying in Australia from the UAE. Group of Eight universities, subclass 485 post-study work visa, Feb/July intakes, tuition and scholarship landscape for UAE students.',
  kw:'study in Australia from UAE, Australia subclass 485 visa, Melbourne UNSW ANU Monash admissions, Australia education consultant Sharjah, Group of Eight scholarships',
  intro:'Two intakes a year, a lifestyle you can actually live in, and a Temporary Graduate visa (subclass 485) of 2 to 4 years — plus serious scholarship budgets at the Group of Eight.',
  snapshot:[{v:'5',l:'QS Top-50 universities'},{v:'50+',l:'QS Top-100 programmes'},{v:'2–4 yrs',l:'Subclass 485 visa'},{v:'AUD 35k+',l:'Average UG tuition'},{v:'Feb / July',l:'Intakes'}],
  unis:[
    {name:'University of Melbourne',qs:19,city:'Melbourne, VIC',ug:'AUD 37,312–75,696',pg:'AUD 20,992–112,000',ielts:'6.5–7.5',scholar:'Melbourne International Undergraduate (up to AUD 10k/yr)'},
    {name:'UNSW Sydney',qs:20,city:'Sydney, NSW',ug:'AUD 36,000–60,000',pg:'AUD 28,000–55,000',ielts:'6.5',scholar:'UNSW International Scholarships (10–25%)'},
    {name:'ANU',qs:30,city:'Canberra, ACT',ug:'AUD 40,000–55,000',pg:'AUD 35,000–55,000',ielts:'6.5',scholar:'ANU Chancellor\'s International (25%)'},
    {name:'University of Sydney',qs:18,city:'Sydney, NSW',ug:'AUD 50,000–66,000',pg:'AUD 44,000–60,000',ielts:'6.5–7.5',scholar:'Sydney International Student Award'},
    {name:'Monash University',qs:37,city:'Melbourne, VIC',ug:'AUD 34,000–52,000',pg:'AUD 31,000–55,000',ielts:'6.5',scholar:'Monash International Merit'},
    {name:'University of Queensland',qs:40,city:'Brisbane, QLD',ug:'AUD 36,000–55,000',pg:'AUD 30,000–50,000',ielts:'6.5',scholar:'UQ International High Achiever'},
    {name:'University of Western Australia',qs:87,city:'Perth, WA',ug:'AUD 35,000–50,000',pg:'AUD 30,000–45,000',ielts:'6.5',scholar:'UWA Global Excellence'},
    {name:'University of Adelaide',qs:82,city:'Adelaide, SA',ug:'AUD 35,000–50,000',pg:'AUD 30,000–50,000',ielts:'6.5',scholar:'Global Citizens Scholarship'},
  ],
  process:[
    {t:'Shortlist programmes and scholarships in parallel',p:'Australia publishes scholarship amounts up front — so we shortlist programmes and funding simultaneously, not sequentially.'},
    {t:'Take IELTS or PTE Academic',p:'IELTS 6.5 overall (no band below 6.0) is the common benchmark. PTE Academic is widely accepted and often quicker to score.'},
    {t:'Apply direct to universities',p:'Most Australian universities accept direct online applications. No central UCAS-equivalent. Deadlines are typically 2–3 months before each intake.'},
    {t:'Accept offer, pay deposit, get CoE',p:'Once you accept, university issues a Confirmation of Enrolment (CoE). Deposit is usually 1 semester\'s tuition.'},
    {t:'Subclass 500 Student Visa',p:'Apply online via ImmiAccount. Requires GTE statement, OSHC health cover, financial evidence, CoE. Typical processing: 4–8 weeks.'},
    {t:'Pre-departure &amp; arrival',p:'OSHC activation, accommodation, Medicare-equivalent cover, opening bank account (Commonwealth, ANZ, Westpac open student accounts online pre-arrival).'},
  ],
  visa:[
    {t:'Subclass 500 Student Visa',p:'Valid for duration of studies. Work up to 48 hours per fortnight during term, full-time in vacations. Family members can join as dependants.'},
    {t:'Subclass 485 (Temporary Graduate Visa)',p:'Post-Study Work stream: 2 years (Bachelor\'s/Master\'s by coursework), 3 years (Master\'s by research), 4 years (PhD). Extensions available for regional study.'},
    {t:'Skills in Demand Visa',p:'Replaced TSS in late 2024. Needs employer sponsorship and alignment to skills occupation list.'},
    {t:'Permanent Residency',p:'Skilled Independent (189), Skilled Nominated (190) and employer-sponsored 186 are main PR paths. Points-based — Australian study gives bonus points.'},
  ],
  scholarships:[
    {t:'Australia Awards',p:'Australia\'s flagship development scholarship for applicants from eligible countries (UAE not currently on the list; India is). Full tuition, living allowance, flights.'},
    {t:'Group of Eight university scholarships',p:'Melbourne Intl Undergraduate, UNSW Intl Scholarship, ANU Chancellor\'s, Sydney Intl Student Award — all offer partial tuition reductions of 10–50% for strong academic profiles.'},
    {t:'Research Training Program (RTP)',p:'Full PhD funding — tuition + stipend — at all Go8 universities. Competitive; apply via each university\'s graduate research office.'},
    {t:'Destination Australia',p:'AUD 15,000/year for students at regional campuses. Combines well with university scholarships to bring total cost significantly down.'},
  ],
  living:[
    {t:'Monthly budget',p:'Sydney/Melbourne AUD 1,800–2,700; Brisbane/Perth AUD 1,400–2,000; Adelaide/Canberra AUD 1,300–1,800.'},
    {t:'Accommodation',p:'University halls or purpose-built student housing (Urbanest, Scape, Iglu) — typically AUD 280–450/week. Shared apartments cheaper at AUD 180–320/week.'},
    {t:'Healthcare',p:'Overseas Student Health Cover (OSHC) is mandatory for the full duration of your visa. Typical cost AUD 550/year for singles.'},
    {t:'Transport',p:'Most cities are car-dependent once you\'re out of the centre. Melbourne and Sydney have usable public transport. Student concession varies by state (NSW is restrictive; Victoria is generous).'},
  ],
  faqs:[
    {q:'When are the Australian intakes?',a:'February (Semester 1) and July (Semester 2) are the main intakes. Some universities also offer a November/December Trimester 3. We plan backwards from your intended intake — typically 6–9 months of lead time.'},
    {q:'What is the GTE requirement?',a:'Genuine Temporary Entrant — a written statement explaining why you\'re choosing Australia, why this programme, what you plan to do after graduation and evidence of ties back home. Weak GTE statements are a common visa refusal reason. We draft and review every GTE.'},
    {q:'Can I get PR after studying in Australia?',a:'Yes, via Skilled Independent (189), Skilled Nominated (190), or employer-sponsored (186/482) visas. Australian study gives bonus points on the points test. Regional study and Master\'s/PhD by research boost chances significantly.'},
    {q:'How much does it cost to study in Australia for one year?',a:'Plan AUD 55,000–85,000 all-in per year: AUD 35,000–60,000 tuition + AUD 20,000–28,000 living. Sydney and Melbourne are top end; regional campuses can drop costs by 15–20%.'},
    {q:'Is the 2-year work visa guaranteed?',a:'You need to have completed a CRICOS-registered course of at least 2 years in Australia to qualify for the standard 2-year 485 visa. Shorter programmes don\'t qualify. We always verify CRICOS status before shortlisting.'},
  ],
});

destinationPage({
  slug:'uae', flag:'🇦🇪', country:'United Arab Emirates',
  title:'Study in the UAE | eMBriture — Khalifa, NYUAD, AUS, Heriot-Watt Dubai',
  desc:'2026 guide to studying in the UAE as a resident or international. World-class universities in your backyard — Khalifa, NYU Abu Dhabi, American University of Sharjah, Heriot-Watt Dubai.',
  kw:'study in UAE universities, Khalifa University admissions, NYU Abu Dhabi need-blind, AUS Sharjah admissions, Heriot-Watt Dubai, UAE university consultant',
  intro:'The UAE has quietly become one of the best value-for-money education destinations in the world. World-class campuses in your backyard, substantial scholarship aid, and the ability to stay close to family.',
  snapshot:[{v:'10+',l:'World-ranked universities'},{v:'Need-blind',l:'NYUAD intl aid'},{v:'Sept / Jan',l:'Intakes'},{v:'AED 55k+',l:'Typical UG tuition'},{v:'Residence visa',l:'Via institution'}],
  unis:[
    {name:'Khalifa University',qs:'~180',city:'Abu Dhabi',ug:'AED 55,000–75,000',pg:'AED 60,000–90,000',ielts:'6.0–6.5',scholar:'Multiple merit + need-based'},
    {name:'NYU Abu Dhabi (NYUAD)',qs:'~70 (NYU)',city:'Abu Dhabi',ug:'Need-blind',pg:'USD 25,000–50,000',ielts:'7.5',scholar:'Need-blind: tuition, housing, meals, flights'},
    {name:'UAE University (UAEU)',qs:'~280',city:'Al Ain',ug:'AED 40,000–65,000',pg:'AED 35,000–70,000',ielts:'6.0',scholar:'Many scholarships available'},
    {name:'American University of Sharjah (AUS)',qs:'Top 5 Gulf',city:'Sharjah',ug:'AED 48,000–70,000',pg:'AED 45,000–75,000',ielts:'6.0',scholar:'Multiple merit &amp; need awards'},
    {name:'Heriot-Watt University Dubai',qs:'~285 (HW UK)',city:'Dubai',ug:'AED 58,000–78,000',pg:'AED 60,000–100,000',ielts:'6.0–6.5',scholar:'Heriot-Watt Dubai scholarships'},
    {name:'University of Wollongong Dubai',qs:'193 (UOW AU)',city:'Dubai',ug:'AED 55,000–72,000',pg:'AED 60,000–85,000',ielts:'6.0–6.5',scholar:'UOWD Merit Scholarships'},
    {name:'Zayed University',qs:'Regional',city:'Abu Dhabi / Dubai',ug:'AED 45,000–60,000',pg:'AED 40,000–65,000',ielts:'6.0',scholar:'Merit-based'},
    {name:'American University in Dubai',qs:'Regional',city:'Dubai',ug:'AED 80,000–110,000',pg:'AED 90,000–120,000',ielts:'6.5',scholar:'AUD Scholars'},
  ],
  process:[
    {t:'Decide: stay in UAE or branch campus?',p:'Khalifa, UAEU, AUS, Zayed are UAE institutions. NYUAD, Heriot-Watt Dubai, UOWD, AUD are branches of US/UK/AUS universities — check which degree certificate you\'ll receive.'},
    {t:'Take admission tests',p:'EmSAT is required by government universities (Khalifa, UAEU, Zayed). SAT/ACT accepted for most private &amp; branch campuses. IELTS/TOEFL separately for English.'},
    {t:'Apply direct to each university',p:'UAE has no central admissions portal. Each university has its own online application. Private and branch universities accept rolling applications.'},
    {t:'Submit transcripts, essays, LORs',p:'UAEU and Khalifa require MoE-attested transcripts. NYUAD demands substantial essays + CSS Profile for aid. Private universities are lighter on essays.'},
    {t:'Scholarship &amp; aid applications',p:'Run in parallel. Scholarship deadlines are often tighter than admission deadlines. We map every award each family qualifies for.'},
    {t:'Residence visa via the university',p:'Once you accept, the university sponsors your student residence visa. Annual renewal tied to academic good standing.'},
  ],
  visa:[
    {t:'Student Residence Visa',p:'Sponsored by the UAE university; valid 1 year, renewable for duration of programme. Allows re-entry and part-time work (up to 15 hours/week) with a No Objection Certificate.'},
    {t:'Golden Visa for outstanding students',p:'Top 10% UG graduates and top graduates from accredited universities qualify for the UAE Golden Visa (5–10 years). A path to independent residence.'},
    {t:'Employment after graduation',p:'Shift from student to work residence requires an employer sponsor. The UAE Green Visa and self-employment options are growing routes for entrepreneurial graduates.'},
    {t:'Parents/dependants',p:'UAE residents applying to UAE universities retain dependent status under parental sponsorship until 21 (males) — a significant advantage.'},
  ],
  scholarships:[
    {t:'NYUAD need-blind aid',p:'NYU Abu Dhabi treats internationals with the same need-blind admissions and 100% demonstrated-need aid as US applicants. Tuition, housing, meals and annual flights home are all covered for families that qualify.'},
    {t:'Khalifa merit &amp; full-fund PhDs',p:'Khalifa offers substantial UG merit awards. PhDs are mostly fully funded with monthly stipend.'},
    {t:'Sheikh Mohammed &amp; Sheikh Zayed scholarships',p:'Named awards across several UAE universities for outstanding Emirati and resident students. Eligibility varies by programme and year.'},
    {t:'Branch campus parent-body scholarships',p:'Heriot-Watt, Wollongong, Middlesex Dubai, Curtin Dubai — each has its own scholarship portfolio. Often underused because families don\'t realise they\'re available.'},
  ],
  living:[
    {t:'Monthly budget',p:'You\'re likely already living in the UAE — keep costs roughly as they are. Branch-campus students in Dubai Knowledge Park or Academic City: AED 4,000–8,000/month if living independently.'},
    {t:'Accommodation',p:'Most UAE students live at home. Campus housing available at Khalifa, NYUAD, AUS, UAEU (often mandatory for first-year UG). NYUAD fully funds housing for aided students.'},
    {t:'Transport',p:'Metro + bus covers Dubai and Sharjah well for students. Many use family cars. Abu Dhabi and Al Ain campuses typically require bus commutes or on-campus living.'},
    {t:'Staying close to family',p:'The underrated advantage. Weekends at home, internships in Dubai or Abu Dhabi, no visa to renew in a foreign country. For many families, this outweighs QS ranking differences.'},
  ],
  faqs:[
    {q:'Is studying in the UAE considered "study abroad" for career purposes?',a:'Branch campuses (NYUAD, Heriot-Watt Dubai, Wollongong Dubai, Curtin Dubai) issue the same degree certificate as the parent institution — so yes, a degree from NYU Abu Dhabi is an NYU degree recognised globally. UAE institutions (Khalifa, AUS, UAEU) issue UAE degrees that are increasingly well-recognised, especially in the GCC and emerging markets.'},
    {q:'Can I transfer from a UAE university to a UK or USA university?',a:'Yes, especially if you maintain strong grades. AUS, NYUAD and Khalifa students have transferred to Ivy League and Russell Group institutions after 1–2 years. The transfer pathway is particularly viable from NYU Abu Dhabi to NYU New York.'},
    {q:'Does Khalifa University really offer fully-funded PhDs?',a:'Yes. Most Khalifa PhD programmes are fully funded — tuition waived, plus a monthly stipend of AED 6,000–12,000 depending on programme and year. Applications are competitive and typically require a research supervisor match.'},
    {q:'What is EmSAT and who needs it?',a:'EmSAT is the UAE\'s standardised admissions test, required by Khalifa, UAEU, Zayed and some other government-linked universities. Private universities (AUS, NYUAD, Heriot-Watt Dubai) typically don\'t require it. We help plan test timelines — EmSAT is offered multiple times per year.'},
    {q:'How does NYU Abu Dhabi need-blind aid actually work?',a:'NYUAD reviews your application without seeing your financial situation, then offers admission based purely on merit. Separately, financial aid is calculated from your CSS Profile to cover 100% of demonstrated need — tuition, room, board, and two annual flights home. In practice, many UAE and international families pay close to zero.'},
  ],
});

destinationPage({
  slug:'malaysia', flag:'🇲🇾', country:'Malaysia',
  title:'Study in Malaysia | eMBriture — UM, Monash, Nottingham, Taylor\'s',
  desc:'2026 guide to studying in Malaysia from the UAE. Monash Malaysia, Nottingham Malaysia, University of Malaya, Taylor\'s — world-ranked teaching at a fraction of UK or Australian cost.',
  kw:'study in Malaysia from UAE, Monash Malaysia admissions, Nottingham Malaysia, University of Malaya, Malaysia education consultant, twin degree programs',
  intro:'World-ranked teaching at roughly a third of UK or Australian cost, with genuine twin-degree routes through Monash, Nottingham and Heriot-Watt branch campuses. Malaysia is the GCC family\'s best-kept affordability secret.',
  snapshot:[{v:'15+',l:'Ranked universities'},{v:'Twin degree',l:'Routes to UK/AU'},{v:'3',l:'Intakes per year'},{v:'MYR 30k+',l:'Typical UG tuition'},{v:'Employment pass',l:'Post-study'}],
  unis:[
    {name:'University of Malaya (UM)',qs:60,city:'Kuala Lumpur',ug:'MYR 16,000–30,000',pg:'MYR 24,500–112,500',ielts:'6.0',scholar:'Various merit scholarships'},
    {name:'Monash University Malaysia',qs:36,city:'Kuala Lumpur',ug:'MYR 38,000–72,000',pg:'MYR 40,000–80,000',ielts:'6.0–7.0',scholar:'Monash Merit Scholarships'},
    {name:'University of Nottingham Malaysia',qs:'~100',city:'Semenyih',ug:'MYR 36,000–65,000',pg:'MYR 38,000–70,000',ielts:'6.0',scholar:'High Achievers Award'},
    {name:'Taylor\'s University',qs:'Top 250 Asia',city:'Selangor',ug:'MYR 38,000–80,000',pg:'MYR 45,000–90,000',ielts:'6.0',scholar:'Taylor\'s Excellence Awards'},
    {name:'Universiti Sains Malaysia (USM)',qs:146,city:'Penang',ug:'MYR 15,000–30,000',pg:'MYR 20,000–45,000',ielts:'6.0',scholar:'USM Fellowship Scheme'},
    {name:'Heriot-Watt University Malaysia',qs:'~285',city:'Putrajaya',ug:'MYR 38,000–60,000',pg:'MYR 45,000–85,000',ielts:'6.0–6.5',scholar:'Heriot-Watt Scholarships'},
    {name:'Sunway University',qs:'Top 500',city:'Bandar Sunway',ug:'MYR 35,000–65,000',pg:'MYR 40,000–75,000',ielts:'6.0',scholar:'Sunway Scholarships'},
    {name:'UCSI University',qs:'~300',city:'Kuala Lumpur',ug:'MYR 28,000–55,000',pg:'MYR 35,000–65,000',ielts:'6.0',scholar:'UCSI Merit'},
  ],
  process:[
    {t:'Decide: Malaysian, branch campus or private',p:'Three categories: public (UM, USM), international branches (Monash, Nottingham, Heriot-Watt), private (Taylor\'s, Sunway). Each has different fee structures and degree issuance.'},
    {t:'Take IELTS / TOEFL / MUET',p:'IELTS 6.0 is the common benchmark; MUET accepted by public universities. Several private universities accept UAE English-medium school-leaving scores in lieu.'},
    {t:'Apply direct to each university',p:'No central application. Deadlines typically 2–3 months before each intake (Jan, May, Sept).'},
    {t:'Receive offer &amp; single entry visa',p:'EMGS (Education Malaysia Global Services) processes all student applications centrally. Takes 2–4 weeks. Single entry visa issued on approval.'},
    {t:'Arrive, convert to multi-entry student pass',p:'On arrival, medical check + thumb-print + multi-entry student pass valid 1 year, renewed annually.'},
    {t:'Twin-degree transfer (optional)',p:'Monash Malaysia, Nottingham Malaysia and Heriot-Watt Malaysia all allow 1–2 years in Malaysia followed by transfer to UK/AUS main campuses — at significant savings.'},
  ],
  visa:[
    {t:'Student Pass',p:'Single entry for visa + multi-entry after arrival, valid 1 year, annually renewable. Part-time work up to 20 hours/week during holidays only.'},
    {t:'Post-study Employment Pass',p:'Graduates can apply for Employment Pass with a job offer. Minimum monthly salary thresholds apply (MYR 5,000–10,000 depending on sector).'},
    {t:'DE Rantau Nomad Pass',p:'For remote workers with foreign employers — 12 months renewable. Useful for some graduates.'},
    {t:'MM2H (long-term residence)',p:'Not a student route but a longer-term option some families consider. Income and deposit requirements were revised in 2024.'},
  ],
  scholarships:[
    {t:'Monash Merit &amp; Leadership',p:'Monash Malaysia offers up to 50% tuition reduction for strong applicants. Leadership and equity scholarships available in addition.'},
    {t:'Nottingham High Achievers Award',p:'Automatic consideration for top applicants — up to 20% tuition reduction on Bachelor\'s programmes.'},
    {t:'Taylor\'s Excellence Awards',p:'Up to 100% tuition for outstanding school-leaving results. Specific band cut-offs published annually.'},
    {t:'Government scholarships (limited for UAE)',p:'MIS (Malaysian International Scholarship) is primarily for Muslim-majority nation students and some other country lists. UAE nationals check eligibility in-year.'},
  ],
  living:[
    {t:'Monthly budget',p:'Kuala Lumpur MYR 1,500–3,000 (~USD 330–660); Penang/JB MYR 1,200–2,200; smaller cities MYR 1,000–1,800. The lowest cost-of-living among serious study destinations.'},
    {t:'Accommodation',p:'On-campus housing MYR 500–1,200/month; private condos MYR 1,000–2,500/month (shared MYR 500–1,000). Quality of private accommodation is high.'},
    {t:'Food &amp; transport',p:'Food is famously cheap and excellent — MYR 10–25/meal at hawker stalls. Grab (ride-sharing) is affordable. KL has LRT/MRT.'},
    {t:'Climate',p:'Tropical — hot and humid year-round with afternoon rain. Expect to run AC continuously. Factor this into accommodation budgets.'},
  ],
  faqs:[
    {q:'Is a Malaysia degree recognised globally?',a:'Branch campus degrees (Monash, Nottingham, Heriot-Watt, Reading Malaysia) are issued by the parent institution and carry identical recognition. Malaysian public university degrees (UM, USM, UKM) are widely recognised in Asia, Middle East and increasingly in the West.'},
    {q:'How much can I save studying in Malaysia vs UK/Australia?',a:'Typically 50–70%. A Monash Malaysia engineering degree runs ~AUD 110,000 total vs ~AUD 180,000 at Monash Australia. Plus living costs are a third to a half. For many UAE families, Malaysia is the difference between "affordable" and "not".'},
    {q:'Can I transfer to the UK or Australia main campus?',a:'Yes, at Monash, Nottingham and Heriot-Watt Malaysia. Typical pattern: 1–2 years in Malaysia + 1–2 years in the UK/Australia. You still get the parent-campus degree but save significantly on tuition.'},
    {q:'Does Malaysia have post-study work rights?',a:'Via Employment Pass with a job offer (salary thresholds MYR 5,000–10,000/month depending on sector), plus the DE Rantau digital nomad pass. Less structured than PGWP/485 systems elsewhere but viable for motivated graduates — especially in KL\'s tech and finance sectors.'},
    {q:'Is Malaysia safe and comfortable for UAE students?',a:'Yes. Malaysia has a large, well-integrated Muslim majority — halal food is default, prayer is easy, and the culture is broadly respectful of conservative dress. KL has a large Middle Eastern student community.'},
  ],
});

destinationPage({
  slug:'singapore', flag:'🇸🇬', country:'Singapore',
  title:'Study in Singapore | eMBriture — NUS, NTU + Asia\'s Top Research Powerhouse',
  desc:'2026 guide to studying in Singapore from the UAE. NUS (QS #8), NTU (QS #15), government tuition grants, Long-Term Visit Pass for post-study work, and the brutal but rewarding admissions bar.',
  kw:'study in Singapore from UAE, NUS admissions, NTU admissions, Singapore tuition grant, Long-Term Visit Pass, Singapore education consultant',
  intro:'Two Top-20 global universities, heavy government subsidies via tuition grants and genuine proximity to the world\'s deepest Asia-Pacific finance, tech and research employers. Singapore is where the admissions bar is highest — and the payoff, fastest.',
  snapshot:[{v:'2',l:'QS Top-20 (NUS #8, NTU #15)'},{v:'Tuition grant',l:'Major subsidy'},{v:'Aug',l:'Main intake'},{v:'SGD 35k+',l:'UG tuition (post-grant)'},{v:'12 mo LTVP',l:'Post-study'}],
  unis:[
    {name:'NUS',qs:8,city:'Singapore',ug:'SGD 37,550–50,400',pg:'SGD 27,300–52,000',ielts:'6.5',scholar:'ASEAN UG, NUS Graduate, S&amp;T'},
    {name:'NTU',qs:15,city:'Singapore',ug:'SGD 35,540–46,200',pg:'SGD 28,000–48,000',ielts:'6.0–6.5',scholar:'Nanyang, ASEAN UG, Nanyang President\'s'},
    {name:'SMU (Singapore Management University)',qs:511,city:'Singapore',ug:'SGD 34,000–58,000',pg:'SGD 40,000–60,000',ielts:'7.0',scholar:'SMU Scholarships, ASEAN UG'},
    {name:'SUTD (Singapore University of Technology &amp; Design)',qs:411,city:'Singapore',ug:'SGD 34,000–44,000',pg:'SGD 30,000–48,000',ielts:'6.5',scholar:'SUTD Scholarships'},
    {name:'Singapore Institute of Technology (SIT)',qs:'National',city:'Singapore',ug:'SGD 33,000–40,000',pg:'SGD 28,000–42,000',ielts:'6.0',scholar:'SIT-IC'},
  ],
  process:[
    {t:'Academic preparation',p:'Singapore weighs raw academic strength heavily. NUS and NTU expect top 5–10% of A-levels, top IB/Common Core scores, or equivalent CBSE 95%+.'},
    {t:'Take SAT/IELTS + subject tests where required',p:'SAT required for UG at NUS, NTU, SMU (from outside A-levels). IELTS/TOEFL for English. Engineering and computing programmes often additional tests.'},
    {t:'Apply via university portals',p:'No central application. Main UG deadlines fall in December–March for August intake. Graduate deadlines vary — many by January for August.'},
    {t:'Tuition Grant decision',p:'Accept or decline the MOE Tuition Grant — a significant subsidy. Accepting it carries a 3-year bond to work in Singapore post-graduation.'},
    {t:'Interviews for select programmes',p:'NUS Medicine, NUS Law, NTU Medicine, SUTD design programmes interview. Video-interview formats common.'},
    {t:'Student\'s Pass via Student\'s Pass Online Application (SOLAR)',p:'University issues an eFORM16; SOLAR submission 2 months before course start. Biometric enrolment at ICA on arrival.'},
  ],
  visa:[
    {t:'Student\'s Pass',p:'Valid for duration of studies. Part-time work up to 16 hours/week during term, full-time in vacations. Must be registered in university\'s records.'},
    {t:'Tuition Grant Bond',p:'Accepting the Tuition Grant requires you to work for a Singapore-registered company for 3 years after graduation. This is positive for employment but restrictive if plans change.'},
    {t:'Long-Term Visit Pass',p:'Post-graduation: a 12-month LTVP to search for work. Automatic for graduates of NUS, NTU, SMU, SUTD, SIT, SUSS.'},
    {t:'Employment Pass / S Pass',p:'Most graduates transition to EP (higher-salary jobs) or S Pass (lower bands) via employer sponsorship. Clear pathway to PR with strong career trajectory.'},
  ],
  scholarships:[
    {t:'ASEAN Undergraduate Scholarship',p:'For ASEAN nationals (UAE not eligible); but UAE residents of ASEAN nationality should review. Full tuition + allowance + flights.'},
    {t:'Nanyang Scholarship (NTU)',p:'Top-tier UG scholarship. Full tuition + annual living allowance. Open to top international applicants.'},
    {t:'NUS Graduate Scholarships',p:'Most NUS research PhDs are fully funded with SGD 2,000+/month stipend. Competitive — supervisor matching helps.'},
    {t:'MOE Tuition Grant',p:'Not strictly a scholarship but a significant subsidy reducing international tuition to roughly 40% of sticker. Bonded service applies.'},
  ],
  living:[
    {t:'Monthly budget',p:'SGD 1,500–3,000 all-in. Accommodation dominates. Food hawker centres are affordable (SGD 5–8/meal); restaurants quickly become expensive.'},
    {t:'Accommodation',p:'University halls SGD 500–900/month; private rental rooms SGD 900–2,000/month; whole studios SGD 2,500+/month. Halls highly sought after — apply early.'},
    {t:'Transport',p:'MRT is world-class — an unlimited student pass is SGD 45–60/month. Taxis and Grab fine for late nights. Cars are impractically expensive.'},
    {t:'Climate',p:'Tropical, humid, 28–32°C year-round. Short heavy rainstorms. Factor in year-round AC and lightweight wardrobe.'},
  ],
  faqs:[
    {q:'How competitive are NUS and NTU for international students?',a:'Very. Typical UG admits have CBSE 95%+, A-level A*AA+ or IB 40+ with excellent SAT scores. Some programmes (NUS Medicine, NUS Computer Science) are harder still. We start profile-building by Year 10 for ambitious Singapore applicants.'},
    {q:'Should I accept the Tuition Grant and the bond?',a:'For most students, yes — the subsidy is substantial and Singapore\'s graduate job market is strong. But the 3-year bond restricts post-graduation mobility. We model the decision for each family; declining the grant roughly doubles your tuition.'},
    {q:'What is the Long-Term Visit Pass post-study?',a:'A 12-month LTVP issued to graduates of NUS, NTU, SMU, SUTD, SIT and SUSS. It gives you open work permission to find a job. Transition to Employment Pass once you have a job offer meeting salary thresholds.'},
    {q:'How much does it cost to study in Singapore for one year?',a:'Plan SGD 50,000–75,000 all-in per year: SGD 35,000–50,000 tuition (post-Tuition Grant) + SGD 18,000–28,000 living. Without the Tuition Grant, add another SGD 30,000–40,000 in tuition.'},
    {q:'Can I do a Master\'s in Singapore without living there?',a:'Limited distance options. Some NUS/NTU executive Master\'s have modular / part-time delivery and attract UAE-based working professionals who fly in for residencies. We advise carefully because of the 3-year bond implications — which apply to grant recipients regardless of attendance mode.'},
  ],
});

console.log('✓ Destinations done');

// ═══════════════════════════════════════════════════════════════
// SERVICE PAGES — 6
// ═══════════════════════════════════════════════════════════════

function servicePage(opts) {
  const { slug, title, desc, kw, tag, h1, intro, who, sections, processSteps, outcomes } = opts;
  const body = heroBlock(
    [{t:'Home',h:'/'},{t:'Services',h:'/services.html'},{t:tag}],
    `Services · ${tag}`,
    h1,
    intro,
    '<a href="/contact.html" class="btn-p">Book free consultation →</a><a href="#process" class="btn-g">See the process</a>'
  ) + `
<section class="section narrow"><div class="two-col reveal" style="margin-top:0">
  <div><span class="s-tag">Who it\'s for</span><h2 class="s-title">Built for <em>${who.audience}</em>.</h2></div>
  <div class="two-col-body"><p>${who.body}</p></div>
</div></section>
${sections.map(s => `<section class="section narrow"><div class="reveal"><span class="s-tag">${s.tag}</span><h2 class="s-title">${s.title}</h2><p class="s-sub">${s.intro}</p></div>${s.body || ''}</section>`).join('')}
<section class="section narrow" id="process"><div class="reveal"><span class="s-tag">How it works</span><h2 class="s-title">Our <em>${tag}</em> process.</h2></div>
<div class="process-list reveal">${processSteps.map(p => `<div><h4>${p.t}</h4><p>${p.p}</p></div>`).join('')}</div></section>
<section class="section"><div class="reveal" style="text-align:center;max-width:720px;margin:0 auto 32px"><span class="s-tag" style="justify-content:center">Track record</span><h2 class="s-title">What families <em>get out</em> of this.</h2></div>
<div class="svc-highlight reveal">${outcomes.map(o => `<div><strong>${o.v}</strong><span>${o.l}</span></div>`).join('')}</div></section>
` + ctaBlock(`Ready to start with ${tag}?`, 'Your first consultation is free. You\'ll leave with a clear action plan and timeline.');
  page(`services/${slug}.html`, title, desc, body, '', kw);
}

servicePage({
  slug:'career-counselling', tag:'Career Counselling',
  title:'Career Counselling | eMBriture — Plan the Career Before the Course',
  desc:'Aptitude testing, market mapping and a written ten-year career thesis. We plan the career before choosing the course — psychometric + labour-market intelligence for UAE students.',
  kw:'career counselling Sharjah, career advisor UAE, psychometric testing UAE students, career thesis, aptitude testing Dubai',
  h1:'Plan the <em>career</em>. Then choose the course.',
  intro:'We start every family with a career thesis — a ten-year written plan of who you could become, supported by psychometric data, current labour-market research and your own constraints.',
  who:{audience:'Year-9 through working professionals', body:'Career Counselling is our foundational service. It\'s for students still deciding subjects, parents trying to pressure-test a path, and working professionals considering a pivot. Every other service we offer plugs into the thesis this one produces.'},
  sections:[
    {tag:'What you get', title:'A written career thesis, <em>not a sales pitch</em>.', intro:'By the end of our engagement you have a 12-to-20-page document covering your aptitude profile, 3–5 realistic career paths, the degrees and certifications that lead there, scholarship overlap, and a 12-month action plan.', body:`<div class="svc-highlight"><div><strong>12–20</strong><span>Page written career thesis</span></div><div><strong>3–5</strong><span>Realistic career paths identified</span></div><div><strong>2–3</strong><span>Deep 90-minute sessions</span></div></div>`},
    {tag:'Psychometric tools we use', title:'Real science, <em>not buzzfeed quizzes</em>.', intro:'We run a combination of the Strong Interest Inventory, the Morrisby assessment, abstract reasoning tests and structured aptitude interviews. Every test is administered by a trained counsellor, not a self-serve platform.'},
    {tag:'Labour-market modelling', title:'Where <em>hiring</em> is actually growing.', intro:'We pull live data from LinkedIn Economic Graph, UK government SOC codes, US BLS projections and GCC ministry labour data so your thesis is based on 2026 reality, not 2015 WhatsApp forwards.'},
    {tag:'Parent-student alignment', title:'The conversation that <em>everyone needs</em>.', intro:'Many first consultations are really three — us, the student, and the parent — separately and together. A career thesis that only the student agrees with is a thesis that won\'t survive Year 13.'},
  ],
  processSteps:[
    {t:'Initial intake call (free)',p:'30 minutes to understand the family, the student, and the actual questions. No commitment.'},
    {t:'Psychometric battery',p:'Strong Interest Inventory + Morrisby + structured aptitude interview, administered over 2 sessions.'},
    {t:'Labour-market research',p:'Your lead counsellor pulls live hiring, salary and geographic data for the career paths that fit your profile.'},
    {t:'Draft thesis + family review',p:'We share a 12–20 page draft, then workshop it with student and parents together.'},
    {t:'Final thesis + 12-month action plan',p:'Clean final document with specific, dated next steps — tests to take, subjects to choose, extracurriculars to pursue.'},
  ],
  outcomes:[
    {v:'92%',l:'Of families retain for admissions after this'},
    {v:'< 14 days',l:'Typical turnaround'},
    {v:'6/6',l:'Career paths researched live'},
  ],
});

servicePage({
  slug:'admissions', tag:'Admissions Mentorship',
  title:'Admissions Mentorship | eMBriture — SOPs, Essays, Interviews, Offers',
  desc:'End-to-end admissions mentorship for undergraduate, Master\'s, MBA and PhD applications. Senior editors on every draft, interview prep with admissions alumni, 94% first-choice rate.',
  kw:'admissions consultant UAE, SOP writing Sharjah, Common App personal statement UAE, MBA essay editing Dubai, Oxbridge interview prep UAE',
  h1:'Senior editors. <em>Honest drafts.</em> Real offers.',
  intro:'We don\'t write your application — we coach you to write a better one than you thought you could. Every SOP, LOR, personal statement and essay is reviewed by a senior editor who\'s read thousands of them.',
  who:{audience:'UG, PG, MBA and PhD applicants', body:'Any application bound for the 35+ universities we partner with. We work best with students who are willing to write and rewrite — we\'re editors, not ghostwriters.'},
  sections:[
    {tag:'What we work on', title:'Every piece of paper a university reads <em>about you</em>.', intro:'Personal statements, supplementary essays, research statements, SOPs, LORs, CV/resume, portfolio narratives, interview responses, WhyYou/WhyUs essays, scholarship statements and diversity essays.', body:`<div class="svc-highlight"><div><strong>94%</strong><span>First-choice admission rate</span></div><div><strong>3–5</strong><span>Senior-editor drafts per essay</span></div><div><strong>20+</strong><span>Alumni mock-interviewers</span></div></div>`},
    {tag:'Interview preparation', title:'Mock interviews with <em>admissions alumni</em>.', intro:'For Oxbridge, Ivy League, MBA, medicine and design interviews — we match you with an alumnus from the target programme for live practice, not a generic "tell me about yourself" rehearsal.'},
    {tag:'Portfolio &amp; research briefs', title:'For architecture, design, art and PhD applicants.', intro:'We support portfolio sequencing, project write-ups, research proposal drafting, supervisor outreach and CV tailoring. One of our mentors is a PhD from Imperial.'},
    {tag:'Application timeline management', title:'Every deadline. <em>In one place.</em>', intro:'Your private client portal shows every deadline, draft status and submission across every university. We are ruthless about this. No one misses a UCAS, Common App or scholarship deadline on our watch.'},
  ],
  processSteps:[
    {t:'Intake + profile review',p:'We read every transcript, test score and extracurricular document you have. Output: a candid competitiveness read against each university on your shortlist.'},
    {t:'Story architecture',p:'Before anyone writes a word, we build your application narrative — what are we trying to say, what evidence supports it, and what should go where.'},
    {t:'Draft → senior-edit cycles',p:'You draft. A senior editor edits with comments, not rewrites. You revise. Repeat 3–5 times per essay until both sides feel it\'s ready.'},
    {t:'LOR briefings',p:'We prepare short briefs for each of your recommenders so their letters reinforce — not contradict — your application narrative.'},
    {t:'Submission review',p:'Two-person sign-off on every submission. One primary counsellor, one second-reader.'},
    {t:'Interview prep + offer decisions',p:'Mock interviews with alumni. Once offers land, we run the full-cost comparison and help you accept the right one.'},
  ],
  outcomes:[
    {v:'94%',l:'First-choice admission rate'},
    {v:'600+',l:'Families guided'},
    {v:'35+',l:'Partner universities'},
  ],
});

servicePage({
  slug:'scholarships', tag:'Scholarships & Aid',
  title:'Scholarships &amp; Financial Aid | eMBriture — Clarendon, Gates, Chevening, NYUAD',
  desc:'Scholarship strategy from day one. Over ₹4.2 crore secured for eMBriture families — from Clarendon, Gates Cambridge, Chevening, Lester B. Pearson, NYU Abu Dhabi need-blind and hundreds of others.',
  kw:'scholarship consultant UAE, Chevening UAE, Clarendon Oxford, Gates Cambridge, need-blind aid UAE students, NYUAD financial aid',
  h1:'Funding as a design constraint. <em>Not an afterthought.</em>',
  intro:'Scholarship strategy is one of our strongest services. We\'ve secured over ₹4.2 crore in funding for eMBriture families — because we treat funding the way a good architect treats load-bearing walls.',
  who:{audience:'Any applicant who cares about the total-cost number', body:'This service is valuable for everyone — from families who need aid to cover the gap, to families who don\'t need it but want to keep their options open. Many scholarships aren\'t need-based at all.'},
  sections:[
    {tag:'Our scholarship universe', title:'Hundreds of awards. <em>Curated to your profile.</em>', intro:'We maintain a living database of 400+ international scholarships, refreshed every quarter. From the famous (Clarendon, Rhodes, Gates, Chevening, Fulbright, Monbukagakusho) to the obscure (Palestinian Student Bursary at McGill; MacCall MacBain at Cambridge; specific-subject awards at every major university).', body:`<div class="svc-highlight"><div><strong>400+</strong><span>Scholarships in our live database</span></div><div><strong>₹4.2 cr+</strong><span>Secured for eMBriture families</span></div><div><strong>90%</strong><span>Apply to 3+ awards</span></div></div>`},
    {tag:'Need-blind institutions', title:'The short list worth memorising.', intro:'A handful of institutions — MIT, Harvard, Yale, Princeton, Amherst, Bowdoin, Dartmouth, NYU Abu Dhabi — treat international students identically to domestic applicants for aid. If your family qualifies, these can be the cheapest options in the world.'},
    {tag:'Merit awards', title:'Non-need-based <em>scholarships</em>.', intro:'Most universities have automatic entrance scholarships plus named awards with separate applications. We identify every one you qualify for and map the essays so you can stack multiple.'},
    {tag:'Stacking &amp; negotiation', title:'Yes, you <em>can</em> negotiate.', intro:'US private universities, in particular, routinely adjust aid packages when presented with competing offers. We draft and send the negotiation emails.'},
  ],
  processSteps:[
    {t:'Scholarship-first shortlist review',p:'Before finalising university shortlist, we map which offer what aid to your profile. Sometimes this changes the shortlist.'},
    {t:'Eligibility audit',p:'For every major scholarship (Clarendon, Gates, Chevening, NYUAD etc.), we run a detailed eligibility and fit audit.'},
    {t:'Essay &amp; application drafting',p:'Scholarship applications are drafted, reviewed and polished through our senior editors — same process as degree applications.'},
    {t:'Financial documentation',p:'CSS Profile, FAFSA (where applicable), university-specific forms. We coordinate with parents on finances sensitively and privately.'},
    {t:'Negotiation &amp; acceptance',p:'Once offers land, we negotiate where possible, stack awards where allowed, and help you accept the best package.'},
  ],
  outcomes:[
    {v:'₹4.2 cr+',l:'Total scholarships secured'},
    {v:'68%',l:'Of clients receive some aid'},
    {v:'28+',l:'Full-funding awards in 5 years'},
  ],
});

servicePage({
  slug:'visa-support', tag:'Visa & Pre-departure',
  title:'Visa &amp; Pre-departure Support | eMBriture — CAS, I-20, CoE, Study Permits',
  desc:'End-to-end visa and pre-departure support for UK, USA, Canada, Australia, UAE, Malaysia and Singapore. CAS, I-20, CoE, study permits, medicals, biometrics, accommodation and banking.',
  kw:'UK student visa UAE, US F-1 visa Dubai, Canada study permit UAE, Australia subclass 500, visa consultant Sharjah',
  h1:'The boring, critical part — <em>done right</em>.',
  intro:'A missed CAS, a wrongly-filed I-20 or a weak GTE statement can sink an offer you spent a year earning. We don\'t let that happen.',
  who:{audience:'Every family with an admission offer in hand', body:'Anyone with an offer in hand for the UK, USA, Canada, Australia, Malaysia, Singapore or a UAE branch campus. Our visa desk is registered with the Australian MARA and trained on every major destination.'},
  sections:[
    {tag:'What we cover', title:'From sticker to stamp.', intro:'CAS/I-20/CoE review, financial documentation, health insurance setup, pre-arrival paperwork, accommodation booking, banking and SIM arrangements, pre-departure orientation.'},
    {tag:'Country-specific expertise', title:'Each country has its <em>own rules</em>.', intro:'UK CAS + IHS + ATAS; US SEVIS + DS-160 + visa interview rehearsal; Canada SDS + GIC + biometrics; Australia GTE + OSHC; Malaysia EMGS; Singapore SOLAR + Tuition Grant. We don\'t use a single template.'},
    {tag:'Interview prep', title:'Especially for <em>US F-1</em> visas.', intro:'The US consulate interview is where a lot of strong students stumble. Mock interviews, answer frameworks, document checklists and same-day debriefs.'},
    {tag:'Pre-departure briefings', title:'Everything you <em>didn\'t know to ask</em>.', intro:'Banking, SIM, health cover, how to open a student account before you arrive, what to pack, what not to pack, first-week logistics.'},
  ],
  processSteps:[
    {t:'CAS / I-20 / CoE review',p:'We verify every detail before you submit anywhere. Small errors here create big problems later.'},
    {t:'Financial documentation',p:'Balance statements, sponsor affidavits, GIC arrangements, tax returns — organised to each country\'s exact standard.'},
    {t:'Visa application preparation',p:'Forms filled, evidence bundled, fees tracked, appointments booked (VFS Dubai, US Consulate Dubai, etc.).'},
    {t:'Mock interview (if applicable)',p:'US F-1, UK pre-CAS, Canada pre-SDS — realistic rehearsals with common-refusal scenarios.'},
    {t:'Pre-departure briefing',p:'Two-hour session with the student + parents: banking, accommodation, health, emergencies, early-week logistics.'},
    {t:'Arrival follow-up',p:'We check in during your first week on the ground. Any hiccups, we help.'},
  ],
  outcomes:[
    {v:'98%',l:'First-attempt visa approval'},
    {v:'7',l:'Countries supported'},
    {v:'2 hrs',l:'Pre-departure briefing per family'},
  ],
});

servicePage({
  slug:'phd-mentorship', tag:'PhD Mentorship',
  title:'PhD Mentorship | eMBriture — Research Proposals, Supervisor Matching, Funded PhDs',
  desc:'PhD mentorship for doctoral applicants in STEM, humanities, social sciences and medicine. Research proposal shaping, supervisor matching, fully-funded PhD applications in UK, USA, Canada, UAE, Singapore.',
  kw:'PhD consultant UAE, research proposal writing Sharjah, funded PhD UK USA Canada, supervisor matching UAE',
  h1:'A <em>research</em> match, not just an admission.',
  intro:'PhD admissions are a supervisor-matching game dressed up as an application. We help you find the right lab, craft a credible research proposal and apply for funding — not just tick boxes.',
  who:{audience:'Master\'s graduates aiming at PhD admissions', body:'Applicants to UK, USA, Canada, UAE and Singapore doctoral programmes across engineering, computer science, medicine, humanities, social sciences and basic sciences. Supports Master\'s-by-research applications too.'},
  sections:[
    {tag:'What we work on', title:'The research-first approach.', intro:'Research interest refinement, literature-review support, methodology framing, proposal drafting, CV tailoring, supervisor identification, cold-outreach drafting, interview prep, and full-funding applications.'},
    {tag:'Supervisor matching', title:'Your PhD stands or falls <em>on your supervisor</em>.', intro:'We run systematic searches across recent publications, find supervisors whose active research aligns with yours, analyse their group size and publication rhythm, and help you draft targeted outreach emails. No generic templates.'},
    {tag:'Fully-funded routes', title:'Gates, Clarendon, Vanier, CSC, Khalifa, A*STAR.', intro:'Most of our PhD applicants aim for fully-funded positions. We map the major scholarship routes and align your application timeline to each.'},
    {tag:'Interview &amp; viva prep', title:'Research defences with <em>current PhDs</em>.', intro:'We pair you with a current or recent PhD from a comparable programme for a live research-defence rehearsal. Much more valuable than a generic mock interview.'},
  ],
  processSteps:[
    {t:'Research direction consultation',p:'A 90-minute session to map your research interests against 3–5 viable doctoral directions.'},
    {t:'Literature scan + supervisor shortlist',p:'We identify 10–20 candidate supervisors across target countries; you review, narrow, and we help draft outreach.'},
    {t:'Research proposal drafting',p:'3–5 drafts of a 2,000–5,000 word proposal through a senior research mentor.'},
    {t:'Cold outreach + supervisor calls',p:'We help you secure supervisor conversations before submitting applications — often decisive.'},
    {t:'Application + funding bundle',p:'Parallel applications to programme + funding (Clarendon, Gates, Vanier, Khalifa, A*STAR etc.). One submission calendar across all.'},
    {t:'Interview &amp; viva defence prep',p:'Live research defence rehearsals with a current PhD in a similar field.'},
  ],
  outcomes:[
    {v:'14',l:'Fully-funded PhDs placed'},
    {v:'5',l:'Countries placed in'},
    {v:'82%',l:'Clients secure supervisor interest before submission'},
  ],
});

servicePage({
  slug:'test-prep', tag:'Test Preparation',
  title:'Test Preparation | eMBriture — IELTS, TOEFL, GRE, GMAT, SAT, UCAT, LNAT',
  desc:'Small online test-prep cohorts for IELTS, TOEFL, GRE, GMAT, SAT, UCAT, LNAT and BMAT. Experienced coaches with documented score-gain records. UAE-friendly class times.',
  kw:'IELTS coaching Sharjah, TOEFL prep UAE, GRE prep Dubai, GMAT prep UAE, SAT prep Sharjah, UCAT LNAT prep UAE',
  h1:'Small cohorts. <em>Senior coaches.</em> Real score gains.',
  intro:'No hundred-student auditoriums. Our online test-prep runs in cohorts of 6–10 led by experienced coaches who track every student\'s band-by-band progression.',
  who:{audience:'Any UAE or GCC student or professional preparing for a standardised test', body:'We run regular cohorts for IELTS, TOEFL, GRE, GMAT, SAT, UCAT, LNAT and BMAT. Classes run in the evenings (GST) and on weekends to fit around school and work schedules.'},
  sections:[
    {tag:'Tests we coach', title:'Eight tests. <em>Across every level.</em>', intro:'IELTS (Academic + General) · TOEFL iBT · GRE · GMAT (and GMAT Focus Edition) · SAT · UCAT · LNAT · BMAT-replacement tests. We don\'t coach CAT, JEE or local UAE entrance tests.', body:`<div class="svc-highlight"><div><strong>6–10</strong><span>Students per cohort</span></div><div><strong>+1.0</strong><span>Average IELTS band gain</span></div><div><strong>+60</strong><span>Average TOEFL iBT score gain</span></div></div>`},
    {tag:'How it works', title:'Diagnostics, then targeted <em>skill-building</em>.', intro:'Every student starts with a full diagnostic test. We map weak sub-skills (e.g. "paraphrasing in IELTS Writing Task 2" rather than "writing"), then build a 6–10 week plan with targeted homework.'},
    {tag:'Mock tests &amp; analytics', title:'Four full mocks per cohort.', intro:'Full-length, timed, scored — with granular question-type analytics so you know exactly where to focus your final push.'},
    {tag:'One-on-one support', title:'Small cohort + <em>office hours</em>.', intro:'Every cohort includes weekly office-hour slots for one-on-one help. No extra fee.'},
  ],
  processSteps:[
    {t:'Free diagnostic test',p:'Sit a full-length diagnostic in our test centre or online. We score it and walk you through every weak spot.'},
    {t:'Personalised study plan',p:'6–10 week plan with weekly homework and check-ins, tailored to your diagnostic gaps.'},
    {t:'Live cohort classes',p:'2 sessions per week of 90 minutes each, via Zoom. Recorded for later review.'},
    {t:'Weekly office hours',p:'One-on-one slots for targeted help.'},
    {t:'Full-length mock tests',p:'4 mocks spaced through the programme, scored with analytics breakdowns.'},
    {t:'Test-day strategy session',p:'A final session 3–5 days before your test to lock in mental strategy, timing rules, and red-flag avoidance.'},
  ],
  outcomes:[
    {v:'+1.0 band',l:'Average IELTS gain'},
    {v:'+60 pts',l:'Average TOEFL iBT gain'},
    {v:'90%',l:'Meet or exceed target score'},
  ],
});

console.log('✓ Services done');

// ═══════════════════════════════════════════════════════════════
// AUDIENCE PAGES
// ═══════════════════════════════════════════════════════════════

page('for-students.html',
  'For Students | eMBriture — Your Playbook, 15–22',
  'Undergraduate study-abroad playbook for students aged 15–22 from the UAE, GCC and India. Subject choice, UCAS, Common App, SAT, IELTS, scholarships, hostels — the full student journey.',
  heroBlock(
    [{t:'Home',h:'/'},{t:'For Students'}],
    'For students',
    'Your <em>playbook</em>. From Year 9 to first-year orientation.',
    'If you\'re 15 to 22, trying to figure out what comes next — this is where we\'ve helped hundreds of students start. Honest advice, zero pressure, 24/7 AI advisor on call.',
    '<a href="/contact.html" class="btn-p">Book a free chat →</a>'
  ) + `
<section class="section"><div class="reveal" style="max-width:780px"><span class="s-tag">The big decisions</span><h2 class="s-title">Five questions we\'ll help you <em>answer properly</em>.</h2></div>
<div class="why-grid">
  <div class="why-card reveal"><div class="why-num">01</div><h3>What should I actually study?</h3><p>Before we look at universities, we look at <em>you</em>. Psychometric tools, aptitude interviews and labour-market data — so your course choice isn\'t a guess.</p></div>
  <div class="why-card reveal"><div class="why-num">02</div><h3>Which country fits my life?</h3><p>Cost, distance, climate, post-study-work runway, visa politics. Seven countries — we help you rank them the way a family doctor would.</p></div>
  <div class="why-card reveal"><div class="why-num">03</div><h3>What tests do I really need?</h3><p>IELTS vs TOEFL. SAT or not. UCAT, LNAT, BMAT-replacement, STEP. Each profile has 2–3 tests that matter. We don\'t over-prescribe.</p></div>
  <div class="why-card reveal"><div class="why-num">04</div><h3>Can I afford this?</h3><p>Before you fall in love with a programme, we model fully-loaded costs — tuition, living, visa, flights — and map scholarship overlap.</p></div>
  <div class="why-card reveal"><div class="why-num">05</div><h3>What will my days look like there?</h3><p>Hostel vs private apartment. Part-time work. Weather. Food. First-week logistics. The stuff most consultants skip.</p></div>
  <div class="why-card reveal"><div class="why-num">06</div><h3>How do I not waste my 20s?</h3><p>Four-year undergraduates are a big bet. We make sure it\'s the <em>right</em> bet — and help you build toward graduation, not just survive it.</p></div>
</div></section>
<section class="section narrow"><div class="reveal"><span class="s-tag">Timeline</span><h2 class="s-title">The <em>honest</em> calendar.</h2><p class="s-sub">Ambitious students start 18–24 months out. Realistic students start 9–12 months out. Everyone else applies in a rush and ends up with fewer options.</p></div>
<div class="process-list reveal">
  <div><h4>Year 11 / Grade 11 — Start exploring</h4><p>Career thesis, aptitude testing. Pick A-level / IB / CBSE subjects deliberately. Book your first IELTS/SAT diagnostic.</p></div>
  <div><h4>Summer before final year</h4><p>Take IELTS/SAT. Shortlist universities and scholarships. Draft first personal statement outline. Confirm extracurricular gaps.</p></div>
  <div><h4>October–December final year</h4><p>Oxbridge / Ivy deadlines (Nov 1–15). UCAS 15-Oct deadline for medicine/Oxbridge. Scholarship essays in parallel.</p></div>
  <div><h4>January–March</h4><p>UCAS main deadline 29 Jan. US Regular Decision. Interviews (Oxbridge, Ivy, medicine, Singapore). IELTS/TOEFL if not yet sat.</p></div>
  <div><h4>March–May</h4><p>Offers land. Run the full-cost comparison. Accept the right offer — not just the brand.</p></div>
  <div><h4>June–August</h4><p>Visa applications (CAS / I-20 / SDS / GTE). Pre-departure briefing. Accommodation. Banking. Pack.</p></div>
</div></section>
` + ctaBlock('Where are you in this timeline?', 'Book a 30-minute call and we\'ll tell you where you actually stand, what to prioritise, and whether you\'re already late.') + FOOTER);

page('for-parents.html',
  'For Parents | eMBriture — Stress-Test the Shortlist. Sleep Better.',
  'Parent-focused study-abroad guidance from Sharjah. Full-cost modelling, safety briefings, ROI comparisons and generational decision support for UAE, GCC and Indian families.',
  heroBlock(
    [{t:'Home',h:'/'},{t:'For Parents'}],
    'For parents',
    'A <em>second opinion</em>, on your side of the table.',
    'You are making a five-to-seven-year financial, emotional and safety commitment for your child. We sit with you, pressure-test every option, and give you the clarity to decide with confidence.',
    '<a href="/contact.html" class="btn-p">Book a parent consultation →</a>'
  ) + `
<section class="section"><div class="reveal" style="max-width:780px"><span class="s-tag">What parents actually worry about</span><h2 class="s-title">We\'ve had <em>600+</em> of these conversations.</h2><p class="s-sub">The concerns below come up in every first consultation we do. We have clear, honest answers for each.</p></div>
<div class="why-grid">
  <div class="why-card reveal"><div class="why-num">01</div><h3>Will they be safe?</h3><p>City-by-city, campus-by-campus safety briefings. Crime statistics, student-support infrastructure, health cover, and what to do in emergencies.</p></div>
  <div class="why-card reveal"><div class="why-num">02</div><h3>What will this actually cost?</h3><p>Fully-loaded 4-year budgets — tuition, living, visa, travel, inflation — compared against scholarships and ROI projections, not just brochure headline numbers.</p></div>
  <div class="why-card reveal"><div class="why-num">03</div><h3>Will they come back?</h3><p>Post-study-work policy, PR pathways, return-migration patterns for each country. We don\'t oversell "settlement" — we model probabilities honestly.</p></div>
  <div class="why-card reveal"><div class="why-num">04</div><h3>Is the ROI there?</h3><p>Realistic entry salaries by country and subject, interest on loans, break-even math. For some programmes, we recommend staying in the UAE. For others, abroad makes clear sense.</p></div>
  <div class="why-card reveal"><div class="why-num">05</div><h3>Can we get aid?</h3><p>Scholarship mapping, need-based aid at US institutions, UAE-resident awards. For some families, aid turns an unaffordable option into the cheapest one.</p></div>
  <div class="why-card reveal"><div class="why-num">06</div><h3>Who do we call at 2 AM?</h3><p>Once your child is abroad, you don\'t lose your advisor. We remain your contact for visa renewals, internships, accommodation changes and pivots through the full degree.</p></div>
</div></section>
<section class="section narrow"><div class="reveal"><span class="s-tag">Parent workshops</span><h2 class="s-title">Small-group <em>workshops</em> for parents.</h2><p class="s-sub">Once a quarter we run evening workshops in Sharjah and Dubai — just for parents, no students, no sales pitch. Topics cycle through UCAS vs Common App, scholarship strategy, safety in the UK/US/Canada, and full-cost modelling.</p></div>
<div style="text-align:center;margin-top:28px"><a href="/contact.html" class="btn-p">Ask about the next workshop →</a></div></section>
` + ctaBlock('Want a quiet, honest second opinion?', 'No sales call. Just 30 minutes with a counsellor who\'s sat where you\'re sitting 600+ times.') + FOOTER);

page('for-professionals.html',
  'For Working Professionals | eMBriture — MBA, Executive MBA, Specialist Master\'s',
  'Study-abroad guidance for mid-career professionals in the UAE, GCC and India. MBA, Executive MBA, specialist Master\'s and doctoral routes — with honest ROI math and career pivot strategy.',
  heroBlock(
    [{t:'Home',h:'/'},{t:'For Professionals'}],
    'For working professionals',
    'A <em>career pivot</em>, not a credential.',
    'An MBA or specialist Master\'s is a serious career move in your late 20s or 30s. We help you decide whether you need one at all — and if so, which programme actually earns back its cost.',
    '<a href="/contact.html" class="btn-p">Book career strategy call →</a>'
  ) + `
<section class="section"><div class="reveal" style="max-width:780px"><span class="s-tag">What we work on</span><h2 class="s-title">Specialist tracks for <em>mid-career moves</em>.</h2></div>
<div class="svc-grid">
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">💼</div><h3>Full-time MBA</h3><p>Top-20 MBAs at HBS, Wharton, INSEAD, LBS, Stanford, Kellogg, Booth, Columbia. 1–2 years. Career-pivot oriented. Strong ROI for most tracks.</p></div>
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">🎯</div><h3>Executive MBA</h3><p>INSEAD GEMBA, Kellogg-HKUST, LBS-Columbia, Rotman EMBA. For senior managers who can\'t leave work. Highest-priced, but career-continuous.</p></div>
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">📊</div><h3>Specialist Master\'s</h3><p>MFin, MBA (1-year formats), MSc Analytics, MSc Management. Cheaper than MBAs, often faster ROI for specific roles.</p></div>
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">🔬</div><h3>Part-time Doctoral</h3><p>DBA, EdD, PhD (part-time) — for very senior professionals pivoting to research or consulting.</p></div>
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">🏥</div><h3>Healthcare management</h3><p>MPH, MHA and MBA-healthcare specialisations — for doctors and healthcare leaders moving into administration.</p></div>
  <div class="svc-card reveal" style="cursor:default"><div class="svc-ic">⚖️</div><h3>LLM &amp; specialist law</h3><p>Corporate law, arbitration, IP and fintech-focused LLMs at Oxford, Cambridge, Harvard, Columbia, NUS.</p></div>
</div></section>
<section class="section narrow"><div class="reveal"><span class="s-tag">ROI math</span><h2 class="s-title">The <em>honest</em> numbers.</h2><p class="s-sub">An MBA costs AED 500,000–1,200,000 fully-loaded. The break-even math is not straightforward. We build a personalised ROI model for every professional before recommending any programme.</p></div>
<div class="svc-highlight reveal" style="margin-top:30px"><div><strong>AED 600k</strong><span>Typical INSEAD all-in cost</span></div><div><strong>AED 1.1M</strong><span>Typical top-US MBA all-in</span></div><div><strong>3–5 yrs</strong><span>Typical break-even timeline</span></div></div></section>
<section class="section narrow"><div class="reveal"><span class="s-tag">GMAT / GRE / waivers</span><h2 class="s-title">Test strategy for <em>working adults</em>.</h2><p class="s-sub">Many top schools now offer GMAT/GRE waivers for experienced applicants. We assess your profile and recommend whether to sit the test (often worth it) or pursue a waiver (increasingly viable for 7+ years\' experience).</p></div></section>
` + ctaBlock('Thinking about an MBA?', 'Book a 30-minute call and we\'ll stress-test the move before you spend a rupee on GMAT prep.') + FOOTER);

console.log('✓ Audience pages done');

// ═══════════════════════════════════════════════════════════════
// INSIGHTS ARTICLES
// ═══════════════════════════════════════════════════════════════

function articlePage(opts) {
  const { slug, title, desc, kw, h1, lead, meta, body } = opts;
  const articleLd = `<script type="application/ld+json">${JSON.stringify({
    "@context":"https://schema.org","@type":"Article","headline":h1.replace(/<[^>]+>/g,''),"description":desc,"author":{"@type":"Organization","name":"eMBriture"},"publisher":{"@type":"Organization","name":"eMBriture","logo":{"@type":"ImageObject","url":`${SITE}/assets/logo.svg`}},"datePublished":"2026-03-01","dateModified":"2026-04-01","mainEntityOfPage":`${SITE}/insights/${slug}.html`
  })}</script>`;
  const crumbs = [{t:'Home',h:'/'},{t:'Insights',h:'/insights.html'},{t:title.split('|')[0].trim()}];
  const crumbsHtml = crumbs.map((c,i)=>i===crumbs.length-1?`<span>${c.t}</span>`:`<a href="${c.h}">${c.t}</a><span>/</span>`).join('');
  const b = `<section class="page-hero"><div class="ph-inner"><nav class="breadcrumbs">${crumbsHtml}</nav><h1 class="ph-title">${h1}</h1><p class="ph-sub">${lead}</p><div class="ph-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div></div></section>
<article class="article">${body}</article>
` + ctaBlock('Need a counsellor on this specifically?', 'Book a free 30-minute call and we\'ll apply this article to your exact situation.');
  page(`insights/${slug}.html`, title, desc, b, articleLd, kw);
}

articlePage({
  slug:'ucas-2026',
  title:'UCAS 2026: What Has Actually Changed | eMBriture Insights',
  desc:'UCAS 2026 brings a new personal statement format, revised Oxbridge deadlines and BMAT replacement. Here\'s what UAE students need to do by 29 January to stay ahead.',
  kw:'UCAS 2026, UCAS personal statement new format, UCAS deadline 2026, BMAT replacement, UCAT 2026 UAE students',
  h1:'UCAS 2026: What has <em>actually</em> changed, and what it means for UAE students',
  lead:'Three material changes — a new personal statement, a revised Oxbridge timeline and the BMAT replacement — land this cycle. Here\'s the briefing we wish every UAE applicant had by October.',
  meta:['8 min read','Updated 17 April 2026','UK · Admissions'],
  body:`
<p class="article-lead">If you\'re applying through UCAS for September 2026 entry, the cycle you\'re about to run looks meaningfully different from 2025. Three changes matter. Most WhatsApp groups have one of them wrong.</p>
<h2>1. The new personal statement format</h2>
<p>UCAS has replaced the single 4,000-character free-form personal statement with <strong>three structured questions</strong>, each with its own character limit. The total length is broadly similar, but the structure changes how you should plan the statement from day one.</p>
<p>The three questions (paraphrased from UCAS guidance) are:</p>
<ul>
  <li><strong>Q1 — Why do you want to study this course or subject?</strong> Around 1,000 characters. Focus: specific intellectual motivation, not generic passion claims.</li>
  <li><strong>Q2 — How have your qualifications and studies helped you prepare for this subject?</strong> Around 1,500 characters. Focus: curriculum, reading, projects, research.</li>
  <li><strong>Q3 — What else have you done to prepare outside of formal study?</strong> Around 1,500 characters. Focus: super-curriculars, work experience, independent projects.</li>
</ul>
<p>The risk: students treat this as three smaller essays. It\'s not. The three answers must still read as <em>one coherent argument</em> about why this subject, at this university, now.</p>
<blockquote>If an admissions reader at Oxford\'s Engineering Science panel can\'t summarise your personal statement in a single sentence, you\'ve written three mini-essays instead of one application.</blockquote>
<h3>What to actually do</h3>
<p>Draft Q1 first. Then write a <em>throughline sentence</em> — a single argument connecting Q1 to Q2 and Q3. Only then draft Q2 and Q3 with the throughline visible at the top of your document.</p>

<h2>2. Oxbridge applications — revised sub-deadlines</h2>
<p>The <strong>15 October 2025 UCAS deadline</strong> for Oxford, Cambridge, medicine, dentistry and veterinary still stands. But Oxford has tightened its written-work submission and admissions-test registration dates by 7–10 days compared to 2025.</p>
<p>Cambridge has formalised the <strong>My Cambridge Application (MCA)</strong> as the single supplemental portal — replacing the older SAQ. Every Cambridge applicant must complete MCA in addition to UCAS by <strong>22 October 2025</strong>. Missing this deadline is now an automatic rejection — unlike previous years when colleges could extend.</p>

<h3>For UAE applicants specifically</h3>
<p>The October 15 UCAS deadline lands squarely in the middle of UAE school half-term. Plan your personal statement drafting to be <em>done by end of September</em> so half-term is for proofreading, not writing.</p>

<h2>3. The BMAT replacement and admissions test consolidation</h2>
<p>BMAT has been formally retired. Medical schools that previously used BMAT have migrated to one of:</p>
<ul>
  <li><strong>UCAT</strong> — now used by virtually all UK medical schools except Oxford and Cambridge.</li>
  <li><strong>Oxford MAT</strong> for mathematics and CS.</li>
  <li><strong>Cambridge ESAT (Engineering &amp; Science Admissions Test)</strong> for Cambridge Engineering, Natural Sciences and Veterinary.</li>
  <li><strong>TMUA (Test of Mathematics for University Admission)</strong> — expanded; required/recommended by more Russell Group mathematics courses.</li>
</ul>
<p>Practical consequence: many UAE students previously targeting Oxford and Cambridge will now sit a different test than they prepared for in 2024. If your school counsellor is using materials from the last cycle, they may still be referring to BMAT.</p>

<h3>Test registration — what the 2026 calendar looks like</h3>
<table>
  <thead><tr><th>Test</th><th>Registration opens</th><th>Registration closes</th><th>Test date</th></tr></thead>
  <tbody>
    <tr><td>UCAT</td><td>18 June 2025</td><td>26 September 2025</td><td>July–Oct 2025</td></tr>
    <tr><td>Oxford MAT</td><td>1 September 2025</td><td>29 September 2025</td><td>30 October 2025</td></tr>
    <tr><td>Cambridge ESAT</td><td>1 September 2025</td><td>15 October 2025</td><td>21–22 October 2025</td></tr>
    <tr><td>TMUA</td><td>1 September 2025</td><td>1 October 2025</td><td>23 October 2025</td></tr>
  </tbody>
</table>

<h2>What to do in the next 60 days if you\'re applying this cycle</h2>
<ol>
  <li><strong>Confirm which admissions test you need.</strong> Don\'t assume — check each university\'s 2026 admissions test page for your course.</li>
  <li><strong>Register before end-September.</strong> Late registration is not an option for most tests.</li>
  <li><strong>Start the new personal statement immediately.</strong> The 3-question format rewards structure and punishes rambling. Aim for 3 complete drafts before half-term.</li>
  <li><strong>If applying to Cambridge: do MCA on the day your UCAS goes live.</strong> Not later. The 22 October MCA deadline has no flexibility in 2026.</li>
  <li><strong>Book IELTS for early October latest.</strong> Oxbridge colleges use English scores for short-listing even when the formal deadline is later.</li>
</ol>

<h2>The meta-lesson</h2>
<p>The 2026 cycle rewards applicants who treated UCAS like a project plan — with a Gantt chart — not applicants who treated it like a creative writing exercise in October.</p>
<p>If you\'re a Year 13 student in the UAE and any of the above surprises you, the next two weeks are important. Book a conversation. We\'ll rebuild your calendar in 30 minutes.</p>

<hr>
<p><em>This article reflects UCAS 2026 cycle information as of 17 April 2026. Deadlines and requirements can change; always confirm on UCAS and each university\'s official admissions page.</em></p>
`
});

articlePage({
  slug:'scholarships-beyond-chevening',
  title:'Scholarships Beyond Chevening | eMBriture Insights',
  desc:'Twelve funded scholarship routes UAE students miss every year — from Clarendon to NYUAD need-blind aid to Monbukagakusho. Practical eligibility, deadlines and drafting tips.',
  kw:'Chevening alternative scholarships, Clarendon scholarship UAE, Gates Cambridge UAE, NYUAD need-blind, Monbukagakusho UAE students, scholarship for Master\'s abroad UAE',
  h1:'Scholarships <em>beyond Chevening</em>: 12 funded routes UAE students miss every year',
  lead:'Chevening gets all the attention. Meanwhile, a dozen other fully-funded scholarship routes — some more generous, some less competitive — quietly close their deadlines each year with UAE applicants nowhere in sight.',
  meta:['12 min read','Published 12 March 2026','Scholarships'],
  body:`
<p class="article-lead">We compiled this list because we were tired of having the same conversation. A student in Sharjah, eyes on a UK Master\'s, applies to Chevening, misses, and treats it as "the" funded route closing. It isn\'t.</p>
<p>Below are 12 funded routes we actively place UAE students into. All are available to UAE nationals or residents in 2026. All cover tuition at a minimum; most cover living costs. None are secret — but all are systematically under-applied from the UAE.</p>

<h2>1. Clarendon Scholarship (Oxford)</h2>
<p><strong>What it covers:</strong> Full tuition + college fee + stipend (approximately £20,000–£25,000/year). For Master\'s and DPhil programmes.</p>
<p><strong>Who it\'s for:</strong> Any international applicant to Oxford graduate programmes. No nationality restriction.</p>
<p><strong>Deadline:</strong> Automatic consideration when you apply to Oxford by the programme\'s December/January deadline. No separate application.</p>
<p><strong>Realistic odds:</strong> ~3% of Oxford graduate applicants are offered Clarendon. But no extra effort — so apply unless the extra £50 application fee is a real barrier.</p>

<h2>2. Gates Cambridge</h2>
<p><strong>What it covers:</strong> Full tuition + maintenance allowance (~£18,000/year) + airfares + visa costs + family allowances.</p>
<p><strong>Who it\'s for:</strong> International applicants (non-UK) for Master\'s or PhD at Cambridge, with demonstrated leadership and commitment to improving the lives of others.</p>
<p><strong>Deadline:</strong> October/December depending on the round. Gates requires a separate Gates-specific written submission beyond the standard Cambridge application.</p>
<p><strong>UAE-specific edge:</strong> Cambridge has relatively few Gates applicants from the UAE compared to India and Africa. A well-drafted "leadership and impact" statement with UAE examples has real traction.</p>

<h2>3. Rhodes Scholarship</h2>
<p><strong>What it covers:</strong> Full tuition + stipend + travel + health. Only for Oxford graduate study (Master\'s, MPhil, DPhil).</p>
<p><strong>Who it\'s for:</strong> Students aged 19–25 by 1 October of the entry year, from one of ~64 Rhodes constituencies. UAE residents can apply through the Global Rhodes Scholarship.</p>
<p><strong>Deadline:</strong> Varies by constituency, typically August–October.</p>

<h2>4. NYU Abu Dhabi — Need-Blind Financial Aid</h2>
<p><strong>What it covers:</strong> 100% of demonstrated financial need. Covers tuition ($60,000+), room, board, health, books, and two annual flights home.</p>
<p><strong>Who it\'s for:</strong> Any undergraduate applicant regardless of nationality or country of residence. The application is standard; aid is assessed separately via CSS Profile.</p>
<p><strong>Deadline:</strong> 1 November (Early Decision) or 1 January (Regular Decision).</p>
<p><strong>Practical point:</strong> For many UAE middle-income families, NYUAD is literally the cheapest Top-50 university in the world.</p>

<h2>5. Lester B. Pearson International Scholarship (University of Toronto)</h2>
<p><strong>What it covers:</strong> Full tuition + incidental fees + books + residence for up to 4 years. The most generous international UG scholarship in Canada.</p>
<p><strong>Who it\'s for:</strong> Outstanding international students entering their first undergraduate degree. Nominated by the school — not self-applied.</p>
<p><strong>Deadline:</strong> School nomination by mid-November of the year before entry; student application by late November.</p>

<h2>6. Vanier Canada Graduate Scholarships</h2>
<p><strong>What it covers:</strong> CAD 50,000/year for 3 years. Covers a PhD in Canada.</p>
<p><strong>Who it\'s for:</strong> International doctoral applicants with demonstrated leadership and academic excellence.</p>
<p><strong>Deadline:</strong> University-nominated by early November.</p>

<h2>7. Monbukagakusho (MEXT) Scholarship — Japan</h2>
<p><strong>What it covers:</strong> Tuition + monthly stipend (JPY 117,000–148,000) + flights. Japanese language training included for non-speakers.</p>
<p><strong>Who it\'s for:</strong> Research students, undergraduates and specialised training college students from countries with diplomatic relations with Japan (includes UAE).</p>
<p><strong>Deadline:</strong> May–June through Japanese embassies.</p>
<p><strong>UAE-specific note:</strong> Annual UAE quota consistently under-subscribed.</p>

<h2>8. A*STAR Singapore International Graduate Award (SINGA)</h2>
<p><strong>What it covers:</strong> Full tuition + SGD 2,700/month stipend + settling-in allowance. For PhDs at NUS, NTU, SMU, SUTD, or A*STAR research institutes.</p>
<p><strong>Who it\'s for:</strong> International PhD applicants in science and engineering.</p>
<p><strong>Deadline:</strong> June for January intake; December for August intake.</p>

<h2>9. DAAD — Germany</h2>
<p><strong>What it covers:</strong> Master\'s and PhD scholarships across dozens of German universities. Varies by programme: monthly stipends €934 (Master\'s) to €1,300+ (PhD), plus travel, health insurance, and often tuition waivers (tuition is already low in Germany).</p>
<p><strong>Who it\'s for:</strong> International applicants across fields. Specific streams for development studies (EPOS), public policy, and research.</p>
<p><strong>Deadline:</strong> Varies by programme; typically October–December for October intake.</p>

<h2>10. Khalifa University Fully Funded PhDs</h2>
<p><strong>What it covers:</strong> Tuition waiver + monthly stipend AED 6,000–12,000 + research allowance. For STEM PhD programmes.</p>
<p><strong>Who it\'s for:</strong> International PhD applicants. Supervisor-match is the decisive factor.</p>
<p><strong>Deadline:</strong> Rolling. Apply 6 months before intended start; earliest applications get first pick of supervisors.</p>

<h2>11. Fulbright — for returning to MENA (non-US applicants)</h2>
<p><strong>What it covers:</strong> Full US Master\'s funding for citizens of specific countries. UAE has <em>limited</em> Fulbright slots primarily routed through government channels; Indian and Pakistani citizens resident in UAE can apply through home-country Fulbright commissions.</p>
<p><strong>Who it\'s for:</strong> Varies by nationality.</p>

<h2>12. Schwarzman Scholars (Tsinghua, China)</h2>
<p><strong>What it covers:</strong> Full Master\'s tuition + housing + stipend + travel at Tsinghua University. Global leadership programme.</p>
<p><strong>Who it\'s for:</strong> 28 and under, any nationality, strong leadership profile.</p>
<p><strong>Deadline:</strong> Late September.</p>

<h2>How to actually apply to multiple in parallel</h2>
<p>The reason UAE students underapply is rarely motivation — it\'s time. Each scholarship has its own essays, forms, reference requests and deadlines.</p>
<p>Three tactical rules we give every family:</p>
<ul>
  <li><strong>Start essays 6 months before the earliest deadline.</strong> You\'re going to write 4–8 distinct essays across applications. Each needs 3+ drafts. That\'s 24+ drafts. You cannot cram this in December.</li>
  <li><strong>Request references in September for an October–December deadline.</strong> Your referees have their own lives.</li>
  <li><strong>Build one strong essay bank, then adapt.</strong> Ninety percent of scholarship essays reuse the same 4–5 underlying arguments — just reframed. Write the arguments once; reframe fifteen times.</li>
</ul>

<h2>Our offer</h2>
<p>If you\'re a student or parent in the UAE trying to work out which of the above you\'re actually competitive for — that\'s the 30 minutes we always give for free. Book it on the <a href="/contact.html">contact page</a>.</p>

<hr>
<p><em>Scholarship details change annually. Amounts, deadlines and eligibility on this page reflect 2026 cycle information as of 12 March 2026. Always confirm on the scholarship\'s official website before applying.</em></p>
`
});

articlePage({
  slug:'mba-roi',
  title:'MBA ROI in 2026: INSEAD vs LBS vs Rotman | eMBriture Insights',
  desc:'A fully-loaded cost, realistic salary uplift and post-study-visa ROI model for an MBA from INSEAD vs LBS vs Rotman — aimed at working professionals in the UAE and GCC.',
  kw:'MBA ROI 2026, INSEAD vs LBS, Rotman MBA UAE, MBA worth it UAE, MBA cost comparison 2026, MBA from Dubai',
  h1:'MBA ROI in 2026: Running the numbers on <em>INSEAD vs LBS vs Rotman</em>',
  lead:'A fully-loaded cost, realistic salary uplift and post-study-visa spreadsheet for the working professional in Dubai. We worked this through with 14 live clients in 2025 — here\'s the composite math.',
  meta:['10 min read','Published 5 March 2026','MBA'],
  body:`
<p class="article-lead">An MBA in 2026 costs AED 500,000 to AED 1,200,000 fully-loaded. That is — for most working professionals we meet in Dubai — the largest financial decision they will make before buying property. It deserves a proper spreadsheet. So we built one.</p>

<h2>The three programmes</h2>
<p>We picked three representative Top-50 MBAs:</p>
<ul>
  <li><strong>INSEAD</strong> (10-month full-time, Fontainebleau / Singapore)</li>
  <li><strong>London Business School (LBS)</strong> (15–21 month full-time, London)</li>
  <li><strong>Rotman School of Management (Toronto)</strong> (20-month full-time)</li>
</ul>
<p>Each represents a different bet. INSEAD is the European fast-track. LBS is the full-length global brand. Rotman is the "settle in Canada" play.</p>

<h2>The cost model — 2026 intake</h2>
<p>All figures include tuition, housing, living, books, health insurance, flights and opportunity cost of forgone salary (assuming an AED 300,000 base for a 6-year-experience professional in Dubai).</p>
<table>
  <thead><tr><th>Cost line</th><th>INSEAD</th><th>LBS</th><th>Rotman</th></tr></thead>
  <tbody>
    <tr><td>Tuition</td><td>€103,500 (AED 410k)</td><td>£121,000 (AED 560k)</td><td>CAD 139,000 (AED 380k)</td></tr>
    <tr><td>Living &amp; housing</td><td>€42,000 (AED 170k)</td><td>£38,000 (AED 175k)</td><td>CAD 48,000 (AED 130k)</td></tr>
    <tr><td>Travel, tech, books</td><td>AED 35k</td><td>AED 45k</td><td>AED 30k</td></tr>
    <tr><td>Health / visa</td><td>AED 15k</td><td>AED 22k</td><td>AED 20k</td></tr>
    <tr><td><strong>Direct cost</strong></td><td><strong>AED 630k</strong></td><td><strong>AED 802k</strong></td><td><strong>AED 560k</strong></td></tr>
    <tr><td>Forgone salary</td><td>AED 250k (10 mo)</td><td>AED 450k (18 mo)</td><td>AED 500k (20 mo)</td></tr>
    <tr><td><strong>Fully-loaded cost</strong></td><td><strong>AED 880k</strong></td><td><strong>AED 1.25M</strong></td><td><strong>AED 1.06M</strong></td></tr>
  </tbody>
</table>

<h2>The salary-uplift model</h2>
<p>We use 3 data sources: each school\'s published MBA employment report, MBA.com salary research, and our own placement data from 48 UAE-based MBA alumni we\'ve worked with since 2022.</p>
<table>
  <thead><tr><th>Metric</th><th>INSEAD</th><th>LBS</th><th>Rotman</th></tr></thead>
  <tbody>
    <tr><td>Median post-MBA base salary</td><td>USD 115,000</td><td>GBP 95,000 (~USD 120,000)</td><td>CAD 115,000 (~USD 85,000)</td></tr>
    <tr><td>Signing bonus (typical)</td><td>USD 25,000</td><td>GBP 18,000</td><td>CAD 18,000</td></tr>
    <tr><td>Annual bonus target</td><td>18–25%</td><td>15–22%</td><td>12–18%</td></tr>
    <tr><td>Pre-MBA median salary (our UAE cohort)</td><td>AED 300k</td><td>AED 330k</td><td>AED 280k</td></tr>
    <tr><td>Year-1 post-MBA comp (median)</td><td>AED 560k</td><td>AED 500k</td><td>AED 340k</td></tr>
    <tr><td><strong>Delta per year</strong></td><td><strong>+AED 260k</strong></td><td><strong>+AED 170k</strong></td><td><strong>+AED 60k</strong></td></tr>
  </tbody>
</table>
<blockquote>Rotman\'s sticker delta looks weak, but the visa picture flips it. Read on.</blockquote>

<h2>The break-even math</h2>
<p>Using the deltas above and simplified assumptions (no promotion for 5 years, no inflation adjustment):</p>
<ul>
  <li><strong>INSEAD:</strong> AED 880k / AED 260k = ~3.4 years to break even</li>
  <li><strong>LBS:</strong> AED 1.25M / AED 170k = ~7.3 years to break even</li>
  <li><strong>Rotman:</strong> AED 1.06M / AED 60k = ~17.7 years (but…)</li>
</ul>

<h2>The visa &amp; optionality overlay</h2>
<p>The break-even math misses the single most valuable part of any MBA abroad: what it unlocks that the MBA itself doesn\'t pay for.</p>
<h3>INSEAD</h3>
<p>France gives a 1-year post-study work visa; Singapore (for INSEAD Asia track) gives a 12-month LTVP. Neither leads to easy PR. Value add: European brand, alumni network, rapid global mobility. <strong>Visa-value premium: moderate.</strong></p>
<h3>LBS</h3>
<p>UK Graduate Route provides 2 years of open work permission. London is the MBA capital of Europe for finance and consulting employers. No direct PR path, but Skilled Worker visa bridges easily. <strong>Visa-value premium: high.</strong></p>
<h3>Rotman</h3>
<p>Rotman is a 20-month programme, which qualifies you for a 3-year PGWP. Combined with Canadian MBA, Rotman alumni routinely obtain PR within 3 years of graduation through Express Entry. <strong>Visa-value premium: very high — essentially a paid-for PR route.</strong></p>
<p>Reframing break-even with the "Canadian PR and optionality" as the asset rather than the salary uplift:</p>
<ul>
  <li>Rotman\'s "break-even" includes 30+ years of Canadian residency optionality, dual-nationality potential, and ability to work anywhere in the G7 post-citizenship. The AED 1.06M buys this. It\'s not a pure salary decision.</li>
</ul>

<h2>Which one is right?</h2>
<p>We frame this with every client as a three-choice matrix:</p>
<ol>
  <li><strong>Pick INSEAD if:</strong> You want the fastest payback, you\'re career-pivoting within the same region (UAE → Europe, UAE → Asia), and you value the strongest international alumni network in under a year.</li>
  <li><strong>Pick LBS if:</strong> You want the full-brand MBA, target UK/European finance or consulting, and can absorb the highest upfront cost for strongest long-term brand equity.</li>
  <li><strong>Pick Rotman if:</strong> Canadian PR is a real life goal, you want a 2-year North American MBA at significantly lower cost than US peers, and you don\'t mind the slower post-MBA salary ramp.</li>
</ol>

<h2>Two things nobody talks about</h2>
<h3>1. Pre-MBA preparation cost</h3>
<p>GMAT prep (AED 15–30k), application consulting, essay fees, visa costs — budget another AED 40–80k <em>before</em> you even start.</p>
<h3>2. Spouse and dependent costs</h3>
<p>Moving with a spouse to London adds ~AED 150,000/year in costs the base models skip. Toronto is cheaper but still meaningful. Singapore (INSEAD Asia) is the most expensive family option.</p>

<h2>The bottom line</h2>
<p>For most Dubai-based professionals we meet with 5–8 years of experience, the right answer is one of: (a) INSEAD if speed matters, (b) LBS if brand matters, (c) Rotman if PR matters, or (d) <strong>no MBA at all</strong> — a category we quietly recommend to roughly a quarter of professionals who walk into our first consultations.</p>
<p>If you\'d like to run this spreadsheet against your actual salary, savings and career pivot — that\'s the conversation. Book it on the <a href="/contact.html">contact page</a>. The first 30 minutes are free.</p>

<hr>
<p><em>Figures in this article are composite 2026-cycle numbers from published employment reports and our own placement data. Individual results vary. Currency conversions at AED 3.67/USD, 4.63/GBP, 4.00/EUR, 2.72/CAD as of 5 March 2026.</em></p>
`
});

console.log('✓ Insights done');

// ═══════════════════════════════════════════════════════════════
// LEGAL PAGES
// ═══════════════════════════════════════════════════════════════

function legalPage(slug, title, lead, body) {
  const desc = `${title}. Legal information for eMBriture FZC, an independent global education consultancy in Sharjah, UAE.`;
  const crumbs = [{t:'Home',h:'/'},{t:title}];
  const crumbsHtml = crumbs.map((c,i)=>i===crumbs.length-1?`<span>${c.t}</span>`:`<a href="${c.h}">${c.t}</a><span>/</span>`).join('');
  const b = `<section class="page-hero"><div class="ph-inner"><nav class="breadcrumbs">${crumbsHtml}</nav><span class="ph-tag">Legal</span><h1 class="ph-title">${title}</h1><p class="ph-sub">${lead}</p><div class="ph-meta"><span>Last updated: 17 April 2026</span><span>Effective: 1 January 2026</span></div></div></section>
<article class="article">${body}</article>`;
  page(`${slug}.html`, `${title} | eMBriture`, desc, b);
}

legalPage('privacy', 'Privacy Policy',
  'This policy describes how eMBriture FZC collects, uses and protects personal data from students, parents and professionals who engage with our services or website.',
  `<h2>1. Who we are</h2>
<p>eMBriture FZC ("eMBriture", "we", "us", "our") is a free-zone company registered in the Sharjah Research, Technology and Innovation Park (SRTIP), Sharjah, United Arab Emirates, Block B-B07-98. We provide independent global education consultancy services.</p>
<h2>2. Data we collect</h2>
<p>We collect the following categories of personal data:</p>
<ul>
  <li><strong>Identity &amp; contact:</strong> Name, date of birth, nationality, passport details (when needed for visa work), email, phone, address.</li>
  <li><strong>Academic &amp; professional:</strong> Transcripts, test scores, CV, LORs, essays, application history.</li>
  <li><strong>Financial (when relevant):</strong> Income and asset information required for scholarship applications and financial aid forms (e.g. CSS Profile).</li>
  <li><strong>Communication:</strong> Messages exchanged by email, WhatsApp, in meetings and through our AI advisor.</li>
  <li><strong>Technical:</strong> IP address, browser information, cookies and usage analytics when you visit our website.</li>
</ul>
<h2>3. How we use your data</h2>
<p>We use your data to deliver the consultancy services you engage us for, including: preparing and submitting applications to universities, scholarship bodies and visa authorities on your instructions; contacting you about your consultations; improving our AI advisor and services; meeting legal, tax and regulatory obligations in the UAE.</p>
<h2>4. Data sharing</h2>
<p>We share your personal data only with (a) universities and scholarship bodies you instruct us to apply to; (b) visa authorities and consulates; (c) trusted third-party service providers (hosting, analytics, payment processing) bound by confidentiality obligations; (d) legal and regulatory authorities when required by law. We never sell your data. We never share data with universities for marketing purposes.</p>
<h2>5. Data retention</h2>
<p>We retain active client data for the duration of the engagement plus 7 years after the last interaction, as required for academic record accuracy, visa audit and tax compliance. You can request earlier deletion at any time where not inconsistent with those obligations.</p>
<h2>6. International transfers</h2>
<p>Because our services involve foreign universities and visa authorities, your data may be transferred outside the UAE to the country you\'re applying to. We only transfer data necessary for the specific application.</p>
<h2>7. Your rights</h2>
<p>You have the right to access the personal data we hold about you, to correct inaccurate data, to request deletion (subject to retention requirements above), and to withdraw consent for marketing communications at any time.</p>
<h2>8. Cookies &amp; website analytics</h2>
<p>Our website uses essential cookies for functionality and analytics cookies (Google Analytics or equivalent) to understand site usage. You can disable analytics cookies from your browser settings without affecting site functionality.</p>
<h2>9. Security</h2>
<p>We store client records in access-controlled systems with encryption in transit (TLS) and at rest. Physical files are stored in locked cabinets. Only team members working on your case have access.</p>
<h2>10. Contact us</h2>
<p>For privacy questions, data subject requests or complaints, contact our Data Protection contact at <a href="mailto:privacy@embriture.org">privacy@embriture.org</a> or write to the registered address above.</p>`);

legalPage('terms', 'Terms of Service',
  'These terms apply to your use of eMBriture\'s website, AI advisor and consultancy services. Please read them before engaging with our paid services.',
  `<h2>1. Agreement</h2>
<p>By using the eMBriture website or engaging our consultancy services, you agree to these Terms of Service. If you don\'t agree, don\'t use our services.</p>
<h2>2. Scope of services</h2>
<p>eMBriture provides education-consultancy services including university admissions advisory, scholarship guidance, test-preparation coaching, visa and pre-departure support, and related services. The specific services in your engagement will be set out in a separate Engagement Letter before work begins.</p>
<h2>3. Engagement Letter prevails</h2>
<p>Where these Terms conflict with the specific Engagement Letter signed between you and eMBriture, the Engagement Letter prevails.</p>
<h2>4. Client responsibilities</h2>
<p>You agree to provide accurate, complete and timely information and documentation. We are not responsible for application, scholarship or visa outcomes that are affected by inaccurate or incomplete information provided by you.</p>
<h2>5. No guaranteed outcomes</h2>
<p>Admissions, scholarship and visa decisions are made by third-party institutions — not by eMBriture. We do not and cannot guarantee any specific admission, scholarship, visa, or immigration outcome. Any illustrative statistics on our website reflect past performance and do not predict individual outcomes.</p>
<h2>6. Fees</h2>
<p>Fees are set in your Engagement Letter. Unless otherwise agreed, fees are payable in AED in line with the payment schedule in the Engagement Letter. Fees do not include third-party costs (e.g. university application fees, test fees, visa fees), which are your responsibility.</p>
<h2>7. No commission arrangements</h2>
<p>eMBriture does not receive commissions from universities in respect of client admissions. Our sole source of revenue is client fees set out in Engagement Letters. Any change to this policy would be disclosed clearly to existing and prospective clients.</p>
<h2>8. Intellectual property</h2>
<p>All content on this website, including text, designs, frameworks (ESCM™, ESPI™) and the AI advisor, is owned by eMBriture FZC or licensed to us. You may not copy, modify, distribute or create derivative works without written consent.</p>
<h2>9. AI advisor disclaimer</h2>
<p>Our AI advisor provides general educational information, indicative university data and preliminary matching. Its outputs are not a substitute for professional advice from a senior counsellor. Always verify critical information (fees, deadlines, visa rules) on official university and government websites.</p>
<h2>10. Third-party links</h2>
<p>Our website may link to third-party websites (universities, scholarships, government sources). eMBriture is not responsible for content or practices on those sites.</p>
<h2>11. Limitation of liability</h2>
<p>To the extent permitted by UAE law, eMBriture\'s aggregate liability to you in respect of any service is limited to the total fees you have paid for that service in the 12 months preceding the claim. We are not liable for indirect, consequential, or loss-of-opportunity damages.</p>
<h2>12. Termination</h2>
<p>Either party may terminate an engagement in line with the Engagement Letter. Refund treatment is set out in our <a href="/refunds.html">Refunds Policy</a>.</p>
<h2>13. Governing law</h2>
<p>These Terms are governed by the laws of the Emirate of Sharjah, United Arab Emirates. Disputes are subject to the exclusive jurisdiction of the courts of Sharjah, UAE.</p>
<h2>14. Updates</h2>
<p>We may update these Terms from time to time. Material changes will be notified to active clients by email. Continued use after notification constitutes acceptance.</p>
<h2>15. Contact</h2>
<p>For questions on these Terms, contact <a href="mailto:info@embriture.org">info@embriture.org</a>.</p>`);

legalPage('refunds', 'Refunds Policy',
  'This policy explains when and how refunds apply to eMBriture consultancy fees. It supplements — and is superseded by — the specific terms in your signed Engagement Letter.',
  `<h2>1. Scope</h2>
<p>This policy applies to fees paid to eMBriture FZC under an Engagement Letter for consultancy services. It does not apply to third-party fees (university application fees, test fees, visa fees, etc.), which are paid directly to those bodies and refunded only under their policies.</p>
<h2>2. Before services commence</h2>
<p>If you cancel within <strong>7 calendar days</strong> of signing the Engagement Letter and before any consultancy work has begun, we will refund 100% of fees paid, minus any third-party costs already incurred on your behalf.</p>
<h2>3. After services commence</h2>
<p>Once consultancy work has begun (e.g. the first working session is held, or a document draft is delivered), refunds are calculated pro-rata against work completed. Our standard position:</p>
<table>
  <thead><tr><th>Stage reached</th><th>Refund available</th></tr></thead>
  <tbody>
    <tr><td>Before first working session</td><td>100% minus non-refundable processing (10%)</td></tr>
    <tr><td>First session held; no drafts delivered</td><td>Up to 60%</td></tr>
    <tr><td>First drafts delivered, no applications submitted</td><td>Up to 40%</td></tr>
    <tr><td>Applications in progress or submitted</td><td>Non-refundable</td></tr>
  </tbody>
</table>
<h2>4. No-outcome guarantee</h2>
<p>We do not guarantee admission, scholarship or visa outcomes. A refund is <em>not</em> available on the basis that a university, scholarship body or visa authority did not make the decision you hoped for. Exceptions may apply for cases where we failed to deliver a service specifically listed in the Engagement Letter — in which case the specific remedy in the Engagement Letter controls.</p>
<h2>5. Test-preparation cohorts</h2>
<p>Test-prep cohort fees are refundable in full until the first session of your cohort. After the first session, they are non-refundable, except where eMBriture cancels the cohort — in which case a 100% refund or transfer to a later cohort is offered.</p>
<h2>6. Process to request a refund</h2>
<p>Submit a written request to <a href="mailto:info@embriture.org">info@embriture.org</a> stating the Engagement Letter reference and the reason for the request. We acknowledge within 2 working days and resolve within 14 working days.</p>
<h2>7. Refund method</h2>
<p>Refunds are processed to the original payment method where possible. Where this is not possible (e.g. expired cards), alternative bank transfer arrangements are made.</p>
<h2>8. Disputes</h2>
<p>Any dispute about a refund is handled under the "Governing law" clause of our <a href="/terms.html">Terms of Service</a>.</p>
<h2>9. Contact</h2>
<p>For refund queries, contact our billing team at <a href="mailto:billing@embriture.org">billing@embriture.org</a> or phone <a href="tel:+971543953695">+971 543 953 695</a>.</p>`);

console.log('✓ Legal pages done');
console.log('\n✅ All pages generated.');
