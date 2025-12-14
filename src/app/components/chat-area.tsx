import { useState, useRef, useEffect } from 'react';
import { Camera, Send } from 'lucide-react';
import type { ChatSession } from '../App';
import { TemperatureCheck } from './temperature-check';

interface ChatAreaProps {
  session: ChatSession | undefined;
  onSendMessage: (content: string) => void;
  onNewChat: () => void;
}

export function ChatArea({ session, onSendMessage, onNewChat }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!session) {
      onNewChat();
      // Wait for new session to be created
      setTimeout(() => {
        onSendMessage(input.trim());
        setInput('');
      }, 100);
    } else {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header with DAVID AI branding */}
      <div className="border-b border-border bg-white">
        <div className="px-8 py-6 text-center">
          <h1 className="tracking-wider" style={{ 
            fontSize: '2rem', 
            fontWeight: 800,
            color: '#22c55e',
            letterSpacing: '0.1em'
          }}>
            DAVID AI
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Asisten AI untuk Informasi COVID-19
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {!session || session.messages.length === 0 ? (
          <div className="max-w-3xl mx-auto h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">🦠</span>
              </div>
              <h2 className="text-foreground">
                Selamat Datang di DAVID AI
              </h2>
              <p className="text-muted-foreground max-w-md">
                Tanyakan apapun tentang COVID-19 atau gunakan fitur kamera untuk pengecekan suhu tubuh
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 max-w-xl mx-auto">
                <button
                  onClick={() => onSendMessage('Apa saja gejala COVID-19?')}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="text-sm text-foreground">Gejala COVID-19</div>
                  <div className="text-xs text-muted-foreground mt-1">Pelajari gejala yang perlu diwaspadai</div>
                </button>
                <button
                  onClick={() => onSendMessage('Bagaimana cara pencegahan COVID-19?')}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="text-sm text-foreground">Pencegahan</div>
                  <div className="text-xs text-muted-foreground mt-1">Cara melindungi diri dari virus</div>
                </button>
                <button
                  onClick={() => onSendMessage('Kapan harus melakukan tes COVID-19?')}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="text-sm text-foreground">Tes COVID-19</div>
                  <div className="text-xs text-muted-foreground mt-1">Informasi tentang testing</div>
                </button>
                <button
                  onClick={() => setShowCamera(true)}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="text-sm text-foreground">Cek Suhu Tubuh</div>
                  <div className="text-xs text-muted-foreground mt-1">Gunakan kamera untuk deteksi</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {session.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground border border-border'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-white px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2 bg-input-background rounded-lg border border-border p-2">
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="flex-shrink-0 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Cek Suhu Tubuh"
            >
              <Camera className="w-5 h-5" />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan tentang COVID-19..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground max-h-32 min-h-[24px]"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex-shrink-0 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Tekan Enter untuk kirim, Shift + Enter untuk baris baru
          </p>
        </form>
      </div>

      {/* Temperature Check Modal */}
      {showCamera && (
        <TemperatureCheck onClose={() => setShowCamera(false)} />
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}
