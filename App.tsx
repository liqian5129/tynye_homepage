
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UsageScenarios from './components/UsageScenarios';
import Features from './components/Features';
import DataSecurity from './components/DataSecurity';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RouterProvider, useRouter } from './contexts/RouterContext';

const PageContent = () => {
  const { currentPage, navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  // Route protection
  React.useEffect(() => {
    if (currentPage === 'dashboard' && !isAuthenticated) {
      navigate('login');
    }
    if (currentPage === 'login' && isAuthenticated) {
      navigate('dashboard');
    }
  }, [currentPage, isAuthenticated, navigate]);

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <DashboardPage />
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <UsageScenarios />
        <Features />
        <HowItWorks />
        <DataSecurity />
        <Testimonials />
        <Comparison />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <LanguageProvider>
          <PageContent />
        </LanguageProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
