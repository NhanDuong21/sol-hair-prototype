import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingProgressProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Dịch vụ', path: '/services' },
    { number: 2, label: 'Stylist', path: '/booking/stylist' },
    { number: 3, label: 'Thời gian', path: '/booking/time' },
    { number: 4, label: 'Xác nhận', path: '/booking/summary' },
  ];

  return (
    <nav aria-label="Tiến trình đặt lịch" className="w-full max-w-xl mx-auto mb-8 sm:mb-12">
      <div className="relative flex items-center justify-between">
        {/* Progress Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-border -z-0" />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-[1px] bg-terracotta transition-all duration-500 -z-0"
          style={{ width: `calc((100% - 3rem) * ${((currentStep - 1) / (steps.length - 1))})` }}
        />

        {steps.map((step) => {
          const isDone = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              {isDone ? <Link
                to={step.path}
                aria-label={`${step.label} — đã hoàn thành`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all bg-terracotta text-white"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              </Link> : <span
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={isCurrent ? `${step.label} — bước hiện tại` : `${step.label} — sắp tới`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-terracotta text-white ring-4 ring-terracotta/20 font-bold'
                    : 'bg-soft-surface text-text-muted border border-border'
                }`}
              >{step.number}</span>}
              <span
                className={`mt-1.5 text-xs tracking-wide transition-colors ${
                  isCurrent
                    ? 'text-terracotta font-semibold'
                    : isDone
                    ? 'text-text-primary'
                    : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
