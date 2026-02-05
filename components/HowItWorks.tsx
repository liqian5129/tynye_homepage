import React, { useState } from 'react';
import { Camera, MessageSquare, Share, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const icons = [
    <Camera className="w-6 h-6" />,
    <MessageSquare className="w-6 h-6" />,
    <Layers className="w-6 h-6" />
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.howItWorks.title}</h2>
          <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-1">
            {t.howItWorks.steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`pb-4 px-4 text-lg font-medium transition-all relative ${
                  activeStep === index 
                    ? 'text-brand-600' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {step.label}
                {activeStep === index && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 text-brand-600 rounded-xl mb-6">
              {icons[activeStep]}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.howItWorks.steps[activeStep].title}</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.howItWorks.steps[activeStep].desc}
            </p>
            <ul className="space-y-4">
              {t.howItWorks.features[activeStep].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 bg-gray-50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
             {/* Abstract UI representation for the step */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
             {activeStep === 0 && (
               <div className="relative text-center animate-slide-up">
                 <Camera className="w-24 h-24 text-gray-300 mb-4 mx-auto" />
                 <div className="bg-white p-4 rounded-xl shadow-lg max-w-xs mx-auto text-left">
                    <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                 </div>
               </div>
             )}
             {activeStep === 1 && (
               <div className="relative text-center animate-slide-up">
                 <MessageSquare className="w-24 h-24 text-brand-200 mb-4 mx-auto" />
                 <div className="bg-brand-600 text-white p-4 rounded-xl shadow-lg max-w-xs mx-auto text-left">
                    <p className="text-sm">"The concept of 'Flow' relates to..."</p>
                 </div>
               </div>
             )}
             {activeStep === 2 && (
               <div className="relative text-center animate-slide-up">
                 <Share className="w-24 h-24 text-blue-200 mb-4 mx-auto" />
                 <div className="flex justify-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">N</div>
                    <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">Obs</div>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;