import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { AlertTriangle, X, Send } from 'lucide-react';

export const RequestChangesModal: React.FC = () => {
  const { 
    selectedReviewForChanges, 
    closeRequestChanges, 
    confirmRequestChanges 
  } = useMentor();

  const [selectedReason, setSelectedReason] = useState('Missing Performance / Latency Benchmarks');
  const [instructions, setInstructions] = useState('');

  if (!selectedReviewForChanges) return null;

  const review = selectedReviewForChanges;

  const reasons = [
    'Missing Performance / Latency Benchmarks',
    'Incomplete Architecture Diagram / Readme',
    'Insufficient Test Coverage (<80%)',
    'Other Technical Deficit'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmRequestChanges(
      review.id, 
      selectedReason, 
      instructions || 'Please address the specified rubric deficits and upload revised artifacts within 3 working days.'
    );
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-primary/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="request-changes-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-primary">Specify Revisions Required</h3>
                <p className="text-[11px] text-outline">{review.studentName} ({review.usn})</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeRequestChanges}
              className="p-1 rounded-lg text-outline hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-primary mb-2">Primary Revision Category:</p>
              <div className="space-y-2">
                {reasons.map((reason) => (
                  <label 
                    key={reason} 
                    className={`flex items-center space-x-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedReason === reason 
                        ? 'border-secondary bg-surface-container-low font-semibold text-primary' 
                        : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="revisionReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="text-secondary focus:ring-secondary"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="revision-instructions" className="block text-xs font-semibold text-primary mb-1.5">
                Detailed Correction Instructions:
              </label>
              <textarea
                id="revision-instructions"
                rows={4}
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Detail the exact sections, missing graphs, edge-case test runs, or architectural documentation required for resubmission..."
                className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-hidden focus:border-secondary"
              />
              <p className="text-[11px] text-outline mt-1">
                Student will receive these guidelines in their portal alongside an institutional email notification.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-surface-container-low/50 border-t border-outline-variant/30 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={closeRequestChanges}
              className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-send-change-request"
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-700 hover:bg-amber-800 text-white transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Change Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
