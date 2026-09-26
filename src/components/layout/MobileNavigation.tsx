import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, User, Scissors } from 'lucide-react';
import { useBooking } from '../../state/BookingContext';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { appointments } = useBooking();
  const upcomingCount = appointments.filter((a) => a.status === 'upcoming').length;

  const isCurrentActive = (path: string) => {
    if (path === '/services') {
      return location.pathname === '/' || location.pathname.startsWith('/services');
    }
    if (path === '/booking/stylist') {
      return location.pathname.startsWith('/booking');
    }
    return location.pathname.startsWith(path);
  };

  const tabs = [
    { label: 'Dịch vụ', path: '/services', icon: Sparkles },
    { label: 'Đặt lịch', path: '/booking/stylist', icon: Scissors },
    { label: 'Lịch hẹn', path: '/appointments', icon: Calendar, badge: upcomingCount > 0 ? upcomingCount : undefined },
    { label: 'Tài khoản', path: '/account', icon: User },
  ];

  return (
    <nav aria-label="Điều hướng chính" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border/70 py-1.5 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isCurrentActive(tab.path);
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-11 py-1 px-3 rounded-lg transition-colors relative ${
                active ? 'text-terracotta' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.2]' : 'stroke-[1.7]'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 text-[9px] w-3.5 h-3.5 rounded-full bg-terracotta text-white flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 tracking-tight ${active ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
