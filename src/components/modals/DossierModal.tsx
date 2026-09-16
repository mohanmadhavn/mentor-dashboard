import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { AlertCircle, X, ShieldAlert, CheckCircle2, User, Send, FileSpreadsheet } from 'lucide-react';

export const DossierModal: React.FC = () => {
  const { 
    isDossierModalOpen, 
    closeDossierModal, 
    selectedDossierStudent, 
    openStudentProfile,
    showToast,
    dismissAttention
  } = useMentor();

  const [interventionNote, setInterventionNote] = useState('');

  if (!isDossierModalOpen || !selectedDossierStudent) return null;

  const student = selectedDossierStudent;

  const handleSaveIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Intervention Logged', `Intervention plan for ${student.name} logged into CSE Department Academic Remediation register.`);
    closeDossierModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="dossier-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-primary">
                Academic Remediation Dossier
              </h3>
              <p className="text-xs text-outline">{student.name} • {student.usn} ({student.sec})</p>
            </div>
          </div>

          <button
            onClick={closeDossierModal}
            className="p-1 text-outline hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveIntervention} className="p-6 space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
            <span className="font-semibold block mb-1">Identified Academic Risk Deficit:</span>
            {student.attentionReason || student.lastActivity}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-outline block text-[11px]">Cumulative CGPA</span>
              <span className="font-bold text-primary text-sm">{student.cgpa.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-outline block text-[11px]">Placement Aptitude Score</span>
              <span className="font-bold text-primary text-sm">{student.aptitudeScore}%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              Faculty Intervention & Remediation Plan:
            </label>
            <textarea
              rows={3}
              required
              value={interventionNote}
              onChange={(e) => setInterventionNote(e.target.value)}
              placeholder="Specify remediation milestones (e.g., Mandatory DSA lab mentoring on Fridays, re-test on Compiler Design)..."
              className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => {
                closeDossierModal();
                openStudentProfile(student);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-secondary hover:bg-surface-container transition-colors flex items-center space-x-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Open Complete Profile</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={closeDossierModal}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-outline hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Intervention</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
