import React, { useState } from 'react';
import { useMentor } from '../context/MentorContext';
import { ReviewType, ReviewStatus } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Filter, 
  ExternalLink,
  ChevronRight,
  User,
  ShieldCheck
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { 
    reviews, 
    students,
    openReviewDetail, 
    openApproveConfirm, 
    openStudentProfile 
  } = useMentor();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedType !== 'All' && r.reviewType !== selectedType) return false;
    if (selectedStatus !== 'All') {
      if (selectedStatus === 'Pending' && r.status !== 'pending') return false;
      if (selectedStatus === 'Changes' && r.status !== 'changes') return false;
      if (selectedStatus === 'Approved' && r.status !== 'approved') return false;
    }
    if (selectedPriority !== 'All') {
      if (selectedPriority === 'Urgent' && r.priority !== 'urgent') return false;
      if (selectedPriority === 'Normal' && r.priority !== 'normal') return false;
    }
    return true;
  });

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const changesCount = reviews.filter(r => r.status === 'changes').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;

  const reviewTypes: ReviewType[] = [
    'Capstone Project',
    'GATE Prep',
    'Coding Assessment',
    'Resume / Portfolio',
    'Internship Report'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header Banner */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-heading font-bold text-primary tracking-tight">
              Submission & Milestone Reviews
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary text-white font-semibold">
              {pendingCount} Pending Verification
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Verify academic deliverables, algorithmic benchmarks, and industrial certifications submitted by your 28 assigned mentees.
          </p>
        </div>

        {/* Counter Summary Pills */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setSelectedStatus('All')}
            className={`px-3 py-1.5 rounded-xl border font-medium transition-colors ${
              selectedStatus === 'All' 
                ? 'bg-primary text-white border-primary shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setSelectedStatus('Pending')}
            className={`px-3 py-1.5 rounded-xl border font-medium transition-colors ${
              selectedStatus === 'Pending' 
                ? 'bg-primary text-white border-primary shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setSelectedStatus('Changes')}
            className={`px-3 py-1.5 rounded-xl border font-medium transition-colors ${
              selectedStatus === 'Changes' 
                ? 'bg-amber-700 text-white border-amber-700 shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            Changes ({changesCount})
          </button>
          <button
            onClick={() => setSelectedStatus('Approved')}
            className={`px-3 py-1.5 rounded-xl border font-medium transition-colors ${
              selectedStatus === 'Approved' 
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Strictly conforming: no student search input) */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs font-heading font-semibold text-outline">
            <Filter className="w-4 h-4 text-secondary" />
            <span>Filter By:</span>
          </div>

          {/* Type Filter */}
          <select
            id="filter-review-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Deliverable Types</option>
            {reviewTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            id="filter-review-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Audit</option>
            <option value="Changes">Changes Requested</option>
            <option value="Approved">Certified / Approved</option>
          </select>

          {/* Priority Filter */}
          <select
            id="filter-review-priority"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Urgencies</option>
            <option value="Urgent">Urgent (&lt; 24h)</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div className="text-xs text-outline">
          Showing <strong>{filteredReviews.length}</strong> of {reviews.length} total submissions
        </div>

      </div>

      {/* Reviews Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 border-b border-outline-variant/30 text-[11px] font-heading font-bold text-outline uppercase tracking-wider">
                <th className="py-3.5 px-5">Mentee</th>
                <th className="py-3.5 px-5">Deliverable & Track</th>
                <th className="py-3.5 px-5">Submission Date</th>
                <th className="py-3.5 px-5">Audit Deadline</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => {
                  const student = students.find(s => s.id === review.studentId);
                  return (
                    <tr 
                      key={review.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      {/* Student Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-primary-container text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                            {review.avatar}
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                if (student) openStudentProfile(student);
                              }}
                              className="font-heading font-bold text-primary hover:text-secondary text-xs text-left"
                            >
                              {review.studentName}
                            </button>
                            <div className="flex items-center space-x-1 text-[11px] text-outline mt-0.5">
                              <span className="font-mono">{review.usn}</span>
                              <span>•</span>
                              <span>{review.program}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Deliverable Info */}
                      <td className="py-4 px-5 max-w-xs">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant inline-block mb-1">
                          {review.reviewType}
                        </span>
                        <p className="font-semibold text-primary line-clamp-1 leading-snug">
                          {review.title}
                        </p>
                        <p className="text-[11px] text-outline line-clamp-1 mt-0.5">
                          {review.description}
                        </p>
                      </td>

                      {/* Sub Date */}
                      <td className="py-4 px-5 text-outline text-[11px] whitespace-nowrap">
                        {review.subDate}
                      </td>

                      {/* Deadline */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          {review.priority === 'urgent' && (
                            <Clock className="w-3.5 h-3.5 text-error shrink-0" />
                          )}
                          <span className={`text-[11px] font-medium ${
                            review.priority === 'urgent' ? 'text-error font-semibold' : 'text-on-surface-variant'
                          }`}>
                            {review.dueDate}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {review.status === 'pending' && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary text-white font-semibold">
                            Pending Audit
                          </span>
                        )}
                        {review.status === 'changes' && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold">
                            Changes Requested
                          </span>
                        )}
                        {review.status === 'approved' && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1 w-max">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approved {review.grade ? `(${review.grade})` : ''}</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openReviewDetail(review)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs"
                          >
                            Audit
                          </button>

                          {review.status === 'pending' && (
                            <button
                              onClick={() => openApproveConfirm(review)}
                              title="Quick Approve Submission"
                              className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {student && (
                            <button
                              onClick={() => openStudentProfile(student)}
                              title="View Mentee Full Dossier"
                              className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                            >
                              <User className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-outline text-xs">
                    No submissions found matching your selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
