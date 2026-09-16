import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Users, X, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';

export const CohortDrilldownModal: React.FC = () => {
  const { 
    isCohortDrilldownOpen, 
    closeCohortDrilldown, 
    cohortDrilldownTier, 
    students,
    openStudentProfile 
  } = useMentor();

  if (!isCohortDrilldownOpen || !cohortDrilldownTier) return null;

  const filteredStudents = students.filter(s => {
    if (cohortDrilldownTier === 'Tier-1') return s.eligibility === 'Tier-1 Super Dream';
    if (cohortDrilldownTier === 'Tier-2') return s.eligibility === 'Tier-1 Standard';
    if (cohortDrilldownTier === 'Remediation') return s.status === 'Needs Attention' || s.status === 'At Risk';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="cohort-drilldown-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
      >
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-primary">
                Cohort Breakdown: {cohortDrilldownTier}
              </h3>
              <p className="text-xs text-outline">{filteredStudents.length} Students in this category</p>
            </div>
          </div>

          <button
            onClick={closeCohortDrilldown}
            className="p-1 text-outline hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-2">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => {
                closeCohortDrilldown();
                openStudentProfile(student);
              }}
              className="p-3 rounded-xl border border-outline-variant/30 hover:border-secondary hover:bg-surface-container-low cursor-pointer transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-container text-white font-bold text-xs flex items-center justify-center">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-heading font-bold text-primary">{student.name}</span>
                    <span className="text-[10px] font-mono text-outline">{student.usn}</span>
                    <span className="text-[10px] text-outline font-medium">Sec {student.sec}</span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{student.track}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-right">
                <div>
                  <span className="text-xs font-bold text-primary block">CGPA {student.cgpa.toFixed(2)}</span>
                  <span className="text-[10px] text-outline">{student.progress}% progress</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-outline" />
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-surface-container-low/50 border-t border-outline-variant/30 flex justify-end">
          <button
            onClick={closeCohortDrilldown}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
