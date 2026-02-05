
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all duration-300 shadow-sm flex flex-col h-full"
            >
              <div className="mb-6 text-brand-300">
                <Quote className="w-10 h-10" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic flex-1 mb-8">
                “{item.quote}”
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-lg border border-brand-200 shadow-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-none mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
