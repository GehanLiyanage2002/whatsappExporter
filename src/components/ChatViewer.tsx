"use client";

import { Message } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, FileText, Video, Sticker } from "lucide-react";

interface ChatViewerProps {
  messages: Message[];
  participants: string[];
  myParticipantName: string;
  selectedDate: string;
}

export function ChatViewer({
  messages,
  participants,
  myParticipantName,
  selectedDate
}: ChatViewerProps) {
  
  const renderMessageContent = (text: string) => {
    // Handle omitted media
    const lower = text.toLowerCase().trim();
    if (lower === "image omitted" || lower === "<image omitted>") {
      return (
        <div className="flex items-center gap-2 text-slate-500 italic">
          <ImageIcon className="w-4 h-4" /> Image omitted
        </div>
      );
    }
    if (lower === "sticker omitted" || lower === "<sticker omitted>") {
      return (
        <div className="flex items-center gap-2 text-slate-500 italic">
          <Sticker className="w-4 h-4" /> Sticker omitted
        </div>
      );
    }
    if (lower === "video omitted" || lower === "<video omitted>") {
      return (
        <div className="flex items-center gap-2 text-slate-500 italic">
          <Video className="w-4 h-4" /> Video omitted
        </div>
      );
    }

    return <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{text}</div>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col h-[80vh]"
    >
      {/* Chat Header */}
      <div className="p-4 flex items-center gap-4 z-10 shadow-sm bg-[#f0f2f5]">
        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
          <span className="font-semibold text-slate-600">
            {participants.find(p => p !== myParticipantName)?.charAt(0) || "C"}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">
            {participants.filter(p => p !== myParticipantName).join(", ") || "Chat"}
          </h3>
          <p className="text-xs text-slate-500">
            {messages.length} messages shown
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 md:p-8 chat-scroll relative bg-[#efeae2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {messages.map((msg, index) => {
              if (msg.isSystem) {
                return (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={msg.id} 
                    className="flex justify-center my-2"
                  >
                    <div className="bg-[#ffeecd] text-slate-600 text-xs px-4 py-2 rounded-lg shadow-sm max-w-sm text-center">
                      {msg.text}
                    </div>
                  </motion.div>
                );
              }

              const isMe = msg.sender === myParticipantName;
              const showTail = index === 0 || messages[index - 1].sender !== msg.sender || messages[index - 1].isSystem;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${showTail ? 'mt-2' : ''}`}
                >
                  <div 
                    className={`relative max-w-[85%] md:max-w-[70%] rounded-xl px-3 py-2 shadow-sm text-[#111b21]
                      ${isMe ? 'bg-[var(--msg-sent-light)]' : 'bg-[var(--msg-recv-light)]'}
                      ${showTail && isMe ? 'rounded-tr-none' : ''}
                      ${showTail && !isMe ? 'rounded-tl-none' : ''}
                    `}
                  >
                    {!isMe && showTail && participants.length > 2 && (
                      <div className="text-xs font-bold mb-1 text-emerald-600">
                        {msg.sender}
                      </div>
                    )}
                    {renderMessageContent(msg.text)}
                    <div className="text-[10px] text-right mt-1 ml-4 float-right text-slate-500/80">
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <div className="bg-white/80 text-slate-500 px-6 py-3 rounded-xl shadow-sm text-sm">
                No messages found.
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
