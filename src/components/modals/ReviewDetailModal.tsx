import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { 
  X, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck,
  Award
} from 'lucide-react';

export const ReviewDetailModal: React.FC = () => {
  const { 
    selectedReviewForDetail, 
    closeReviewDetail, 
    openApproveConfirm, 
    openRequestChanges 
  } = useMentor();

  const [mentorFeedback, setMentorFeedback] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Grade: A');

  if (!selectedReviewForDetail) return null;

  const review = selectedReviewForDetail;

  const handleAddTemplate = (text: string) => {
    setMentorFeedback(prev => prev ? `${prev} ${text}` : text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="review-detail-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/40">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-primary-container text-white font-heading font-bold flex items-center justify-center text-sm shadow-xs">
              {review.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-heading font-bold text-primary">{review.studentName}</h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-surface-container text-outline">
                  {review.usn}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  • {review.program}
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">
                Target Track: Core Placement & GATE Research
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {review.priority === 'urgent' && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-semibold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{review.dueHoursText || 'Due Today'}</span>
              </span>
            )}
            <button
              onClick={closeReviewDetail}
              className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Submission Overview */}
          <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed">
                {review.reviewType}
              </span>
              <div className="text-xs text-outline flex items-center space-x-2">
                <span>Submitted: <strong className="text-on-surface">{review.subDate}</strong></span>
                <span>•</span>
                <span>Audit Deadline: <strong className="text-on-surface">{review.dueDate}</strong></span>
              </div>
            </div>
            <h4 className="text-base font-heading font-bold text-primary">{review.title}</h4>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{review.description}</p>
          </div>

          {/* Student Notes */}
          <div>
            <h5 className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-2">
              Student Remarks & Self-Analysis
            </h5>
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface leading-relaxed">
              {review.studentNotes || "No student remarks provided."}
            </div>
          </div>

          {/* Deliverable File Attachment */}
          <div>
            <h5 className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-2">
              Submitted Artifact / Deliverable
            </h5>
            <div className="flex items-center justify-between p-3 rounded-xl border border-outline-variant/40 bg-surface-container-low/30 hover:border-secondary transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary font-mono">{review.attachmentName}</p>
                  <p className="text-[11px] text-outline mt-0.5">Size: {review.attachmentSize || '1.8 MB'} • Verified SHA256 Checksum</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.open('#', '_blank')}
                  className="px-3 py-1.5 text-xs font-medium text-secondary hover:bg-secondary-fixed/50 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
                <a
                  href={`#download-${review.attachmentName}`}
                  download
                  onClick={(e) => { e.preventDefault(); }}
                  className="px-3 py-1.5 text-xs font-medium bg-surface-container text-primary hover:bg-surface-container-high rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Audit Guidelines */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950 leading-relaxed">
              <span className="font-semibold">Placement Cell Verification Standard:</span> Submissions graded "S" or "A" fulfill prerequisite credits for Tier-1 Super Dream on-campus recruitment eligibility. Please ensure time-complexity metrics and architectural diagrams are thoroughly vetted.
            </div>
          </div>

          {/* Mentor Assessment Input Area */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="mentor-feedback-text" className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                Faculty Mentor Assessment & Remarks
              </label>
              <span className="text-[11px] text-outline">{mentorFeedback.length} / 500 characters</span>
            </div>

            {/* Quick Template Chips */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleAddTemplate("Excellent architectural breakdown and benchmark results.")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                + Excellent Benchmarks
              </button>
              <button
                type="button"
                onClick={() => handleAddTemplate("Recommended for Tier-1 Super Dream technical rounds.")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                + Tier-1 Ready
              </button>
              <button
                type="button"
                onClick={() => handleAddTemplate("Requires p99 latency evaluation under concurrent load.")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                + Add Latency Test
              </button>
              <button
                type="button"
                onClick={() => handleAddTemplate("Tighten Big-O space complexity explanation in section 3.")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                + Big-O Bounds
              </button>
            </div>

            <textarea
              id="mentor-feedback-text"
              rows={3}
              maxLength={500}
              value={mentorFeedback}
              onChange={(e) => setMentorFeedback(e.target.value)}
              placeholder="Record specific technical observations, rubric criteria met, or required revisions..."
              className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-hidden focus:border-secondary"
            />

            {/* Grade Selection */}
            <div>
              <span className="text-xs font-semibold text-primary block mb-1.5">Milestone Grading:</span>
              <div className="flex flex-wrap gap-2">
                {['Grade: S (90%+)', 'Grade: A (80%+)', 'Grade: B (70%+)', 'Grade: C (Re-eval)'].map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade.split(' ')[0] + ' ' + grade.split(' ')[1])}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      selectedGrade.startsWith(grade.split(' ')[0] + ' ' + grade.split(' ')[1])
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-surface-container-low/50 border-t border-outline-variant/30 flex items-center justify-between">
          <button
            type="button"
            onClick={closeReviewDetail}
            className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Close
          </button>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              id="btn-request-changes"
              onClick={() => openRequestChanges(review)}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-outline-variant text-primary hover:bg-surface-container transition-colors"
            >
              Request Changes
            </button>

            <button
              type="button"
              id="btn-approve-submission"
              onClick={() => openApproveConfirm(review)}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Submission</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
