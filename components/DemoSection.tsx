import React, { useState } from 'react';
import { LoadingState } from '../types';
import Button from './Button';
import { Loader2, Sparkles, ScanLine, MessageSquareQuote } from 'lucide-react';

// 模拟 AI 响应 - 在没有 API Key 时使用
const MOCK_RESPONSES = [
  "This text explores the concept of focus as a valuable and limited resource in our modern digital age. The key insight here is that immersive reading experiences are becoming increasingly rare due to constant mobile app distractions. This suggests that tools and environments that promote deep focus are becoming more valuable for knowledge workers and learners.",
  "The passage highlights an interesting tension between technology and focused attention. While mobile apps offer convenience, they fragment our attention. The tynye device seems designed to bridge this gap - leveraging technology to enhance rather than distract from reading. This aligns with the growing 'slow media' movement.",
  "Your text touches on a fascinating paradox: in an age of information abundance, our ability to deeply engage with that information has diminished. The solution isn't to abandon technology, but to use it more intentionally. Consider how you might create 'focus rituals' around your reading practice.",
];

// 模拟 API 调用
const mockGeminiResponse = async (text: string, question: string | null): Promise<string> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (question) {
    return `Based on the scanned text "${text.substring(0, 50)}...", here's my analysis of your question "${question}":\n\nThe text suggests that maintaining focus in today's world requires intentional effort. To address your question, I would say that creating boundaries around our reading time - both physical and digital - is essential for deep comprehension and retention.`;
  }

  // 返回随机模拟响应
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
};

const DemoSection: React.FC = () => {
  const [scannedText, setScannedText] = useState("Focus is a scarce resource: an immersive reading experience, undisturbed by mobile apps.");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSimulateScan = async () => {
    if (!scannedText.trim()) return;
    setStatus(LoadingState.LOADING);
    setResponse(null);
    try {
      // 使用模拟响应
      const result = await mockGeminiResponse(scannedText, question || null);
      setResponse(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section id="demo" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50 via-white to-white opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Demo</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Experience the "Reading Buddy"
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how tynye analyzes text and answers your questions instantly, just like the physical device.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Input Side */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <ScanLine className="w-4 h-4 mr-2 text-brand-600" />
                Simulate Scanned Text
              </label>
              <textarea
                className="w-full h-32 p-4 rounded-xl border-gray-200 focus:border-brand-500 focus:ring-brand-500 bg-white text-gray-800 text-base resize-none shadow-sm transition-colors"
                value={scannedText}
                onChange={(e) => setScannedText(e.target.value)}
                placeholder="Type or paste text here to simulate scanning a paragraph..."
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MessageSquareQuote className="w-4 h-4 mr-2 text-brand-600" />
                Ask tynye a Question (Optional)
              </label>
              <input
                type="text"
                className="w-full p-4 rounded-xl border-gray-200 focus:border-brand-500 focus:ring-brand-500 bg-white text-gray-800 shadow-sm transition-colors"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Explain this concept in simple terms..."
              />
            </div>

            <Button
              onClick={handleSimulateScan}
              disabled={status === LoadingState.LOADING || !scannedText}
              className="w-full"
              size="lg"
            >
              {status === LoadingState.LOADING ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Analyze with AI'
              )}
            </Button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Demo mode - responses are simulated for demonstration purposes
            </p>
          </div>

          {/* Output Side */}
          <div className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-brand-900 rounded-2xl shadow-2xl transform rotate-1 transition-transform"></div>
            <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
               {/* Screen Header */}
               <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
                  <span className="text-gray-400 text-xs font-mono uppercase">tynye OS 1.0</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
               </div>

               {/* Screen Body */}
               <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                  {status === LoadingState.IDLE && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-center text-sm">Waiting for input...</p>
                    </div>
                  )}

                  {status === LoadingState.LOADING && (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    </div>
                  )}

                  {status === LoadingState.ERROR && (
                    <div className="text-red-400 text-center p-4">
                      An error occurred. Please try again.
                    </div>
                  )}

                  {status === LoadingState.SUCCESS && response && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="border-l-2 border-brand-500 pl-4 py-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Context</p>
                        <p className="text-gray-300 text-sm italic line-clamp-2">"{scannedText}"</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-900/50">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">tynye AI</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed">
                          {response}
                        </div>
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
