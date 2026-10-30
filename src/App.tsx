import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicyModal, CookieSettingsModal, CookiePreferences } from './components/LegalModals';

const COOKIE_STORAGE_KEY = 'by_siedina_cookie_consent';

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: false,
};

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
        setShowCookieBanner(false);
      } else {
        // Показываем баннер через небольшую паузу для плавности
        const timer = setTimeout(() => setShowCookieBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptAllCookies = () => {
    const allEnabled: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    setPreferences(allEnabled);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(allEnabled));
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }
    setShowCookieBanner(false);
  };

  const handleSaveCookiePreferences = (newPrefs: CookiePreferences) => {
    setPreferences(newPrefs);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }
    setShowCookieBanner(false);
  };

  return (
    <div className="bg-[#140F17] text-[#EDE4EA] font-kanit selection:bg-white/20 selection:text-white" style={{ overflowX: 'clip' }}>
      {/* 1. ГЛАВНЫЙ ЭКРАН */}
      <HeroSection />

      {/* 2. БЕГУЩАЯ СТРОКА С ФОТОГРАФИЯМИ */}
      <MarqueeSection />

      {/* 3. О НАС */}
      <AboutSection />

      {/* 4. УСЛУГИ */}
      <ServicesSection />

      {/* 5. КАТАЛОГ И ИНТЕРАКТИВНЫЙ КОНСТРУКТОР БУКЕТОВ */}
      <ProjectsSection />

      {/* 6. ПОДВАЛ И КОНТАКТЫ ПО ОБРАЗЦУ */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookies={() => setIsCookieModalOpen(true)}
      />

      {/* Всплывающий баннер файлов cookie */}
      {showCookieBanner && (
        <CookieBanner
          onAcceptAll={handleAcceptAllCookies}
          onOpenDetails={() => setIsCookieModalOpen(true)}
        />
      )}

      {/* Модальное окно политики конфиденциальности */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Модальное окно положения об использовании cookie с настройками */}
      <CookieSettingsModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        preferences={preferences}
        onSavePreferences={handleSaveCookiePreferences}
      />
    </div>
  );
}
