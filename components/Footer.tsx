import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Smartphone, Users, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <span className="text-3xl font-bold text-gray-900 flex items-center mb-6 tracking-tight">
              tynye<span className="text-brand-600">.</span>
            </span>
            <p className="text-gray-500 text-lg leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          
          <div className="flex md:justify-end">
            <div className="w-full md:w-auto">
              <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-xs">{t.footer.contact}</h4>
              
              <div className="flex flex-wrap gap-10 mb-10">
                {/* Simulated QR Code 1: XiaoHongShu */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-3 shadow-sm group hover:border-brand-200 transition-all cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {/* Simulated QR pattern bits */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    
                    <div className="text-gray-300 group-hover:text-brand-500 transition-colors relative z-10">
                      <Smartphone className="w-8 h-8" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-brand-600 transition-colors">XiaoHongShu</span>
                </div>

                {/* Simulated QR Code 2: Community Group */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-3 shadow-sm group hover:border-brand-200 transition-all cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {/* Simulated QR pattern bits */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-gray-200 rounded-sm"></div>
                    
                    <div className="text-gray-300 group-hover:text-brand-500 transition-colors relative z-10">
                      <Users className="w-8 h-8" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-brand-600 transition-colors">Community</span>
                </div>
              </div>

              {/* Email Link */}
              <div className="flex items-center space-x-4 text-gray-600 hover:text-brand-600 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors border border-gray-100 group-hover:border-brand-200">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:hello@tynye.ai" className="text-base font-semibold tracking-tight">hello@tynye.ai</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="font-medium">&copy; {new Date().getFullYear()} tynye AI. {t.footer.rights}</p>
          <div className="flex space-x-8 mt-6 md:mt-0 font-medium">
            <a href="#" className="hover:text-gray-900 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gray-900 transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;