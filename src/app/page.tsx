'use client';
import { useState } from 'react';
import { obfuscateJS, encryptHTML } from '@/utils/obfuscator';

export default function Dashboard() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [mode, setMode] = useState<'js' | 'html'>('js');
  const [stats, setStats] = useState({ uploaded: 20, encrypted: 12, failed: 0 });

  const handleEncrypt = () => {
    if (mode === 'js') {
      setOutputCode(obfuscateJS(inputCode));
    } else {
      setOutputCode(encryptHTML(inputCode));
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* LEFT SIDEBAR - Matches Image 1 Left Section */}
      <aside className="w-1/4 bg-gray-950 p-6 flex flex-col justify-between border-r border-gray-800">
        <div>
          <h2 className="text-xl font-bold mb-6 text-purple-400">JS & HTML Obfuscator</h2>
          
          {/* Stats Box */}
          <div className="grid grid-cols-3 gap-2 bg-gray-900 p-3 rounded-lg text-center mb-6">
            <div><p className="text-xs text-gray-400">Total</p><span className="font-bold">{stats.uploaded}</span></div>
            <div><p className="text-xs text-gray-400">Encrypted</p><span className="font-bold text-green-400">{stats.encrypted}</span></div>
            <div><p className="text-xs text-gray-400">Failed</p><span className="font-bold text-red-400">{stats.failed}</span></div>
          </div>

          <nav className="space-y-4">
            <button className="w-full text-left p-2 hover:bg-gray-800 rounded">📄 Paste Code</button>
            <button className="w-full text-left p-2 hover:bg-gray-800 rounded">📁 Upload Files</button>
            <button className="w-full text-left p-2 hover:bg-gray-800 rounded">📜 History</button>
          </nav>
        </div>

        {/* Music Player Widget from Sketch */}
        <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-center">
          <p className="text-xs text-purple-400 font-semibold animate-pulse">PLAYING NOW</p>
          <p className="text-sm font-medium">DREAM IT POSSIBLE</p>
          <p className="text-xs text-gray-500">Joel ft James</p>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE - Matches Image 1 Workspace */}
      <main className="flex-1 p-8 grid grid-cols-2 gap-6 bg-gray-900">
        {/* Input Terminal */}
        <div className="flex flex-col bg-gray-950 rounded-xl p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-300">Source Input</span>
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value as 'js' | 'html')}
              className="bg-gray-800 text-sm px-2 py-1 rounded outline-none"
            >
              <option value="js">JavaScript (.js)</option>
              <option value="html">HTML (.html)</option>
            </select>
          </div>
          <textarea
            className="flex-1 w-full bg-gray-900 text-green-400 font-mono p-3 rounded outline-none resize-none border border-gray-800"
            placeholder="Paste your clean script/HTML layout here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleEncrypt}
            className="mt-4 bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded-lg transition-colors"
          >
            Encrypt & Obfuscate
          </button>
        </div>

        {/* Output Terminal */}
        <div className="flex flex-col bg-gray-950 rounded-xl p-4 border border-gray-800">
          <span className="font-semibold text-gray-300 mb-2">Protected Output</span>
          <textarea
            readOnly
            className="flex-1 w-full bg-gray-900 text-purple-300 font-mono p-3 rounded outline-none resize-none border border-gray-800"
            placeholder="Obfuscated code output will appear here..."
            value={outputCode}
          />
          <button 
            onClick={() => {
              const blob = new Blob([outputCode], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `protected_${Date.now()}.${mode}`;
              a.click();
            }}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 font-bold py-2 rounded-lg transition-colors"
          >
            Download Protected File
          </button>
        </div>
      </main>
    </div>
  );
            }
