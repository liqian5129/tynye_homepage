import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheck, Lock, Smartphone, Cloud, Layout } from 'lucide-react';

// 静态安全信息图 - 使用 Unsplash 的数据安全相关图片
const SECURITY_IMAGE = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=675&fit=crop&q=80';

const DataSecurity: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-paper/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column (Now on the Left) */}
          <div className="relative order-1">
            <div className="absolute -inset-4 bg-brand-500/5 blur-3xl rounded-full"></div>
            <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl border border-gray-100 overflow-hidden group">
              <div className="relative">
                <img
                  src={SECURITY_IMAGE}
                  alt="Data Security Ecosystem"
                  className="w-full h-auto rounded-[2rem] shadow-inner transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-[2rem]"></div>
              </div>

              <div className="absolute top-8 right-8">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-tighter">Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column (Now on the Right) */}
          <div className="order-2">
            <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise-Grade Security</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t.security.title}
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {t.security.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-600">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t.security.device}</h4>
                  <p className="text-sm text-gray-500">AES-256 local encryption for all offline notes and voice data.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-600">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t.security.cloud}</h4>
                  <p className="text-sm text-gray-500">Private secure tunnel synchronization. No third-party data access.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-brand-600">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t.security.web}</h4>
                  <p className="text-sm text-gray-500">Instant cross-platform access with multi-factor authentication.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-gray-100 italic text-gray-600 text-sm leading-relaxed">
              {t.security.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSecurity;
