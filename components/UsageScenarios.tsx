import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Library, Trees, Coffee } from 'lucide-react';

// 静态场景图片 - 本地图片路径
// 请将图片放置在 public/images/ 目录下
const SCENARIO_IMAGES = {
  study: './images/scenario-study.jpg',      // 书房/学习场景
  library: './images/scenario-library.jpg',  // 图书馆场景
  garden: './images/scenario-garden.jpg',    // 花园/户外场景
  cafe: './images/scenario-cafe.jpg',        // 咖啡馆场景
};

interface ScenarioCardProps {
  title: string;
  desc: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, desc, imageUrl, icon: Icon }) => {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-xl aspect-video bg-gray-50 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-100">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        loading="lazy"
      />

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
      imageUrl: SCENARIO_IMAGES.study,
    },
    {
      ...t.scenarios.items[1],
      icon: Library,
      imageUrl: SCENARIO_IMAGES.library,
    },
    {
      ...t.scenarios.items[2],
      icon: Trees,
      imageUrl: SCENARIO_IMAGES.garden,
    },
    {
      ...t.scenarios.items[3],
      icon: Coffee,
      imageUrl: SCENARIO_IMAGES.cafe,
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
