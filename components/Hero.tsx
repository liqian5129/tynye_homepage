import React, { useState } from 'react';
import Button from './Button';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* 主要区域：左文字 + 右图片 */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左侧：文字内容 */}
            <div className="order-2 lg:order-1">
              {/* 标签 */}
              <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span>{t.hero.tag}</span>
              </div>

              {/* 主标题 */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                {t.hero.title}
              </h1>

              {/* 副标题 */}
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                {t.hero.subtitle}
              </p>

              {/* 按钮 */}
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="md" className="shadow-lg">
                  {t.hero.ctaPrimary}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="group"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="w-4 h-4 mr-2 fill-current group-hover:text-brand-700 transition-colors" />
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>

            {/* 右侧：产品图片 */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* 装饰背景 */}
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-100 to-brand-50 rounded-3xl blur-2xl opacity-60"></div>
                {/* 图片容器 */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                  <img
                    src="./images/hero-banner.jpg"
                    alt="tynye AI Bookmark"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 视频弹窗 */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* 视频容器 */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
              {/* 视频封面 - 请将图片放置在 public/images/video-cover.jpg */}
              <img
                src="./images/video-cover.jpg"
                alt="tynye AI Demo"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

              {/* 播放按钮 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <p className="text-gray-200 font-medium tracking-widest text-sm uppercase">{t.hero.visualText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
