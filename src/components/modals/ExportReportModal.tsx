import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { FileText, X, Download, Check, FileSpreadsheet } from 'lucide-react';

export const ExportReportModal: React.FC = () => {
  const { 
    isExportReportModalOpen, 
    closeExportReportModal, 
    mentorProfile,
    students,
    reviews,
    showToast 
  } = useMentor();

  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');
  const [includeAssessments, setIncludeAssessments] = useState(true);
  const [includeSubmissions, setIncludeSubmissions] = useState(true);

  if (!isExportReportModalOpen) return null;

  const handleDownload = () => {
    showToast(
      'success', 
      'Report Exported', 
      `SJCE Mentor Summary Report (${format.toUpperCase()}) compiled for ${mentorProfile.name}. File saved.`
    );
    closeExportReportModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="export-report-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-primary">Export Placement Report</h3>
              <p className="text-xs text-outline">{mentorProfile.name} • {mentorProfile.department}</p>
            </div>
          </div>
          <button
            onClick={closeExportReportModal}
            className="p-1 text-outline hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-primary block mb-2">Export Document Format:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-colors ${
                  format === 'pdf' 
                    ? 'border-primary bg-surface-container-low font-semibold text-primary' 
                    : 'border-outline-variant/30 text-outline hover:bg-surface-container-low/50'
                }`}
              >
                <FileText className="w-5 h-5 text-secondary" />
                <div>
                  <span className="block font-bold">PDF Dossier</span>
                  <span className="text-[10px] text-outline font-normal">Official Placement Format</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-colors ${
                  format === 'csv' 
                    ? 'border-primary bg-surface-container-low font-semibold text-primary' 
                    : 'border-outline-variant/30 text-outline hover:bg-surface-container-low/50'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="block font-bold">CSV Data Table</span>
                  <span className="text-[10px] text-outline font-normal">Spreadsheet & CGPA list</span>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-outline-variant/20">
            <label className="font-semibold text-primary block mb-1.5">Include in Export:</label>
            <label className="flex items-center space-x-2 text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={includeAssessments}
                onChange={(e) => setIncludeAssessments(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Faculty Mentor Assessment Notes & Action Items</span>
            </label>
            <label className="flex items-center space-x-2 text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={includeSubmissions}
                onChange={(e) => setIncludeSubmissions(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Milestone Submissions, Ratings & Audit Dates</span>
            </label>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-outline text-[11px] leading-relaxed">
            Report includes all <strong>{students.length} mentees</strong>, current recruitment eligibility status, and completed verification signatures.
          </div>
        </div>

        <div className="px-6 py-4 bg-surface-container-low/50 border-t border-outline-variant/30 flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeExportReportModal}
            className="px-4 py-2 rounded-lg text-xs font-medium text-outline hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
