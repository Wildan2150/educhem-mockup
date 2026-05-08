'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Atom, Play, CheckCircle2, Clock, Beaker, LogOut, LayoutDashboard, Library, Settings, User, Compass, Award, FlaskConical, Bell, Shield, BookOpen, Activity, PlaySquare, ChevronRight, Languages, Sparkles, Bot, Send } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function StudentDashboard() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{role: string, content: string}[]>([]);
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleStartSession = (topicId: string) => {
    router.push(`/session/${topicId}`);
  };

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const newMsg = { role: 'user', content: aiInput };
    setAiMessages(prev => [...prev, newMsg]);
    setAiInput('');
    
    // Simulate AI response
    setTimeout(() => {
        setAiMessages(prev => [...prev, {
            role: 'ai',
            content: "Tentu! Itu pertanyaan yang sangat bagus. Sebagai asisten AI mockup, saya belum bisa memberikan penjelasan mendalam yang spesifik, tetapi pada versi final, saya akan menjabarkannya dengan gaya bahasa yang mudah dipahami, beserta contoh sehari-hari dan langkah-langkah sistematis.\n\nApakah ada konsep lain yang ingin dipelajari?"
        }]);
    }, 1000);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (activeView === 'ChemAI Assistant') {
       chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, activeView]);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'ChemAI Assistant', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Katalog Materi', icon: <Library className="w-5 h-5" /> },
    { name: 'Katalog Simulasi', icon: <FlaskConical className="w-5 h-5" /> },
    { name: 'Pencapaian', icon: <Award className="w-5 h-5" /> },
    { name: 'Pengaturan', icon: <Settings className="w-5 h-5" /> },
    { name: 'Akun Saya', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col justify-between shrink-0 z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div>
          <div className="p-6 flex items-center gap-2 text-primary font-bold text-xl">
            <Atom className="w-6 h-6 shrink-0" />
            <span className="truncate">EduChem-GenAI</span>
          </div>
          
          <nav className="flex flex-col gap-2 px-4 mt-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveView(item.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  activeView === item.name
                    ? 'bg-primary-container text-on-primary-container shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-outline-variant">
          <button 
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 bg-surface-container-high text-on-surface hover:bg-error-container hover:text-on-error-container px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto px-8 py-10 flex flex-col gap-10 pb-20">
          
          {activeView === 'Dashboard' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
                {/* Welcome Section */}
                <section>
                  <h1 className="text-4xl font-bold text-on-background tracking-tight">Selamat Datang, Budi 👋</h1>
                  <p className="mt-2 text-on-surface-variant text-lg max-w-2xl">
                    Mari lanjutkan perjalanan belajarmu hari ini. Pilih topik yang ingin kamu pelajari.
                  </p>
                </section>

                {/* Start New Session (Carousel/Horizontal Scroll) */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-on-surface">Mulai Topik Baru</h2>
                    <button onClick={() => setActiveView('Katalog Materi')} className="text-sm font-bold text-primary hover:underline">Lihat Semua</button>
                  </div>
                  
                  {/* Horizontal Scroll Container */}
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory pt-2 px-2 -mx-2 hide-scrollbar">
                    {AVAILABLE_TOPICS.map(topic => (
                      <div key={topic.id} className="bg-surface border border-outline-variant rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all group min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] shrink-0 snap-start relative">
                        <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
                          <Beaker className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{topic.title}</h3>
                          <p className="text-sm text-on-surface-variant mt-1 line-clamp-3">{topic.description}</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {topic.time}
                          </span>
                          <button 
                            onClick={() => handleStartSession(topic.id)}
                            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                          >
                            <Play className="w-4 h-4" />
                            Mulai
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tabs for Active/Completed */}
                <section>
                  <div className="flex items-center gap-8 border-b border-outline-variant mb-6 pb-2">
                    <button 
                      onClick={() => setActiveTab('active')}
                      className={`text-base font-bold transition-colors relative ${activeTab === 'active' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      Sesi Aktif
                      {activeTab === 'active' && <div className="absolute -bottom-[11px] left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                    <button 
                      onClick={() => setActiveTab('completed')}
                      className={`text-base font-bold transition-colors relative ${activeTab === 'completed' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      Riwayat Selesai
                      {activeTab === 'completed' && <div className="absolute -bottom-[11px] left-0 w-full h-1 bg-primary rounded-t-full"></div>}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {activeTab === 'active' ? (
                      ACTIVE_SESSIONS.map((session, idx) => (
                        <div key={idx} className="bg-surface border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center shrink-0">
                              <Clock className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-on-surface">{session.title}</h4>
                              <p className="text-sm text-on-surface-variant mt-1">Sesi terakhir {session.lastActive} • Saat ini di fase <span className="font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">{session.phase}</span></p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleStartSession(session.id)}
                            className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold px-6 py-2.5 rounded-xl text-sm transition-all border border-outline-variant whitespace-nowrap active:scale-95"
                          >
                            Lanjutkan
                          </button>
                        </div>
                      ))
                    ) : (
                      COMPLETED_SESSIONS.map((session, idx) => (
                        <div key={idx} className="bg-surface border border-outline-variant opacity-90 hover:opacity-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-on-surface">{session.title}</h4>
                              <p className="text-sm text-on-surface-variant mt-1">Diselesaikan pada {session.date} • Nilai Evaluasi: <span className="font-bold text-green-700">{session.score}/100</span></p>
                            </div>
                          </div>
                          <button 
                            onClick={() => router.push(`/session/${session.id}/summary`)}
                            className="text-primary font-bold px-4 py-2 border-b-2 border-transparent hover:border-primary transition-all text-sm whitespace-nowrap"
                          >
                            Lihat Ringkasan
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </section>
             </motion.div>
          )}

          {activeView === 'ChemAI Assistant' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-[calc(100vh-10rem)] shrink-0 max-h-[800px]">
                {/* Header */}
                <div className="mb-6 shrink-0">
                  <h1 className="text-3xl font-bold text-on-background flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary" /> ChemAI Assistant
                  </h1>
                  <p className="text-on-surface-variant mt-2">Tanyakan apapun seputar kimia, dari PR sampai konsep lanjutan.</p>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-surface border border-outline-variant rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-0">
                  {aiMessages.length === 0 ? (
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto min-h-full">
                         <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <Bot className="w-8 h-8" />
                         </div>
                         <h2 className="text-2xl font-bold mb-2 text-on-surface">Halo Budi! Apa yang ingin kamu pelajari hari ini?</h2>
                         <p className="text-on-surface-variant mb-8">Berikan pertanyaan konseptual, minta bantuan penyelesaian masalah, atau ajak ChemAI berdiskusi mengenai bereksperimen.</p>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                           <button onClick={() => setAiInput("Jelaskan konsep reaksi redoks dengan analogi sederhana.")} className="p-4 border border-outline-variant rounded-xl text-left bg-surface-container-lowest hover:bg-surface-container transition-all hover:border-primary/50 group">
                             <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Konsep Dasar 🧪</div>
                             <div className="text-xs text-on-surface-variant mt-1">Jelaskan konsep reaksi redoks dengan analogi sederhana.</div>
                           </button>
                           <button onClick={() => setAiInput("Bantu saya menyeimbangkan persamaan reaksi: Fe + O2 -> Fe2O3")} className="p-4 border border-outline-variant rounded-xl text-left bg-surface-container-lowest hover:bg-surface-container transition-all hover:border-primary/50 group">
                             <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Bantuan PR 📝</div>
                             <div className="text-xs text-on-surface-variant mt-1">Bantu saya menyeimbangkan persamaan reaksi: Fe + O2...</div>
                           </button>
                           <button onClick={() => setAiInput("Apa perbedaan sel Volta dan sel Elektrolisis?")} className="p-4 border border-outline-variant rounded-xl text-left bg-surface-container-lowest hover:bg-surface-container transition-all hover:border-primary/50 group">
                             <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Perbandingan 📊</div>
                             <div className="text-xs text-on-surface-variant mt-1">Apa perbedaan sel Volta dan sel Elektrolisis?</div>
                           </button>
                           <button onClick={() => setAiInput("Berikan saya latihan soal stoikiometri tingkat menengah.")} className="p-4 border border-outline-variant rounded-xl text-left bg-surface-container-lowest hover:bg-surface-container transition-all hover:border-primary/50 group">
                             <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Latihan Soal 🧠</div>
                             <div className="text-xs text-on-surface-variant mt-1">Berikan saya latihan soal stoikiometri menengah.</div>
                           </button>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                       {aiMessages.map((msg, idx) => (
                         <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'ai' && (
                             <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                <Bot className="w-6 h-6" />
                             </div>
                           )}
                           <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${msg.role === 'user' ? 'bg-primary text-on-primary rounded-tr-none' : 'bg-surface-container-lowest border border-outline-variant rounded-tl-none'}`}>
                             <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                           </div>
                           {msg.role === 'user' && (
                             <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shrink-0 font-bold shadow-sm">
                                B
                             </div>
                           )}
                         </div>
                       ))}
                       <div ref={chatEndRef} />
                    </div>
                  )}

                  <div className="p-4 bg-surface-container-lowest border-t border-outline-variant shrink-0">
                     <div className="flex items-end gap-2 bg-surface border border-outline-variant rounded-2xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
                        <textarea 
                           value={aiInput}
                           onChange={e => setAiInput(e.target.value)}
                           placeholder="Ketik pertanyaanmu mengenai ilmu kimia..."
                           className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none p-2 text-sm text-on-surface"
                           onKeyDown={e => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                 e.preventDefault();
                                 handleSendAiMessage();
                              }
                           }}
                        />
                        <button 
                           onClick={handleSendAiMessage}
                           disabled={!aiInput.trim()}
                           className="w-10 h-10 flex shrink-0 items-center justify-center bg-primary text-on-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all mb-0.5 shadow-sm active:scale-95"
                        >
                           <Send className="w-5 h-5" />
                        </button>
                     </div>
                     <p className="text-center text-[10px] text-on-surface-variant mt-2 font-medium">ChemAI dapat membuat kesalahan. Harap periksa kembali informasi penting.</p>
                  </div>
                </div>
             </motion.div>
          )}

          {activeView === 'Katalog Materi' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-on-background">Katalog Materi</h1>
                <p className="text-on-surface-variant">Jelajahi seluruh topik pembelajaran kimia yang tersedia.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                   {AVAILABLE_TOPICS.map(topic => (
                      <div key={topic.id} className="bg-surface border border-outline-variant rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-on-surface">{topic.title}</h3>
                        <p className="text-sm text-on-surface-variant flex-1">{topic.description}</p>
                        <button onClick={() => handleStartSession(topic.id)} className="w-full mt-4 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface hover:text-primary hover:bg-primary-container px-4 py-2.5 rounded-xl font-bold transition-all">
                          Mulai Belajar
                        </button>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeView === 'Katalog Simulasi' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-on-background">Katalog Simulasi</h1>
                <p className="text-on-surface-variant">Belajar secara interaktif dengan simulasi PhET dan eksperimen virtual lainnya.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                   {[
                     { id: '1', title: 'Simulasi pH Asam Basa', desc: 'Ukur pH berbagai larutan secara virtual.', color: 'bg-blue-100 text-blue-700' },
                     { id: '2', title: 'Keseimbangan Reaksi', desc: 'Bermain dengan jungkat-jungkit reaksi untuk memahami hukum Dalton.', color: 'bg-purple-100 text-purple-700' },
                     { id: '3', title: 'Struktur Molekul 3D', desc: 'Visualisasikan bentuk molekul dan polaritas.', color: 'bg-green-100 text-green-700' },
                     { id: '4', title: 'Bentuk Energi & Perubahannya', desc: 'Konsep termodinamika dasar dalam simulasi interaktif.', color: 'bg-orange-100 text-orange-700' },
                   ].map(sim => (
                      <div key={sim.id} className="bg-surface border border-outline-variant rounded-2xl p-6 flex items-start gap-5 hover:shadow-md transition-all cursor-pointer group">
                        <div className={`w-14 h-14 ${sim.color} rounded-2xl flex items-center justify-center shrink-0`}>
                          <PlaySquare className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{sim.title}</h3>
                          <p className="text-sm text-on-surface-variant mt-1">{sim.desc}</p>
                          <div className="mt-3 flex items-center gap-2 text-primary font-bold text-sm">
                             Buka Simulasi <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeView === 'Pencapaian' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-on-background">Pencapaian Kamu</h1>
                <p className="text-on-surface-variant">Pantau progress belajarmu dan koleksi lencana kehebatan kimia-mu.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                   <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                      <div className="text-4xl font-black">12</div>
                      <div className="text-sm font-medium mt-1 opacity-80">Materi Selesai</div>
                   </div>
                   <div className="bg-secondary-container text-on-secondary-container p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                      <div className="text-4xl font-black">8</div>
                      <div className="text-sm font-medium mt-1 opacity-80">Lencana Diperoleh</div>
                   </div>
                   <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                      <div className="text-4xl font-black">85%</div>
                      <div className="text-sm font-medium mt-1 opacity-80">Rata-rata Nilai Evaluasi</div>
                   </div>
                </div>

                <h2 className="text-xl font-bold mt-8">Lencana Terbaru</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { name: 'Master Stoikiometri', icon: '⚛️' },
                     { name: 'Penakluk Asam Basa', icon: '🧪' },
                     { name: 'Reaksi Kilat', icon: '⚡' },
                     { name: 'Raja Karbon', icon: '💎' },
                   ].map((badge, i) => (
                      <div key={i} className="bg-surface border border-outline-variant p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                         <div className="text-4xl">{badge.icon}</div>
                         <div className="font-bold text-sm">{badge.name}</div>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeView === 'Pengaturan' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-on-background">Pengaturan</h1>
                
                <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden mt-4">
                   <div className="p-5 flex items-center justify-between border-b border-outline-variant">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-lg"><Bell className="w-5 h-5 text-on-surface" /></div>
                         <div>
                            <div className="font-bold text-on-surface">Notifikasi</div>
                            <div className="text-sm text-on-surface-variant">Dapatkan pengingat belajar harian</div>
                         </div>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                   </div>
                   <div className="p-5 flex items-center justify-between border-b border-outline-variant">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-lg"><Languages className="w-5 h-5 text-on-surface" /></div>
                         <div>
                            <div className="font-bold text-on-surface">Bahasa</div>
                            <div className="text-sm text-on-surface-variant">Bahasa pengantar aplikasi</div>
                         </div>
                      </div>
                      <select className="bg-surface-container px-3 py-1.5 rounded-lg text-sm font-medium border-none outline-none">
                         <option>Bahasa Indonesia</option>
                         <option>English</option>
                      </select>
                   </div>
                   <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-lg"><Shield className="w-5 h-5 text-on-surface" /></div>
                         <div>
                            <div className="font-bold text-on-surface">Privasi & Keamanan</div>
                            <div className="text-sm text-on-surface-variant">Kelola data probadi dan kata sandi</div>
                         </div>
                      </div>
                      <button className="text-primary font-bold text-sm hover:underline">Kelola Akses</button>
                   </div>
                </div>
             </motion.div>
          )}

          {activeView === 'Akun Saya' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-on-background">Akun Saya</h1>
                <div className="bg-surface border border-outline-variant rounded-2xl p-8 mt-4 flex flex-col md:flex-row items-center md:items-start gap-8 relative">
                   <div className="w-32 h-32 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
                      B
                   </div>
                   <div className="flex-1 flex flex-col items-center md:items-start w-full">
                      <h2 className="text-2xl font-bold">Budi Susanto</h2>
                      <p className="text-on-surface-variant">Siswa Kelas 11 MIPA</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
                         <div className="bg-surface-container p-4 rounded-xl">
                            <div className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">Email</div>
                            <div className="font-medium mt-1">budi.susanto@sekolah.edu</div>
                         </div>
                         <div className="bg-surface-container p-4 rounded-xl">
                            <div className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">Sekolah</div>
                            <div className="font-medium mt-1">SMA Negeri 1 Jakarta</div>
                         </div>
                         <div className="bg-surface-container p-4 rounded-xl">
                            <div className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">Bergabung Sejak</div>
                            <div className="font-medium mt-1">12 Agustus 2026</div>
                         </div>
                         <div className="bg-surface-container p-4 rounded-xl">
                            <div className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">Status Akun</div>
                            <div className="font-medium mt-1 text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Aktif</div>
                         </div>
                      </div>
                      
                      <button className="mt-8 bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all">
                         Edit Profil
                      </button>
                   </div>
                </div>
             </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}

const AVAILABLE_TOPICS = [
  {
    id: 'stoikiometri',
    title: 'Stoikiometri Mol',
    description: 'Pelajari konsep mol, massa molar, dan perhitungan dasar dalam reaksi kimia.',
    time: '45 Menit'
  },
  {
    id: 'asam-basa',
    title: 'Reaksi Asam Basa',
    description: 'Eksplorasi teori Arrhenius, Brønsted-Lowry, dan perhitungan pH secara mendalam.',
    time: '60 Menit'
  },
  {
    id: 'konsentrasi',
    title: 'Konsentrasi Larutan',
    description: 'Pahami molaritas, molalitas, fraksi mol, dan aplikasinya dalam kehidupan.',
    time: '40 Menit'
  },
  {
    id: 'termokimia',
    title: 'Termokimia Dasar',
    description: 'Mempelajari perubahan entalpi, reaksi eksoterm, dan endoterm pada sistem kimia.',
    time: '50 Menit'
  },
  {
    id: 'laju-reaksi',
    title: 'Laju Reaksi & Katalis',
    description: 'Analisis faktor-faktor yang mempengaruhi kecepatan reaksi kimia dan orde reaksi.',
    time: '55 Menit'
  }
];

const ACTIVE_SESSIONS = [
  {
    id: 'stoikiometri',
    title: 'Stoikiometri Mol',
    lastActive: '2 jam yang lalu',
    phase: 'Explore',
  },
  {
    id: 'ikatan-kimia',
    title: 'Ikatan Kimia (Ion & Kovalen)',
    lastActive: '1 hari yang lalu',
    phase: 'Explain',
  },
  {
    id: 'sistem-koloid',
    title: 'Sistem Koloid',
    lastActive: '3 hari yang lalu',
    phase: 'Engage',
  },
  {
    id: 'kesetimbangan',
    title: 'Kesetimbangan Kimia',
    lastActive: '1 minggu yang lalu',
    phase: 'Elaborate',
  }
];

const COMPLETED_SESSIONS = [
  {
    id: 'asam-basa',
    title: 'Reaksi Asam Basa',
    date: '12 Okt 2026',
    score: 90
  },
  {
    id: 'struktur-atom',
    title: 'Struktur Atom & Tabel Periodik',
    date: '5 Okt 2026',
    score: 85
  },
  {
    id: 'reaksi-redoks',
    title: 'Reaksi Redoks & Elektrokimia',
    date: '28 Sep 2026',
    score: 95
  },
  {
    id: 'hidrokarbon',
    title: 'Senyawa Hidrokarbon',
    date: '15 Sep 2026',
    score: 88
  },
  {
    id: 'sifat-koligatif',
    title: 'Sifat Koligatif Larutan',
    date: '2 Sep 2026',
    score: 92
  }
];
