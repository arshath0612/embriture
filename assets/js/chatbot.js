// Embriture — chatbot engine
let convState='ask_name',openCount=0;
const profile={name:null,role:null,level:null,subject:null,subjectRaw:null,countries:[],budget:null,ielts:null};

const UNI_DATA=[
  {n:'University of Oxford',c:'UK',qs:3,ug:'£35,260–£59,260/yr',pg:'£27,000–£40,000/yr',mba:'£73,000 total',phd:'£8,000–£27,000/yr',live:'£1,425–£2,035/month',sc:'Clarendon (full tuition+stipend), Rhodes, Reach Oxford',ielts:'7.0 UG / 7.5 PG',tags:['mba','law','medicine','engineering','cs','humanities','economics']},
  {n:'University of Cambridge',c:'UK',qs:2,ug:'£24,507–£63,990/yr',pg:'£25,000–£45,000/yr',mba:'£69,000 total',phd:'£8,000–£28,000/yr',live:'£1,200–£1,800/month',sc:'Gates Cambridge (full funding), Cambridge Trust',ielts:'7.5',tags:['mba','law','medicine','engineering','cs','sciences','economics']},
  {n:'Imperial College London',c:'UK',qs:8,ug:'£35,100–£45,950/yr',pg:'£19,000–£38,000/yr',mba:'£53,500 total',live:'£1,500–£2,200/month',sc:"President's Scholarships, Schroder Scholarships",ielts:'6.5–7.0',tags:['engineering','cs','ai','medicine','mba','data science']},
  {n:'UCL (University College London)',c:'UK',qs:9,ug:'£24,600–£38,500/yr',pg:'£19,000–£36,000/yr',live:'£1,500–£2,200/month',sc:'UCL Global Engagement Funds, Denys Holland Scholarship',ielts:'6.5–7.5',tags:['law','medicine','engineering','arts','humanities']},
  {n:'University of Edinburgh',c:'UK',qs:27,ug:'£24,800–£35,800/yr',pg:'£19,000–£34,000/yr',mba:'available',live:'£1,000–£1,500/month',sc:'Global Online Learning Scholarships, Edinburgh Global Research Scholarships',ielts:'6.5',tags:['law','cs','medicine','mba','engineering','data science']},
  {n:'Khalifa University',c:'UAE',qs:'~180',ug:'AED 55,000–75,000/yr (~USD 15,000–20,400)',pg:'AED 60,000–90,000/yr',phd:'mostly fully funded',live:'AED 3,000–6,000/month',sc:'Multiple scholarships available',ielts:'6.0–6.5',tags:['engineering','cs','ai','medicine','phd','data science']},
  {n:'NYU Abu Dhabi (NYUAD)',c:'UAE',qs:'~70',ug:'Need-blind — 100% demonstrated need covered',pg:'USD 25,000–50,000/yr',live:'covered by financial aid',sc:'Need-blind: tuition ($56,000+), housing, meals, flights covered',ielts:'7.5',tags:['sciences','cs','humanities','economics','liberal arts']},
  {n:'UAEU (UAE University)',c:'UAE',qs:'~280',ug:'AED 40,000–65,000/yr (~USD 11,000–17,700)',pg:'AED 35,000–70,000/yr',live:'AED 2,000–4,000/month',sc:'Many scholarships available',ielts:'6.0',tags:['engineering','business','medicine','law']},
  {n:'American University of Sharjah (AUS)',c:'UAE',qs:'Top 5 Gulf',ug:'AED 48,000–70,000/yr (~USD 13,000–19,000)',pg:'AED 45,000–75,000/yr',live:'AED 2,500–4,500/month',sc:'Multiple scholarships',ielts:'6.0',tags:['architecture','engineering','business','arts','design']},
  {n:'Heriot-Watt University Dubai',c:'UAE',qs:'~285',ug:'AED 58,000–78,000/yr (~USD 15,800–21,200)',pg:'AED 60,000–100,000/yr',mba:'included in PG range',live:'AED 4,000–8,000/month',ielts:'6.0–6.5',tags:['engineering','cs','mba','business','data science']},
  {n:'University of Malaya (UM)',c:'Malaysia',qs:60,ug:'MYR 16,000–30,000/yr (~USD 3,500–6,500)',pg:'MYR 24,500–112,500/yr',mba:'MYR 79,100 total',phd:'MYR 12,000–25,000/yr',live:'MYR 1,500–3,000/month (~USD 330–660)',sc:'Various scholarships available',ielts:'6.0',tags:['engineering','cs','medicine','law','mba','phd','data science']},
  {n:'Monash University Malaysia',c:'Malaysia',qs:36,ug:'MYR 38,000–72,000/yr (~USD 8,400–15,900)',pg:'MYR 40,000–80,000/yr',live:'MYR 1,200–2,500/month',ielts:'6.0–7.0',tags:['engineering','cs','medicine','business','law','data science']},
  {n:'University of Nottingham Malaysia',c:'Malaysia',qs:'~100 (via Nottingham UK)',ug:'MYR 36,000–65,000/yr (~USD 8,000–14,400)',pg:'MYR 38,000–70,000/yr',live:'MYR 1,200–2,200/month',ielts:'6.0',tags:['engineering','cs','business','sciences']},
  {n:"Taylor's University",c:'Malaysia',qs:'Top 250 Asia',ug:'MYR 38,000–80,000/yr (~USD 8,400–17,700)',pg:'MYR 45,000–90,000/yr',mba:'included',live:'MYR 1,500–2,500/month',sc:'Multiple scholarships',ielts:'6.0',tags:['business','engineering','hospitality','law','medicine']},
  {n:'University of Melbourne',c:'Australia',qs:19,ug:'AUD 37,312–75,696/yr (~USD 24,000–49,000)',pg:'AUD 20,992–112,000/yr',mba:'AUD 95,000+ total',live:'AUD 21,000–30,000/yr',sc:'Melbourne International Undergraduate Scholarship (up to AUD 10,000/yr)',ielts:'6.5–7.5',tags:['engineering','medicine','law','mba','cs','architecture','data science']},
  {n:'UNSW Sydney',c:'Australia',qs:20,ug:'AUD 36,000–60,000/yr',pg:'AUD 28,000–55,000/yr',mba:'AUD 78,000 total',live:'AUD 22,000–32,000/yr',sc:'UNSW International Scholarships (10–25% fee reduction)',ielts:'6.5',tags:['engineering','cs','medicine','law','mba','data science']},
  {n:'Australian National University (ANU)',c:'Australia',qs:30,ug:'AUD 40,000–55,000/yr',pg:'AUD 35,000–55,000/yr',phd:'AUD 10,000–30,000/yr',live:'AUD 18,000–25,000/yr',sc:"ANU Chancellor's International Scholarship (25% tuition)",ielts:'6.5',tags:['sciences','engineering','cs','law','economics','phd']},
  {n:'University of Toronto',c:'Canada',qs:25,ug:'CAD 57,020–70,000/yr (~USD 42,000–51,000)',pg:'CAD 25,000–60,000/yr',mba:'CAD 126,000 total (Rotman)',phd:'partially funded',live:'CAD 1,200–2,500/month',sc:'Lester B. Pearson International Scholarship (full funding for UG)',ielts:'6.5',tags:['engineering','cs','medicine','law','mba','economics','data science']},
  {n:'UBC (University of British Columbia)',c:'Canada',qs:46,ug:'CAD 38,000–55,000/yr',pg:'CAD 22,000–45,000/yr',mba:'CAD 75,000 total',live:'CAD 1,500–2,800/month',sc:'International Major Entrance Scholarship (up to CAD 40,000/yr)',ielts:'6.5',tags:['engineering','cs','medicine','law','mba','sciences']},
  {n:'MIT',c:'USA',qs:1,ug:'USD 57,986/yr (need-blind for intl)',pg:'USD 59,750/yr',phd:'usually fully funded',live:'USD 2,500–4,500/month',sc:'Need-blind: covers 100% of demonstrated financial need',ielts:'varies',tags:['engineering','cs','ai','data science','sciences','economics']},
  {n:'Harvard University',c:'USA',qs:4,ug:'USD 59,076/yr (need-blind for intl)',pg:'USD 52,000–60,000/yr',mba:'USD 111,000 total',phd:'usually fully funded',live:'USD 2,800–5,000/month',sc:'Need-blind: covers 100% of demonstrated financial need',ielts:'varies',tags:['law','medicine','mba','economics','cs','humanities','sciences']},
  {n:'NUS (National University of Singapore)',c:'Singapore',qs:8,ug:'SGD 37,550–50,400/yr (~USD 27,800–37,300)',pg:'SGD 27,300–52,000/yr',mba:'SGD 72,000–80,000 total',phd:'mostly funded (SGD 2,000/month stipend)',live:'SGD 1,500–3,000/month',sc:'ASEAN Undergraduate Scholarship, NUS Graduate Scholarship',ielts:'6.5',tags:['engineering','cs','ai','medicine','mba','law','data science','economics']},
  {n:'NTU (Nanyang Technological University)',c:'Singapore',qs:15,ug:'SGD 35,540–46,200/yr (~USD 26,300–34,200)',pg:'SGD 28,000–48,000/yr',phd:'funded (SGD 2,000/month stipend)',live:'SGD 1,200–2,500/month',sc:'Nanyang Scholarship, ASEAN Undergraduate Scholarship',ielts:'6.0–6.5',tags:['engineering','cs','ai','business','sciences','data science']},
];

const CMAP={'uk':'UK','united kingdom':'UK','england':'UK','britain':'UK','uae':'UAE','dubai':'UAE','abu dhabi':'UAE','sharjah':'UAE','emirates':'UAE','malaysia':'Malaysia','kuala lumpur':'Malaysia','australia':'Australia','sydney':'Australia','melbourne':'Australia','canada':'Canada','toronto':'Canada','vancouver':'Canada','usa':'USA','united states':'USA','america':'USA',' us ':'USA','singapore':'Singapore'};
let GUIDE_TEXT='';
let GUIDE_CHUNKS=[];

const SUBJECT_MAP=[
  {tag:'cs',kw:['computer science','cs','software','it ','information technology','computing','programming','coding','cyber','network','artificial intelligence',' ai ']},
  {tag:'data science',kw:['data science','data analytics','big data','analytics','statistics']},
  {tag:'engineering',kw:['engineering','mechanical','civil','electrical','chemical','aerospace','mechatronics','robotics','structural']},
  {tag:'mba',kw:['mba','master of business','business administration','executive mba','emba']},
  {tag:'economics',kw:['economics','econometrics','commerce','business management','management']},
  {tag:'finance',kw:['finance','accounting','banking','investment','fintech','financial']},
  {tag:'medicine',kw:['medicine','mbbs','medical','doctor','pharmacy','nursing','healthcare','biomedical','dentist']},
  {tag:'law',kw:['law','llb','legal','solicitor','barrister','llm','criminology']},
  {tag:'architecture',kw:['architecture','urban planning','interior design','built environment']},
  {tag:'design',kw:['design','graphic design','product design','ux','ui','visual arts','animation']},
  {tag:'hospitality',kw:['hospitality','hotel','tourism','culinary','event management']},
  {tag:'sciences',kw:['physics','chemistry','biology','biochemistry','life sciences','natural sciences','environmental']},
  {tag:'humanities',kw:['humanities','history','philosophy','literature','languages','sociology','psychology','anthropology']},
];

function detectSubject(q){for(const s of SUBJECT_MAP){if(s.kw.some(k=>q.includes(k)))return s.tag;}return null;}
function detectCountries(q){const found=[];for(const[k,v]of Object.entries(CMAP)){if(q.includes(k)&&!found.includes(v))found.push(v);}return found;}
function initGuideKnowledge(){
  fetch('/assets/global-university-guide.txt')
    .then(r=>r.ok?r.text():'')
    .then(text=>{
      GUIDE_TEXT=text||'';
      GUIDE_CHUNKS=(GUIDE_TEXT||'')
        .split(/\n\s*\n/g)
        .map(s=>s.replace(/\s+/g,' ').trim())
        .filter(s=>s.length>100);
    })
    .catch(()=>{GUIDE_TEXT='';GUIDE_CHUNKS=[];});
}
function searchGuide(query){
  if(!GUIDE_CHUNKS.length)return null;
  const terms=(query||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(t=>t.length>=3);
  if(!terms.length)return null;
  const scored=GUIDE_CHUNKS.map(chunk=>{
    const l=chunk.toLowerCase();
    let score=0;
    for(const t of terms){
      if(l.includes(t))score+=2;
      const rx=new RegExp(`\\b${t}\\b`,'g');
      const m=l.match(rx);
      if(m)score+=m.length;
    }
    return {chunk,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,2);
  if(!scored.length)return null;
  return scored.map((x,i)=>`${i+1}) ${x.chunk.slice(0,420)}${x.chunk.length>420?'...':''}`).join('\n\n');
}

function handleName(raw){const cleaned=raw.trim().replace(/^(i'?m|i am|my name is|call me|it'?s|its)\s+/i,'');const first=cleaned.split(/[\s,]+/)[0];if(!first||first.length<2)return"I didn't catch that — could you tell me your name?";profile.name=first.charAt(0).toUpperCase()+first.slice(1).toLowerCase();convState='prequal_phone';return`Lovely to meet you, ${profile.name}! 😊\n\nBefore I generate your personalised recommendations, please share your **WhatsApp or phone number**.\n\n(e.g. +971 50 123 4567)`;}

function handleRole(q){const n=profile.name;if(/\b(1|student|studying|i want to study|i'?m a student)\b/.test(q)){profile.role='student';convState='ask_level';return`Great, ${n}! What level are you aiming for?\n\n1️⃣  Undergraduate (Bachelor's)\n2️⃣  Postgraduate / Master's\n3️⃣  PhD / Doctoral Research\n\nType 1, 2, or 3.`;}if(/\b(2|parent|my (child|son|daughter|kid))\b/.test(q)){profile.role='parent';convState='ask_level';return`Wonderful, ${n}! We love helping families make this important decision.\n\nWhat level is your child aiming for?\n\n1️⃣  Undergraduate (Bachelor's)\n2️⃣  Postgraduate / Master's\n3️⃣  PhD / Research\n\nType 1, 2, or 3.`;}if(/\b(3|professional|working|employed|career|executive|mba)\b/.test(q)){profile.role='professional';profile.level='mba';convState='ask_subject';return`Excellent, ${n}! For working professionals we specialise in MBA, Executive MBA, and specialist Master's programmes.\n\nWhat field interests you most?\n\n• Business / Management / Finance\n• Technology / Data Science / AI\n• Healthcare Management\n• Engineering Management\n• Other — just type it!\n\nWhat would you like to study?`;}return`Sorry ${n}, I didn't quite catch that. Please choose:\n1️⃣  Student\n2️⃣  Parent\n3️⃣  Working Professional`;}

function handleLevel(q){if(/\b(1|under|bachelor|ug|bsc|b\.a|b\.sc|beng|degree)\b/.test(q)){profile.level='ug';}else if(/\b(2|master|postgrad|pg|msc|m\.sc|ma |meng|taught)\b/.test(q)){profile.level='pg';}else if(/\b(3|phd|doctoral|doctorate|research degree|dphil)\b/.test(q)){profile.level='phd';}else if(/\bmba\b/.test(q)){profile.level='mba';}else{return`Please choose your study level:\n1️⃣  Undergraduate\n2️⃣  Postgraduate (Master's)\n3️⃣  PhD / Research`;}const who=profile.role==='parent'?'your child':'you';convState='ask_subject';return`What subject does ${who} want to study?\n\nExamples: Engineering, Computer Science, Business, Medicine, Law, Data Science, Architecture, Finance, Hospitality…\n\nJust type the subject!`;}

function handleSubject(q,raw){const tag=detectSubject(q);profile.subject=tag||q.trim();profile.subjectRaw=raw.trim();convState='ask_country';const label=(tag||raw.trim()).replace(/_/g,' ').toUpperCase();const n=profile.name;return`${label} — great choice, ${n}! 🌟\n\nAny preferred study destination? (pick one or more)\n\n🇬🇧 UK  |  🇦🇪 UAE  |  🇲🇾 Malaysia\n🇦🇺 Australia  |  🇨🇦 Canada  |  🇺🇸 USA  |  🇸🇬 Singapore\n\nOr type "open to all" and I'll suggest the best fit for your profile!`;}

function handleCountry(q){const open=/\b(open|all|any|suggest|recommend|no preference|don'?t mind|flexible)\b/.test(q);const detected=detectCountries(q);if(!open&&detected.length===0){return`I didn't catch a country, ${profile.name}. You can say:\n• "UK and Australia"\n• "Canada"\n• "Open to all suggestions"\n\nWhich do you prefer?`;}profile.countries=open?[]:detected;convState='ask_budget';const cText=profile.countries.length?profile.countries.join(', '):'all countries';return`${open?'Open to all — I\'ll find the best fit! 🌍':`${cText} — noted! 🌍`}\n\nWhat is your approximate annual tuition budget?\n\n1️⃣  Under $15,000 / year — Budget-friendly\n2️⃣  $15,000 – $35,000 / year — Mid-range\n3️⃣  $35,000+ / year — Premium\n4️⃣  Scholarships essential — I need financial aid\n\nType 1, 2, 3, or 4.`;}

function handleBudget(q){if(/\b(4|scholarship|financial aid|bursary|free|fund|no money|can'?t afford)\b/.test(q)){profile.budget='scholarship';}else if(/\b(1|low|budget|cheap|affordable|under|less than|tight)\b/.test(q)){profile.budget='low';}else if(/\b(2|mid|moderate|medium|reasonable)\b/.test(q)){profile.budget='mid';}else if(/\b(3|high|premium|top|best|no limit|any)\b/.test(q)){profile.budget='high';}else{const num=parseInt(q.replace(/[^0-9]/g,''));if(!isNaN(num)){profile.budget=num<15000?'low':num<35000?'mid':'high';}else{return`Please choose your annual tuition budget:\n1️⃣  Under $15,000/year\n2️⃣  $15,000–$35,000/year\n3️⃣  $35,000+/year\n4️⃣  Need scholarships / financial aid`;}}const who=profile.role==='parent'?'your child':'you';convState='ask_ielts';return`Almost there, ${profile.name}! 🎯\n\nDoes ${who} have an English test score?\n\n• Type your IELTS score (e.g. "6.5" or "7.0")\n• Type "planning" if you plan to take it soon\n• Type "no" if not yet taken\n\nThis helps match universities accurately!`;}

function handleIelts(q){const scoreMatch=q.match(/\b([4-9](\.\d)?)\b/);if(scoreMatch&&parseFloat(scoreMatch[1])>=4.0&&parseFloat(scoreMatch[1])<=9.0){profile.ielts=parseFloat(scoreMatch[1]);}else if(/\b(planning|plan|will|going to|soon|preparing|prep)\b/.test(q)){profile.ielts='planning';}else if(/\b(no|not|none|haven'?t|don'?t|nope|na)\b/.test(q)){profile.ielts='none';}else{return`Please let me know your IELTS status:\n• Type your score, e.g. "6.5"\n• Type "planning" if preparing\n• Type "no" if not taken yet`;}convState='open';return buildRecommendations();}

function buildRecommendations(){
  let unis=[...UNI_DATA];
  if(profile.countries.length>0)unis=unis.filter(u=>profile.countries.includes(u.c));
  const subTag=profile.subject;
  if(subTag){const bySub=unis.filter(u=>u.tags&&(u.tags.includes(subTag)||u.tags.some(t=>subTag.includes(t))));if(bySub.length>=2)unis=bySub;}
  if(profile.level==='phd')unis=unis.filter(u=>u.phd||u.tags.includes('phd'));
  if(profile.level==='mba')unis=unis.filter(u=>u.mba||u.tags.includes('mba'));
  if(profile.budget==='low'){const aff=unis.filter(u=>['Malaysia','UAE'].includes(u.c));if(aff.length>=2)unis=[...aff,...unis.filter(u=>!['Malaysia','UAE'].includes(u.c))];}
  else if(profile.budget==='scholarship'){const withSc=unis.filter(u=>u.sc);if(withSc.length>=2)unis=withSc;}
  if(typeof profile.ielts==='number'){const score=profile.ielts;const eligible=unis.filter(u=>{if(!u.ielts)return true;const m=u.ielts.match(/(\d+\.?\d*)/);return!m||score>=parseFloat(m[1]);});if(eligible.length>=2)unis=eligible;}
  const top=unis.slice(0,4);
  if(top.length===0)return freeResponse("tell me about universities");
  const who=profile.role==='parent'?'your child':profile.name;
  const levelLabel={ug:"Bachelor's",pg:"Master's",mba:'MBA',phd:'PhD'}[profile.level]||'programme';
  const subjectLabel=(profile.subjectRaw||profile.subject||'your chosen field').replace(/_/g,' ');
  let r=`✨ Here are my top picks for ${who} — ${levelLabel} in ${subjectLabel}:\n\n`;
  top.forEach((u,i)=>{
    const fees=profile.level==='ug'?u.ug:profile.level==='mba'?(u.mba||u.pg):profile.level==='phd'?(u.phd||u.pg):u.pg;
    r+=`${i+1}. ${u.n} (${u.c})\n`;
    r+=`   📊 QS Ranking: #${u.qs}\n`;
    r+=`   💰 Fees: ${fees||'Contact for details'}\n`;
    r+=`   🏠 Living costs: ${u.live||'Varies'}\n`;
    if(u.sc)r+=`   🎓 Scholarships: ${u.sc}\n`;
    r+=`   📝 IELTS req: ${u.ielts||'Check website'}\n\n`;
  });
  if(profile.ielts==='none')r+=`⚠️  You haven't taken IELTS yet — we offer preparation courses! Ask me about test prep.\n\n`;
  if(profile.ielts==='planning')r+=`📝 Once you have your IELTS score I can further shortlist options.\n\n`;
  r+=`Is there anything you'd like to explore further?\n• 📋 Compare two of these universities\n• 💰 Scholarships & financial aid details\n• 🗺️ Post-study work visa options\n• 📅 Application timelines & deadlines\n\nJust ask — or type "ready" to speak with one of our counsellors!`;
  convState='ask_followup';
  return r;
}

function freeResponse(query){
  const q=query.toLowerCase();
  const country=detectCountries(q)[0]||null;
  const subject=detectSubject(q);
  if(/\b(work visa|post.study work|graduate visa|pgwp|opt visa|stay after|work after|work permit)\b/.test(q)){return"Post-study work options by country:\n\n🇨🇦 Canada — PGWP up to 3 years\n🇦🇺 Australia — Graduate Visa (485): 2–4 years\n🇬🇧 UK — Graduate Route: 2 years (3 for PhD)\n🇺🇸 USA — OPT 1 year; STEM OPT +2 years\n🇸🇬 Singapore — 12-month Long-Term Visit Pass\n🇲🇾 Malaysia — Employment Pass available post-study\n🇦🇪 UAE — Residence visa tied to employer\n\nFor personalised visa advice: info@embriture.org | (+971) 543 953 695.";}
  if(/\b(ielts|toefl|english (req|requirement)|language req)\b/.test(q)){const unis=country?UNI_DATA.filter(u=>u.c===country):UNI_DATA;return`IELTS requirements${country?' — '+country:''}:\n\n`+unis.map(u=>`• ${u.n}: IELTS ${u.ielts}`).join('\n')+'\n\nRequirements vary by programme — always confirm on the university website.';}
  if(/\b(scholarship|financial aid|funding|grant|bursary|free tuition)\b/.test(q)){const unis=country?UNI_DATA.filter(u=>u.c===country):UNI_DATA;return`Scholarships${country?' in '+country:''}:\n\n`+unis.filter(u=>u.sc).map(u=>`• ${u.n} (${u.c}):\n  ${u.sc}`).join('\n\n')+'\n\nFor personalised scholarship guidance: info@embriture.org | (+971) 543 953 695.';}
  if(/\b(deadline|timeline|when to apply|application date|intake|semester start)\b/.test(q)){return"Typical application timelines:\n\n🇬🇧 UK (UCAS) — Jan 2026 deadline for Sep 2026 entry\n🇦🇺 Australia — Multiple intakes: Feb & July; apply 6 months ahead\n🇨🇦 Canada — Jan–Mar for Sep intake; Sep–Nov for Jan intake\n🇺🇸 USA — Nov–Jan (Early/Regular Decision) for Sep entry\n🇸🇬 Singapore — Feb–Mar for Aug intake\n🇲🇾 Malaysia — Intakes in Jan, May, Sep; apply 3 months ahead\n🇦🇪 UAE — Sep & Jan intakes; apply 2–4 months ahead\n\nWe guide you through every deadline. Contact info@embriture.org or (+971) 543 953 695.";}
  if(/\b(accommodation|housing|hostel|dormitory|rent|living|where to stay)\b/.test(q)){return"Living costs overview (per month):\n\n🇬🇧 UK — £1,000–£2,200 (London higher)\n🇦🇪 UAE — AED 2,500–8,000 (~USD 680–2,180)\n🇲🇾 Malaysia — MYR 1,200–2,500 (~USD 260–540) 🏆 Most affordable\n🇦🇺 Australia — AUD 1,750–2,700 (~USD 1,150–1,770)\n🇨🇦 Canada — CAD 1,200–2,500 (~USD 880–1,840)\n🇺🇸 USA — USD 1,500–3,500 (varies by city)\n🇸🇬 Singapore — SGD 1,500–3,000 (~USD 1,100–2,200)\n\nWe also assist with pre-arranged accommodation. Ask us: info@embriture.org | (+971) 543 953 695.";}
  if(/\b(vs|versus|compare|difference between|which is better)\b/.test(q)){const found=detectCountries(q);if(found.length>=2){const buildCol=(c)=>{let list=UNI_DATA.filter(u=>u.c===c);if(subject)list=list.filter(u=>u.tags&&u.tags.includes(subject));return list.slice(0,3).map(u=>`  • ${u.n} — UG: ${u.ug||'N/A'} | Living: ${u.live||'N/A'}`).join('\n');};return`Comparing ${found[0]} vs ${found[1]}${subject?' for '+subject.toUpperCase().replace(/_/g,' '):''}:\n\n📍 ${found[0]}:\n${buildCol(found[0])}\n\n📍 ${found[1]}:\n${buildCol(found[1])}\n\nWant a personalised comparison? Contact info@embriture.org | (+971) 543 953 695.`;}}
  if(/\b(fee|cost|tuition|price|affordable|cheap|expensive)\b/.test(q)){const unis=country?UNI_DATA.filter(u=>u.c===country):UNI_DATA.slice(0,8);return`Fees${country?' — '+country:''}:\n\n`+unis.map(u=>`• ${u.n}\n  UG: ${u.ug||'N/A'} | PG: ${u.pg||'N/A'}${u.mba?' | MBA: '+u.mba:''}\n  Living: ${u.live||'N/A'}`).join('\n\n')+'\n\nNeed help budgeting? info@embriture.org | (+971) 543 953 695.';}
  if(/\b(mba|executive mba|emba|master of business)\b/.test(q)){const unis=UNI_DATA.filter(u=>u.tags.includes('mba')&&(!country||u.c===country));return`MBA programmes${country?' in '+country:''}:\n\n`+unis.slice(0,7).map((u,i)=>`${i+1}. ${u.n} (${u.c}) — ${u.mba||u.pg||'contact for fees'}`).join('\n')+'\n\nFor Executive MBA options: info@embriture.org | (+971) 543 953 695.';}
  if(/\b(top|best|rank|leading)\b/.test(q)&&!country&&!subject){return"Top-ranked partner universities:\n\n1. MIT (USA) — QS #1\n2. University of Cambridge (UK) — QS #2\n3. University of Oxford (UK) — QS #3\n4. Harvard University (USA) — QS #4\n5. Imperial College London (UK) — QS #8\n6. NUS Singapore — QS #8\n7. NTU Singapore — QS #15\n8. University of Melbourne (Australia) — QS #19\n9. UNSW Sydney (Australia) — QS #20\n10. UBC Canada — QS #46\n\nTell me your country preference or subject for personalised picks!";}
  let results=UNI_DATA;
  if(country)results=results.filter(u=>u.c===country);
  if(subject)results=results.filter(u=>u.tags&&u.tags.includes(subject));
  if(results.length===0)results=country?UNI_DATA.filter(u=>u.c===country):UNI_DATA.slice(0,5);
  if(results.length>0){const label=subject?subject.replace(/_/g,' ').toUpperCase():'your studies';const place=country||'our partner countries';return`Universities for ${label} in ${place}:\n\n`+results.slice(0,5).map((u,i)=>`${i+1}. ${u.n} (${u.c}) — QS #${u.qs}\n   Fees: ${u.ug||u.pg||'contact'} | IELTS: ${u.ielts||'varies'}`).join('\n\n')+'\n\nWant more details? info@embriture.org | (+971) 543 953 695.';}
  const guideAnswer=searchGuide(q);
  if(guideAnswer){
    return`From our Global University Guide (official-source compilation), here are the most relevant sections:\n\n${guideAnswer}\n\nIf you want, I can now narrow this down by country, subject, budget and IELTS for your exact profile.`;
  }
  const greeting=profile.name?`${profile.name}, I`:'I';
  return`${greeting} have information on universities across 7 countries.\n\nTry asking:\n• "Universities in UK for engineering"\n• "MBA programmes in Canada"\n• "Fees for studying in Malaysia"\n• "Scholarships for international students"\n• "Post-study work visa options"\n• "Compare UK vs Australia"\n\nOr contact: info@embriture.org | (+971) 543 953 695.`;
}

function withCounsellingNudge(response){
  openCount++;
  if(openCount>=1&&convState==='ask_followup'){
    convState='suggest_call';
    const n=profile.name?`, ${profile.name}`:'';
    response+=`\n\n─────────────────────────\n💬 I think I've given you a solid starting picture${n}. The next best step is a free 30-minute counselling call with one of our expert advisors — they'll review your full profile and map out your application timeline.\n\nType "book a call" or "yes" and I'll share the details!`;
  }
  return response;
}

function suggestCall(){
  convState='ask_phone';
  const n=profile.name?`${profile.name}`:'there';
  return`🎓 Brilliant, ${n}! Let's get you booked in.\n\nTo confirm your free 30-minute counselling call, please share your **WhatsApp or phone number** so our counsellor can reach you:\n\n(e.g. +971 50 123 4567)`;
}

function handlePhone(raw){
  const cleaned=raw.trim();
  if(!/[\d]{5,}/.test(cleaned.replace(/[\s\+\-\(\)]/g,''))){
    return`Please share a valid phone number so we can reach you 😊\n(e.g. +971 50 123 4567 or just your local number)`;
  }
  profile.phone=cleaned;
  convState='ask_email';
  return`Got it! 📧 And your email address? (So we can send you a confirmation and any resources before the call)`;
}

function handleEmail(raw){
  const cleaned=raw.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)){
    return`Please enter a valid email address 😊\n(e.g. yourname@gmail.com)`;
  }
  profile.email=cleaned;
  convState='ask_meeting';
  return`Perfect! 📅 When's a good time for you?\n\nFor example:\n• "Weekday mornings"\n• "Monday or Tuesday afternoon"\n• "Anytime this week"\n• "Saturday morning"\n\nOur team is available Sun–Thu 9 AM–6 PM and Sat 10 AM–2 PM (GST).`;
}

function handlePrequalPhone(raw){
  const cleaned=raw.trim();
  if(!/[\d]{5,}/.test(cleaned.replace(/[\s\+\-\(\)]/g,''))){
    return`Please share a valid phone number so I can continue 😊\n(e.g. +971 50 123 4567)`;
  }
  profile.phone=cleaned;
  convState='prequal_email';
  return`Perfect, ${profile.name}! 📧\n\nNow please share your email address to continue with your personalised recommendations.`;
}

function handlePrequalEmail(raw){
  const cleaned=raw.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)){
    return`Please enter a valid email address 😊\n(e.g. yourname@gmail.com)`;
  }
  profile.email=cleaned;
  convState='ask_role';
  return`Great — verified ✅\n\nTo personalise your recommendations, are you:\n\n1️⃣  A student planning to study abroad\n2️⃣  A parent researching options for your child\n3️⃣  A working professional seeking an MBA or advanced degree\n\nType 1, 2, or 3 — or describe yourself!`;
}

function handleMeeting(raw){
  profile.meetingPref=raw.trim();
  convState='done';
  submitLead();
  const n=profile.name||'there';
  const subjectLabel=(profile.subjectRaw||profile.subject||'your chosen field').replace(/_/g,' ');
  const levelLabel={ug:"Bachelor's",pg:"Master's",mba:'MBA',phd:'PhD'}[profile.level]||'programme';
  return`✅ You're all set, ${n}!\n\nHere's your booking summary:\n👤 Name: ${n}\n📞 Contact: ${profile.phone}\n📧 Email: ${profile.email}\n🎯 Goal: ${profile.level?levelLabel+' in '+subjectLabel:'Explore options'}${profile.countries.length?'\n🌍 Destinations: '+profile.countries.join(', '):''}\n🕐 Preferred time: ${profile.meetingPref}\n\nOne of our counsellors will call or WhatsApp you within **24 hours** to confirm.\n\n─────────────────────────\n📞  (+971) 543 953 695\n✉️  info@embriture.org\n📍  Block B-B07-98, SRTIP, University City, Sharjah\n\nWe look forward to helping you reach your goals! ✦`;
}

let leadSubmitted=false;
async function submitLead(){
  if(leadSubmitted)return;
  leadSubmitted=true;
  try{await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json','X-API-Key':'emb-api-key-2025'},body:JSON.stringify({name:profile.name,role:profile.role,level:profile.level,subject:profile.subject,subjectRaw:profile.subjectRaw,countries:profile.countries,budget:profile.budget,ielts:profile.ielts,phone:profile.phone||null,email:profile.email||null,meetingPref:profile.meetingPref||null})});}catch(e){leadSubmitted=false;}
}

function processInput(raw){
  const q=raw.toLowerCase().trim();
  if(convState==='prequal_phone'){return handlePrequalPhone(raw);}
  if(convState==='prequal_email'){return handlePrequalEmail(raw);}
  if(convState==='ask_phone'){return handlePhone(raw);}
  if(convState==='ask_email'){return handleEmail(raw);}
  if(convState==='ask_meeting'){return handleMeeting(raw);}
  if(convState==='suggest_call'||/\b(book|yes|sure|ready|call|speak|counsell?or|connect|talk to|contact)\b/.test(q)){
    if(convState==='suggest_call'||convState==='ask_followup'){return suggestCall();}
  }
  if(convState==='done'){return`We look forward to speaking with you, ${profile.name||'there'}! 😊\n\nCall or WhatsApp: (+971) 543 953 695\nEmail: info@embriture.org\n\nIs there anything else I can help you with before your call?`;}
  const isFreeQ=convState==='open'||convState==='ask_followup'||(convState!=='ask_name'&&convState!=='ask_role'&&/\b(fee|cost|scholarship|visa|compare|vs |ielts|mba|phd|ranking|deadline|accommodation|hostel|intake|apply|university|universities|top|best)\b/.test(q));
  if(isFreeQ&&convState!=='ask_name'&&convState!=='ask_role'){return withCounsellingNudge(freeResponse(raw));}
  switch(convState){
    case'ask_name':return handleName(raw);
    case'ask_role':return handleRole(q);
    case'ask_level':return handleLevel(q);
    case'ask_subject':return handleSubject(q,raw);
    case'ask_country':return handleCountry(q);
    case'ask_budget':return handleBudget(q);
    case'ask_ielts':return handleIelts(q);
    case'ask_followup':return withCounsellingNudge(freeResponse(raw));
    case'open':return withCounsellingNudge(freeResponse(raw));
    default:return freeResponse(raw);
  }
}

async function callAI(msg){await new Promise(r=>setTimeout(r,500+Math.random()*400));return processInput(msg);}

const PLACEHOLDERS={ask_name:'Type your name to get started…',prequal_phone:'Enter your WhatsApp / phone number…',prequal_email:'Enter your email address…',ask_role:'Type 1, 2, or 3…',ask_level:'Type 1, 2, or 3…',ask_subject:'e.g. Engineering, Computer Science, Medicine…',ask_country:'e.g. UK, Canada, open to all…',ask_budget:'Type 1, 2, 3, or 4…',ask_ielts:'e.g. 6.5  or  planning  or  no',ask_followup:'Ask a follow-up, or type "ready" to book a call…',suggest_call:'Type "yes" to book your free counselling call…',ask_phone:'Enter your WhatsApp / phone number…',ask_email:'Enter your email address…',ask_meeting:'e.g. Monday morning, weekday afternoon, anytime…',done:'Any other questions before your call?',open:'Ask anything — fees, scholarships, visas, deadlines…'};

const QUICK_BY_STATE={
  ask_name:[
    {label:'My name is Rahul',value:'My name is Rahul'},
    {label:'My name is Aisha',value:'My name is Aisha'},
    {label:'My name is Zainab',value:'My name is Zainab'},
    {label:'My name is Harsha',value:'My name is Harsha'}
  ],
  prequal_phone:[
    {label:'+971 50 123 4567',value:'+971 50 123 4567'},
    {label:'+91 98765 43210',value:'+91 98765 43210'}
  ],
  prequal_email:[
    {label:'name@gmail.com',value:'name@gmail.com'},
    {label:'name@outlook.com',value:'name@outlook.com'}
  ],
  ask_role:[
    {label:"I'm a student",value:'I am a student'},
    {label:"I'm a parent",value:'I am a parent'},
    {label:"I'm a professional",value:'I am a working professional'}
  ],
  ask_level:[
    {label:"Undergraduate",value:'1'},
    {label:"Master's",value:'2'},
    {label:'PhD',value:'3'}
  ],
  ask_country:[
    {label:'UK',value:'UK'},
    {label:'Canada',value:'Canada'},
    {label:'Australia',value:'Australia'},
    {label:'Open to all',value:'open to all'}
  ],
  ask_budget:[
    {label:'Under $15k',value:'1'},
    {label:'$15k-$35k',value:'2'},
    {label:'$35k+',value:'3'},
    {label:'Need scholarship',value:'4'}
  ],
  ask_ielts:[
    {label:'IELTS 6.5',value:'6.5'},
    {label:'Planning to take IELTS',value:'planning'},
    {label:'Not taken yet',value:'no'}
  ],
  ask_followup:[
    {label:'Compare top options',value:'Compare these universities'},
    {label:'Scholarship details',value:'What scholarships are available?'},
    {label:'Post-study visa options',value:'Post-study work visa options'},
    {label:'Ready to book call',value:'ready'}
  ],
  suggest_call:[
    {label:'Yes, book my call',value:'yes'}
  ],
  ask_meeting:[
    {label:'Weekday morning',value:'Weekday morning'},
    {label:'Weekday evening',value:'Weekday evening'},
    {label:'Saturday morning',value:'Saturday morning'},
    {label:'Anytime this week',value:'Anytime this week'}
  ]
};

function renderQuickOptions(){
  const qr=document.getElementById('quickRow');
  if(!qr)return;
  const options=QUICK_BY_STATE[convState]||[];
  if(!options.length){
    qr.style.display='none';
    qr.innerHTML='';
    return;
  }
  qr.style.display='flex';
  qr.innerHTML=options.map(o=>`<button class="qbtn" onclick="sendQuick(${JSON.stringify(o.value)})">${o.label}</button>`).join('');
}

function appendMsg(text,role){
  const msgs=document.getElementById('chatMessages');
  const div=document.createElement('div');div.className='msg '+role;
  const ava=document.createElement('div');ava.className='msg-av';ava.textContent=role==='ai'?'🎓':'👤';
  const wrap=document.createElement('div');
  const bub=document.createElement('div');bub.className='bubble';bub.style.whiteSpace='pre-wrap';
  bub.innerHTML=text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  wrap.appendChild(bub);div.appendChild(ava);div.appendChild(wrap);
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}

function showTyping(){
  const msgs=document.getElementById('chatMessages');
  const div=document.createElement('div');div.className='msg ai';div.id='typingIndicator';
  const ava=document.createElement('div');ava.className='msg-av';ava.textContent='🎓';
  const wrap=document.createElement('div');
  const bub=document.createElement('div');bub.className='bubble';
  bub.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';
  wrap.appendChild(bub);div.appendChild(ava);div.appendChild(wrap);
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}

function removeTyping(){const t=document.getElementById('typingIndicator');if(t)t.remove();}

async function sendMessage(){
  const input=document.getElementById('chatInput');
  const text=input.value.trim();if(!text)return;
  input.value='';
  appendMsg(text,'user');showTyping();
  const reply=await callAI(text);
  removeTyping();appendMsg(reply,'ai');
  input.placeholder=PLACEHOLDERS[convState]||'Ask anything…';
  renderQuickOptions();
}

function sendQuick(text){
  document.getElementById('chatInput').value=text;
  sendMessage();
}

document.addEventListener('DOMContentLoaded',()=>{
  const input=document.getElementById('chatInput');
  if(input)input.placeholder=PLACEHOLDERS[convState]||'Ask anything…';
  initGuideKnowledge();
  renderQuickOptions();
});
