import React from 'react';
import Button from './Button';
import { CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-brand-700 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 px-8 py-16 md:p-16 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t.pricing.title}
                </h2>
                <p className="text-brand-100 text-lg mb-8 max-w-xl">
                  {t.pricing.subtitle}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white">
                    <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                    <span>{t.pricing.points[0]}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                    <span>{t.pricing.points[1]}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                    <span>{t.pricing.points[2]}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 w-full md:w-auto min-w-[300px]">
                <p className="text-brand-100 text-sm font-medium uppercase tracking-wider mb-2">{t.pricing.earlyBird}</p>
                <div className="flex items-center justify-center mb-6">
                  <span className="text-gray-400 line-through text-2xl mr-4">¥599</span>
                  <span className="text-5xl font-bold text-white">¥479</span>
                </div>
                <Button className="w-full bg-white text-brand-700 hover:bg-gray-100 shadow-none mb-4">
                  {t.pricing.cta}
                </Button>
                <p className="text-xs text-brand-200">
                  {t.pricing.guarantee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;