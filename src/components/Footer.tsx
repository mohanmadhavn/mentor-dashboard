import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-outline space-y-2 sm:space-y-0">
        <div>
          <span className="font-semibold text-primary">SJCE Placement & Career Guidance Center</span>
          <span className="mx-2">•</span>
          <span>JSS Science and Technology University, Mysuru - 570006</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span>Faculty Portal v3.4.2</span>
          <span>•</span>
          <span>Academic Year 2024-25</span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">System Online</span>
        </div>
      </div>
    </footer>
  );
};
