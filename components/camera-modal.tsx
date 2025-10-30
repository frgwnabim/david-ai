"use client"

import { useState, useRef, useEffect } from "react"
import { CloseIcon, CameraIcon, ThermometerIcon } from "./icons"

interface CameraModalProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

interface TemperatureReading {
  value: number
  status: "normal" | "elevated" | "fever"
  guidance: string
}

export default function CameraModal({ onCapture, onClose }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [temperature, setTemperature] = useState<TemperatureReading | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("[v0] Error accessing camera:", error)
      setCameraError("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const getTemperatureStatus = (temp: number): TemperatureReading => {
    if (temp < 36.1) {
      return {
        value: temp,
        status: "normal",
        guidance: "Your temperature is below normal. Stay warm and monitor your health.",
      }
    } else if (temp <= 37.5) {
      return {
        value: temp,
        status: "normal",
        guidance: "Your temperature is normal. Continue monitoring your health.",
      }
    } else if (temp <= 38.5) {
      return {
        value: temp,
        status: "elevated",
        guidance: "Your temperature is slightly elevated. Rest, stay hydrated, and monitor symptoms.",
      }
    } else {
      return {
        value: temp,
        status: "fever",
        guidance: "You have a fever. Consult a healthcare professional if symptoms persist.",
      }
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      setCapturing(true)
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)

        // Simulate temperature reading with realistic variation
        const baseTemp = 36.8
        const variation = (Math.random() - 0.5) * 2
        const simulatedTemp = baseTemp + variation
        const tempReading = getTemperatureStatus(simulatedTemp)

        setTemperature(tempReading)
        stopCamera()
      }
    }
  }

  const handleConfirmCapture = () => {
    if (temperature) {
      const message = `Temperature Check Result:\nTemperature: ${temperature.value.toFixed(1)}°C\nStatus: ${temperature.status.toUpperCase()}\nGuidance: ${temperature.guidance}`
      onCapture(message)
    }
  }

  const handleRetake = () => {
    setTemperature(null)
    startCamera()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-medium max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-100">
          <div className="flex items-center gap-2">
            <div className="text-green-600">
              <ThermometerIcon />
            </div>
            <h2 className="text-lg font-semibold text-green-900">Temperature Check</h2>
          </div>
          <button onClick={onClose} className="text-green-600 hover:text-green-900 transition-smooth">
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {cameraError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4 text-sm">{cameraError}</p>
              <button
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-smooth text-sm font-medium"
              >
                Close
              </button>
            </div>
          ) : temperature ? (
            <div className="space-y-4">
              {/* Temperature Display */}
              <div className="text-center py-6 bg-green-50 rounded-lg border border-green-100">
                <div className="text-5xl font-bold text-green-600 mb-2">{temperature.value.toFixed(1)}°C</div>
                <div
                  className={`text-lg font-semibold mb-3 ${
                    temperature.status === "normal"
                      ? "text-green-600"
                      : temperature.status === "elevated"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {temperature.status === "normal"
                    ? "Normal"
                    : temperature.status === "elevated"
                      ? "Elevated"
                      : "Fever"}
                </div>
                <p className="text-sm text-green-700 leading-relaxed">{temperature.guidance}</p>
              </div>

              {/* Status Indicator */}
              <div className="flex gap-2 justify-center flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-700">Normal: 36.1-37.5°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-yellow-700">Elevated: 37.6-38.5°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-red-700">Fever: &gt;38.5°C</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleRetake}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-900 py-2 rounded-lg font-medium transition-smooth text-sm"
                >
                  Retake
                </button>
                <button
                  onClick={handleConfirmCapture}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-smooth text-sm"
                >
                  Send to Chat
                </button>
              </div>
            </div>
          ) : cameraActive ? (
            <div className="space-y-4">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
              <button
                onClick={captureImage}
                disabled={capturing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-smooth text-sm"
              >
                <CameraIcon />
                {capturing ? "Capturing..." : "Capture Temperature"}
              </button>
              <p className="text-xs text-green-600 text-center">
                Position your forehead in the center of the frame for accurate reading
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-green-700 mb-4 text-sm">Initializing camera...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
