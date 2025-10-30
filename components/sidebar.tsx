"use client"

import type React from "react"
import { PlusIcon, MessageIcon, TrashIcon } from "./icons"

interface SidebarProps {
  chatHistory: Array<{ id: string; title: string; timestamp: number }>
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  currentChatId: string | null
}

export default function Sidebar({ chatHistory, onNewChat, onSelectChat, currentChatId }: SidebarProps) {
  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = chatHistory.filter((c) => c.id !== id)
    localStorage.setItem("chatHistory", JSON.stringify(updated))
    window.location.reload()
  }

  return (
    <div className="w-64 bg-white border-r border-green-100 flex flex-col h-screen shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-green-100">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg transition-smooth font-medium text-sm"
        >
          <PlusIcon />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs font-semibold text-green-700 mb-3 uppercase tracking-widest">History</div>
        <div className="space-y-2">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-green-500">No chat history yet</p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-smooth group flex items-start justify-between gap-2 ${
                  currentChatId === chat.id
                    ? "bg-green-100 text-green-900 shadow-soft"
                    : "hover:bg-green-50 text-green-800"
                }`}
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="mt-0.5 flex-shrink-0 text-green-600">
                    <MessageIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-green-600">{new Date(chat.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0 text-green-600 hover:text-red-600"
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
