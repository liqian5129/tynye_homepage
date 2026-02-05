import React from 'react';
import Button from './Button';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-white pt-32 pb-16 lg:pt-48 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>{t.hero.tag}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight animate-slide-up">
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Button size="lg" className="w-full sm:w-auto shadow-brand-500/30">
              {t.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto group">
              <Play className="w-4 h-4 mr-2 fill-current group-hover:text-brand-700 transition-colors" />
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <div className="mt-20 relative animate-slide-up" style={{animationDelay: '0.4s'}}>
           {/* Abstract Product Representation/Placeholder */}
           <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group">
{/* 主图 - 请将图片放置在 public/images/hero-banner.jpg */}
              <img
                src="./images/hero-banner.jpg"
                alt="tynye AI Bookmark Lifestyle"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              <div className="relative z-10 text-center">
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all">
                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-2" />
                 </div>
                 <p className="text-gray-300 font-medium tracking-widest text-sm uppercase">{t.hero.visualText}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;