import { useState } from 'react';

export default function EnterpriseFloatingChat() {
  const [activeTab, setActiveTab] = useState('questions');

  const suggestions = [
    'How does Onepoint ensure sustainable AI value?',
    'What are the key limitations of LLM applications?',
    'How does Boomi streamline data integration?',
    'How does AI drive data process improvements?',
  ];

  const topics = [
    'Onepoint’s Artificial Intelligence and Data Solutions',
    'Driving Digital Transformation with Onepoint',
    'Intelligent Automation and AI Agents by Onepoint',
    'Onepoint’s Expertise in Data Integration and Management',
  ];

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
        <h2 className="font-semibold text-gray-800">Osco – Company Advisor</h2>
        <button className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        <div className="self-start bg-blue-50 p-3 rounded-lg max-w-[80%]">
          What services does Onepoint offer?
        </div>
        <div className="self-end bg-white p-3 rounded-lg shadow max-w-[80%] border">
          At Onepoint, we offer a range of services focused on data, AI, and architecture...
        </div>
      </div>

      {/* Tabs for Questions & Topics */}
      <div className="border-t">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'questions'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('questions')}
          >
            Suggested Questions
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'topics' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('topics')}
          >
            Related Topics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-3 max-h-40 overflow-y-auto">
          {activeTab === 'questions' ? (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((q, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  {q}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {topics.map((t, idx) => (
                <div
                  key={idx}
                  className="p-2 border rounded hover:bg-gray-50 cursor-pointer text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="border-t flex items-center p-3">
        <input
          type="text"
          placeholder="Type your question..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
}
