import React, { useState } from 'react';
import Button from './Button';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* 主要区域：两边留空，中间背景图+文字叠加 */}
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 背景图容器 */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[600px]">
            {/* 背景图片 */}
            <img
              src="./images/hero-banner.jpg"
              alt="tynye AI Bookmark"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* 暗色渐变遮罩 - 左侧更暗 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

            {/* 文字内容 - 左下角定位 */}
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 lg:p-12 w-full max-w-xl">
                {/* 标签 */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/20">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span>{t.hero.tag}</span>
                </div>

                {/* 主标题 */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                  {t.hero.title}
                </h1>

                {/* 副标题 */}
                <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
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
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    onClick={() => setShowVideo(true)}
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    {t.hero.ctaSecondary}
                  </Button>
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
