import { useState } from 'react'
import './CertificateProgram.css'
import CertificateViewer from './CertificateViewer'
import { API_URL } from '../api'

const INDUSTRIES = [
  {
    id: 'cybersecurity',
    icon: '🔐',
    title: 'Cybersecurity',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #1a0a0a, #2d0f0f)',
    border: '#ef4444',
    description: 'Master threat detection, vulnerability scanning, and defensive security systems.',
    duration: '45 min',
    level: 'Intermediate',
    modules: [
      { id: 1, title: 'Threat Detection & Analysis', questions: [
        { q: 'What does CIA stand for in cybersecurity?', options: ['Confidentiality, Integrity, Availability', 'Central Intelligence Agency', 'Cyber Intrusion Analysis', 'Code Injection Attack'], answer: 0 },
        { q: 'Which attack involves intercepting communications between two parties?', options: ['DDoS', 'Phishing', 'Man-in-the-Middle', 'SQL Injection'], answer: 2 },
        { q: 'What is a zero-day vulnerability?', options: ['A bug fixed in 24 hours', 'An unknown flaw with no patch available', 'A vulnerability rated 0/10', 'A bug found on day zero of development'], answer: 1 },
        { q: 'What is the purpose of a firewall?', options: ['Speed up the network', 'Filter and monitor network traffic', 'Encrypt hard drives', 'Store passwords'], answer: 1 },
      ]},
      { id: 2, title: 'Vulnerability Scanning & Pen Testing', questions: [
        { q: 'What does SQL injection exploit?', options: ['JavaScript errors', 'Unsanitized database queries', 'Server hardware', 'CSS vulnerabilities'], answer: 1 },
        { q: 'What is the purpose of penetration testing?', options: ['Speed up servers', 'Simulate attacks to find weaknesses', 'Install antivirus software', 'Encrypt user data'], answer: 1 },
        { q: 'What is a CVE number?', options: ['A network speed metric', 'Common Vulnerabilities and Exposures identifier', 'Cybersecurity Vendor Evaluation score', 'Certificate Validation Error code'], answer: 1 },
        { q: 'Which protocol is used to securely transfer files?', options: ['FTP', 'HTTP', 'SFTP', 'SMTP'], answer: 2 },
      ]},
      { id: 3, title: 'Incident Response & Defense', questions: [
        { q: 'What is the first step in incident response?', options: ['Eradication', 'Identification', 'Recovery', 'Lessons learned'], answer: 1 },
        { q: 'What does SIEM stand for?', options: ['Security Information and Event Management', 'System Integrity and Error Monitoring', 'Secure Internet Encryption Method', 'Software Integration Engine Manager'], answer: 0 },
        { q: 'What is the purpose of multi-factor authentication?', options: ['Faster login', 'Add extra verification layers beyond passwords', 'Replace passwords entirely', 'Monitor login times'], answer: 1 },
        { q: 'What is a honeypot in cybersecurity?', options: ['A file encryption tool', 'A decoy system to attract attackers', 'A password manager', 'A type of firewall'], answer: 1 },
      ]},
    ]
  },
  {
    id: 'ai-ml',
    icon: '🤖',
    title: 'AI & Machine Learning',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #0f0a1a, #1a0f2d)',
    border: '#8b5cf6',
    description: 'Learn neural networks, model training, and real-world AI application development.',
    duration: '50 min',
    level: 'Intermediate',
    modules: [
      { id: 1, title: 'Foundations of Machine Learning', questions: [
        { q: 'What is supervised learning?', options: ['Training without labeled data', 'Training with labeled input-output pairs', 'Monitoring model performance', 'A type of neural network'], answer: 1 },
        { q: 'What does overfitting mean?', options: ['Model is too simple', 'Model performs well on training data but poorly on new data', 'Model trains too slowly', 'Model uses too much data'], answer: 1 },
        { q: 'What is a training/test split used for?', options: ['Speeding up training', 'Evaluating model on unseen data', 'Cleaning datasets', 'Reducing model size'], answer: 1 },
        { q: 'Which algorithm is commonly used for classification?', options: ['K-Means', 'Linear Regression', 'Random Forest', 'PCA'], answer: 2 },
      ]},
      { id: 2, title: 'Neural Networks & Deep Learning', questions: [
        { q: 'What is an activation function used for?', options: ['Load data into the model', 'Introduce non-linearity into neural networks', 'Reduce model size', 'Save model weights'], answer: 1 },
        { q: 'What does CNN stand for?', options: ['Central Neural Network', 'Convolutional Neural Network', 'Computed Node Network', 'Cyclic Neuron Notation'], answer: 1 },
        { q: 'What is backpropagation?', options: ['Running the model backwards', 'Algorithm to update weights by propagating errors backward', 'Reverting model to previous version', 'Data augmentation technique'], answer: 1 },
        { q: 'What is dropout in neural networks?', options: ['Removing low-performing models', 'Randomly deactivating neurons during training to prevent overfitting', 'Reducing dataset size', 'Stopping training early'], answer: 1 },
      ]},
      { id: 3, title: 'AI Applications & Ethics', questions: [
        { q: 'What is transfer learning?', options: ['Moving data between servers', 'Applying a pre-trained model to a new task', 'Transferring model to mobile', 'Sharing model weights online'], answer: 1 },
        { q: 'What is bias in AI models?', options: ['Model speed issues', 'Systematic errors due to flawed training data or assumptions', 'Memory allocation errors', 'Network latency'], answer: 1 },
        { q: 'What does NLP stand for?', options: ['Neural Learning Protocol', 'Natural Language Processing', 'Network Layer Processing', 'Numerical Learning Pattern'], answer: 1 },
        { q: 'What is a Large Language Model (LLM)?', options: ['A compressed dataset', 'An AI trained on massive text data to understand and generate language', 'A type of database', 'A hardware accelerator'], answer: 1 },
      ]},
    ]
  },
  {
    id: 'fintech',
    icon: '💹',
    title: 'FinTech',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #0a1a10, #0f2d1a)',
    border: '#10b981',
    description: 'Understand financial technology, blockchain, digital payments, and algorithmic trading.',
    duration: '40 min',
    level: 'Beginner',
    modules: [
      { id: 1, title: 'Digital Finance Fundamentals', questions: [
        { q: 'What is a digital wallet?', options: ['A physical card reader', 'Software that stores payment information electronically', 'A bank branch app', 'A cryptocurrency exchange'], answer: 1 },
        { q: 'What does KYC stand for in finance?', options: ['Keep Your Capital', 'Know Your Customer', 'Key Yield Calculation', 'Kernel Year Compliance'], answer: 1 },
        { q: 'What is open banking?', options: ['Banks with 24/7 physical access', 'Sharing financial data with third-party providers via APIs', 'Free banking for all customers', 'Cryptocurrency banking'], answer: 1 },
        { q: 'What is a robo-advisor?', options: ['A human financial advisor using robots', 'Automated financial planning using algorithms', 'A banking chatbot', 'A stock trading robot'], answer: 1 },
      ]},
      { id: 2, title: 'Blockchain & Cryptocurrency', questions: [
        { q: 'What is a blockchain?', options: ['A type of database server', 'A distributed, immutable ledger of transactions', 'A cryptocurrency wallet', 'A payment processor'], answer: 1 },
        { q: 'What is a smart contract?', options: ['A legally binding PDF', 'Self-executing code stored on a blockchain', 'A contract signed digitally', 'A banking agreement'], answer: 1 },
        { q: 'What is DeFi?', options: ['Defined Finance', 'Decentralized Finance using blockchain', 'Default Financial index', 'Digital Federal interest'], answer: 1 },
        { q: 'What does mining mean in cryptocurrency?', options: ['Extracting physical coins', 'Validating transactions and adding them to the blockchain', 'Hacking cryptocurrency wallets', 'Trading cryptocurrency at a profit'], answer: 1 },
      ]},
      { id: 3, title: 'Algorithmic Trading & Risk', questions: [
        { q: 'What is algorithmic trading?', options: ['Manual trading with algorithms as reference', 'Automated trading using programmed rules and algorithms', 'Trading cryptocurrency only', 'High-frequency human trading'], answer: 1 },
        { q: 'What is portfolio diversification?', options: ['Investing in one high-return stock', 'Spreading investments across assets to reduce risk', 'Maximizing a single position', 'Day trading multiple stocks'], answer: 1 },
        { q: 'What is a stop-loss order?', options: ['An order to buy at a low price', 'An automatic sell order to limit losses at a set price', 'A dividend reinvestment', 'A margin call'], answer: 1 },
        { q: 'What is market liquidity?', options: ['How volatile a market is', 'How easily assets can be bought or sold without affecting price', 'The total market capitalization', 'Daily trading volume'], answer: 1 },
      ]},
    ]
  },
  {
    id: 'game-dev',
    icon: '🎮',
    title: 'Game Development',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a1200, #2d1f00)',
    border: '#f59e0b',
    description: 'Build games with AI-driven NPCs, procedural generation, and game engine fundamentals.',
    duration: '45 min',
    level: 'Intermediate',
    modules: [
      { id: 1, title: 'Game Design Fundamentals', questions: [
        { q: 'What is a game loop?', options: ['A repeating level', 'The continuous cycle of input, update, and render in a game', 'A looping animation', 'An infinite loading screen'], answer: 1 },
        { q: 'What is a sprite in game development?', options: ['A 3D model', 'A 2D image or animation used to represent objects in a game', 'A particle effect', 'A type of shader'], answer: 1 },
        { q: 'What does FPS stand for in gaming?', options: ['First Person Shooter only', 'Frames Per Second — how many frames render per second', 'File Processing System', 'Fast Physics Simulation'], answer: 1 },
        { q: 'What is collision detection?', options: ['Finding bugs in the code', 'Determining when objects in a game overlap or touch', 'Detecting player input', 'Monitoring network collisions'], answer: 1 },
      ]},
      { id: 2, title: 'AI in Games & NPCs', questions: [
        { q: 'What is pathfinding in game AI?', options: ['Finding code errors', 'Algorithms that help NPCs navigate from one point to another', 'Routing network packets', 'Detecting player cheating'], answer: 1 },
        { q: 'What is a finite state machine (FSM) used for in game AI?', options: ['Managing game saves', 'Modeling NPC behaviors with defined states and transitions', 'Rendering graphics', 'Managing multiplayer connections'], answer: 1 },
        { q: 'What is procedural generation?', options: ['Manually creating game content', 'Algorithmically generating game content (levels, maps, items)', 'A type of animation technique', 'A multiplayer protocol'], answer: 1 },
        { q: 'What does A* (A-star) algorithm do?', options: ['Ranks game scores', 'Finds the shortest path between two points efficiently', 'Generates random levels', 'Manages game assets'], answer: 1 },
      ]},
      { id: 3, title: 'Game Development Workflow', questions: [
        { q: 'What is a game engine?', options: ['The hardware powering a game', 'Software framework providing tools for game development', 'A type of game genre', 'The game physics system only'], answer: 1 },
        { q: 'What is playtesting?', options: ['Playing other studios games for research', 'Testing a game by playing it to find bugs and balance issues', 'Automated performance testing', 'Marketing the game to players'], answer: 1 },
        { q: 'What is version control used for in game dev?', options: ['Managing game versions for players', 'Tracking code changes and enabling team collaboration', 'Controlling frame rate', 'Managing game server versions'], answer: 1 },
        { q: 'What is a build pipeline?', options: ['Physical server infrastructure', 'Automated process that compiles and packages the game for release', 'A testing methodology', 'A network architecture'], answer: 1 },
      ]},
    ]
  },
  {
    id: 'web-dev',
    icon: '🌐',
    title: 'Web Development',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0a1220, #0f1f2d)',
    border: '#0ea5e9',
    description: 'Master modern frontend, backend, APIs, and full-stack web application development.',
    duration: '40 min',
    level: 'Beginner',
    modules: [
      { id: 1, title: 'Frontend Development', questions: [
        { q: 'What does HTML stand for?', options: ['Hyperlink Text Markup Language', 'HyperText Markup Language', 'High-level Text Management Language', 'Hybrid Template Markup Logic'], answer: 1 },
        { q: 'What is the purpose of CSS?', options: ['Adding interactivity', 'Styling and visually formatting HTML elements', 'Storing data', 'Connecting to APIs'], answer: 1 },
        { q: 'What is a React component?', options: ['A backend server module', 'A reusable, self-contained piece of UI', 'A database table', 'A network protocol'], answer: 1 },
        { q: 'What does DOM stand for?', options: ['Data Object Model', 'Document Object Model', 'Dynamic Output Method', 'Design Oriented Markup'], answer: 1 },
      ]},
      { id: 2, title: 'Backend & APIs', questions: [
        { q: 'What is a REST API?', options: ['A sleep-scheduling program', 'An architectural style for networked applications using HTTP', 'A type of database', 'A frontend framework'], answer: 1 },
        { q: 'What does HTTP status 404 mean?', options: ['Server error', 'Resource not found', 'Unauthorized access', 'Request timeout'], answer: 1 },
        { q: 'What is JSON?', options: ['A JavaScript framework', 'Lightweight data-interchange format', 'A type of database', 'A CSS preprocessor'], answer: 1 },
        { q: 'What is authentication vs authorization?', options: ['They are the same thing', 'Auth = who you are; Authorization = what you can do', 'Auth = what you can do; Authorization = who you are', 'Both refer to password management'], answer: 1 },
      ]},
      { id: 3, title: 'Deployment & DevOps', questions: [
        { q: 'What is CI/CD?', options: ['Content Integration / Content Delivery', 'Continuous Integration / Continuous Deployment', 'Code Inspection / Code Deployment', 'Cloud Infrastructure / Cloud Delivery'], answer: 1 },
        { q: 'What is Docker used for?', options: ['Designing UI components', 'Containerizing applications for consistent environments', 'A CSS framework', 'Managing databases'], answer: 1 },
        { q: 'What is a CDN?', options: ['Code Distribution Network', 'Content Delivery Network — serving files from servers near the user', 'Central Data Node', 'Cloud Deployment Network'], answer: 1 },
        { q: 'What does Git version control allow developers to do?', options: ['Style web pages', 'Track code changes and collaborate on codebases', 'Host websites', 'Manage databases'], answer: 1 },
      ]},
    ]
  },
  {
    id: 'bioinformatics',
    icon: '🧬',
    title: 'Bioinformatics',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #1a0a14, #2d0f20)',
    border: '#ec4899',
    description: 'Explore genomics, protein analysis, biological data processing, and computational biology.',
    duration: '50 min',
    level: 'Advanced',
    modules: [
      { id: 1, title: 'Genomics & Sequence Analysis', questions: [
        { q: 'What is DNA sequencing?', options: ['Editing DNA', 'Determining the exact order of nucleotides in a DNA molecule', 'Synthesizing proteins', 'Cloning organisms'], answer: 1 },
        { q: 'What is FASTA format?', options: ['A fast alignment algorithm', 'A text-based format for representing nucleotide or peptide sequences', 'A database of protein structures', 'A bioinformatics programming language'], answer: 1 },
        { q: 'What does BLAST stand for?', options: ['Biological Large-scale Alignment Sequence Tool', 'Basic Local Alignment Search Tool', 'Bacterial Laser Analysis System Technology', 'Binary Linked Assembly Sequence Tree'], answer: 1 },
        { q: 'What is a genome assembly?', options: ['Building a physical model of DNA', 'Reconstructing an organism genome from sequencing reads', 'A type of gene editing', 'A protein folding technique'], answer: 1 },
      ]},
      { id: 2, title: 'Protein Structure & Analysis', questions: [
        { q: 'What is a protein?', options: ['A type of carbohydrate', 'A large biomolecule made of amino acid chains', 'A lipid molecule', 'A nucleic acid'], answer: 1 },
        { q: 'What did AlphaFold achieve?', options: ['Sequenced the human genome', 'Predicted 3D protein structures from amino acid sequences with high accuracy', 'Created synthetic DNA', 'Mapped the human brain'], answer: 1 },
        { q: 'What is a protein domain?', options: ['A protein database website', 'A conserved, independently folding functional unit within a protein', 'A type of amino acid', 'A gene expression marker'], answer: 1 },
        { q: 'What is mass spectrometry used for in bioinformatics?', options: ['DNA sequencing', 'Identifying proteins and their modifications by mass', 'RNA editing', 'Cell imaging'], answer: 1 },
      ]},
      { id: 3, title: 'Computational Biology & Tools', questions: [
        { q: 'What is RNA-Seq used for?', options: ['Editing RNA sequences', 'Measuring gene expression levels across the transcriptome', 'Synthesizing RNA', 'Sequencing DNA from RNA viruses only'], answer: 1 },
        { q: 'What is a phylogenetic tree?', options: ['A taxonomy classification chart', 'A diagram showing evolutionary relationships between organisms', 'A protein interaction network', 'A gene regulatory network'], answer: 1 },
        { q: 'What is the purpose of the PDB (Protein Data Bank)?', options: ['Store DNA sequences', 'Repository of 3D structural data of biological macromolecules', 'A bioinformatics programming tool', 'A genomics analysis pipeline'], answer: 1 },
        { q: 'What does variant calling detect?', options: ['Protein mutations only', 'Differences in DNA sequence between a sample and a reference genome', 'RNA expression levels', 'Epigenetic modifications'], answer: 1 },
      ]},
    ]
  },
]

const PASSING_SCORE = 75

export default function CertificateProgram() {
  const [view, setView] = useState('home') // home | industry | quiz | result | certificate
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [currentModule, setCurrentModule] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [scores, setScores] = useState({})
  const [learnerName, setLearnerName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [certificate, setCertificate] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const startIndustry = (industry) => {
    setSelectedIndustry(industry)
    setCurrentModule(0)
    setCurrentQuestion(0)
    setAnswers({})
    setScores({})
    setSelected(null)
    setShowFeedback(false)
    setView('industry')
  }

  const startQuiz = () => {
    if (!learnerName.trim()) return
    setLearnerName(nameInput.trim())
    setView('quiz')
  }

  const handleAnswer = (optionIdx) => {
    if (showFeedback) return
    setSelected(optionIdx)
    setShowFeedback(true)
    const mod = selectedIndustry.modules[currentModule]
    const q = mod.questions[currentQuestion]
    const key = `${currentModule}-${currentQuestion}`
    setAnswers(prev => ({ ...prev, [key]: optionIdx === q.answer }))
  }

  const nextQuestion = () => {
    const mod = selectedIndustry.modules[currentModule]
    setSelected(null)
    setShowFeedback(false)
    if (currentQuestion < mod.questions.length - 1) {
      setCurrentQuestion(q => q + 1)
    } else {
      // End of module — calculate module score
      const moduleAnswers = { ...answers }
      const key = `${currentModule}-${currentQuestion}`
      moduleAnswers[key] = selected === mod.questions[currentQuestion].answer
      const correct = mod.questions.filter((_, i) => moduleAnswers[`${currentModule}-${i}`]).length
      const pct = Math.round((correct / mod.questions.length) * 100)
      const newScores = { ...scores, [currentModule]: pct }
      setScores(newScores)

      if (currentModule < selectedIndustry.modules.length - 1) {
        setCurrentModule(m => m + 1)
        setCurrentQuestion(0)
      } else {
        // All modules done
        const avg = Math.round(Object.values(newScores).reduce((a, b) => a + b, 0) / Object.values(newScores).length)
        setView('result')
        setScores(newScores)
        if (avg >= PASSING_SCORE) {
          issueCertificate(newScores, avg)
        }
      }
    }
  }

  const issueCertificate = async (finalScores, avg) => {
    setSubmitting(true)
    const certData = {
      learner_name: learnerName,
      industry: selectedIndustry.title,
      industry_id: selectedIndustry.id,
      score: avg,
      modules: selectedIndustry.modules.map((m, i) => ({
        title: m.title,
        score: finalScores[i] || 0
      })),
      issued_at: new Date().toISOString(),
      cert_id: `ELEC-${selectedIndustry.id.toUpperCase()}-${Date.now()}`
    }
    try {
      await fetch(`${API_URL}/api/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certData)
      })
    } catch (e) { /* store locally even if API fails */ }
    setCertificate(certData)
    setSubmitting(false)
  }

  const totalScore = () => {
    const vals = Object.values(scores)
    if (!vals.length) return 0
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
  }

  const passed = totalScore() >= PASSING_SCORE

  // ── Views ────────────────────────────────────────────────────────────────────
  if (view === 'certificate' && certificate) {
    return <CertificateViewer cert={certificate} industry={selectedIndustry} onBack={() => setView('home')} />
  }

  if (view === 'result') {
    const avg = totalScore()
    return (
      <div className="cp-result">
        <div className="cp-result-card">
          <div className="cp-result-icon">{passed ? '🏆' : '📚'}</div>
          <h2>{passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
          <p className="cp-result-industry">{selectedIndustry.icon} {selectedIndustry.title}</p>
          <div className="cp-score-big" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
            {avg}%
          </div>
          <p className="cp-result-status">{passed ? '✅ Certificate Earned' : `❌ Score below ${PASSING_SCORE}% required`}</p>

          <div className="cp-module-scores">
            {selectedIndustry.modules.map((m, i) => (
              <div key={i} className="cp-module-score-row">
                <span>{m.title}</span>
                <span style={{ color: scores[i] >= PASSING_SCORE ? '#10b981' : '#ef4444' }}>{scores[i]}%</span>
              </div>
            ))}
          </div>

          <div className="cp-result-actions">
            {passed && certificate && (
              <button className="cp-btn cp-btn-primary" onClick={() => setView('certificate')}>
                🎓 View Certificate
              </button>
            )}
            <button className="cp-btn cp-btn-outline" onClick={() => startIndustry(selectedIndustry)}>
              🔄 Retake
            </button>
            <button className="cp-btn cp-btn-ghost" onClick={() => setView('home')}>
              ← Back to Programs
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'quiz') {
    const mod = selectedIndustry.modules[currentModule]
    const q = mod.questions[currentQuestion]
    const progress = ((currentModule * mod.questions.length + currentQuestion) /
      (selectedIndustry.modules.length * mod.questions.length)) * 100

    return (
      <div className="cp-quiz" style={{ background: selectedIndustry.gradient }}>
        <div className="cp-quiz-header">
          <button className="cp-back-btn" onClick={() => setView('home')}>✕</button>
          <div className="cp-quiz-meta">
            <span>{selectedIndustry.icon} {selectedIndustry.title}</span>
            <span>Module {currentModule + 1}/{selectedIndustry.modules.length}: {mod.title}</span>
          </div>
          <div className="cp-progress-bar">
            <div className="cp-progress-fill" style={{ width: `${progress}%`, background: selectedIndustry.color }} />
          </div>
        </div>

        <div className="cp-quiz-body">
          <div className="cp-q-counter">Q{currentQuestion + 1} of {mod.questions.length}</div>
          <h3 className="cp-question">{q.q}</h3>
          <div className="cp-options">
            {q.options.map((opt, i) => {
              let cls = 'cp-option'
              if (showFeedback) {
                if (i === q.answer) cls += ' correct'
                else if (i === selected && i !== q.answer) cls += ' wrong'
              } else if (i === selected) {
                cls += ' selected'
              }
              return (
                <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                  <span className="cp-option-letter">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              )
            })}
          </div>
          {showFeedback && (
            <div className={`cp-feedback ${selected === q.answer ? 'correct' : 'wrong'}`}>
              {selected === q.answer ? '✅ Correct!' : `❌ Correct answer: ${q.options[q.answer]}`}
            </div>
          )}
          {showFeedback && (
            <button className="cp-btn cp-btn-primary cp-next-btn" onClick={nextQuestion}
              style={{ background: selectedIndustry.color }}>
              {currentQuestion < mod.questions.length - 1 ? 'Next Question →' :
               currentModule < selectedIndustry.modules.length - 1 ? 'Next Module →' : 'See Results 🏆'}
            </button>
          )}
        </div>
      </div>
    )
  }

  if (view === 'industry') {
    return (
      <div className="cp-industry-page" style={{ background: selectedIndustry.gradient }}>
        <div className="cp-industry-header">
          <button className="cp-back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="cp-industry-icon" style={{ color: selectedIndustry.color }}>
            {selectedIndustry.icon}
          </div>
          <h2 style={{ color: selectedIndustry.color }}>{selectedIndustry.title} Certificate</h2>
          <p>{selectedIndustry.description}</p>
          <div className="cp-industry-meta">
            <span>⏱ {selectedIndustry.duration}</span>
            <span>📊 {selectedIndustry.level}</span>
            <span>📋 {selectedIndustry.modules.length} Modules</span>
            <span>❓ {selectedIndustry.modules.reduce((a, m) => a + m.questions.length, 0)} Questions</span>
          </div>
        </div>

        <div className="cp-modules-list">
          {selectedIndustry.modules.map((m, i) => (
            <div key={i} className="cp-module-item" style={{ borderLeft: `3px solid ${selectedIndustry.color}` }}>
              <span className="cp-module-num" style={{ background: selectedIndustry.color }}>
                {i + 1}
              </span>
              <div>
                <div className="cp-module-title">{m.title}</div>
                <div className="cp-module-sub">{m.questions.length} questions</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-name-section">
          <label>Your name for the certificate:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && startQuiz()}
          />
          <button
            className="cp-btn cp-btn-primary"
            style={{ background: selectedIndustry.color }}
            onClick={startQuiz}
            disabled={!nameInput.trim()}
          >
            Start Program →
          </button>
          <p className="cp-pass-note">Passing score: {PASSING_SCORE}% or higher</p>
        </div>
      </div>
    )
  }

  // Home view
  return (
    <section id="certificates" className="cp-home section">
      <div className="container">
        <h2 className="section-title">Certificate Programs</h2>
        <p className="section-subtitle">
          Rapid industry certifications across 6 fields — complete modules, pass assessments, earn your certificate
        </p>

        <div className="cp-stats-row">
          {[
            { icon: '🏆', value: '6', label: 'Industries' },
            { icon: '📋', value: '18', label: 'Modules' },
            { icon: '❓', value: '72', label: 'Questions' },
            { icon: '🎓', value: '∞', label: 'Certificates' },
          ].map(s => (
            <div key={s.label} className="cp-stat">
              <div className="cp-stat-icon">{s.icon}</div>
              <div className="cp-stat-value">{s.value}</div>
              <div className="cp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="cp-grid">
          {INDUSTRIES.map(ind => (
            <div key={ind.id} className="cp-card" style={{ '--ind-color': ind.color, '--ind-border': ind.border }}
              onClick={() => startIndustry(ind)}>
              <div className="cp-card-icon">{ind.icon}</div>
              <h3 className="cp-card-title" style={{ color: ind.color }}>{ind.title}</h3>
              <p className="cp-card-desc">{ind.description}</p>
              <div className="cp-card-meta">
                <span>⏱ {ind.duration}</span>
                <span>📊 {ind.level}</span>
              </div>
              <div className="cp-card-modules">
                {ind.modules.map((m, i) => (
                  <span key={i} className="cp-module-badge" style={{ borderColor: ind.color }}>
                    {m.title}
                  </span>
                ))}
              </div>
              <button className="cp-card-btn" style={{ background: ind.color }}>
                Start Program →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
