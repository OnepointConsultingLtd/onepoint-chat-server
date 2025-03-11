import React, { useState, useRef, useEffect } from 'react'
import './App.css'

interface Question {
  id: number;
  text: string;
}

interface Message {
  id: string;
  text: string;
  type: 'user' | 'agent';
  timestamp: Date;
}

function App() {
  const initialQuestions: Question[] = [
    { id: 1, text: "What can you help me with today?" },
    { id: 2, text: "How do I get started with the agent?" },
    { id: 3, text: "What are your capabilities?" },
    { id: 4, text: "Can you show me some examples?" },
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: Question) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      type: 'user',
      timestamp: new Date()
    };

    const agentMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `I'll help you with "${question.text}" Please provide more details about what you'd like to know.`,
      type: 'agent',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, agentMessage]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        type: 'user',
        timestamp: new Date()
      };

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. How can I assist you further?",
        type: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage, agentMessage]);
      setInputText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[#0ea5e9] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0284c7]">OnePoint Agent</h1>
              <p className="text-[#64748b]">Your AI assistant for getting things done</p>
            </div>
          </div>

          {/* Initial Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialQuestions.map(question => (
              <button
                key={question.id}
                className="p-4 bg-[#f0f9ff] rounded-xl hover:bg-[#e0f2fe] transition-all duration-200 text-left border border-[#bae6fd] hover:border-[#7dd3fc] shadow-sm hover:shadow"
                onClick={() => handleQuestionClick(question)}
              >
                <p className="text-[#0369a1] font-medium">{question.text}</p>
              </button>
            ))}
          </div>
        </header>

        {/* Chat Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] mb-4 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] p-4 shadow-sm ${message.type === 'user'
                    ? 'bg-[#0ea5e9] text-white rounded-l-2xl rounded-tr-2xl'
                    : 'bg-[#f1f5f9] text-[#1e293b] rounded-r-2xl rounded-tl-2xl'
                    }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-right text-[#e0f2fe]' : 'text-left text-[#64748b]'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-[#e2e8f0]">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 p-4 rounded-xl border border-[#e2e8f0] focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#bae6fd] outline-none bg-[#f8fafc]"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-[#0ea5e9] text-white rounded-xl hover:bg-[#0284c7] transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow"
              >
                <span>Send</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
