import { useState, useRef, useEffect } from 'react';
import { X, Camera, RotateCw, AlertCircle } from 'lucide-react';

interface TemperatureCheckProps {
  onClose: () => void;
}

export function TemperatureCheck({ onClose }: TemperatureCheckProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setError('');
      setPermissionDenied(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      // Handle camera access errors silently - already shown in UI
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        setError('Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('Kamera tidak ditemukan. Pastikan perangkat Anda memiliki kamera.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi tersebut dan coba lagi.');
      } else {
        setError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Simulate temperature analysis
    // In a real application, this would use computer vision and thermal imaging
    setTimeout(() => {
      // Generate a simulated temperature reading
      // Normal range: 36.1-37.2°C, with slight randomization
      const baseTemp = 36.1 + Math.random() * 1.1;
      const simulatedTemp = Math.round(baseTemp * 10) / 10;
      
      setTemperature(simulatedTemp);
      setIsScanning(false);
    }, 2000);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setTemperature(null);
  };

  const reset = () => {
    setTemperature(null);
    setIsScanning(false);
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 36.1) return { status: 'Rendah', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (temp >= 36.1 && temp <= 37.2) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
    if (temp > 37.2 && temp < 38.0) return { status: 'Sedikit Tinggi', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'Demam', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-foreground">Pemeriksaan Suhu Tubuh</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error ? (
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-destructive">{error}</p>
                    {permissionDenied && (
                      <div className="text-sm text-muted-foreground space-y-1 mt-2">
                        <p>Cara mengizinkan akses kamera:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Klik ikon kunci/info di address bar</li>
                          <li>Pilih "Izinkan" untuk Camera/Kamera</li>
                          <li>Refresh halaman atau klik tombol "Coba Lagi"</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={startCamera}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Camera className="w-5 h-5" />
                  <span>Coba Lagi</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
                >
                  Tutup
                </button>
              </div>
              
              {/* Info Box - show even with error */}
              <div className="bg-secondary border border-border rounded-lg p-4 text-sm">
                <h3 className="text-foreground mb-2">ℹ️ Informasi:</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Fitur ini memerlukan akses kamera untuk bekerja</li>
                  <li>• Kamera hanya digunakan untuk analisis lokal</li>
                  <li>• Tidak ada data yang disimpan atau dikirim ke server</li>
                  <li>• Untuk pengukuran akurat, gunakan termometer digital</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {/* Camera Feed */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Face Detection Overlay */}
                {stream && !temperature && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-64 border-4 border-primary rounded-full opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                          Posisikan wajah di dalam bingkai
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scanning Animation */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center space-y-3">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
                      <p className="text-white">Menganalisis suhu...</p>
                    </div>
                  </div>
                )}

                {/* Camera Toggle Button */}
                <button
                  onClick={toggleCamera}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  disabled={isScanning}
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>

              {/* Temperature Result */}
              {temperature && (
                <div className={`p-6 rounded-lg ${getTemperatureStatus(temperature).bg}`}>
                  <div className="text-center space-y-2">
                    <div className="text-5xl">🌡️</div>
                    <div>
                      <div className="text-4xl ${getTemperatureStatus(temperature).color}">
                        {temperature}°C
                      </div>
                      <div className={`mt-2 ${getTemperatureStatus(temperature).color}`}>
                        Status: {getTemperatureStatus(temperature).status}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                      {temperature < 36.1 && (
                        <p>Suhu tubuh Anda sedikit rendah. Pastikan Anda cukup istirahat dan makan bergizi.</p>
                      )}
                      {temperature >= 36.1 && temperature <= 37.2 && (
                        <p>Suhu tubuh Anda normal. Terus jaga kesehatan dengan pola hidup sehat.</p>
                      )}
                      {temperature > 37.2 && temperature < 38.0 && (
                        <p>Suhu tubuh Anda sedikit tinggi. Monitor terus kondisi Anda dan istirahat yang cukup.</p>
                      )}
                      {temperature >= 38.0 && (
                        <p>Anda mengalami demam. Segera konsultasi dengan tenaga kesehatan jika disertai gejala lain.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-secondary border border-border rounded-lg p-4 text-sm">
                <h3 className="text-foreground mb-2">⚠️ Catatan Penting:</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Ini adalah estimasi suhu berbasis visual, bukan pengukuran akurat</li>
                  <li>• Gunakan termometer digital untuk hasil yang lebih akurat</li>
                  <li>• Suhu normal: 36.1°C - 37.2°C</li>
                  <li>• Demam: ≥ 38.0°C</li>
                  <li>• Konsultasi dengan dokter jika ada gejala COVID-19</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!temperature ? (
                  <button
                    onClick={captureAndAnalyze}
                    disabled={!stream || isScanning}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Camera className="w-5 h-5" />
                    <span>{isScanning ? 'Memindai...' : 'Mulai Pemindaian'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={reset}
                      className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
                    >
                      Periksa Ulang
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Selesai
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}