"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import ChatInterface from "@/components/chat-interface"

export default function Home() {
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; timestamp: number }>>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load chat history from localStorage
    const saved = localStorage.getItem("chatHistory")
    if (saved) {
      setChatHistory(JSON.parse(saved))
    }
  }, [])

  const handleNewChat = () => {
    const newChatId = Date.now().toString()
    setCurrentChatId(newChatId)
  }

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId)
  }

  const handleSaveChat = (title: string) => {
    if (currentChatId) {
      const newChat = {
        id: currentChatId,
        title,
        timestamp: Date.now(),
      }
      const updated = [newChat, ...chatHistory.filter((c) => c.id !== currentChatId)]
      setChatHistory(updated)
      localStorage.setItem("chatHistory", JSON.stringify(updated))
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />
      <ChatInterface chatId={currentChatId} onSaveChat={handleSaveChat} />
    </div>
  )
}
