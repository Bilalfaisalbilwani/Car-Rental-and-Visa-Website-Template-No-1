import React from 'react';
import { NavigationPage } from '../types';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-[80vh] pt-32 pb-24 bg-[#102C2B] text-[#F7F1E7] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <Compass className="w-16 h-16 text-[#D7BC8A] mx-auto animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-mono">
          ERROR 404 · PAGE NOT LOCATED
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#F7F1E7]">
          Destination Undefined
        </h1>
        <p className="text-xs sm:text-sm text-[#F7F1E7]/70 font-light leading-relaxed">
          The route you are navigating does not exist within our Dubai portal. Please return to our curated travel or fleet sections.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => onNavigate('car-rental')}
            className="px-6 py-3 bg-[#193D38] border border-[#D7BC8A]/30 text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:border-[#D7BC8A] transition-colors"
          >
            Explore Fleet
          </button>
        </div>
      </div>
    </div>
  );
};
