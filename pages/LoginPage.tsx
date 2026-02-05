import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../contexts/RouterContext';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/Button';
import { Mail, Lock, Loader2, ArrowLeft, Smartphone } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Determine the identifier based on authMethod
    const identifier = authMethod === 'email' ? email : phone;
    await login(identifier);
    setLoading(false);
    navigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center text-gray-500 hover:text-gray-900 mb-8 mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? t.auth.loginTitle : t.auth.registerTitle}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? t.auth.noAccount : t.auth.hasAccount}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-medium text-brand-600 hover:text-brand-500"
          >
            {isLogin ? t.auth.toggleLogin : t.auth.toggleRegister}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Auth Method Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200 ${
                authMethod === 'email' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.auth.useEmail}
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200 ${
                authMethod === 'phone' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.auth.usePhone}
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {authMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.auth.email}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required={authMethod === 'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.auth.placeholderEmail}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t.auth.phone}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required={authMethod === 'phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.auth.placeholderPhone}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.auth.password}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-3 border"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center py-3" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t.auth.loggingIn}
                  </>
                ) : (
                  isLogin ? t.auth.signIn : t.auth.signUp
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                WeChat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;