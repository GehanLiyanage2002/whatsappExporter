"use client";

import { Search, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  participants: string[];
  availableDates: string[];
  selectedDate: string;
  myParticipantName: string;
  searchQuery: string;
  totalMessagesCount: number;
  onDateChange: (date: string) => void;
  onParticipantChange: (name: string) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function Sidebar({
  participants,
  availableDates,
  selectedDate,
  myParticipantName,
  searchQuery,
  totalMessagesCount,
  onDateChange,
  onParticipantChange,
  onSearchChange,
  onReset
}: SidebarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-3xl h-fit sticky top-8 flex flex-col gap-6 bg-white shadow-xl border border-slate-100"
    >
      <div>
        <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-500" />
          Filter & Search
        </h3>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors text-sm bg-slate-50 text-slate-800 border border-slate-200 focus:border-emerald-500 placeholder-slate-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Select Your Name (Sender)
          </label>
          <select 
            value={myParticipantName}
            onChange={(e) => onParticipantChange(e.target.value)}
            className="w-full p-3 rounded-xl appearance-none outline-none transition-colors text-sm bg-slate-50 text-slate-800 border border-slate-200 focus:border-emerald-500"
          >
            {participants.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Select Date
          </label>
          <select 
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-3 rounded-xl appearance-none outline-none transition-colors text-sm bg-slate-50 text-slate-800 border border-slate-200 focus:border-emerald-500"
          >
            {availableDates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-700">
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          Chat Stats
        </h4>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Participants</span>
            <span className="font-medium text-slate-800">{participants.length}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Total Messages</span>
            <span className="font-medium text-slate-800">{totalMessagesCount}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200 mt-auto">
        <button 
          onClick={onReset}
          className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors text-sm"
        >
          Upload New File
        </button>
      </div>
    </motion.div>
  );
}
