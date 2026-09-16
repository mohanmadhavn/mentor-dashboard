import React from 'react';
import { useMentor } from '../context/MentorContext';
import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    mentorProfile, 
    students, 
    reviews, 
    pendingReviewsCount, 
    studentsNeedingAttentionCount, 
    activeStudentsCount,
    activities,
    setCurrentTab,
    openReviewDetail,
    openApproveConfirm,
    openStudentAttention,
    openStudentProfile,
    openExportReportModal
  } = useMentor();

  const pendingReviews = reviews.filter(r => r.status === 'pending').slice(0, 4);
  const attentionStudents = students.filter(s => s.status === 'Needs Attention' || s.status === 'At Risk').slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-heading font-bold text-primary tracking-tight">
              Dashboard Overview
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Term II Active
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
            Welcome back, {mentorProfile.name}. You are currently overseeing <strong>{students.length} assigned mentees</strong>. 
            There are <strong className="text-primary">{pendingReviewsCount} submissions pending audit</strong> and <strong className="text-amber-800">{studentsNeedingAttentionCount} students</strong> flagged for academic/placement attention.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setCurrentTab('reviews')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-container text-primary hover:bg-surface-container-high transition-colors flex items-center space-x-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>Review Queue</span>
          </button>

          <button
            id="btn-dashboard-export-report"
            onClick={openExportReportModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Placement Summary</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Mentees */}
        <div 
          onClick={() => setCurrentTab('students')}
          className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-secondary cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-outline uppercase tracking-wider">
              Total Mentees
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-heading font-bold text-primary">{students.length}</span>
            <span className="text-xs text-outline">/ {mentorProfile.menteesCapacity} capacity</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-2">
            2 mentor slots available for allocation
          </p>
        </div>

        {/* Active Students */}
        <div 
          onClick={() => setCurrentTab('students')}
          className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-secondary cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-outline uppercase tracking-wider">
              Active in Placement
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-heading font-bold text-primary">{activeStudentsCount}</span>
            <span className="text-xs text-outline">students</span>
          </div>
          <p className="text-[11px] text-outline mt-2">
            2 students on approved medical / VTU sports leave
          </p>
        </div>

        {/* Students Needing Attention */}
        <div 
          onClick={() => setCurrentTab('students')}
          className="bg-surface-container-lowest p-5 rounded-2xl border border-amber-300/80 bg-amber-50/20 hover:border-amber-500 cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-amber-900 uppercase tracking-wider">
              Needs Attention
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-heading font-bold text-amber-950">{studentsNeedingAttentionCount}</span>
            <span className="text-xs text-amber-800">flagged</span>
          </div>
          <p className="text-[11px] text-amber-800 font-medium mt-2">
            Aptitude scores below 65% or capstone overdue
          </p>
        </div>

        {/* Pending Reviews */}
        <div 
          onClick={() => setCurrentTab('reviews')}
          className="bg-surface-container-lowest p-5 rounded-2xl border border-primary/20 hover:border-primary cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-primary uppercase tracking-wider">
              Pending Reviews
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-heading font-bold text-primary">{pendingReviewsCount}</span>
            <span className="text-xs text-outline">submissions</span>
          </div>
          <p className="text-[11px] text-secondary font-medium mt-2">
            2 deliverables with deadlines &lt; 24h
          </p>
        </div>

      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Pending Reviews Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-heading font-bold text-primary">Pending Reviews Queue</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white font-semibold">
                {pendingReviewsCount}
              </span>
            </div>
            <button
              onClick={() => setCurrentTab('reviews')}
              className="text-xs text-secondary hover:underline font-semibold flex items-center space-x-1"
            >
              <span>View All Submissions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingReviews.length > 0 ? (
              pendingReviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 hover:border-secondary transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-container text-white font-heading font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span 
                            onClick={() => {
                              const s = students.find(st => st.id === review.studentId);
                              if (s) openStudentProfile(s);
                            }}
                            className="text-xs font-heading font-bold text-primary hover:underline cursor-pointer"
                          >
                            {review.studentName}
                          </span>
                          <span className="text-[10px] font-mono text-outline">({review.usn})</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                            {review.reviewType}
                          </span>
                        </div>

                        <h3 className="text-xs font-heading font-semibold text-primary mt-1">
                          {review.title}
                        </h3>

                        <p className="text-[11px] text-outline mt-0.5 line-clamp-1">
                          {review.description}
                        </p>

                        <div className="flex items-center space-x-3 text-[10px] text-outline mt-2">
                          <span>Submitted: <strong className="text-on-surface">{review.subDate}</strong></span>
                          <span>•</span>
                          <span>Deadline: <strong className="text-on-surface">{review.dueDate}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Review Item Actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-2 shrink-0">
                      {review.priority === 'urgent' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                          Urgent
                        </span>
                      )}
                      <button
                        onClick={() => openReviewDetail(review)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs"
                      >
                        Audit
                      </button>
                      <button
                        onClick={() => openApproveConfirm(review)}
                        title="Quick Approve"
                        className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 text-center text-outline text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                All pending mentor reviews cleared! You're up to date.
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Attention & Activity */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Immediate Mentee Attention */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <h3 className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  Immediate Mentee Attention
                </h3>
              </div>
              <span className="text-[11px] text-outline font-semibold">
                {attentionStudents.length} Flagged
              </span>
            </div>

            <div className="divide-y divide-outline-variant/20">
              {attentionStudents.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => openStudentAttention(s)}
                  className="py-2.5 flex items-start justify-between gap-2 hover:bg-surface-container-low/50 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-heading font-bold text-primary">{s.name}</span>
                      <span className="text-[10px] font-mono text-outline">{s.usn}</span>
                    </div>
                    <p className="text-[11px] text-amber-900 mt-0.5 line-clamp-1 font-medium">
                      {s.attentionReason || s.lastActivity}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-outline shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentTab('students')}
              className="w-full text-center text-xs text-secondary font-semibold hover:underline pt-1 block"
            >
              View All Mentee Academic Records →
            </button>
          </div>

          {/* Recent Mentorship Activity Stream */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                Recent Mentorship Activity
              </h3>
              <span className="text-[10px] text-emerald-700 font-medium">Live Audit Log</span>
            </div>

            <div className="relative pl-5 border-l-2 border-outline-variant/30 space-y-3.5">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="relative">
                  <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface-container-lowest" />
                  <p className="text-xs text-on-surface leading-snug">
                    {act.highlightText && (
                      <strong className="text-primary font-semibold mr-1">{act.highlightText}</strong>
                    )}
                    {act.text.replace(act.highlightText || '', '')}
                  </p>
                  <span className="text-[10px] text-outline mt-0.5 block">{act.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
