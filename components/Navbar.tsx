import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Menu, X, Globe, User as UserIcon, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { t, language, setLanguage } = useLanguage();
  const { navigate, currentPage } = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigate('home');
      // Wait for navigation to happen before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('home');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              tynye<span className="text-brand-600">.</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick('features')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{t.nav.features}</button>
            <button onClick={() => handleNavClick('comparison')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{t.nav.compare}</button>
            <button onClick={() => handleNavClick('how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{t.nav.howItWorks}</button>
            <button onClick={() => handleNavClick('pricing')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{t.nav.pricing}</button>
            
            <div className="h-5 w-px bg-gray-200 mx-2"></div>

            <button 
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'EN' : '中'}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <span>{user?.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 animate-fade-in">
                    <button 
                      onClick={() => { navigate('dashboard'); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t.nav.dashboard}
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('login')}
              >
                {t.nav.login}
              </Button>
            )}

            {!isAuthenticated && (
              <Button size="sm">{t.nav.preorder}</Button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full h-screen">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { handleNavClick('features'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">{t.nav.features}</button>
            <button onClick={() => { handleNavClick('comparison'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">{t.nav.compare}</button>
            <button onClick={() => { handleNavClick('how-it-works'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">{t.nav.howItWorks}</button>
            <button onClick={() => { handleNavClick('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">{t.nav.pricing}</button>
            
            {isAuthenticated ? (
               <>
                <button onClick={() => { navigate('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-brand-600 border-b border-gray-50">{t.nav.dashboard}</button>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-red-500">{t.nav.logout}</button>
               </>
            ) : (
               <button onClick={() => { navigate('login'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-4 text-lg font-medium text-gray-600 border-b border-gray-50">{t.nav.login}</button>
            )}
            
            <div className="pt-8 px-3">
              <Button className="w-full text-lg py-3">{t.nav.preorder}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;