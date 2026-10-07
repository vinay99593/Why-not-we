import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  Phone,
  Image as ImageIcon,
  CheckCheck,
  ShieldCheck,
  Paperclip,
  Sparkles,
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const {
    isChatDrawerOpen,
    setIsChatDrawerOpen,
    activeChatPartner,
    messages,
    sendMessage,
    userRole,
    user,
    setIsCallModalOpen,
    setCallPartnerName,
    activeBookingId,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const partner = activeChatPartner || {
    id: 'p-1',
    name: 'Rajesh Kumar',
    categoryName: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    phone: '+91 98450 12345',
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isChatDrawerOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedPhoto) return;

    sendMessage(activeBookingId || 'BK-8841', inputText.trim(), selectedPhoto || undefined);
    setInputText('');
    setSelectedPhoto(null);

    // Show simulated typing for 1.2s
    if (userRole === 'customer') {
      setTimeout(() => {
        setIsTyping(true);
      }, 500);
      setTimeout(() => {
        setIsTyping(false);
      }, 1800);
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(activeBookingId || 'BK-8841', text);
    if (userRole === 'customer') {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1700);
    }
  };

  const sampleAttachments = [
    { label: 'Damaged Switch Photo', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80' },
    { label: 'Water Leak Joint', url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleStartCall = () => {
    setCallPartnerName(partner.name);
    setIsCallModalOpen(true);
  };

  const quickReplies = [
    "I'm at home now",
    "Please bring 32A MCB / spare valve",
    "Call me when at society gate",
    "Is diagnostic inspection free?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={partner.avatar}
                alt={partner.name}
                className="h-10 w-10 rounded-full object-cover border border-amber-400"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm leading-none font-display">{partner.name}</h4>
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                {partner.categoryName} · <span className="text-emerald-400 font-medium">Online now</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartCall}
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              title="Voice Call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsChatDrawerOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Booking Reference banner */}
        {activeBookingId && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center justify-between text-[11px] text-amber-900">
            <span>Linked to Service Booking <strong className="font-mono">#{activeBookingId}</strong></span>
            <span className="text-amber-700 font-semibold">Priority Channel</span>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
          <div className="text-center my-2">
            <span className="inline-block px-3 py-1 bg-slate-200/70 rounded-full text-[10px] text-slate-600 font-medium">
              End-to-end encrypted direct connection
            </span>
          </div>

          {messages.map((msg) => {
            const isMe =
              (userRole === 'customer' && msg.senderRole === 'customer') ||
              (userRole === 'provider' && msg.senderRole === 'provider');

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-xs text-xs leading-relaxed ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {!isMe && (
                    <div className="text-[10px] font-bold text-amber-600 mb-1">
                      {msg.senderName}
                    </div>
                  )}

                  {msg.imageUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-slate-700/20">
                      <img src={msg.imageUrl} alt="Attached" className="w-full h-36 object-cover" />
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      isMe ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="h-3 w-3 text-amber-400" />}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1 text-slate-500 font-medium">{partner.name} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Selected attachment preview */}
        {selectedPhoto && (
          <div className="px-4 py-2 bg-slate-100 flex items-center justify-between border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ImageIcon className="h-4 w-4 text-amber-600" />
              <span>Image attached for review</span>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Quick Replies */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickReply(qr)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            {/* Attachment picker */}
            <div className="relative group">
              <button
                type="button"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                title="Attach photo of problem"
                onClick={() => setSelectedPhoto(sampleAttachments[0].url)}
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder={`Message ${partner.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
            />

            <button
              type="submit"
              disabled={!inputText.trim() && !selectedPhoto}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
