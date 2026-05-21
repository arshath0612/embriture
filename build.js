const fs = require('fs');
const path = require('path');

const SITE = 'https://www.embriture.org';
const PHONE = '+971 543 953 695';
const EMAIL = 'info@embriture.org';
const LASTMOD = '2026-04-17';

const destinations = [
  {
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tagline: 'The densest one-year Master\'s and scholarship ecosystem in Europe.',
    summary: 'The UK remains the sharpest option for families who want academic prestige, predictable timelines and fast entry into global labour markets. For UAE students, it is still the cleanest route to top-brand universities without committing to four years of undergraduate cost.',
    stats: [
      ['1 year', 'Most taught Master\'s'],
      ['2-3 years', 'Graduate Route work visa'],
      ['Sept / Jan', 'Primary intakes'],
      ['£24k-£60k', 'Typical annual tuition'],
    ],
    why: [
      'Three-year undergraduate structures can reduce total cost.',
      'Elite scholarships include Clarendon, Rhodes, Gates Cambridge and university trust awards.',
      'The Graduate Route creates a cleaner post-study work bridge than most European markets.',
      'Research-heavy students have strong funded PhD options in Russell Group labs.',
    ],
    universities: [
      ['University of Oxford', 'Economics, PPE, Law, Medicine, CS', '£35k-£59k', 'Clarendon, Reach Oxford, Rhodes'],
      ['University of Cambridge', 'Engineering, Sciences, Humanities', '£24k-£64k', 'Gates Cambridge, Cambridge Trust'],
      ['Imperial College London', 'Engineering, AI, Data, Medicine', '£35k-£46k', 'President\'s Scholarships'],
      ['University College London', 'Law, Architecture, Public Health', '£24k-£39k', 'Denys Holland, UCL awards'],
    ],
    admissions: [
      'Shortlist by May-June for undergraduate or September for taught postgraduate entry the following year.',
      'Draft UCAS or direct-application essays by August to stay ahead of medicine, Oxbridge and selective scholarship rounds.',
      'Lock IELTS/TOEFL by September for undergraduates and by November for Master\'s applicants.',
      'Treat accommodation and CAS preparation as part of the admissions project, not an afterthought.',
    ],
    costs: 'For most UAE families, realistic all-in annual spend sits between £36,000 and £72,000 depending on city, course and lifestyle. London premiums are real; Manchester, Birmingham, Leeds and Glasgow materially change the math.',
    visa: 'The Student visa is document-heavy but manageable when funds are planned early. The Graduate Route currently offers two years of post-study work for taught graduates and three years for doctoral graduates.',
    fit: 'Best for students who value brand-heavy universities, fast degrees, strong research depth and a mature international student ecosystem.',
  },
  {
    slug: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    tagline: 'Maximum flexibility, maximum upside, and the widest spread between average and exceptional outcomes.',
    summary: 'The US is where we send students when the goal is breadth, research access, need-based aid at the top end, or deep STEM and entrepreneurship pipelines. It is also the market where bad advising hurts the most, because the variance between institutions is enormous.',
    stats: [
      ['4,000+', 'Institutions'],
      ['1-3 years', 'OPT / STEM OPT'],
      ['Fall / Spring', 'Primary intakes'],
      ['USD 25k-85k', 'Typical annual tuition'],
    ],
    why: [
      'Holistic admissions reward strong stories, not just marks.',
      'Need-blind or high-aid institutions can outperform "cheaper" countries for the right student.',
      'Undergraduate flexibility lets students explore before committing to a major.',
      'Research labs, internships and startup ecosystems are unusually mature.',
    ],
    universities: [
      ['MIT', 'Engineering, AI, Economics, Physics', 'USD 58k', 'Need-based aid, research assistantships'],
      ['Harvard University', 'Law, Government, Economics, Medicine', 'USD 59k', 'Need-based aid, fellowships'],
      ['Stanford University', 'CS, Design, Business, Bioengineering', 'USD 62k', 'Need-based aid, merit pockets'],
      ['University of Michigan', 'Engineering, Business, Public Policy', 'USD 58k-62k', 'Departmental awards'],
    ],
    admissions: [
      'For undergraduate applicants, begin profile-building 12-18 months before application deadlines.',
      'Use Early Action or Early Decision only when the institution is strategically justified.',
      'Treat essays, activity framing and recommendation management as core assets, not admin.',
      'Map visa, internships and employability before selecting a college list.',
    ],
    costs: 'Sticker price shocks many families, but net price can vary dramatically. A student with a strong profile and legitimate demonstrated need may pay less at an elite private than at a mid-tier public.',
    visa: 'F-1 remains the main pathway. OPT offers one year of work authorization after study, with STEM fields often extending to three years total under STEM OPT.',
    fit: 'Best for ambitious students seeking flexibility, undergraduate exploration, research or high-variance upside.',
  },
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'A balanced market for quality, safety and long-term migration planning.',
    summary: 'Canada is still one of the most practical destinations for families who want a reputable education with credible post-study work and immigration logic. It is less theatrical than the US or UK, but often more stable in real-life outcomes.',
    stats: [
      ['Up to 3 years', 'PGWP duration'],
      ['Sept / Jan / May', 'Main intakes'],
      ['CAD 22k-70k', 'Typical tuition'],
      ['Strong', 'PR planning relevance'],
    ],
    why: [
      'Good balance of university reputation and work-rights logic.',
      'Safer cost profile than the US for many middle- and upper-middle-income families.',
      'Strong outcomes in engineering, analytics, business and health-adjacent fields.',
      'Culturally comfortable landing for families from the GCC and India.',
    ],
    universities: [
      ['University of Toronto', 'Engineering, Rotman, Life Sciences', 'CAD 57k-70k', 'Lester B. Pearson'],
      ['UBC', 'Engineering, Forestry, Sustainability, CS', 'CAD 38k-55k', 'IMES, major entrance awards'],
      ['McGill University', 'Medicine, Law, Arts, Economics', 'CAD 25k-55k', 'Merit scholarships'],
      ['University of Waterloo', 'Engineering, CS, Co-op', 'CAD 48k-65k', 'Entrance scholarships'],
    ],
    admissions: [
      'Plan transcripts, predicted grades and academic references early because many Canadian systems move quickly once applications open.',
      'Prioritise institutions with structured co-op or internship pathways if ROI matters.',
      'Build a funding proof strategy well before permit filing.',
      'Use programme-level selection, not just university brand, to improve employability.',
    ],
    costs: 'A realistic annual budget usually ranges from CAD 38,000 to CAD 78,000 including living costs, with Toronto and Vancouver at the top end. Co-op can materially improve payback.',
    visa: 'Study permit processing is sensitive to document cleanliness and funding logic. Post-study pathways remain a major draw, though policy changes mean programme selection matters more than before.',
    fit: 'Best for students seeking practical employability, relatively clear migration logic and a socially comfortable environment.',
  },
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'High-quality teaching, strong lifestyle fit, and a pragmatic post-study work market.',
    summary: 'Australia works well for families who want globally recognised universities, English-speaking comfort, and a more balanced student experience than the UK\'s compressed pace. It performs especially well for business, engineering, health sciences and design-driven degrees.',
    stats: [
      ['2-4 years', 'Subclass 485 work visa'],
      ['Feb / July', 'Main intakes'],
      ['AUD 28k-76k', 'Typical tuition'],
      ['High', 'Student wellbeing appeal'],
    ],
    why: [
      'Clear academic calendars and a strong support ecosystem for international students.',
      'Respected Group of Eight universities across multiple disciplines.',
      'Good blend of academic rigour, part-time work and liveability.',
      'Appealing for families prioritising safety, climate and lifestyle as well as rankings.',
    ],
    universities: [
      ['University of Melbourne', 'Medicine, Law, Business, Data', 'AUD 37k-76k', 'International scholarships'],
      ['UNSW Sydney', 'Engineering, Analytics, Business', 'AUD 36k-60k', 'UNSW International awards'],
      ['ANU', 'Policy, Sciences, Economics, Research', 'AUD 35k-55k', 'Chancellor\'s scholarship'],
      ['Monash University', 'Pharmacy, Engineering, Business', 'AUD 32k-58k', 'Merit scholarships'],
    ],
    admissions: [
      'Choose between February and July starts based on subject sequencing, not just convenience.',
      'Package English testing and GTE/GS narrative planning early for visa comfort.',
      'Focus on employable city and programme combinations; Sydney and Melbourne premiums should be intentional.',
      'For healthcare and licensure-track degrees, confirm accreditation pathways before applying.',
    ],
    costs: 'For most families, all-in spend lands between AUD 48,000 and AUD 95,000 a year. Regional campuses may change the cost and visa equation.',
    visa: 'Subclass 500 filing needs disciplined financial and genuine-student documentation. The Temporary Graduate visa remains a core reason Australia stays attractive for outcome-focused families.',
    fit: 'Best for students who want quality, liveability and a less compressed degree journey than the UK.',
  },
  {
    slug: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    tagline: 'World-class campuses closer to home, with scholarship upside and lower transition risk.',
    summary: 'The UAE is no longer a fallback destination. For the right student, local and branch campuses offer elite teaching, family proximity, lower transition shock and surprisingly strong scholarship packages. It is especially compelling for undergraduates not yet ready to leave the region.',
    stats: [
      ['Local + branch', 'Campus mix'],
      ['Sept / Jan', 'Main intakes'],
      ['AED 40k-100k', 'Typical tuition'],
      ['High', 'Family comfort level'],
    ],
    why: [
      'Students can access strong education while keeping family and cultural support close.',
      'Scholarships at institutions like NYU Abu Dhabi can be transformative.',
      'Excellent option for undergraduates who may later articulate to global campuses.',
      'Lower relocation complexity and better oversight for parents.',
    ],
    universities: [
      ['NYU Abu Dhabi', 'Liberal Arts, Sciences, CS, Economics', 'Need-based', 'Need-blind aid'],
      ['Khalifa University', 'Engineering, AI, Medicine, Research', 'AED 55k-90k', 'Merit scholarships'],
      ['American University of Sharjah', 'Architecture, Engineering, Business', 'AED 48k-70k', 'Merit awards'],
      ['Heriot-Watt Dubai', 'Business, Data, Engineering', 'AED 58k-100k', 'Campus scholarships'],
    ],
    admissions: [
      'Use the UAE as a first-choice strategy when family continuity matters, not as a compromise.',
      'Assess transfer, progression and exchange pathways if global optionality is important.',
      'Treat branch campus quality institution by institution; they are not all equivalent.',
      'Scholarship deadlines often come earlier than families expect.',
    ],
    costs: 'Annual spend varies sharply by institution, but the absence of transcontinental relocation and lower living disruption can materially improve total family cost.',
    visa: 'Residence pathways are generally institution-managed and far less stressful than high-friction external visa systems.',
    fit: 'Best for students who want academic quality with lower emotional and logistical transition risk.',
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    tagline: 'A serious value market with surprisingly strong brands and lower total cost.',
    summary: 'Malaysia is one of the smartest under-discussed markets for ROI-sensitive families. Students can access respected local universities and reputable branch campuses at a fraction of UK, US or Australian cost, often without sacrificing teaching quality.',
    stats: [
      ['Lower cost', 'Than major anglophone markets'],
      ['Jan / May / Sept', 'Main intakes'],
      ['MYR 16k-112k', 'Typical tuition'],
      ['Excellent', 'Value for money'],
    ],
    why: [
      'High teaching quality in a much more manageable cost environment.',
      'Branch campuses create progression routes tied to UK or Australian systems.',
      'Comfortable landing environment for many South Asian and GCC families.',
      'Useful stepping stone for students who want international exposure without top-tier cost.',
    ],
    universities: [
      ['University of Malaya', 'Engineering, Medicine, Law', 'MYR 16k-113k', 'Merit awards'],
      ['Monash University Malaysia', 'Medicine, Business, CS', 'MYR 38k-72k', 'Campus scholarships'],
      ['University of Nottingham Malaysia', 'Engineering, Sciences, Business', 'MYR 36k-65k', 'Merit awards'],
      ['Taylor\'s University', 'Hospitality, Business, Design', 'MYR 38k-80k', 'Multiple scholarships'],
    ],
    admissions: [
      'Match students carefully to branch vs local-university culture.',
      'Evaluate progression rights, accreditation and campus transfer opportunities before committing.',
      'Use Malaysia strategically for families prioritising affordability and supervision.',
      'Plan accommodation and guardian expectations early for younger undergraduates.',
    ],
    costs: 'Malaysia often delivers a third to a half of the annual cost of the major English-speaking destinations when tuition and living are combined.',
    visa: 'Student pass processes are generally manageable and more predictable when institutions are responsive.',
    fit: 'Best for value-conscious families seeking international quality without a premium-country budget.',
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    tagline: 'Small market, elite universities, and direct exposure to Asia\'s finance and innovation capital.',
    summary: 'Singapore is highly selective but unusually rewarding for students who can win a place. It combines world-class universities, clean infrastructure, strong employment visibility and a uniquely strategic position between East and West.',
    stats: [
      ['Top 20', 'NUS and NTU global position'],
      ['Aug', 'Primary intake'],
      ['SGD 27k-80k', 'Typical tuition'],
      ['High', 'Selectivity'],
    ],
    why: [
      'NUS and NTU remain among the most employable universities in Asia.',
      'Excellent for business, engineering, computing and research-intensive students.',
      'Strong safety, infrastructure and internship proximity.',
      'A compelling bridge for students targeting Asia-Pacific careers.',
    ],
    universities: [
      ['NUS', 'Engineering, Computing, Business, Medicine', 'SGD 38k-80k', 'NUS scholarships'],
      ['NTU', 'Engineering, AI, Media, Business', 'SGD 35k-60k', 'NTU talent scholarships'],
      ['SMU', 'Business, Economics, Analytics, Law', 'SGD 38k-58k', 'Merit awards'],
      ['SUTD', 'Design, Engineering, Architecture, Tech', 'SGD 36k-52k', 'Merit scholarships'],
    ],
    admissions: [
      'Profile strength matters early; these applications reward depth and academic sharpness.',
      'Do not underestimate interview preparation and fit articulation.',
      'Scholarship rounds can be more relationship- and leadership-sensitive than families expect.',
      'Because the market is small, list-building around realistic alternatives matters.',
    ],
    costs: 'Singapore is not cheap, but total value can be strong when students secure tuition grants, scholarships or faster access to premium employers.',
    visa: 'The student pass system is comparatively orderly. Post-study staying power is more selective, so employability planning must begin while still in university.',
    fit: 'Best for high-performing students who want an elite Asian platform and disciplined urban environment.',
  },
];

const services = [
  {
    slug: 'career-counselling',
    icon: '🧭',
    name: 'Career Counselling',
    title: 'Choose the life path before you choose the course list.',
    summary: 'Our counselling framework starts with aptitude, motivation, family constraints and labour-market reality. We do not begin with brochure lists.',
    outcomes: ['Psychometric and narrative discovery', '10-year career thesis', 'Country-course-fit matrix', 'Written action plan for the next 6-12 months'],
    process: ['Discovery interview', 'Assessment and pattern mapping', 'Career thesis workshop', 'Family alignment and route planning'],
    details: 'This service is ideal for students in Classes 9-12, gap-year applicants and confused professionals pivoting into a new field. Families leave with clarity, not just options.',
  },
  {
    slug: 'admissions',
    icon: '🎓',
    name: 'Admissions Mentorship',
    title: 'Applications engineered with senior oversight from first shortlist to final admit.',
    summary: 'We manage list strategy, essays, statements, portfolio positioning, references and deadline orchestration across single-country and multi-country cycles.',
    outcomes: ['Balanced shortlist design', 'Essay and SOP editing', 'Interview preparation', 'Deadline and document management'],
    process: ['Shortlist architecture', 'Essay strategy and drafting', 'Application execution', 'Offer comparison and acceptance planning'],
    details: 'This is the core eMBriture service for undergraduates, taught Master\'s applicants and specialised programme candidates who want a disciplined, senior-led process.',
  },
  {
    slug: 'scholarships',
    icon: '💰',
    name: 'Scholarships & Aid',
    title: 'Funding is not a bonus. It is part of the strategy from day one.',
    summary: 'We map merit awards, need-based aid, external scholarships and country-specific funding windows alongside the university shortlist.',
    outcomes: ['Funding landscape audit', 'Scholarship-first shortlist', 'Aid essays and supporting material', 'Interview and nomination support'],
    process: ['Financial reality review', 'Scholarship map creation', 'Award application execution', 'Offer negotiation and confirmation'],
    details: 'This service is especially powerful for high-achieving students, research applicants and families balancing ambition with disciplined ROI.',
  },
  {
    slug: 'visa-support',
    icon: '🛂',
    name: 'Visa & Pre-departure',
    title: 'From CAS and I-20 to accommodation, arrival and the first anxious month abroad.',
    summary: 'We handle visa document sequencing, financial evidence planning, interview readiness, pre-departure checklists and relocation fundamentals.',
    outcomes: ['Visa document review', 'Financial and credibility prep', 'Accommodation and banking guidance', 'Arrival and settlement checklist'],
    process: ['Offer-to-visa file assembly', 'Application review', 'Pre-departure planning', 'Landing support'],
    details: 'Families use this service when they want risk reduced after the admit comes through. It is especially valuable in high-friction destinations or first-time international moves.',
  },
  {
    slug: 'phd-mentorship',
    icon: '🔬',
    name: 'PhD Mentorship',
    title: 'Research applicants need strategy, not generic admissions advice.',
    summary: 'We support doctoral and research Master\'s candidates with supervisor targeting, proposal shaping, statement strategy and funded-lab outreach.',
    outcomes: ['Research interest framing', 'Supervisor shortlist and outreach', 'Proposal feedback', 'Funding and fit positioning'],
    process: ['Research audit', 'Supervisor and lab mapping', 'Proposal and statement build', 'Interview and funding follow-through'],
    details: 'Ideal for candidates seeking funded UK, US, Canada, UAE or Singapore routes and for professionals returning to academia with domain expertise.',
  },
  {
    slug: 'test-prep',
    icon: '📝',
    name: 'Test Preparation',
    title: 'IELTS, TOEFL, GRE and GMAT prep built around score goals and deadlines.',
    summary: 'We run focused, small-cohort coaching with diagnostic planning, individual feedback and realistic test-date sequencing.',
    outcomes: ['Diagnostic assessment', 'Score-gap study plan', 'Timed practice and review', 'Application-aligned scheduling'],
    process: ['Baseline testing', 'Skill-gap coaching', 'Mock exam cycle', 'Final test readiness'],
    details: 'This track works best for students who need a disciplined plan, not endless generic practice. We align exam timing with application and scholarship deadlines.',
  },
];

const audiences = [
  {
    file: 'for-students.html',
    slug: 'for-students',
    tag: 'For students',
    title: 'You do not need to have your whole life figured out to start well.',
    summary: 'We help students turn confusion into a credible academic and career path. That means honest conversations about fit, budget, scholarships, pressure, and what success should actually look like.',
    bullets: ['Shortlist clarity without overwhelm', 'Direct help with essays, testing and deadlines', 'A counsellor who speaks to you, not just about you', 'Planning that includes employability, not only admission'],
  },
  {
    file: 'for-parents.html',
    slug: 'for-parents',
    tag: 'For parents',
    title: 'A calmer, more transparent process for the people financing the dream.',
    summary: 'Parents need more than ranking lists. We make cost, risk, safety, visa steps and academic fit visible early so decisions feel measured rather than emotional.',
    bullets: ['Transparent cost and ROI conversations', 'Clear communication on every deadline', 'Safety, accommodation and visa guidance', 'Independent advice not distorted by commission'],
  },
  {
    file: 'for-professionals.html',
    slug: 'for-professionals',
    tag: 'For professionals',
    title: 'MBA, specialist Master\'s and research routes for people with careers already in motion.',
    summary: 'Working professionals need admissions advice that respects opportunity cost, visa logic, family realities and post-degree salary movement. That is a different conversation from school counselling.',
    bullets: ['MBA and Executive programme strategy', 'GMAT-waiver and profile positioning', 'Country and visa planning for families', 'ROI modelling before application spend'],
  },
];

const articles = [
  {
    slug: 'ucas-2026',
    title: 'UCAS 2026: What actually changed for UAE students',
    tag: 'UK admissions',
    description: 'A practical guide to the 2026 UCAS cycle for UAE families: timing, personal statement changes, selective course preparation and where applicants lose momentum.',
    meta: ['8 min read', 'Updated April 2026'],
    lead: 'Most families hear about UCAS changes only after they have already affected the application strategy. The real problem is rarely the rule itself. It is the knock-on effect on timing, essay prep and course fit.',
    sections: `
      <h2>1. The timing pressure has moved earlier than families expect</h2>
      <p>For medicine, Oxbridge and highly selective courses, the strongest applicants are now effectively working on their cycle before summer ends. UAE students who wait until September to "start thinking about UCAS" are already compressing exploration, super-curricular development and reference planning.</p>
      <p>The fix is simple but rarely followed: build the shortlist and evidence file by June, not October. That gives space to improve test scores, enrich academic reading and shape a coherent narrative.</p>
      <h2>2. The personal statement shift changes how we coach students</h2>
      <p>Whether the structure is delivered through prompts or more segmented drafting expectations, the underlying principle is the same: vague autobiography is losing value. Specific evidence of academic curiosity, reflection and course fit matters more than ever.</p>
      <ul>
        <li>Students need examples tied to the subject, not generic leadership claims.</li>
        <li>Reading, projects, competitions and internships should be connected to clear insight.</li>
        <li>Drafting should happen in layers: raw evidence first, elegant prose later.</li>
      </ul>
      <h2>3. UAE applicants still underestimate course-level competition</h2>
      <p>Families often compare universities when they should be comparing specific programmes. Economics at one institution may be far more competitive than business at a higher-ranked university. The right strategic question is not "Which university is best?" but "Which programme is realistically aligned to this student\'s evidence?"</p>
      <blockquote>Strong UK applications feel academically inevitable by the time an admissions reader finishes the statement.</blockquote>
      <h2>4. What to do now</h2>
      <table>
        <tr><th>When</th><th>Priority</th></tr>
        <tr><td>May-June</td><td>Shortlist architecture, super-curricular mapping, referee selection</td></tr>
        <tr><td>July-August</td><td>Evidence capture, essay raw draft, test planning</td></tr>
        <tr><td>September-October</td><td>Final refinement, application submission for early courses</td></tr>
        <tr><td>November-January</td><td>Remaining UCAS submission and interview preparation</td></tr>
      </table>
      <p>The families who move early are not simply "more organised". They preserve optionality. That usually produces better course fit, stronger essays and less panic.</p>
    `,
  },
  {
    slug: 'scholarships-beyond-chevening',
    title: 'Scholarships beyond Chevening: funded routes families miss every year',
    tag: 'Scholarships',
    description: 'A long-form guide to scholarships beyond the obvious flagship awards, including institutional funding, research pathways and how to build a realistic funding strategy.',
    meta: ['12 min read', 'March 2026'],
    lead: 'Families often ask for "the scholarship list" as though funding lives in a single document. It does not. Good scholarship strategy is an ecosystem exercise: country, institution, course, profile and timing all interact.',
    sections: `
      <h2>1. Why the obvious scholarships get too much attention</h2>
      <p>Flagship awards like Chevening attract attention because they are visible, prestigious and easy to name. But their visibility creates an illusion: that if you miss the headline awards, there is nothing left. In practice, most funded students piece together outcomes through university awards, departmental funding, fee waivers and profile-specific grants.</p>
      <h2>2. The categories families should actually search</h2>
      <ul>
        <li><strong>Institution-wide merit awards:</strong> often automatic or lightly application-based.</li>
        <li><strong>Departmental awards:</strong> smaller but less crowded and more relevant.</li>
        <li><strong>Research funding:</strong> especially important for MRes and PhD candidates.</li>
        <li><strong>Need-based aid:</strong> critical in the US and a few exceptional campuses elsewhere.</li>
        <li><strong>External thematic grants:</strong> tied to leadership, nationality, sector or development impact.</li>
      </ul>
      <h2>3. Awards UAE students should keep on the radar</h2>
      <table>
        <tr><th>Award</th><th>Best for</th><th>Coverage style</th></tr>
        <tr><td>Clarendon</td><td>Oxford Master\'s and DPhil</td><td>Full tuition plus living stipend</td></tr>
        <tr><td>Gates Cambridge</td><td>Cambridge postgraduate</td><td>Full-cost funding</td></tr>
        <tr><td>Lester B. Pearson</td><td>Toronto undergraduate</td><td>Full funding</td></tr>
        <tr><td>NYU Abu Dhabi aid</td><td>High-need undergraduate applicants</td><td>Need-based, often extensive</td></tr>
        <tr><td>University-specific merit awards</td><td>Broad UG/PG applicants</td><td>Partial tuition reduction</td></tr>
      </table>
      <h2>4. The biggest mistake</h2>
      <p>The biggest mistake is separating scholarship work from application work. Funding is not something you "also do" later. It should influence the shortlist itself. Students who build a scholarship-led list often apply to different institutions than students chasing prestige alone.</p>
      <blockquote>The best scholarship strategy is usually a portfolio, not a lottery ticket.</blockquote>
      <h2>5. What good funding planning looks like</h2>
      <p>We recommend families begin with a hard budget ceiling, then build a shortlist in three bands: stretch prestige, high-probability value, and strong-fit affordability. That turns scholarships from wishful thinking into a disciplined planning variable.</p>
    `,
  },
  {
    slug: 'mba-roi',
    title: 'MBA ROI in 2026: how professionals should run the numbers',
    tag: 'MBA',
    description: 'A practical MBA ROI framework for professionals in the UAE and GCC: total cost, opportunity cost, salary lift, geography and visa logic.',
    meta: ['10 min read', 'March 2026'],
    lead: 'For working professionals, the most dangerous MBA question is "Which school is best?" The better question is "Which route changes my career enough to justify the fully loaded cost?"',
    sections: `
      <h2>1. Start with fully loaded cost, not tuition</h2>
      <p>MBA decisions are distorted when families look only at tuition. The real number includes living cost, visa cost, lost salary, relocation, insurance, travel and interest on any financing. That is the number the post-MBA salary has to outrun.</p>
      <h2>2. Geography changes the return profile</h2>
      <p>An MBA in London, Toronto or Singapore may each have strong academic value, but the post-study work market, tax environment and family logistics are very different. A lower-ranked school in the right geography can outperform a better-known brand in the wrong one.</p>
      <h2>3. Three questions professionals should answer before applying</h2>
      <ol>
        <li>Am I trying to accelerate in my current sector, pivot sectors, or change geography?</li>
        <li>Can this school plausibly connect me to the employers I actually want?</li>
        <li>What is my break-even timeline if the salary uplift is slower than expected?</li>
      </ol>
      <h2>4. A simple comparison frame</h2>
      <table>
        <tr><th>Route</th><th>Strength</th><th>Watch-out</th></tr>
        <tr><td>INSEAD / LBS tier</td><td>Brand, recruiting, international mobility</td><td>High total cost and competitive outcomes</td></tr>
        <tr><td>Rotman / Canada</td><td>Migration logic, North American pathway</td><td>Opportunity cost remains significant</td></tr>
        <tr><td>Regional / flexible MBA</td><td>Lower disruption, keep earnings</td><td>Brand and network may be narrower</td></tr>
      </table>
      <h2>5. The disciplined answer</h2>
      <p>If the MBA does not create a materially different role, geography or earnings track, the romantic version of ROI often collapses. Professionals should apply only when the post-degree story is clear enough to survive conservative assumptions.</p>
      <blockquote>A good MBA is a career design move, not a prestige purchase.</blockquote>
    `,
  },
];

const legalPages = [
  {
    file: 'privacy.html',
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'Privacy policy for eMBriture website visitors, consultation leads and newsletter subscribers.',
    content: `
      <p>eMBriture collects only the information required to respond to enquiries, run consultations and provide admissions support. This may include your name, contact details, education interests, destination preferences and notes you voluntarily share with us.</p>
      <h2>How we use data</h2>
      <p>We use submitted data to contact you about your enquiry, schedule consultations, prepare shortlists, deliver admissions services and send occasional insight updates if you opt in. We do not sell your personal data.</p>
      <h2>Storage and access</h2>
      <p>Lead data is stored in controlled internal systems and accessed only by authorised team members who need it for counselling or operational purposes.</p>
      <h2>Third-party sharing</h2>
      <p>We share data only when necessary for the services you request, such as submitting an application or coordinating a visa-related process, and only with your permission or where operationally required for that service.</p>
      <h2>Your choices</h2>
      <p>You may request access, correction or deletion of your personal data by emailing <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    `,
  },
  {
    file: 'terms.html',
    slug: 'terms',
    title: 'Terms of Use',
    description: 'Terms governing use of the eMBriture website and counselling services.',
    content: `
      <p>By using this website, you agree to use it for lawful purposes only and not to interfere with its availability, security or content integrity.</p>
      <h2>Information on the site</h2>
      <p>We aim for accuracy, but admissions rules, visa policies, tuition figures and scholarship terms can change. Website content is informational and does not replace a signed service engagement.</p>
      <h2>Service engagements</h2>
      <p>Paid services are governed by an engagement letter or invoice terms shared with the client. That document controls deliverables, timelines and payment structure where applicable.</p>
      <h2>Intellectual property</h2>
      <p>Site copy, branding, frameworks and materials remain the property of eMBriture unless otherwise stated. You may not reproduce them commercially without permission.</p>
      <h2>Liability</h2>
      <p>We do not guarantee admission, visa approval or scholarship success. Outcomes depend on applicant profile, institutional decisions and external policies.</p>
    `,
  },
  {
    file: 'refunds.html',
    slug: 'refunds',
    title: 'Refund Policy',
    description: 'Refund policy for eMBriture consulting and admissions services.',
    content: `
      <p>Because consulting work begins with diagnosis, research and planning, retainers are generally non-refundable once delivery has started. We explain this clearly before any engagement is confirmed.</p>
      <h2>When partial refunds may apply</h2>
      <p>If a client cancels before substantive work has begun, we may issue a partial refund after deducting administrative or booked-session costs. This is handled case by case.</p>
      <h2>Rescheduling and pauses</h2>
      <p>Where possible, we prefer rescheduling, scope adjustments or admissions-cycle pauses over cancellation. Many families find this more useful than requesting a refund.</p>
      <h2>Unsuitable engagements</h2>
      <p>If we believe we cannot add value, we reserve the right to decline the engagement early rather than continue in a poor-fit arrangement.</p>
      <h2>Questions</h2>
      <p>For billing or policy questions, contact <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    `,
  },
];

const writtenRoutes = [];

function ensureDir(file) {
  fs.mkdirSync(path.dirname(path.join(__dirname, file)), { recursive: true });
}

function routeFromFile(file) {
  if (file === 'index.html') return '/';
  return `/${file.replace(/\\/g, '/').replace(/\.html$/, '')}`;
}

function registerRoute(file) {
  if (file === '404.html' || file === 'dashboard.html') return;
  writtenRoutes.push(routeFromFile(file));
}

function head({ title, description, canonical, keywords = '', ld = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#16213d">
<title>${title}</title>
<meta name="description" content="${description}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
<meta name="author" content="eMBriture FZC">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="eMBriture">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/logo.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${SITE}/assets/logo.svg">
<link rel="icon" type="image/svg+xml" href="/assets/logo.svg">
<link rel="apple-touch-icon" href="/assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
${ld}
</head>`;
}

function nav() {
  return `<div class="anc">Trusted by 600+ families across UAE, India and the GCC · <b>Free 30-minute consultation</b> · <a href="/contact">Book now</a></div>
<nav class="site-nav" id="main-nav">
  <a href="/" class="n-logo">
    <img src="/assets/logo.svg" alt="eMBriture logo" width="38" height="42">
    <span class="n-brand">e<b>MB</b>riture<small>Empowerment · Brighter Future</small></span>
  </a>
  <ul class="n-links">
    <li><a href="/about">About</a></li>
    <li class="has-drop"><a href="/services">Services</a>
      <ul class="dropdown">
        ${services.map((service) => `<li><a href="/services/${service.slug}">${service.name}</a></li>`).join('')}
      </ul>
    </li>
    <li class="has-drop"><a href="/destinations">Destinations</a>
      <ul class="dropdown">
        ${destinations.map((destination) => `<li><a href="/destinations/${destination.slug}">${destination.name}</a></li>`).join('')}
      </ul>
    </li>
    <li class="has-drop"><a href="/for-students">For You</a>
      <ul class="dropdown">
        ${audiences.map((audience) => `<li><a href="/${audience.slug}">${audience.tag.replace('For ', 'For ')}</a></li>`).join('')}
      </ul>
    </li>
    <li><a href="/insights">Insights</a></li>
    <li><a href="/faq">FAQ</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <a href="/contact" class="n-cta">Free Consultation</a>
  <button class="ham" id="nav-burger" aria-label="Open menu">☰</button>
</nav>
<div class="drawer" id="nav-drawer">
  <button class="drawer-close" aria-label="Close menu" onclick="document.getElementById('nav-drawer').classList.remove('open');document.getElementById('nav-burger').classList.remove('open');document.body.classList.remove('drawer-open')">✕</button>
  <div class="drawer-links">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/approach">Approach</a>
    <a href="/services">Services</a>
    <a href="/destinations">Destinations</a>
    <a href="/team">Team</a>
    <a href="/insights">Insights</a>
    <a href="/faq">FAQ</a>
    <a href="/contact">Contact</a>
  </div>
</div>
<button id="float-chat" onclick="scrollToChat()" title="Chat with AI Education Advisor" aria-label="Chat with AI Education Advisor">🎓</button>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="f-grid">
      <div class="f-col f-brand">
        <a href="/" class="n-logo"><img src="/assets/logo.svg" alt="eMBriture logo" width="38" height="42"><span class="n-brand">e<b>MB</b>riture</span></a>
        <p>Independent global education consultants helping students, parents and professionals make cleaner career decisions across seven destinations.</p>
        <p style="margin-top:16px">Block B-B07-98, SRTIP<br>University City, Sharjah, UAE</p>
      </div>
      <div class="f-col">
        <h4>Company</h4>
        <a href="/about">About</a>
        <a href="/approach">Approach</a>
        <a href="/team">Team</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="f-col">
        <h4>Services</h4>
        ${services.map((service) => `<a href="/services/${service.slug}">${service.name}</a>`).join('')}
      </div>
      <div class="f-col">
        <h4>Destinations</h4>
        ${destinations.map((destination) => `<a href="/destinations/${destination.slug}">${destination.name}</a>`).join('')}
      </div>
      <div class="f-col f-newsletter">
        <h4>Legal</h4>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/refunds">Refunds</a>
        <a href="/dashboard">Team login</a>
      </div>
    </div>
    <div class="f-bottom">
      <p>© 2025-2026 eMBriture FZC · Sharjah, UAE</p>
      <div class="f-legal">
        <a href="tel:+971543953695">${PHONE}</a>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
    </div>
  </div>
</footer>`;
}

function shell(content, scripts) {
  return `<body>
<div id="cur"></div><div id="ring"></div>
${nav()}
${content}
${footer()}
${scripts.map((src) => `<script src="${src}" defer></script>`).join('')}
</body>
</html>`;
}

function hero({ crumbs, tag, title, sub, ctas = '', meta = [] }) {
  const crumbsHtml = crumbs.map((crumb, index) => index === crumbs.length - 1
    ? `<span>${crumb.label}</span>`
    : `<a href="${crumb.href}">${crumb.label}</a><span>/</span>`).join('');

  return `<section class="page-hero">
  <div class="ph-inner">
    <nav class="breadcrumbs" aria-label="Breadcrumb">${crumbsHtml}</nav>
    <span class="ph-tag">${tag}</span>
    <h1 class="ph-title">${title}</h1>
    <p class="ph-sub">${sub}</p>
    ${meta.length ? `<div class="ph-meta">${meta.map((item) => `<span>${item}</span>`).join('')}</div>` : ''}
    ${ctas ? `<div class="ph-ctas">${ctas}</div>` : ''}
  </div>
</section>`;
}

function statsStrip(items) {
  return `<section class="section tight">
  <div class="stats-strip">
    ${items.map((item) => `<div class="item"><div class="n">${item[0]}</div><div class="l">${item[1]}</div></div>`).join('')}
  </div>
</section>`;
}

function writePage(file, options) {
  ensureDir(file);
  registerRoute(file);
  const route = routeFromFile(file);
  const canonical = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const html = `${head({ ...options, canonical })}${shell(options.body, options.scripts || ['/assets/js/site.js'])}`;
  fs.writeFileSync(path.join(__dirname, file), html);
}

function writeArticle(file, article) {
  writePage(file, {
    title: `${article.title} | eMBriture Insights`,
    description: article.description,
    body: `${hero({
      crumbs: [{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: article.title }],
      tag: article.tag,
      title: article.title,
      sub: article.description,
      meta: article.meta,
      ctas: '<a href="/contact" class="btn-p">Discuss your profile</a><a href="/insights" class="btn-g">Back to insights</a>',
    })}
    <article class="article">
      <p class="article-lead">${article.lead}</p>
      ${article.sections}
    </article>`,
  });
}

function destinationCard(destination) {
  return `<a class="dest-card reveal" href="/destinations/${destination.slug}">
    <div class="dest-bg">${destination.flag}</div>
    <div class="dest-ov">
      <div class="dest-flag">${destination.flag}</div>
      <div class="dest-name">${destination.name}</div>
      <div class="dest-unis">${destination.tagline}</div>
    </div>
    <div class="dest-badge">Guide</div>
  </a>`;
}

function serviceCard(service) {
  return `<a class="svc-card reveal" href="/services/${service.slug}">
    <div class="svc-icon">${service.icon}</div>
    <h3>${service.name}</h3>
    <p>${service.summary}</p>
    <span class="svc-link">Explore service →</span>
  </a>`;
}

writePage('index.html', {
  title: 'eMBriture | Global education consultants for students, parents and professionals',
  description: 'Career-first admissions guidance from Sharjah for the UK, USA, Canada, Australia, UAE, Malaysia and Singapore. Explore destinations, services and chat with the AI advisor.',
  keywords: 'study abroad consultants UAE, global education consultancy Sharjah, university admissions, scholarships, visa support, MBA abroad',
  scripts: ['/assets/js/site.js', '/assets/js/chatbot.js'],
  body: `
    <section class="hero" id="hero">
      <div class="hero-mesh"></div>
      <div class="hero-grid"></div>
      <div class="hero-inner">
        <div class="hero-left">
          <span class="hero-badge">Career-first study abroad consultancy</span>
          <h1 class="hero-hed">A slimmer home hub for the <em>big decision</em>.</h1>
          <p class="hero-sub">Use this page to orient yourself fast. Choose your destination, your service track, or your audience lens. When you are ready, the eMBriture AI advisor can turn that curiosity into a real shortlist in minutes.</p>
          <div class="hero-ctas">
            <button class="btn-p" onclick="scrollToChat()">Start with the AI advisor</button>
            <a class="btn-g" href="/approach">See our process</a>
          </div>
          <div class="hero-proof">
            <div class="hero-proof-item"><div class="hero-proof-num">600+</div><div class="hero-proof-lbl">Families guided</div></div>
            <div class="hero-proof-item"><div class="hero-proof-num">7</div><div class="hero-proof-lbl">Destinations</div></div>
            <div class="hero-proof-item"><div class="hero-proof-num">6</div><div class="hero-proof-lbl">Service tracks</div></div>
            <div class="hero-proof-item"><div class="hero-proof-num">24/7</div><div class="hero-proof-lbl">AI first response</div></div>
          </div>
        </div>
        <div class="chat-wrap" id="mainChat">
          <div class="chat-box">
            <div class="chat-head">
              <div class="chat-head-l">
                <div class="chat-av">🎓</div>
                <div>
                  <div class="chat-name">eMBriture AI Advisor</div>
                  <div class="chat-status"><span class="dot"></span> Online · answers in seconds</div>
                </div>
              </div>
              <div class="chat-head-r">Free</div>
            </div>
            <div class="chat-messages" id="chatMessages">
              <div class="msg ai"><div class="msg-av">🎓</div><div><div class="bubble">Hi there. I can help you compare countries, estimate budgets, flag scholarships and decide your next step.<br><br><strong>What should I call you?</strong></div></div></div>
            </div>
            <div class="chat-quick" id="quickRow">
              <button class="qbtn" onclick="sendQuick('I am a student')">I'm a student</button>
              <button class="qbtn" onclick="sendQuick('I am a parent')">I'm a parent</button>
              <button class="qbtn" onclick="sendQuick('I am a working professional')">I'm a professional</button>
              <button class="qbtn" onclick="sendQuick('Compare UK vs Canada for engineering')">UK vs Canada</button>
              <button class="qbtn" onclick="sendQuick('What scholarships are realistic?')">Scholarships</button>
              <button class="qbtn" onclick="sendQuick('MBA options for working professionals')">MBA options</button>
            </div>
            <div class="chat-input-row">
              <input class="chat-input" id="chatInput" type="text" placeholder="Type your name to get started..." onkeydown="if(event.key==='Enter')sendMessage()" aria-label="Chat input">
              <button class="chat-send" onclick="sendMessage()" aria-label="Send message">➤</button>
            </div>
          </div>
          <p class="chat-disclaim">Private by default. We only reach out if you ask us to.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="reveal">
        <span class="s-tag">Choose your path</span>
        <h2 class="s-title">Start with the lens that matches your <em>actual question</em>.</h2>
        <p class="s-sub">If you are unsure where to begin, these three audience pages are the fastest orientation points.</p>
      </div>
      <div class="why-grid">
        ${audiences.map((audience) => `<a class="why-card reveal" href="/${audience.slug}" style="text-decoration:none;color:inherit"><div class="why-num">${audience.tag}</div><h3>${audience.title}</h3><p>${audience.summary}</p></a>`).join('')}
      </div>
    </section>
    <section class="section">
      <div class="reveal">
        <span class="s-tag">Service hub</span>
        <h2 class="s-title">Six ways we support the <em>same decision</em>.</h2>
      </div>
      <div class="svc-grid">
        ${services.map(serviceCard).join('')}
      </div>
    </section>
    <section class="section">
      <div class="reveal">
        <span class="s-tag">Destination hub</span>
        <h2 class="s-title">Seven country guides with the details families usually ask for <em>too late</em>.</h2>
      </div>
      <div class="dest-grid">
        ${destinations.map(destinationCard).join('')}
      </div>
    </section>
    <section class="section">
      <div class="reveal">
        <span class="s-tag">Insights hub</span>
        <h2 class="s-title">Long-form reads for families who want more than brochure copy.</h2>
      </div>
      <div class="ins-grid">
        ${articles.map((article) => `<a class="ins-card reveal" href="/insights/${article.slug}"><div class="ins-body"><div class="ins-tag">${article.tag}</div><h4>${article.title}</h4><p>${article.description}</p><div class="ins-read">${article.meta.join(' · ')} →</div></div></a>`).join('')}
      </div>
    </section>
    <section class="cta-big">
      <div class="cta-inner">
        <h2>The next step should feel <em>clearer</em> than the last one.</h2>
        <p>Book a free consultation if you want a human counsellor to turn this hub into a personalised plan.</p>
        <div class="cta-ctas"><a href="/contact" class="btn-p">Book a consultation</a><a href="/faq" class="btn-g">Read the FAQ</a></div>
      </div>
    </section>`,
});

writePage('about.html', {
  title: 'About eMBriture | Independent education consultants from Sharjah',
  description: 'Learn how eMBriture approaches admissions, scholarships and career-first planning for students, parents and professionals across seven destinations.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About' }],
    tag: 'About',
    title: 'Independent by design. <em>Patient on purpose.</em>',
    sub: 'We built eMBriture for families who wanted a senior counsellor, not a brochure relay. Our job is to make the big education decision calmer, cleaner and more defensible.',
    ctas: '<a href="/approach" class="btn-p">See our approach</a><a href="/team" class="btn-g">Meet the team</a>',
  })}
  ${statsStrip([['600+', 'Families guided'], ['35+', 'Partner universities'], ['7', 'Destinations'], ['₹4.2cr+', 'Scholarships secured']])}
  <section class="section">
    <div class="two-col">
      <div class="two-col-rich">
        <span class="s-tag">What makes us different</span>
        <h3>We design around career logic, not agent incentives.</h3>
        <p>Most families come to us after one of two experiences: they were overwhelmed by generic options, or they felt pushed toward whichever institution was easiest for the consultant to place. We built against both of those failures.</p>
        <ul>
          <li>We begin with fit, budget and long-range outcomes.</li>
          <li>We stay small enough for senior counsellors to remain hands-on.</li>
          <li>We use AI for speed, then humans for judgment.</li>
          <li>We think in systems: admissions, scholarships, visa and employability together.</li>
        </ul>
      </div>
      <div class="panel">
        <h4>Our promise</h4>
        <p>When we recommend a route, it should be a route we would defend if you were our own family. That means cleaner logic, clearer costs and fewer fashionable but weak choices.</p>
      </div>
    </div>
  </section>`,
});

writePage('approach.html', {
  title: 'Our Approach | eMBriture',
  description: 'See the eMBriture process for counselling, admissions, scholarships and decision-making across the full student journey.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Approach' }],
    tag: 'Approach',
    title: 'A process built to reduce panic and improve <em>decision quality</em>.',
    sub: 'We run counselling like a strategy project: diagnose carefully, sequence work well, document everything and stay close to the family through the messy parts.',
    ctas: '<a href="/contact" class="btn-p">Book your first consultation</a>',
  })}
  <section class="section">
    <div class="approach-grid">
      <div class="app-card reveal"><div class="app-num">01</div><h3>Diagnose</h3><p>We map aspirations, marks, family context, budget and constraints before naming a single university.</p></div>
      <div class="app-card reveal"><div class="app-num">02</div><h3>Design</h3><p>We build country, course and funding pathways with real outcomes in mind.</p></div>
      <div class="app-card reveal"><div class="app-num">03</div><h3>Execute</h3><p>Applications, essays, tests and deadlines move through one disciplined workflow.</p></div>
      <div class="app-card reveal"><div class="app-num">04</div><h3>Land well</h3><p>Offer comparison, visa guidance and pre-departure support keep the final phase calm.</p></div>
    </div>
  </section>
  <section class="section">
    <div class="why-grid">
      <div class="why-card reveal"><h3>One principal counsellor</h3><p>Families should know exactly who owns the case and who to call when something is slipping.</p></div>
      <div class="why-card reveal"><h3>Documentation over memory</h3><p>Deadlines, drafts, decisions and open questions are written down so momentum does not depend on recall.</p></div>
      <div class="why-card reveal"><h3>Funding from the start</h3><p>We do not wait until the end to ask whether the plan is financially survivable.</p></div>
    </div>
  </section>`,
});

writePage('services.html', {
  title: 'Services | eMBriture',
  description: 'Explore eMBriture service tracks covering counselling, admissions, scholarships, visas, PhD mentorship and test preparation.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Services' }],
    tag: 'Services',
    title: 'Six service tracks. One goal: a better <em>education decision</em>.',
    sub: 'Families can work with us for one stage or for the full journey. Every route is designed to connect admissions decisions back to long-term outcomes.',
  })}
  <section class="section"><div class="svc-grid">${services.map(serviceCard).join('')}</div></section>`,
});

writePage('destinations.html', {
  title: 'Destinations | eMBriture',
  description: 'Compare seven study destinations with eMBriture country guides for tuition, scholarships, visa logic and fit.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Destinations' }],
    tag: 'Destinations',
    title: 'Seven destination guides built around <em>fit, cost and outcomes</em>.',
    sub: 'The right country is rarely the most fashionable one. It is the one that best fits the student, budget and post-study plan.',
  })}
  <section class="section"><div class="dest-grid">${destinations.map(destinationCard).join('')}</div></section>`,
});

writePage('team.html', {
  title: 'Team | eMBriture',
  description: 'Meet the counsellors, strategists and specialists behind eMBriture.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Team' }],
    tag: 'Team',
    title: 'Small enough to stay personal. Senior enough to be <em>useful</em>.',
    sub: 'We keep the team deliberately focused so families get judgment, not hand-offs.',
  })}
  <section class="section">
    <div class="team-grid">
      <div class="team-card reveal"><div class="team-ava">NS</div><h4>Dr. Nithya S.</h4><div class="team-role">Founder & Head of Counselling</div><p class="team-bio">Leads family strategy, senior counselling and complex cross-country decisions.</p></div>
      <div class="team-card reveal"><div class="team-ava">RK</div><h4>Rahul K.</h4><div class="team-role">USA & Canada Strategy</div><p class="team-bio">Focuses on North American applications, aid logic and outcome-oriented list building.</p></div>
      <div class="team-card reveal"><div class="team-ava">FA</div><h4>Fatima A.</h4><div class="team-role">UK & Europe</div><p class="team-bio">Runs UK undergraduate and postgraduate admissions, Oxbridge prep and essay positioning.</p></div>
      <div class="team-card reveal"><div class="team-ava">AM</div><h4>Aisha M.</h4><div class="team-role">Scholarships Lead</div><p class="team-bio">Builds funding strategy, scholarship calendars and award-specific narratives.</p></div>
      <div class="team-card reveal"><div class="team-ava">SP</div><h4>Sanjay P.</h4><div class="team-role">MBA & Executive Programmes</div><p class="team-bio">Supports working professionals balancing ROI, geography and opportunity cost.</p></div>
      <div class="team-card reveal"><div class="team-ava">PK</div><h4>Priya K.</h4><div class="team-role">Research & PhD</div><p class="team-bio">Guides research applicants on proposal shape, supervisor outreach and funding fit.</p></div>
      <div class="team-card reveal"><div class="team-ava">VN</div><h4>Vishal N.</h4><div class="team-role">Visa & Compliance</div><p class="team-bio">Keeps visa sequencing, evidence hygiene and pre-departure planning under control.</p></div>
      <div class="team-card reveal"><div class="team-ava">AI</div><h4>AI Advisor</h4><div class="team-role">First-response assistant</div><p class="team-bio">Handles first-pass comparisons, FAQs and profile prompts before a counsellor steps in.</p></div>
    </div>
  </section>`,
});

writePage('insights.html', {
  title: 'Insights | eMBriture',
  description: 'Long-form admissions, scholarship and MBA insights from eMBriture.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Insights' }],
    tag: 'Insights',
    title: 'Long-form writing for families who want the <em>thinking behind the advice</em>.',
    sub: 'These are the pieces we keep reusing in consultations because they answer the questions that brochure pages usually skip.',
  })}
  <section class="section">
    <div class="ins-grid">
      ${articles.map((article) => `<a class="ins-card reveal" href="/insights/${article.slug}"><div class="ins-body"><div class="ins-tag">${article.tag}</div><h4>${article.title}</h4><p>${article.description}</p><div class="ins-read">${article.meta.join(' · ')} →</div></div></a>`).join('')}
    </div>
  </section>`,
});

writePage('faq.html', {
  title: 'FAQ | eMBriture',
  description: 'Frequently asked questions about eMBriture services, process, scholarships, fees and destinations.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'FAQ' }],
    tag: 'FAQ',
    title: 'The questions families ask before they are ready to commit.',
    sub: 'Short answers to the concerns we hear most often in first conversations.',
  })}
  <section class="section narrow">
    <div class="faq-list">
      <details class="faq-item reveal"><summary>Is the first consultation free?<span class="faq-ico">+</span></summary><div class="faq-ans">Yes. The first consultation is free and is designed to clarify fit, timing and likely routes.</div></details>
      <details class="faq-item reveal"><summary>Do you only work with UAE families?<span class="faq-ico">+</span></summary><div class="faq-ans">No. We work with families across the GCC and India, though the firm is based in Sharjah.</div></details>
      <details class="faq-item reveal"><summary>Can you help with scholarships?<span class="faq-ico">+</span></summary><div class="faq-ans">Yes. Scholarship planning is built into the shortlist and application design, not treated as an afterthought.</div></details>
      <details class="faq-item reveal"><summary>Do you support professionals too?<span class="faq-ico">+</span></summary><div class="faq-ans">Yes. We run dedicated tracks for MBA applicants, specialists and research professionals.</div></details>
      <details class="faq-item reveal"><summary>How do I start?<span class="faq-ico">+</span></summary><div class="faq-ans">Use the AI advisor on the home page or book a human consultation on the <a href="/contact">contact page</a>.</div></details>
    </div>
  </section>`,
});

writePage('contact.html', {
  title: 'Contact | eMBriture',
  description: 'Book a free 30-minute consultation with eMBriture in Sharjah.',
  body: `${hero({
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Contact' }],
    tag: 'Contact',
    title: 'Bring us the messy version. We will help you make it <em>clear</em>.',
    sub: 'The first consultation is for diagnosis, not pressure. We will talk through the student, the family context and the real next step.',
  })}
  <section class="section">
    <div class="two-col">
      <div class="two-col-rich">
        <span class="s-tag">Reach us</span>
        <h3>Sharjah office. GCC-ready support.</h3>
        <p>Block B-B07-98, SRTIP<br>University City, Sharjah, UAE</p>
        <ul>
          <li>Phone / WhatsApp: ${PHONE}</li>
          <li>Email: ${EMAIL}</li>
          <li>Hours: Sun-Thu 9 AM-6 PM, Sat 10 AM-2 PM</li>
        </ul>
      </div>
      <form class="contact-form panel" id="contactForm" onsubmit="return submitContact(event)">
        <div class="f-row">
          <div class="fg"><label class="fl" for="first">First name</label><input class="fi" id="first" name="first" required></div>
          <div class="fg"><label class="fl" for="last">Last name</label><input class="fi" id="last" name="last" required></div>
        </div>
        <div class="f-row">
          <div class="fg"><label class="fl" for="email">Email</label><input class="fi" id="email" name="email" type="email" required></div>
          <div class="fg"><label class="fl" for="phone">Phone</label><input class="fi" id="phone" name="phone" required></div>
        </div>
        <div class="f-row">
          <div class="fg"><label class="fl" for="role">I am a</label><select class="fs" id="role" name="role" required><option value="">Select one</option><option>Student</option><option>Parent</option><option>Working professional</option></select></div>
          <div class="fg"><label class="fl" for="time">Preferred time</label><select class="fs" id="time" name="time"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option><option>Any time</option></select></div>
        </div>
        <div class="f-row">
          <div class="fg"><label class="fl" for="referralCode">Referral code (optional)</label><input class="fi" id="referralCode" name="referralCode" placeholder="e.g. EMB-FRIEND-25"></div>
        </div>
        <div class="fg"><label class="fl" for="message">Tell us what you want help with</label><textarea class="ft" id="message" name="message" rows="5"></textarea></div>
        <button type="submit" class="btn-p">Request consultation</button>
        <div class="form-status" id="formStatus"></div>
      </form>
    </div>
  </section>`,
});

writePage('404.html', {
  title: 'Page not found | eMBriture',
  description: 'The page you requested could not be found.',
  body: `<section class="page-hero" style="min-height:60vh;display:flex;align-items:center">
    <div class="ph-inner" style="text-align:center">
      <span class="ph-tag">404</span>
      <h1 class="ph-title">We could not find that page.</h1>
      <p class="ph-sub" style="margin-left:auto;margin-right:auto">Try the home hub, the destination guides, or contact us directly.</p>
      <div class="ph-ctas" style="justify-content:center"><a href="/" class="btn-p">Go home</a><a href="/destinations" class="btn-g">Browse destinations</a></div>
    </div>
  </section>`,
});

destinations.forEach((destination) => {
  writePage(`destinations/${destination.slug}.html`, {
    title: `${destination.name} study guide | eMBriture`,
    description: `${destination.name} admissions guide covering tuition, scholarships, visas, universities and student fit.`,
    body: `<section class="dest-hero">
      <div class="hero-mesh"></div>
      <div class="dest-hero-inner">
        <div>
          <span class="flag">${destination.flag}</span>
          <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/destinations">Destinations</a><span>/</span><span>${destination.name}</span></nav>
          <h1>${destination.name} for students who want <em>clarity</em>.</h1>
          <p>${destination.summary}</p>
          <div class="ph-ctas"><a href="/contact" class="btn-p">Discuss ${destination.name}</a><a href="/services/admissions" class="btn-g">See admissions support</a></div>
        </div>
        <div class="dest-stat-box">
          ${destination.stats.map((stat) => `<div class="sb"><div class="sb-n">${stat[0]}</div><div class="sb-l">${stat[1]}</div></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="two-col">
        <div class="two-col-rich">
          <span class="s-tag">Why families choose ${destination.name}</span>
          <h3>${destination.tagline}</h3>
          <p>${destination.costs}</p>
          <ul>${destination.why.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="panel">
          <h4>Best fit</h4>
          <p>${destination.fit}</p>
          <h4 style="margin-top:18px">Visa picture</h4>
          <p>${destination.visa}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <span class="s-tag">University snapshot</span>
      <h2 class="s-title">A few institutions we regularly discuss with families.</h2>
      <table class="uni-table">
        <tr><th>University</th><th>Best known for</th><th>Typical tuition</th><th>Scholarship angle</th></tr>
        ${destination.universities.map((row) => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join('')}
      </table>
    </section>
    <section class="section">
      <span class="s-tag">Planning checklist</span>
      <div class="why-grid">
        ${destination.admissions.map((step, index) => `<div class="why-card reveal"><div class="why-num">0${index + 1}</div><h3>Planning step ${index + 1}</h3><p>${step}</p></div>`).join('')}
      </div>
    </section>
    <section class="cta-big">
      <div class="cta-inner">
        <h2>Need help deciding if ${destination.name} is <em>actually right</em> for your profile?</h2>
        <p>We can compare this route against the other destinations in the context of budget, scholarships and employability.</p>
        <div class="cta-ctas"><a href="/contact" class="btn-p">Book a consultation</a><a href="/destinations" class="btn-g">Compare destinations</a></div>
      </div>
    </section>`,
  });
});

services.forEach((service) => {
  writePage(`services/${service.slug}.html`, {
    title: `${service.name} | eMBriture`,
    description: `${service.summary} Learn how eMBriture delivers ${service.name.toLowerCase()} for families across the UAE and GCC.`,
    body: `${hero({
      crumbs: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.name }],
      tag: 'Service',
      title: service.title,
      sub: service.summary,
      ctas: '<a href="/contact" class="btn-p">Book a consultation</a><a href="/services" class="btn-g">All services</a>',
    })}
    <section class="section">
      <div class="two-col">
        <div class="two-col-rich">
          <span class="s-tag">What this service does</span>
          <h3>${service.name}</h3>
          <p>${service.details}</p>
          <ul>${service.outcomes.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="panel">
          <h4>Who this is for</h4>
          <p>${service.summary}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <span class="s-tag">Process</span>
      <h2 class="s-title">How the work usually unfolds.</h2>
      <div class="approach-grid">
        ${service.process.map((step, index) => `<div class="app-card reveal"><div class="app-num">0${index + 1}</div><h3>${step}</h3><p>${service.outcomes[index] || service.summary}</p></div>`).join('')}
      </div>
    </section>
    <section class="section">
      <div class="why-grid">
        ${service.outcomes.map((item, index) => `<div class="why-card reveal"><div class="why-num">0${index + 1}</div><h3>${item}</h3><p>${service.details}</p></div>`).join('')}
      </div>
    </section>`,
  });
});

audiences.forEach((audience) => {
  writePage(audience.file, {
    title: `${audience.tag} | eMBriture`,
    description: audience.summary,
    body: `${hero({
      crumbs: [{ label: 'Home', href: '/' }, { label: audience.tag }],
      tag: audience.tag,
      title: audience.title,
      sub: audience.summary,
      ctas: '<a href="/contact" class="btn-p">Talk to us</a><a href="/approach" class="btn-g">See our process</a>',
    })}
    <section class="section">
      <div class="why-grid">
        ${audience.bullets.map((bullet, index) => `<div class="why-card reveal"><div class="why-num">0${index + 1}</div><h3>${bullet}</h3><p>${audience.summary}</p></div>`).join('')}
      </div>
    </section>
    <section class="section">
      <div class="two-col">
        <div class="two-col-rich">
          <span class="s-tag">What we help with</span>
          <h3>Support calibrated for ${audience.tag.toLowerCase()}.</h3>
          <p>${audience.summary}</p>
          <ul>${audience.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>
        </div>
        <div class="panel">
          <h4>Good next step</h4>
          <p>If this page sounds like your situation, book the first consultation and we will tell you what matters most right now and what can wait.</p>
        </div>
      </div>
    </section>`,
  });
});

articles.forEach((article) => writeArticle(`insights/${article.slug}.html`, article));

legalPages.forEach((legal) => {
  writePage(legal.file, {
    title: `${legal.title} | eMBriture`,
    description: legal.description,
    body: `${hero({
      crumbs: [{ label: 'Home', href: '/' }, { label: legal.title }],
      tag: 'Legal',
      title: legal.title,
      sub: legal.description,
    })}
    <article class="article">${legal.content}</article>`,
  });
});

const uniqueRoutes = [...new Set(writtenRoutes)].sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map((route) => `  <url>
    <loc>${route === '/' ? `${SITE}/` : `${SITE}${route}`}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.startsWith('/insights/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/insights/') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(__dirname, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

console.log(`Generated ${uniqueRoutes.length} routes.`);
