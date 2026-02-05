
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2, Camera, Library, Trees, Coffee } from 'lucide-react';

const ScenarioCard = ({ title, desc, prompt, icon: Icon }: { title: string, desc: string, prompt: string, icon: any }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Detailed description of the 'tynye' device from the user image
        const productDescription = "the 'tynye' device: an ultra-slim, elongated bookmark-style AI reader with a premium rose-gold metallic finish, a high-contrast vertical screen with a black bezel, a small circular power button at the top edge, and minimal elegant branding";
        
        const finalPrompt = `${prompt}. In the scene, naturally place ${productDescription} either resting on the open pages of a paper book or lying elegantly beside it on the surface. Style: high-end cinematic photography, soft lighting, minimalist aesthetic, 16:9 aspect ratio.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: finalPrompt,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setImgUrl(`data:image/png;base64,${part.inlineData.data}`);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to generate scenario image:", error);
        setImgUrl(`https://picsum.photos/seed/${title}/800/450`);
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt, title]);

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-xl aspect-video bg-gray-50 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-100">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 text-brand-200 animate-spin mb-3" />
          <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Generating Scenario...</span>
        </div>
      ) : (
        <img 
          src={imgUrl || ''} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
        </div>
        <p className="text-gray-200 leading-relaxed text-sm max-w-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {desc}
        </p>
      </div>
    </div>
  );
};

const UsageScenarios: React.FC = () => {
  const { t } = useLanguage();

  const scenarios = [
    {
      ...t.scenarios.items[0],
      icon: Library,
      prompt: "A minimalist, quiet home study room at magic hour. A thick hardcover book is open on a solid oak desk. The rose-gold tynye AI device is resting flat on the book's right page"
    },
    {
      ...t.scenarios.items[1],
      icon: Library,
      prompt: "A prestigious modern library with floor-to-ceiling bookshelves. On a sleek white marble study table, several academic books are stacked. The rose-gold tynye bookmark reader is lying horizontally next to a high-end designer pen"
    },
    {
      ...t.scenarios.items[2],
      icon: Trees,
      prompt: "A serene morning in a Japanese-style garden. A person's hands are holding a paper book on a wooden bench. The rose-gold tynye device is clipped to the side of the book like a thin electronic bookmark"
    },
    {
      ...t.scenarios.items[3],
      icon: Coffee,
      prompt: "A sophisticated minimalist cafe interior with large glass windows. On a small round cafe table sits a ceramic coffee cup and an open book. The slim rose-gold tynye device is placed between the cup and the book"
    }
  ];

  return (
    <section id="scenarios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{t.scenarios.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{t.scenarios.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {scenarios.map((scenario, index) => (
            <ScenarioCard key={index} {...scenario} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageScenarios;
