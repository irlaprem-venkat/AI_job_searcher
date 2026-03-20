'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsed, setIsParsed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate AI Parsing Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsUploading(false);
    setIsParsed(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
          UNLEASH YOUR <span className="text-neon-magenta neon-text-magenta">POTENTIAL</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Upload your resume and let our AI match you with the stars.
        </p>
      </div>

      <div className={`w-full glass border-2 border-dashed transition-all duration-500 rounded-3xl p-12 flex flex-col items-center justify-center ${
        file ? 'border-neon-cyan/50 bg-neon-cyan/5' : 'border-white/10 hover:border-white/20'
      }`}>
        {!isParsed ? (
          <>
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Upload className={file ? "text-neon-cyan" : "text-gray-500"} size={40} />
            </div>
            
            <input 
              type="file" 
              id="resume-upload" 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            
            <label 
              htmlFor="resume-upload"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl cursor-pointer hover:scale-105 transition-transform active:scale-95 mb-4"
            >
              {file ? 'Change File' : 'Select Resume'}
            </label>

            {file && (
              <div className="flex items-center gap-2 text-neon-cyan animate-pulse">
                <FileText size={16} />
                <span className="font-medium">{file.name}</span>
              </div>
            )}

            {!file && (
              <p className="text-gray-500 text-sm">Supported formats: PDF, DOCX (Max 5MB)</p>
            )}

            {file && !isUploading && (
              <button 
                onClick={handleUpload}
                className="mt-8 px-12 py-4 bg-neon-magenta text-white font-bold rounded-xl hover:shadow-lg hover:shadow-neon-magenta/20 transition-all"
              >
                Start AI Analysis
              </button>
            )}

            {isUploading && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <Loader2 className="text-neon-cyan animate-spin" size={32} />
                <p className="text-neon-cyan font-bold tracking-widest animate-pulse">PARSING QUANTUM DATA...</p>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-neon-green" size={50} />
            </div>
            <h2 className="text-3xl font-bold text-white">Resume Optimized!</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Our AI has extracted your skills and experience. We've found <span className="text-neon-cyan font-bold">12 matching positions</span> for you.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link 
                href="/dashboard"
                className="px-8 py-4 bg-neon-cyan text-black font-bold rounded-xl flex items-center gap-2"
              >
                Go to Dashboard <Sparkles size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-neon-cyan font-bold mb-2">Skill Extraction</h3>
          <p className="text-gray-500 text-sm italic">Automatic parsing of tech stack & soft skills.</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-neon-magenta font-bold mb-2">Smart Matching</h3>
          <p className="text-gray-500 text-sm italic">Semantic matching with job descriptions.</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-neon-yellow font-bold mb-2">Resume Score</h3>
          <p className="text-gray-500 text-sm italic">Get instant feedback on your resume strength.</p>
        </div>
      </div>
    </div>
  );
}
