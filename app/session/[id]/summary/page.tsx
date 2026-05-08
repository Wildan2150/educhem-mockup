'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Target, Clock, MessageSquare, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function SummaryPage() {
  const router = useRouter();

  const sessionData = {
    score: 66,
    time: '45m 12s',
    interactions: 12,
    results: [
      { id: 1, type: 'mcq', question: 'Berapakah volume molar gas pada keadaan STP?', userAns: '24.4 L', correctAns: '22.4 L', isCorrect: false },
      { id: 2, type: 'short', question: 'Tuliskan rumus molekul untuk Asam Sulfat.', userAns: 'H2SO4', correctAns: 'H2SO4', isCorrect: true },
      { id: 3, type: 'mcq', question: 'Faktor apa yang tidak mempengaruhi laju reaksi?', userAns: 'Warna zat', correctAns: 'Warna zat', isCorrect: true },
    ]
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto flex flex-col gap-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-on-background tracking-tight">Session Complete!</h1>
          <p className="mt-2 text-on-surface-variant text-lg">Here is a summary of your performance.</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center justify-center gap-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${sessionData.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              <Target className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface mt-2">{sessionData.score}%</div>
            <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Evaluation Score</div>
          </div>
          
          <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface mt-2">{sessionData.time}</div>
            <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Total Time</div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface mt-2">{sessionData.interactions}</div>
            <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">LLM Interactions</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-surface border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
            <h2 className="font-bold text-lg text-on-surface">Question Details</h2>
          </div>
          <div className="divide-y divide-outline-variant">
            {sessionData.results.map((res, i) => (
              <div key={res.id} className="p-6 flex gap-4">
                <div className="shrink-0 mt-1">
                  {res.isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-error" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-on-surface mb-2">{i+1}. {res.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                      <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1">Your Answer</div>
                      <div className={`font-medium ${res.isCorrect ? 'text-green-700' : 'text-error'}`}>{res.userAns}</div>
                    </div>
                    <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                      <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-1">Correct Answer</div>
                      <div className="font-medium text-on-surface">{res.correctAns}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 bg-on-background text-background px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
