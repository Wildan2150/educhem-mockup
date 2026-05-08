'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, BookOpen, CheckCircle, Cpu, Download, Search, FileText, 
  ChevronDown, Filter, LogOut
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const tokenData = [
  { text: 'Mon', tokens: 12000 },
  { text: 'Tue', tokens: 18000 },
  { text: 'Wed', tokens: 15000 },
  { text: 'Thu', tokens: 25000 },
  { text: 'Fri', tokens: 22000 },
  { text: 'Sat', tokens: 30000 },
  { text: 'Sun', tokens: 28000 },
];

const dropoffData = [
  { name: 'Engage', count: 5 },
  { name: 'Explore', count: 12 },
  { name: 'Explain', count: 35 },
  { name: 'Elaborate', count: 28 },
  { name: 'Evaluate', count: 0 },
];

const mockSessions = [
  { id: 'S101', student: 'John Doe', topic: 'Stoikiometri Mol', status: 'Active', phase: 'Explain', tokens: 1250, date: '2023-10-25' },
  { id: 'S102', student: 'Jane Smith', topic: 'Reaksi Asam Basa', status: 'Completed', phase: 'Evaluate', tokens: 3400, date: '2023-10-24' },
  { id: 'S103', student: 'Budi Santoso', topic: 'Konsentrasi Larutan', status: 'Active', phase: 'Explore', tokens: 800, date: '2023-10-25' },
  { id: 'S104', student: 'Siti Aminah', topic: 'Stoikiometri Mol', status: 'Completed', phase: 'Evaluate', tokens: 4100, date: '2023-10-23' },
  { id: 'S105', student: 'Alex Johnson', topic: 'Reaksi Asam Basa', status: 'Active', phase: 'Elaborate', tokens: 2900, date: '2023-10-25' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'students'>('overview');

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
              A
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">EduChem Admin</span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Overview</button>
              <button onClick={() => setActiveTab('sessions')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sessions' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Sessions</button>
              <button onClick={() => setActiveTab('students')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'students' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Students</button>
            </nav>
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
            <button onClick={() => router.push('/admin/login')} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <span className="text-sm font-medium text-gray-500">Today, Oct 25, 2023</span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard title="Total Students" value="1,248" trend="+12 this week" icon={<Users className="w-5 h-5 text-blue-600" />} />
              <KpiCard title="Active Sessions" value="42" trend="Today" icon={<BookOpen className="w-5 h-5 text-indigo-600" />} />
              <KpiCard title="Completed Sessions" value="18" trend="Today" icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
              <KpiCard title="LLM Tokens Used" value="150K" trend="Today" icon={<Cpu className="w-5 h-5 text-purple-600" />} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Token Usage Chart */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Token Consumption Trend (7 Days)</h3>
                  <button className="text-gray-500 hover:text-gray-900"><Download className="w-4 h-4" /></button>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={tokenData}>
                      <defs>
                        <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="text" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Drop-off Chart */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Drop-off Distribution</h3>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dropoffData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#374151', fontSize: 13, fontWeight: 500}} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">All Sessions</h1>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Download className="w-4 h-4" /> Export JSON
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search by student or ID..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-gray-200">
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Session ID</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Topic</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status & Phase</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tokens</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                       <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {mockSessions.map((session) => (
                       <tr key={session.id} className="hover:bg-gray-50 transition-colors group">
                         <td className="px-6 py-4 text-sm font-mono text-gray-600">{session.id}</td>
                         <td className="px-6 py-4 text-sm font-medium text-gray-900">{session.student}</td>
                         <td className="px-6 py-4 text-sm text-gray-600">{session.topic}</td>
                         <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${session.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {session.status}
                              </span>
                              <span className="text-gray-500 text-xs">({session.phase})</span>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-600">{session.tokens.toLocaleString()}</td>
                         <td className="px-6 py-4 text-sm text-gray-500">{session.date}</td>
                         <td className="px-6 py-4 text-right">
                           <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 ml-auto">
                             <FileText className="w-4 h-4" /> View Logs
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="flex items-center justify-center p-20 text-gray-400">
            Student Management view coming soon.
          </div>
        )}
      </main>
    </div>
  );
}

function KpiCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{trend}</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 tracking-tight">{value}</div>
        <div className="text-sm font-medium text-gray-500 mt-1">{title}</div>
      </div>
    </div>
  )
}
