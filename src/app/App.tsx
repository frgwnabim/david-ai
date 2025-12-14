import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { ChatArea } from './components/chat-area';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'Chat Baru',
      messages: [],
      createdAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  const handleClearHistory = () => {
    setSessions([]);
    setCurrentSessionId(null);
  };

  const handleSendMessage = (content: string) => {
    if (!currentSessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        const updatedMessages = [...session.messages, userMessage];
        // Update title if it's the first message
        const updatedTitle = session.messages.length === 0 
          ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
          : session.title;
        
        return {
          ...session,
          title: updatedTitle,
          messages: updatedMessages,
        };
      }
      return session;
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, aiMessage],
          };
        }
        return session;
      }));
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onClearHistory={handleClearHistory}
      />
      <ChatArea
        session={currentSession}
        onSendMessage={handleSendMessage}
        onNewChat={handleNewChat}
      />
    </div>
  );
}

function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // COVID-19 related responses
  if (lowerMessage.includes('gejala') || lowerMessage.includes('symptom')) {
    return `Gejala COVID-19 yang umum meliputi:

• Demam (suhu tubuh 38°C atau lebih)
• Batuk kering
• Kelelahan
• Hilang indra penciuman atau perasa
• Sesak napas
• Sakit tenggorokan
• Sakit kepala
• Nyeri otot

Gejala dapat muncul 2-14 hari setelah terpapar virus. Jika Anda mengalami gejala berat seperti kesulitan bernapas, segera hubungi layanan kesehatan.`;
  }

  if (lowerMessage.includes('pencegahan') || lowerMessage.includes('prevent')) {
    return `Cara pencegahan COVID-19:

• Vaksinasi lengkap dan booster
• Cuci tangan dengan sabun minimal 20 detik
• Gunakan masker di tempat umum
• Jaga jarak minimal 1-2 meter
• Hindari menyentuh wajah
• Tutup mulut saat batuk/bersin
• Jaga ventilasi ruangan
• Disinfeksi permukaan yang sering disentuh
• Isolasi jika sakit

Vaksinasi adalah cara paling efektif mencegah penyakit parah.`;
  }

  if (lowerMessage.includes('vaksin') || lowerMessage.includes('vaccine')) {
    return `Informasi Vaksin COVID-19:

• Vaksin aman dan efektif mencegah penyakit berat
• Jenis vaksin di Indonesia: Sinovac, AstraZeneca, Pfizer, Moderna
• Dosis: 2 dosis primer + booster
• Efek samping ringan: demam, nyeri lengan, kelelahan
• Vaksinasi gratis di Indonesia

Konsultasikan dengan tenaga kesehatan jika ada kondisi khusus.`;
  }

  if (lowerMessage.includes('suhu') || lowerMessage.includes('temperature') || lowerMessage.includes('demam')) {
    return `Tentang Suhu Tubuh dan COVID-19:

• Suhu normal: 36.5°C - 37.5°C
• Demam: 38°C atau lebih
• Demam adalah gejala umum COVID-19

Cara mengukur suhu:
• Gunakan termometer digital
• Ukur di ketiak, mulut, atau telinga
• Tunggu hingga bunyi beep
• Bersihkan termometer setelah digunakan

Anda dapat menggunakan fitur kamera untuk pemeriksaan cepat suhu wajah (perkiraan awal). Klik ikon kamera di kotak input untuk memulai.`;
  }

  if (lowerMessage.includes('tes') || lowerMessage.includes('test')) {
    return `Jenis Tes COVID-19:

1. PCR (Polymerase Chain Reaction)
   • Paling akurat
   • Hasil dalam 1-3 hari
   • Mendeteksi virus aktif

2. Rapid Antigen
   • Hasil cepat (15-30 menit)
   • Akurasi lebih rendah dari PCR
   • Untuk screening

3. Rapid Antibodi
   • Mendeteksi antibodi
   • Tidak untuk diagnosa aktif
   • Untuk riwayat infeksi

Lakukan tes jika ada gejala atau kontak erat dengan pasien COVID-19.`;
  }

  if (lowerMessage.includes('isolasi') || lowerMessage.includes('karantina')) {
    return `Pedoman Isolasi COVID-19:

Jika positif tanpa gejala/gejala ringan:
• Isolasi mandiri 10 hari
• Pisahkan kamar tidur
• Gunakan kamar mandi terpisah jika memungkinkan
• Gunakan masker jika berinteraksi
• Makan terpisah
• Monitor suhu dan gejala

Akhiri isolasi jika:
• Sudah 10 hari DAN
• Bebas demam 24 jam tanpa obat DAN
• Gejala membaik

Jika gejala berat, segera ke rumah sakit.`;
  }

  if (lowerMessage.includes('pengobatan') || lowerMessage.includes('obat')) {
    return `Pengobatan COVID-19:

Gejala ringan di rumah:
• Istirahat cukup
• Minum air putih banyak
• Paracetamol untuk demam
• Vitamin C dan D
• Monitor saturasi oksigen

Gejala berat memerlukan:
• Oksigen tambahan
• Obat antiviral (Remdesivir, Paxlovid)
• Steroid (Dexamethasone)
• Perawatan di rumah sakit

Jangan gunakan antibiotik kecuali ada infeksi bakteri sekunder. Konsultasi dengan dokter untuk penanganan yang tepat.`;
  }

  if (lowerMessage.includes('varian') || lowerMessage.includes('variant')) {
    return `Varian COVID-19:

Varian yang perlu diperhatikan:
• Omicron (paling dominan saat ini)
• Delta
• Alpha
• Beta

Karakteristik Omicron:
• Lebih menular
• Gejala umumnya lebih ringan
• Dapat menginfeksi orang yang sudah vaksin
• Vaksinasi tetap efektif mencegah penyakit berat

Virus terus bermutasi, penting untuk tetap update dengan informasi kesehatan terkini.`;
  }

  // Default response
  return `Terima kasih atas pertanyaan Anda tentang COVID-19. 

Saya dapat membantu dengan informasi tentang:
• Gejala dan tanda-tanda COVID-19
• Pencegahan dan protokol kesehatan
• Vaksinasi
• Pemeriksaan suhu tubuh (gunakan fitur kamera)
• Jenis tes COVID-19
• Isolasi dan karantina
• Pengobatan
• Varian virus

Silakan tanyakan apa yang ingin Anda ketahui, atau gunakan tombol kamera untuk pemeriksaan suhu.`;
}
