"use client";

import { useRef } from "react";
import { Upload, ShieldCheck, Sparkles, Zap, Lock, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

interface UploadAreaProps {
  isProcessing: boolean;
  onFileUpload: (file: File) => void;
}

export function UploadArea({ isProcessing, onFileUpload }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center pt-10 pb-20 px-4 w-full"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-700 text-sm font-bold mb-8">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          The Ultimate WhatsApp Chat Visualizer
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-8 tracking-tight leading-[1.1]">
          Bring your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">exported chats</span> back to life.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform raw <code className="bg-slate-100 text-emerald-600 px-2 py-1 rounded-md text-sm mx-1">.txt</code> exports into a stunning, native-feeling chat interface. No servers, no tracking—just your memories beautifully restored.
        </p>
      </motion.div>

      {/* Upload Card */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-2xl relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-white p-2 rounded-[2rem] shadow-2xl">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="overflow-hidden cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-3xl p-16 transition-all duration-300 bg-slate-50/50 hover:bg-emerald-50/30"
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-5">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin shadow-lg" />
                <p className="text-emerald-700 font-bold text-lg animate-pulse">Processing your chat magic...</p>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Upload className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Drop your .txt file here</h3>
                <p className="text-slate-500 text-center font-medium">
                  Or click to browse from your device
                </p>
              </>
            )}
          </div>
        </div>
        <input 
          type="file" 
          accept=".txt" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </motion.div>

      {/* Feature Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-24">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">100% Private</h3>
          <p className="text-slate-500">Your chats never leave your device. Everything is processed locally in your browser.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-7 h-7 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Lightning Fast</h3>
          <p className="text-slate-500">Optimized parsing handles massive chat histories with years of messages in milliseconds.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
            <Smartphone className="w-7 h-7 text-cyan-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Native Feel</h3>
          <p className="text-slate-500">Carefully crafted UI that perfectly mimics the app you're already familiar with.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
