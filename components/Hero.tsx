import React from 'react';
import Button from './Button';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* 第一部分：全屏背景图 + 文字叠加 */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {/* 背景图片 - 请将图片放置在 public/images/hero-banner.jpg */}
        <div className="absolute inset-0">
          <img
            src="./images/hero-banner.jpg"
            alt="tynye AI Bookmark"
            className="w-full h-full object-cover"
          />
          {/* 暗色遮罩，让文字更清晰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* 文字内容 - 左下角定位 */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 md:pb-24 w-full">
            <div className="max-w-xl">
              {/* 标签 */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/20">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span>{t.hero.tag}</span>
              </div>

              {/* 主标题 - 字体缩小 */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                {t.hero.title}
              </h1>

              {/* 副标题 - 字体缩小 */}
              <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* 按钮 */}
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="md" className="shadow-lg">
                  {t.hero.ctaPrimary}
                </Button>
                <Button variant="outline" size="md" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第二部分：视频展示区 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video flex items-center justify-center group cursor-pointer">
            {/* 视频封面/占位图 - 请将图片放置在 public/images/video-cover.jpg */}
            <img
              src="./images/video-cover.jpg"
              alt="tynye AI Demo"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-gray-900/40"></div>

            {/* 播放按钮 */}
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
              </div>
              <p className="text-gray-300 font-medium tracking-widest text-xs uppercase">{t.hero.visualText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
