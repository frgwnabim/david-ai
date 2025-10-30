"use client"

import { useState, useRef, useEffect } from "react"
import { SendIcon, CameraIcon, LoaderIcon, AlertIcon } from "./icons"
import CameraModal from "./camera-modal"

interface ChatInterfaceProps {
  chatId: string | null
  onSaveChat: (title: string) => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export default function ChatInterface({ chatId, onSaveChat }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (chatId) {
      const saved = localStorage.getItem(`chat_${chatId}`)
      if (saved) {
        setMessages(JSON.parse(saved))
      } else {
        setMessages([])
      }
    }
  }, [chatId])

  const handleSendMessage = async () => {
    if (!input.trim() || !chatId) return

    setError(null)
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.response) {
        throw new Error("No response from AI")
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      }

      const updatedMessages = [...messages, userMessage, assistantMessage]
      setMessages(updatedMessages)
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedMessages))

      // Save chat title if first message
      if (messages.length === 0) {
        const title = input.substring(0, 30) + (input.length > 30 ? "..." : "")
        onSaveChat(title)
      }
    } catch (err) {
      console.error("[v0] Error sending message:", err)
      setError(err instanceof Error ? err.message : "Failed to send message")
      // Remove the user message if there was an error
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
    } finally {
      setLoading(false)
    }
  }

  const handleCameraCapture = (imageData: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: imageData,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setShowCamera(false)
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-green-600 mb-4 tracking-tight">DAVID AI</h1>
          <p className="text-green-700 text-lg font-medium">COVID Information & Health Assistant</p>
          <p className="text-green-600 mt-6 text-sm">Start a new chat to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-green-100 p-6 text-center shadow-soft">
        <h1 className="text-5xl font-bold text-green-600 tracking-tight">DAVID AI</h1>
        <p className="text-green-600 text-sm mt-2 font-medium">COVID Information & Health Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-green-500 text-center">Start typing to begin your conversation</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md px-4 py-3 rounded-lg transition-smooth ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none shadow-soft"
                    : "bg-green-50 text-green-900 rounded-bl-none border border-green-100"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-green-50 text-green-900 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2 border border-green-100">
              <div className="animate-spin text-green-600">
                <LoaderIcon />
              </div>
              <span className="text-sm font-medium">Thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 text-red-900 px-4 py-3 rounded-lg flex items-center gap-2 max-w-md border border-red-100">
              <div className="flex-shrink-0 text-red-600">
                <AlertIcon />
              </div>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-green-100 p-6 shadow-soft">
        <div className="flex gap-3">
          <button
            onClick={() => setShowCamera(true)}
            className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-smooth shadow-soft"
            title="Temperature Check"
          >
            <CameraIcon />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about COVID-19, symptoms, prevention, or check your temperature..."
            className="flex-1 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-900 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-smooth"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="flex-shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white p-3 rounded-lg transition-smooth shadow-soft"
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {showCamera && <CameraModal onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />}
    </div>
  )
}
