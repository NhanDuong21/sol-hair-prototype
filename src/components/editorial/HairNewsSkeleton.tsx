import React from 'react';

export const HairNewsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3" aria-label="Đang tải cảm hứng tóc" aria-busy="true">
    {[0, 1, 2].map((item) => (
      <div key={item} className="animate-pulse">
        <div className="aspect-[4/3] rounded-2xl bg-soft-surface" />
        <div className="mt-5 h-3 w-32 rounded bg-soft-surface" />
        <div className="mt-3 h-6 w-11/12 rounded bg-soft-surface" />
        <div className="mt-2 h-6 w-8/12 rounded bg-soft-surface" />
        <div className="mt-4 h-4 w-full rounded bg-soft-surface" />
        <div className="mt-2 h-4 w-9/12 rounded bg-soft-surface" />
      </div>
    ))}
  </div>
);
