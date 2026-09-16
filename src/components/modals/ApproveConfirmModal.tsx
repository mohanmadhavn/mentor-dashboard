import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const ApproveConfirmModal: React.FC = () => {
  const { 
    selectedReviewForApprove, 
    closeApproveConfirm, 
    confirmApproveReview 
  } = useMentor();

  if (!selectedReviewForApprove) return null;

  const review = selectedReviewForApprove;

  const handleConfirm = () => {
    confirmApproveReview(review.id, 'Grade: A', 'Approved by faculty mentor. Ready for placement verification.');
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-primary/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="approve-confirm-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-heading font-bold text-primary">Certify & Approve Submission</h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            Are you sure you want to approve <strong className="text-on-surface">{review.studentName}</strong>'s submission:
          </p>

          <div className="my-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs">
            <p className="font-semibold text-primary">{review.title}</p>
            <p className="text-[11px] text-outline mt-0.5">{review.usn} • {review.reviewType}</p>
          </div>

          <div className="text-xs text-outline leading-relaxed bg-surface-container/50 p-2.5 rounded-lg">
            This action registers the completion credit in the university placement ledger and marks the review requirement as satisfied.
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={closeApproveConfirm}
              className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              id="btn-confirm-approve"
              onClick={handleConfirm}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Approve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
