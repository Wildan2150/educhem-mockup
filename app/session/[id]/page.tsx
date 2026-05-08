'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Atom, CheckCircle2, Lock, PlayCircle, FileText, Send, 
  Beaker, FlaskConical, Presentation, BrainCircuit, CheckSquare, ChevronRight, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Type Definitions ---
type PhaseName = 'Engage' | 'Explore' | 'Explain' | 'Elaborate' | 'Evaluate';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

// --- Main Session Component ---
export default function SessionView() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.id as string;

  const [activePhase, setActivePhase] = useState<PhaseName>('Engage');
  const [unlockedPhases, setUnlockedPhases] = useState<PhaseName[]>(['Engage']);

  // Phase Progress Handlers
  const unlockPhase = (phase: PhaseName) => {
    if (!unlockedPhases.includes(phase)) {
      setUnlockedPhases(prev => [...prev, phase]);
    }
  };

  const phasesList: { name: PhaseName; icon: React.ReactNode; label: string }[] = [
    { name: 'Engage', icon: <PlayCircle className="w-4 h-4" />, label: 'Introduction' },
    { name: 'Explore', icon: <Beaker className="w-4 h-4" />, label: 'Simulation' },
    { name: 'Explain', icon: <Presentation className="w-4 h-4" />, label: 'Concept Check' },
    { name: 'Elaborate', icon: <BrainCircuit className="w-4 h-4" />, label: 'Application' },
    { name: 'Evaluate', icon: <CheckSquare className="w-4 h-4" />, label: 'Assessment' },
  ];

  const currentIndex = phasesList.findIndex(p => p.name === activePhase);
  const nextPhase = phasesList[currentIndex + 1];
  const isNextUnlocked = nextPhase && unlockedPhases.includes(nextPhase.name);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col justify-between shrink-0 z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div>
          <button onClick={() => router.push('/dashboard')} className="p-6 flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity">
            <Atom className="w-6 h-6 shrink-0" />
            <span className="truncate">EduChem-GenAI</span>
          </button>
          
          <div className="px-6 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
            5E Learning Cycle
          </div>
          
          <nav className="flex flex-col gap-1 px-3">
            {phasesList.map((phase, index) => {
              const isCurrent = phase.name === activePhase;
              const isUnlocked = unlockedPhases.includes(phase.name);
              const isCompleted = unlockedPhases.includes(phasesList[index + 1]?.name) || (phase.name === 'Evaluate' && isUnlocked && false /* mock completion */);
              
              return (
                <button
                  key={phase.name}
                  onClick={() => isUnlocked && setActivePhase(phase.name)}
                  disabled={!isUnlocked}
                  className={`
                    w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-200 font-medium group
                    ${isCurrent ? 'bg-primary-container text-on-primary-container shadow-sm border border-primary/20' : 'text-on-surface hover:bg-surface-container-high border border-transparent'}
                    ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCurrent ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant group-hover:bg-surface-container-highest'}`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : (!isUnlocked ? <Lock className="w-4 h-4" /> : phase.icon)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{phase.name}</div>
                      <div className={`text-[10px] uppercase tracking-wide ${isCurrent ? 'text-[#e0e0e0]' : 'text-on-surface-variant'}`}>{phase.label}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-outline-variant">
           <button 
             onClick={() => router.push('/dashboard')}
             className="w-full flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface p-3 rounded-xl text-sm font-bold transition-colors border border-outline-variant shadow-sm"
           >
             Save & Exit
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <AnimatePresence mode="wait">
          {activePhase === 'Engage' && <PhaseEngage key="engage" onUnlockNext={() => unlockPhase('Explore')} isNextUnlocked={isNextUnlocked} onGoToNext={() => setActivePhase(nextPhase.name)} />}
          {activePhase === 'Explore' && <PhaseExplore key="explore" onUnlockNext={() => unlockPhase('Explain')} isNextUnlocked={isNextUnlocked} onGoToNext={() => setActivePhase(nextPhase.name)} />}
          {activePhase === 'Explain' && <PhaseExplain key="explain" onUnlockNext={() => unlockPhase('Elaborate')} isNextUnlocked={isNextUnlocked} onGoToNext={() => setActivePhase(nextPhase.name)} />}
          {activePhase === 'Elaborate' && <PhaseElaborate key="elaborate" onUnlockNext={() => unlockPhase('Evaluate')} isNextUnlocked={isNextUnlocked} onGoToNext={() => setActivePhase(nextPhase.name)} />}
          {activePhase === 'Evaluate' && <PhaseEvaluate key="evaluate" onFinish={() => router.push(`/session/${topicId}/summary`)} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ==========================================
// PHASE COMPONENTS
// ==========================================

function PhaseEngage({ onUnlockNext, isNextUnlocked, onGoToNext }: { onUnlockNext: () => void, isNextUnlocked?: boolean, onGoToNext?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Welcome to the Engage phase! I am forbidden from giving you formulas or calculations right now. Ask me anything conceptual about our topic to get started.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        content: 'That is a great question! Think about how concentration affects the frequency of particle collisions. How might that relate to what happens in your daily life when you stir sugar into tea?'
      }]);
      onUnlockNext(); // Unlock next phase after 1 interaction
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-6 pb-12">
        <div>
          <h2 className="text-3xl font-bold text-on-background">Phase 1: Engage</h2>
          <p className="text-on-surface-variant font-medium mt-1">Read the intro and ask questions. (Requires 1 message to unlock next phase)</p>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm prose prose-sm max-w-none">
          <h3>Target dan Alur Sesi Belajar Topik Ini</h3>
          <p>Dalam sesi ini, kamu akan diajak menelusuri bagaimana hukum-hukum stoikiometri bekerja. Pembelajaran dipecah dalam 5 fase (Framework 5E) agar pemahamanmu lebih solid:</p>
          <ul>
            <li><strong>Engage (Fase 1):</strong> Diskusi santai dan memantik imajinasi awalmu dengan asisten AI.</li>
            <li><strong>Explore (Fase 2):</strong> Kamu akan bermain-main menggunakan simulasi dari PhET dan mencatat data pengamatan mandiri.</li>
            <li><strong>Explain (Fase 3):</strong> Sintesis dari hasil pengamatan dan tanya-jawab dirangkum, AI akan memandu penalaranmu.</li>
            <li><strong>Elaborate (Fase 4):</strong> Waktunya perhitungan presisi pada studi kasus nyata (industri).</li>
            <li><strong>Evaluate (Fase 5):</strong> Evaluasi tanpa bantuan asisten AI. Kamu harus percaya diri!</li>
          </ul>
          <h4>Tujuan Pembelajaran Fase Ini</h4>
          <ul>
            <li>Membangkitkan rasa ingin tahu mengenai konsep stoikiometri.</li>
            <li>Menyadari penerapan perhitungan mol dalam kehidupan nyata maupun industri.</li>
          </ul>
        </div>
        
        <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          {/* Mockup Graphic/Banner */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 relative flex items-center justify-center overflow-hidden">
             {/* Decorative elements */}
             <div className="absolute top-0 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
             <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
             
             <div className="flex flex-col items-center justify-center text-white z-10 gap-3">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                  <Beaker className="w-10 h-10 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-black tracking-tight drop-shadow-md">Stoikiometri Mol</h3>
             </div>
             {/* Overlay pattern mock */}
             <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          <div className="p-6 prose prose-sm max-w-none">
            <h3>Pernahkah kamu membuat teh manis?</h3>
            <p>Terkadang gula larut dengan sangat cepat, namun di saat lain gula mengendap di dasar gelas. Secara tidak langsung kamu telah mempraktikkan konsep-konsep kimia dasar yang juga seragam dengan reaksi kompleks di pabrik maupun tubuh kita. Mari selami dunia partikel mikroskopis ini dan pahami apa yang sebenarnya terjadi!</p>
            
            <h4>Konsep Dasar Kimia dalam Kehidupan</h4>
            <p>Hampir di segala aspek yang bersinggungan di sekeliling kita adalah kimia. Ketika kita bernapas, meracik bumbu masakan, proses berkaratnya besi pagar luar rumah, sampai roket ke luar angkasa: semuanya ada perhitungannya! Sama halnya seperti resep kue, <i>&quot;kamu butuh 2 butir telur dan 500 gram terigu untuk membuat 1 adonan kue bolu besar&quot;</i>. Di ilmu kimia, kita menggunakan persamaan reaksi. Konsep yang merapikan takaran atau perbandingan jumlah reaktan agar pas bereaksi dengan produk ini disebut dengan <strong>Stoikiometri</strong>.</p>
            
            <h4>Instruksi Siswa</h4>
            <p>Pada tahap ini, kamu diajak untuk berdiskusi santai dengan EduChem-GenAI Assistant. Silakan tanyakan hal-hal fundamental yang membuatmu penasaran mengenai topik ini. Jangan ragu untuk memberikan opini atau menceritakan rekayasa sederhana yang pernah kamu lihat di kehidupan sehari-hari.</p>
            <p><strong>Penting:</strong> AI tidak akan memberikan kamu rumus atau jawaban perhitungan matematis pada fase ini. Tujuannya murni untuk menggali rasa ingin tahu dan pemahaman konseptualmu!</p>
          </div>
        </div>

        <ChatInterface messages={messages} input={input} setInput={setInput} onSend={handleSend} placeholder="Ask a conceptual question to start..." />
        
        {isNextUnlocked && (
           <div className="flex justify-end mt-4">
             <button onClick={onGoToNext} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md">
                Lanjut ke Fase Berikutnya <ChevronRight className="w-5 h-5"/>
             </button>
           </div>
        )}
      </div>
    </motion.div>
  );
}

function PhaseExplore({ onUnlockNext, isNextUnlocked, onGoToNext }: { onUnlockNext: () => void, isNextUnlocked?: boolean, onGoToNext?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Explore the PhET simulation above. Change the variables and observe what happens. Let me know what you notice, but I wont give you the conclusion just yet!' }
  ]);
  const [input, setInput] = useState('');
  const [isExplored, setIsExplored] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: 'Interesting observation. Why do you think that specific change caused that outcome in the simulation?' }]);
    }, 1000);
  };

  const markExplored = () => {
    setIsExplored(true);
    onUnlockNext();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 pb-12">
         <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-on-background">Phase 2: Explore</h2>
            <p className="text-on-surface-variant font-medium mt-1">Interact with the simulation. Click &quot;Done Exploring&quot; to unlock next phase.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={markExplored}
              disabled={isExplored}
              className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors ${
                isExplored ? 'bg-green-100 text-green-700' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              {isExplored ? <><CheckCircle2 className="w-5 h-5"/> Explored</> : 'Mark as Done Exploring'}
            </button>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm prose prose-sm max-w-none">
          <h3>Eksplorasi Simulasi PhET: Reactants, Products and Leftovers</h3>
          <p>Selamat datang di laboratorium virtual! Di sini kamu dapat merekayasa berbagai kondisi eksperimen tanpa khawatir terjadi kesalahan. Silakan perhatikan variabel-variabel yang ada pada simulasi di bawah.</p>
          <h4>Langkah-langkah Eksplorasi:</h4>
          <ol>
            <li><strong>Ubah Jumlah Reaktan:</strong> Tambahkan jumlah molekul reaktan ke dalam ruang reaksi. Amati jumlah produk yang dihasilkan dan sisa molekul (sisa reaktan).</li>
            <li><strong>Tentukan Pereaksi Pembatas:</strong> Perhatikan molekul mana yang habis pertama kali. Kapan molekul tersebut bisa menyebabkan molekul lain bersisa?</li>
            <li><strong>Pola:</strong> Bisakah kamu meraba pola atau rasio jumlah partikel yang diperlukan agar tidak ada yang bersisa?</li>
          </ol>
          <p>Catat hasil pengamatanmu pada tabel di bawah ini, dan diskusikan apapun penemuanmu bersama AI Assistant secara interaktif!</p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm h-[500px] flex-shrink-0 relative">
          {/* Mock iframe for PhET */}
          <div className="absolute inset-0 bg-surface-container flex flex-col items-center justify-center">
            <FlaskConical className="w-16 h-16 text-primary/40 mb-4" />
            <div className="text-on-surface font-bold text-lg">Interactive Web Simulation (PhET)</div>
            <div className="text-on-surface-variant text-sm border px-3 py-1 rounded-full mt-2 bg-background/50 border-outline-variant">Iframe Placeholder - Interactive Module Loading...</div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 text-on-background">Tabel Pengamatan (Mockup)</h3>
          <p className="text-sm text-on-surface-variant mb-4">Catat data perhitungan rasio mol setelah kamu melakukan eksperimen di simulasi di atas.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border border-outline-variant">Percobaan</th>
                  <th className="px-4 py-3 border border-outline-variant">Reaktan 1 (Mol)</th>
                  <th className="px-4 py-3 border border-outline-variant">Reaktan 2 (Mol)</th>
                  <th className="px-4 py-3 border border-outline-variant">Produk (Mol)</th>
                  <th className="px-4 py-3 border border-outline-variant">Reaktan Sisa (Zat & Mol)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-surface-container-lowest/50">
                  <td className="px-4 py-3 border border-outline-variant font-medium">1</td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="text" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="Cth: 2 mol H2" /></td>
                </tr>
                <tr className="hover:bg-surface-container-lowest/50">
                  <td className="px-4 py-3 border border-outline-variant font-medium">2</td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="text" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="..." /></td>
                </tr>
                <tr className="hover:bg-surface-container-lowest/50">
                  <td className="px-4 py-3 border border-outline-variant font-medium">3</td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="number" className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="0" /></td>
                  <td className="px-4 py-3 border border-outline-variant"><input type="text" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none px-1" placeholder="..." /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ChatInterface messages={messages} input={input} setInput={setInput} onSend={handleSend} placeholder="Diskusikan hasil tabel atau analisismu bersama AI..." />
        
        {isNextUnlocked && (
           <div className="flex justify-end mt-4">
             <button onClick={onGoToNext} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md">
                Lanjut ke Fase Berikutnya <ChevronRight className="w-5 h-5"/>
             </button>
           </div>
        )}
      </div>
    </motion.div>
  );
}

function PhaseExplain({ onUnlockNext, isNextUnlocked, onGoToNext }: { onUnlockNext: () => void, isNextUnlocked?: boolean, onGoToNext?: () => void }) {
  const [explanation, setExplanation] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const handleSubmit = () => {
    if (explanation.length < 50) {
      alert('Please write at least 50 characters.');
      return;
    }
    // Mock Send to LLM
    setAiFeedback('Loading...');
    setTimeout(() => {
      setAiFeedback('Your explanation grasps the core concept well! You correctly identified the relationship, but consider how the solvent properties specifically play a role. Keep elaborating on that thought.');
      onUnlockNext();
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-6 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-on-background">Phase 3: Explain</h2>
            <p className="text-on-surface-variant font-medium mt-1">Write down your understanding. Requires 50+ chars and feedback to unlock next.</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm prose prose-sm max-w-none">
          <h3>Sintesis dan Penjelasan Konsep</h3>
          <p>Setelah melakukan tanya jawab di fase <em>Engage</em> dan melakukan observasi mendalam pada simulasi di fase <em>Explore</em>, sekarang saatnya kamu membuktikan pemahaman konseptualmu.</p>
          <h4>Apa yang harus ditulis?</h4>
          <ul>
            <li>Jelaskan dengan kata-katamu sendiri mengenai pengaruh rasio awal reaktan terhadap pembentukan produk.</li>
            <li>Jelaskan apa yang dimaksud dengan <strong>Pereaksi Pembatas</strong> berdasarkan eksperimen simulasi tadi.</li>
            <li><strong>Nilai Tambah:</strong> Gunakan analogi kehidupan sehari-hari jika itu membantumu mendeskripsikan proses kimia tersebut (Misal: Membuat roti lapis dengan jumlah roti dan daging yang terbatas).</li>
          </ul>
          <p>Tulis penjelasanmu pada kotak di bawah secara detail dan jangan lupa berikan kesimpulan. AI kami akan memberikan <em>feedback</em> atau umpan balik yang konstruktif terhadap tulisanmu. Ia tidak akan menyalahkan secara gamblang jika ada kekeliruan, melainkan membantumu mengarahkan nalar kimia yang lebih tepat.</p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px]">
          {/* Mock Toolbar */}
          <div className="bg-surface-container-lowest border-b border-outline-variant p-2 flex gap-2">
            {['H₂O', 'x²', '→', '⇌', 'LaTeX'].map(btn => (
              <button key={btn} className="px-3 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-container rounded-md transition-colors border border-transparent hover:border-outline-variant">
                {btn}
              </button>
            ))}
          </div>
          <textarea 
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Tuliskan argumen dan pemahamanmu di sini. Gunakan toolbar di atas untuk menyisipkan persamaan matematis dan kimiawi..."
            className="flex-1 w-full min-h-[200px] p-4 resize-none bg-transparent focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/50 text-on-surface leading-relaxed"
          />
          <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center">
            <span className="text-xs text-on-surface-variant font-medium">{explanation.length} / 50 characters min</span>
            <button 
              onClick={handleSubmit}
              className="bg-primary text-on-primary px-5 py-2 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Get AI Feedback
            </button>
          </div>
        </div>

        {aiFeedback && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-secondary-container text-on-secondary-container p-6 rounded-2xl shadow-sm border border-secondary/20">
            <div className="flex items-center gap-2 font-bold mb-3">
              <Atom className="w-5 h-5 text-secondary" />
              AI Feedback
            </div>
            {aiFeedback === 'Loading...' ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
              </div>
            ) : (
              <p className="leading-relaxed">{aiFeedback}</p>
            )}
          </motion.div>
        )}
        
        {isNextUnlocked && (
           <div className="flex justify-end mt-4">
             <button onClick={onGoToNext} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md">
                Lanjut ke Fase Berikutnya <ChevronRight className="w-5 h-5"/>
             </button>
           </div>
        )}
      </div>
    </motion.div>
  );
}

function PhaseElaborate({ onUnlockNext, isNextUnlocked, onGoToNext }: { onUnlockNext: () => void, isNextUnlocked?: boolean, onGoToNext?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Here is your problem. I am absolutely forbidden from giving you the final calculation result. Tell me what step you want to take first.' }
  ]);
  const [input, setInput] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Mock Send
    setTimeout(() => {
      const newCount = interactionCount + 1;
      setInteractionCount(newCount);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: `Good step. Now, what is the molar mass of the compound based on your periodic table? (Interactions: ${newCount}/2)` 
      }]);
      
      if (newCount >= 2) {
        onUnlockNext();
      }
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row gap-8 pb-12">
        
        {/* Left: Problem & Editor */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-on-background">Phase 4: Elaborate</h2>
              <p className="text-on-surface-variant font-medium mt-1">Apply your knowledge. (2 LLM interactions required)</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm prose prose-sm max-w-none">
            <h3>Penerapan Konsep: Perhitungan Industri (Studi Kasus)</h3>
            <p>Di fase <strong>Elaborate</strong> ini, keahlian teoritismu harus diaplikasikan ke skenario masalah nyata. Pemahaman konseptual saja tidak cukup untuk merancang sebuah instrumen kimia yang presisi dan aman.</p>
            <p>Dalam memproduksi gas hidrogen murni berskala menengah, sebuah pabrik perintis berencana mereaksikan logam aluminium murni dari sisa potongan industri dengan pelarut asam klorida pekat. Teknisi perakit harus memprediksi dan menghitung presisi volume gas yang dihasilkan untuk menyiapkan tabung penampung dengan standar spesifikasi yang tepat (agar mencegah kejadian <em>overpressure</em> karena kapasitas tabung berlebih).</p>
            <h4>Instruksi Pengerjaan:</h4>
            <ul>
              <li>Selesaikan permasalahan di bawah ini. Fokuskan pada analisis stoikiometri.</li>
              <li>Gunakan editor <strong>Scratchpad</strong> di bawah untuk mencorat-coret langkah perhitunganmu. Tulislah diketahui, ditanya, hingga coretan operasional pembagian/perkalian.</li>
              <li>Jika kamu <em>stuck</em> saat mencari jumlah mol awal atau rasio koefisien, silakan tanyakan pada AI di kotak sebelah kanan.</li>
              <li><strong>Catatan:</strong> AI ini dirancang tidak akan pernah memberimu jalan pintas menuju hasil akhir. Ia hanya akan memberikan satu <em>hint</em> di setiap interaksi.</li>
            </ul>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" /> Permasalahan:</h3>
            <p className="text-on-surface leading-relaxed mb-4">Sebanyak 5.4 gram logam Aluminium padat (Al) direaksikan dengan larutan murni Asam Klorida (HCl) secukupnya yang mengikuti persamaan reaksi di bawah ini: <br/><br/>
            <code className="bg-surface-container border border-outline-variant px-3 py-2 rounded font-mono text-primary block text-center font-bold">2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)</code><br/>
            Sebagai kandidat teknisi, tentukan prediksi total volume gas Hidrogen teoretis yang akan dihasilkan jika reaksi dilakukan tepat pada keadaan standar (STP)! <br/><br/><span className="text-sm text-on-surface-variant font-bold">(Diketahui Ar Al = 27; Asumsikan yield reaksi 100%)</span></p>
          </div>

          <div className="flex-1 bg-surface border border-outline-variant rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px]">
            <div className="bg-surface-container-lowest border-b border-outline-variant p-2 flex gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-2 my-auto">Scratchpad Editor</span>
            </div>
            <textarea 
              placeholder="Show your work here..."
              className="flex-1 w-full p-4 resize-none bg-transparent focus:outline-none font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Chat */}
        <div className="w-full lg:w-96 flex flex-col h-[500px] lg:h-full shrink-0">
          <ChatInterface messages={messages} input={input} setInput={setInput} onSend={handleSend} placeholder="Ask for a hint..." />
        </div>

      </div>
      
      {isNextUnlocked && (
         <div className="flex justify-end mt-4 mb-12 max-w-5xl w-full mx-auto">
           <button onClick={onGoToNext} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md">
              Lanjut ke Fase Berikutnya <ChevronRight className="w-5 h-5"/>
           </button>
         </div>
      )}
    </motion.div>
  );
}

function PhaseEvaluate({ onFinish }: { onFinish: () => void }) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    { id: 1, type: 'mcq', text: 'Berapakah volume molar gas pada keadaan STP?', options: ['22.4 L', '24.4 L', '22.0 L', '24.0 L'] },
    { id: 2, type: 'short', text: 'Tuliskan rumus molekul untuk Asam Sulfat.' },
    { id: 3, type: 'mcq', text: 'Faktor apa yang tidak mempengaruhi laju reaksi?', options: ['Suhu', 'Konsentrasi', 'Warna zat', 'Katalis'] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-8 pb-12">
        <div className="text-center pt-8">
          <div className="w-16 h-16 bg-error-container text-on-error-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-on-background">Phase 5: Evaluate</h2>
          <p className="text-on-surface-variant font-medium mt-2">The LLM is disabled. Answer the questions to complete the session.</p>
        </div>

        <div className="bg-surface p-8 rounded-2xl border border-error-container/50 bg-error-container/10 shadow-sm prose prose-sm max-w-none">
          <p className="text-base font-medium">Ini adalah tahap final pengujian tingkat pemahaman tunggalmu (<strong>Evaluate</strong>). Asisten AI telah dimatikan sepenuhnya. Seluruh akses bantuan referensi dan <em>real-time feedback</em> dinonaktifkan per fase ini.</p>
          <p className="text-base font-medium">Ujilah seberapa jauh insting dan logikamu bekerja berbekal pada empat fase studi mandiri sebelumnya. Periksa dan analisis kembali setiap butir pertanyaan dengan pertimbangan rasional. Setelah fase ini ditutup, sistem akan merangkum seluruh rekam jejak performamu.</p>
          <p className="text-error font-black text-center text-lg mt-6 bg-error/10 py-3 rounded-xl border border-error/50">Bersiaplah, percayalah pada analisismu sendiri!</p>
        </div>

        <div className="flex flex-col gap-6 mt-2">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-sm">
              <div className="font-bold text-lg mb-4"><span className="text-primary mr-2">{i+1}.</span> {q.text}</div>
              
              {q.type === 'mcq' && (
                <div className="flex flex-col gap-3">
                  {q.options?.map(opt => (
                    <label key={opt} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${answers[q.id] === opt ? 'border-primary bg-primary/5 ring-1 ring-primary/50' : 'border-outline-variant hover:bg-surface-container-lowest'}`}>
                      <input 
                        type="radio" 
                        name={`q-${q.id}`} 
                        className="w-4 h-4 text-primary focus:ring-primary"
                        checked={answers[q.id] === opt}
                        onChange={() => setAnswers(prev => ({...prev, [q.id]: opt}))}
                      />
                      <span className="font-medium text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'short' && (
                <input 
                  type="text" 
                  placeholder="Your answer..."
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                />
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={onFinish}
          className="mt-4 bg-primary text-on-primary py-4 rounded-xl text-lg font-bold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
        >
          Submit for Auto-Grading
        </button>
      </div>
    </motion.div>
  );
}


// ==========================================
// SHARED COMPONENTS
// ==========================================

function ChatInterface({ messages, input, setInput, onSend, placeholder }: { messages: Message[], input: string, setInput: (v:string)=>void, onSend: ()=>void, placeholder: string }) {
  return (
    <div className="flex-1 bg-surface rounded-2xl border border-outline-variant shadow-sm flex flex-col min-h-[400px]">
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Atom className="w-5 h-5 text-on-primary" />
                </div>
              )}
              <div className={`
                px-5 py-4 shadow-sm text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm' 
                  : 'bg-surface-container-low text-on-surface rounded-2xl rounded-tl-sm border border-outline-variant/30'}
              `}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-outline-variant bg-surface-container-lowest rounded-b-2xl shrink-0">
        <div className="flex items-center gap-3 bg-surface border border-outline-variant rounded-xl pl-4 pr-2 py-2 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-on-surface text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
          />
          <button 
            onClick={onSend}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              input.trim() 
                ? 'bg-primary text-on-primary hover:bg-primary/90 shadow-sm' 
                : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
