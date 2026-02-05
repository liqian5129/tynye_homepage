import React from 'react';
import { Feather, Focus, Mic, Link, History, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Feather className="w-6 h-6" />,
    <Focus className="w-6 h-6" />,
    <Mic className="w-6 h-6" />,
    <Link className="w-6 h-6" />,
    <History className="w-6 h-6" />,
    <Sparkles className="w-6 h-6" />
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase mb-3">{t.features.sectionTitle}</h2>
          <p className="text-4xl font-bold text-gray-900 mb-6">{t.features.mainTitle}</p>
          <p className="text-lg text-gray-600">
            {t.features.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-brand-50/50 transition-colors duration-300 border border-transparent hover:border-brand-100"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;