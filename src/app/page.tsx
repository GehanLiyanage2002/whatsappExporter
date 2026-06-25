"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Sun, Moon } from "lucide-react";
import { Message, ChatData } from "@/types";
import { parseChatFile } from "@/lib/parser";
import { UploadArea } from "@/components/UploadArea";
import { Sidebar } from "@/components/Sidebar";
import { ChatViewer } from "@/components/ChatViewer";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatData, setChatData] = useState<ChatData | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [myParticipantName, setMyParticipantName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFileUpload = (file: File) => {
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setTimeout(() => {
        const data = parseChatFile(text);
        setChatData(data);
        
        if (data.participants.length > 0) {
          setMyParticipantName(data.participants[0]);
        }
        if (data.dates.length > 0) {
          setSelectedDate(data.dates[data.dates.length - 1]);
        }
        setIsProcessing(false);
      }, 100);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    setChatData(null);
    setSearchQuery("");
  };

  let filteredMessages: Message[] = [];
  if (chatData) {
    filteredMessages = chatData.messages.filter((m) => {
      // If there's a search query, ignore date filtering, just search everything
      // Or we can search within the selected date? Let's search within selected date, or across all dates if they select "All Dates"
      // Actually let's just search across the selected date for now, or if searching, ignore date.
      // Better: if searchQuery is present, ignore the date filter to find the message anywhere.
      
      const matchesSearch = searchQuery 
        ? m.text.toLowerCase().includes(searchQuery.toLowerCase()) || m.sender.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
        
      const matchesDate = searchQuery ? true : m.date === selectedDate;
      
      return matchesSearch && matchesDate;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50 transition-colors duration-300 relative overflow-hidden">
      {/* Background Blobs for Landing Page */}
      {!chatData && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-400/20 blur-[120px] mix-blend-multiply" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400/20 blur-[100px] mix-blend-multiply" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" onClick={handleReset}>
            <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <MessageCircle className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Chat<span className="text-emerald-600">Exporter</span>
            </h1>
          </div>
        </header>

        {/* Main Content */}
        {!chatData ? (
          <UploadArea 
            isProcessing={isProcessing} 
            onFileUpload={handleFileUpload} 
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Sidebar 
                participants={chatData.participants}
                availableDates={chatData.dates}
                selectedDate={selectedDate}
                myParticipantName={myParticipantName}
                searchQuery={searchQuery}
                totalMessagesCount={chatData.messages.length}
                onDateChange={setSelectedDate}
                onParticipantChange={setMyParticipantName}
                onSearchChange={setSearchQuery}
                onReset={handleReset}
              />
            </div>
            <div className="lg:col-span-3">
              <ChatViewer 
                messages={filteredMessages}
                participants={chatData.participants}
                myParticipantName={myParticipantName}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
