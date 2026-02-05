import React from 'react';
import { Check, X, Smartphone, PenTool, BookOpen } from 'lucide-react';
import { ComparisonRow } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Comparison: React.FC = () => {
  const { t } = useLanguage();

  // Data mapped to the PDF structure (9 rows)
  const rowsData: Omit<ComparisonRow, 'feature'>[] = [
    { lowin: true, scanner: true, phone: false },   // One-click Record
    { lowin: true, scanner: false, phone: true },   // Note Categorization
    { lowin: true, scanner: false, phone: true },   // AI Search & Voice
    { lowin: true, scanner: false, phone: false },  // AI Reading Companion
    { lowin: true, scanner: false, phone: false },  // Weekly Reports
    { lowin: true, scanner: false, phone: true },   // Multi-modal Input
    { lowin: true, scanner: true, phone: true },    // Export
    { lowin: true, scanner: false, phone: false },  // Ultra-thin
    { lowin: true, scanner: false, phone: false },  // Distraction-free
  ];

  return (
    <section id="comparison" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.comparison.title}</h2>
          <p className="text-lg text-gray-600">{t.comparison.subtitle}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-6 px-8 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider w-1/3">{t.comparison.col1}</th>
                  <th className="py-6 px-4 text-center w-1/5">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mb-3 text-brand-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="text-brand-900 font-bold text-lg">{t.comparison.col2}</span>
                    </div>
                  </th>
                  <th className="py-6 px-4 text-center w-1/5">
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 text-gray-500">
                        <PenTool className="w-6 h-6" />
                      </div>
                      <span className="text-gray-700 font-medium">{t.comparison.col3}</span>
                    </div>
                  </th>
                  <th className="py-6 px-4 text-center w-1/5">
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 text-gray-500">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <span className="text-gray-700 font-medium">{t.comparison.col4}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {t.comparison.rows.map((featureText, index) => {
                   const row = rowsData[index];
                   return (
                    <tr key={index} className={`transition-colors hover:bg-gray-50/50 ${row.lowin ? 'bg-brand-50/10' : ''}`}>
                      <td className="py-5 px-8 text-gray-700 font-medium">{featureText}</td>
                      <td className="py-5 px-4 text-center">
                        {row.lowin ? (
                          <Check className="w-6 h-6 text-brand-600 mx-auto" strokeWidth={3} />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {row.scanner ? (
                          <Check className="w-6 h-6 text-gray-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {row.phone ? (
                          <Check className="w-6 h-6 text-gray-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;