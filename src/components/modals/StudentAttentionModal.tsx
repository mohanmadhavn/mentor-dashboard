import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { AlertCircle, X, Bell, User, CheckCircle2 } from 'lucide-react';

export const StudentAttentionModal: React.FC = () => {
  const { 
    selectedStudentForAttention, 
    closeStudentAttention, 
    dismissAttention, 
    sendMenteeReminder,
    openStudentProfile 
  } = useMentor();

  if (!selectedStudentForAttention) return null;

  const student = selectedStudentForAttention;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="student-attention-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-primary">Mentee Attention File</h3>
                <p className="text-xs text-outline">{student.name} • {student.usn} ({student.sec})</p>
              </div>
            </div>
            <button
              onClick={closeStudentAttention}
              className="p-1 text-outline hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
            <span className="font-semibold block mb-1">Attention Trigger:</span>
            {student.attentionReason || student.lastActivity}
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
              <span className="text-[10px] text-outline uppercase font-semibold block">CGPA</span>
              <span className="text-base font-heading font-bold text-primary">{student.cgpa.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
              <span className="text-[10px] text-outline uppercase font-semibold block">Aptitude</span>
              <span className="text-base font-heading font-bold text-primary">{student.aptitudeScore}%</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
              <span className="text-[10px] text-outline uppercase font-semibold block">Progress</span>
              <span className="text-base font-heading font-bold text-primary">{student.progress}%</span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-xs text-outline">
              Recommended Intervention: Schedule an in-person diagnostic discussion during faculty office hours (Wednesday/Friday).
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => {
                closeStudentAttention();
                openStudentProfile(student);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-secondary hover:bg-surface-container transition-colors flex items-center space-x-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Full Profile</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => dismissAttention(student.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                Dismiss Flag
              </button>

              <button
                type="button"
                onClick={() => sendMenteeReminder(student.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Dispatch Notice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
