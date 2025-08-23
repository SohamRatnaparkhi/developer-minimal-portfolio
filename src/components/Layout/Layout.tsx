import React from 'react';
import DesktopNav from '../Navigation/DesktopNav';
import MobileNav from '../Navigation/MobileNav';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/useTheme';
import ScrollQuickLinks from '@/components/Navigation/ScrollQuickLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navigation */}
      {!isMobile && (
        <DesktopNav isDark={isDark} toggleTheme={toggleTheme} />
      )}
      
      {/* Main Content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}

      {/* Floating Scroll-To-Top and Quick Links */}
      <ScrollQuickLinks />
    </div>
  );
};

export default Layout;