import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useBooking } from '../../state/BookingContext';

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { appointments } = useBooking();

  const upcomingCount = appointments.filter((a) => a.status === 'upcoming').length;

  const navItems = [
    { label: 'Dịch vụ', path: '/services' },
    { label: 'Đặt lịch', path: '/booking/stylist' },
    { label: 'Lịch hẹn', path: '/appointments', badge: upcomingCount > 0 ? upcomingCount : undefined },
    { label: 'Tài khoản', path: '/account' },
  ];

  const isCurrentActive = (path: string) => {
    if (path === '/services') {
      return location.pathname === '/' || location.pathname.startsWith('/services');
    }
    if (path === '/booking/stylist') {
      return location.pathname.startsWith('/booking');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-border/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity / Logo */}
          <Link
            to="/services"
            className="flex items-center gap-3.5 group"
            aria-label="Sol Hair Studio Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-soft-surface border border-border/80 flex items-center justify-center p-1 group-hover:border-terracotta/40 transition-colors">
              <img
                src="/sol-logo.png"
                alt="Sol Hair Studio Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.22em] text-lg sm:text-xl font-medium text-text-primary uppercase whitespace-nowrap group-hover:text-terracotta transition-colors">
                Sol Hair Studio
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.28em] text-text-muted uppercase font-sans -mt-0.5">
                Beauty Shines Within
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm tracking-wide font-medium transition-colors ${
                    active
                      ? 'text-terracotta font-semibold'
                      : 'text-text-primary hover:text-terracotta'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="inline-flex items-center justify-center text-[10px] w-4 h-4 rounded-full bg-terracotta text-white font-sans font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-terracotta rounded-full transition-all duration-300" />
                  )}
                </NavLink>
              );
            })}

            {/* Profile Avatar Quick Action */}
            <div className="pl-3 ml-2 border-l border-border/70">
              <Link
                to="/account"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  location.pathname === '/account'
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-border/80 bg-soft-surface text-text-secondary hover:border-terracotta/40 hover:text-text-primary'
                }`}
                title="Tài khoản cá nhân"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              to="/account"
              aria-label="Tài khoản cá nhân"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border bg-soft-surface text-text-secondary"
            >
              <User className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg text-text-primary hover:bg-soft-surface"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-b border-border bg-canvas px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const active = isCurrentActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'bg-terracotta/10 text-terracotta font-semibold'
                    : 'text-text-primary hover:bg-soft-surface'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-terracotta text-white font-sans font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border/60">
            <Link
              to="/booking/stylist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 bg-terracotta text-white rounded-xl font-medium tracking-wide text-sm shadow-sm hover:bg-terracotta-dark transition-colors"
            >
              Đặt lịch hẹn ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
