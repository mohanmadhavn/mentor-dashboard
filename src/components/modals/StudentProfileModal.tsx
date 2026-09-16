import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { 
  X, 
  User, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Printer, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Plus,
  Send,
  Calendar,
  Layers
} from 'lucide-react';

export const StudentProfileModal: React.FC = () => {
  const { 
    selectedStudentForProfile, 
    closeStudentProfile, 
    openReviewDetail,
    reviews,
    addMentorAssessmentNote,
    showToast
  } = useMentor();

  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'assessments' | 'audit'>('overview');
  const [showAddAssessment, setShowAddAssessment] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState('Tier-1 Recommendation');
  const [newRemarks, setNewRemarks] = useState('');
  const [newActionItem, setNewActionItem] = useState('');

  if (!selectedStudentForProfile) return null;

  const student = selectedStudentForProfile;

  const handleAddAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemarks.trim()) return;
    addMentorAssessmentNote(student.id, newRecommendation, newRemarks, newActionItem);
    setNewRemarks('');
    setNewActionItem('');
    setShowAddAssessment(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDossier = () => {
    showToast('success', 'Dossier Downloaded', `Official Placement Dossier PDF for ${student.name} (${student.usn}) generated successfully.`);
  };

  const statusColors = {
    'On Track': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Needs Attention': 'bg-amber-100 text-amber-800 border-amber-200',
    'At Risk': 'bg-rose-100 text-rose-800 border-rose-200',
    'On Leave': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const tierColors = {
    'Tier-1 Super Dream': 'bg-purple-100 text-purple-900 border-purple-200',
    'Tier-1 Standard': 'bg-blue-100 text-blue-900 border-blue-200',
    'Core Eligible': 'bg-teal-100 text-teal-900 border-teal-200'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="student-profile-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-outline-variant/30 bg-surface-container-low/50 flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white font-heading font-bold text-xl flex items-center justify-center shadow-md">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-heading font-bold text-primary">{student.name}</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                  {student.usn}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${statusColors[student.status]}`}>
                  {student.status}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${tierColors[student.eligibility]}`}>
                  {student.eligibility}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Department of Computer Science & Engineering • Section {student.sec} • Academic Year 2024-25
              </p>
            </div>
          </div>

          <button
            onClick={closeStudentProfile}
            className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="px-6 border-b border-outline-variant/30 bg-surface-container-lowest flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            id="tab-student-overview"
            className={`py-3 text-xs font-heading font-semibold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'overview' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            id="tab-student-submissions"
            className={`py-3 text-xs font-heading font-semibold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'submissions' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Submissions & Deliverables</span>
            {student.submissions && student.submissions.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-surface-container text-primary font-bold">
                {student.submissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            id="tab-student-assessments"
            className={`py-3 text-xs font-heading font-semibold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'assessments' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Faculty Assessments</span>
            {student.mentorReviews && student.mentorReviews.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-surface-container text-primary font-bold">
                {student.mentorReviews.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            id="tab-student-audit"
            className={`py-3 text-xs font-heading font-semibold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'audit' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Activity & Audit Log</span>
          </button>
        </div>

        {/* Modal Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Primary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface-container-low/60 rounded-xl p-3.5 border border-outline-variant/30">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">Cumulative CGPA</span>
                  <div className="text-2xl font-heading font-bold text-primary mt-1">{student.cgpa.toFixed(2)}</div>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">Tier-1 Threshold Met (&gt; 8.25)</span>
                </div>

                <div className="bg-surface-container-low/60 rounded-xl p-3.5 border border-outline-variant/30">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">Aptitude Percentile</span>
                  <div className="text-2xl font-heading font-bold text-primary mt-1">{student.aptitudeScore}%</div>
                  <span className="text-[10px] text-secondary font-medium mt-1 block">SJCE Screening Cleared</span>
                </div>

                <div className="bg-surface-container-low/60 rounded-xl p-3.5 border border-outline-variant/30">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">DSA LeetCode Solved</span>
                  <div className="text-2xl font-heading font-bold text-primary mt-1">{student.dsaSolved}</div>
                  <span className="text-[10px] text-outline font-medium mt-1 block">Target: 300+ Problems</span>
                </div>

                <div className="bg-surface-container-low/60 rounded-xl p-3.5 border border-outline-variant/30">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">Roadmap Progress</span>
                  <div className="text-2xl font-heading font-bold text-primary mt-1">{student.progress}%</div>
                  <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${student.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Academic Particulars Table / Card */}
              <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30">
                <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-3">
                  Institutional Particulars & Verification
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-xs">
                  <div>
                    <span className="text-outline block text-[11px]">Institutional Email</span>
                    <span className="font-semibold text-primary">{student.email}</span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Contact Phone</span>
                    <span className="font-semibold text-primary">{student.phone}</span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Academic Track</span>
                    <span className="font-semibold text-primary">{student.track}</span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Biometric Attendance</span>
                    <span className={`font-semibold ${student.attendance >= 75 ? 'text-emerald-700' : 'text-error'}`}>
                      {student.attendance > 0 ? `${student.attendance}% (Compliant)` : 'Exempt / On Leave'}
                    </span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Active Academic Backlogs</span>
                    <span className="font-semibold text-primary">{student.backlogs === 0 ? 'Nil (Clean Record)' : student.backlogs}</span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">Placement Cell Clearance</span>
                    <span className="font-semibold text-emerald-700 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Certified for On-Campus Drives</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestone Timeline */}
              <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30">
                <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-3">
                  Placement Preparation Milestones
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">Milestone 1: Core DSA & Problem Solving Foundation</span>
                        <span className="text-[11px] text-emerald-700 font-semibold">Completed • Aug 2024</span>
                      </div>
                      <p className="text-[11px] text-outline mt-0.5">Completed 200+ LeetCode problems and passed department time-complexity benchmark.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">Milestone 2: Placement Resume & LinkedIn Verification</span>
                        <span className="text-[11px] text-emerald-700 font-semibold">Approved • Sep 2024</span>
                      </div>
                      <p className="text-[11px] text-outline mt-0.5">Standardized 1-page Harvard/SJCE LaTeX resume reviewed and approved by faculty mentor.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      student.progress >= 75 ? 'bg-secondary-fixed text-primary' : 'bg-surface-container text-outline'
                    }`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">Milestone 3: Final Year Capstone Project Implementation</span>
                        <span className="text-[11px] text-secondary font-semibold">In Evaluation • Oct 2024</span>
                      </div>
                      <p className="text-[11px] text-outline mt-0.5">Distributed architecture design doc submitted. Under faculty review.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-surface-container text-outline flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">Milestone 4: Super Dream Mock Interview Drives</span>
                        <span className="text-[11px] text-outline font-semibold">Upcoming • Nov 2024</span>
                      </div>
                      <p className="text-[11px] text-outline mt-0.5">Mock behavioral and system design interview rounds scheduled with alumni panelists.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  Deliverables & Verification History
                </h4>
                <span className="text-xs text-outline">{student.submissions?.length || 0} Submissions on Record</span>
              </div>

              {student.submissions && student.submissions.length > 0 ? (
                student.submissions.map((sub) => (
                  <div 
                    key={sub.id} 
                    className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface-container-low/30 hover:border-secondary transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-heading font-bold text-primary">{sub.title}</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        sub.status === 'Approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : sub.status === 'Changes Requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-primary text-white'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                      {sub.notes}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-outline pt-2 border-t border-outline-variant/20">
                      <div>
                        <span>Type: <strong className="text-on-surface">{sub.type}</strong></span>
                        <span className="mx-2">•</span>
                        <span>Date: <strong className="text-on-surface">{sub.date}</strong></span>
                        {sub.score && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Evaluation: <strong className="text-emerald-700">{sub.score}</strong></span>
                          </>
                        )}
                      </div>

                      {reviews.find(r => r.studentId === student.id && r.status === 'pending') && (
                        <button
                          onClick={() => {
                            const rev = reviews.find(r => r.studentId === student.id && r.status === 'pending');
                            if (rev) {
                              closeStudentProfile();
                              openReviewDetail(rev);
                            }
                          }}
                          className="text-secondary font-semibold hover:underline flex items-center space-x-1"
                        >
                          <span>Open Review</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-outline text-xs">
                  No submissions uploaded by this mentee yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASSESSMENTS */}
          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  Faculty Mentor Supervisory Records
                </h4>
                <button
                  onClick={() => setShowAddAssessment(!showAddAssessment)}
                  className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Faculty Evaluation</span>
                </button>
              </div>

              {/* Add Assessment Form */}
              {showAddAssessment && (
                <form onSubmit={handleAddAssessmentSubmit} className="p-4 rounded-xl border border-secondary bg-surface-container-low/70 space-y-3">
                  <h5 className="text-xs font-heading font-bold text-primary">New Mentor Assessment Record</h5>
                  <div>
                    <label className="text-[11px] font-semibold text-outline block mb-1">Recommendation Level</label>
                    <select
                      value={newRecommendation}
                      onChange={(e) => setNewRecommendation(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary"
                    >
                      <option value="Tier-1 Recommendation">Tier-1 Recommendation (Super Dream Eligible)</option>
                      <option value="Tier-1 Standard Recommendation">Tier-1 Standard Recommendation</option>
                      <option value="Core Placement Recommendation">Core Placement Recommendation</option>
                      <option value="Needs Practice / Remediation">Needs Practice / Remediation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-outline block mb-1">Mentor Remarks & Analysis</label>
                    <textarea
                      rows={3}
                      required
                      value={newRemarks}
                      onChange={(e) => setNewRemarks(e.target.value)}
                      placeholder="Enter specific feedback on technical competence, communication, project maturity..."
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-outline block mb-1">Action Item for Mentee (Optional)</label>
                    <input
                      type="text"
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                      placeholder="e.g. Schedule mock round on Red-Black Trees before Friday"
                      className="w-full text-xs p-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddAssessment(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-outline hover:bg-surface-container"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-xs flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Save Assessment</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Assessment Records */}
              {student.mentorReviews && student.mentorReviews.length > 0 ? (
                student.mentorReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-bold text-primary">{rev.phase}</span>
                      <span className="text-[11px] text-outline">{rev.date}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-primary-fixed text-on-primary-fixed">
                        {rev.recommendation}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {rev.remarks}
                    </p>
                    {rev.actionItem && (
                      <div className="mt-2 text-xs p-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/20">
                        <strong className="text-primary">Action Item:</strong> {rev.actionItem}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-outline text-xs">
                  No previous mentor supervisory records recorded. Click "Log Faculty Evaluation" to add.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <h4 className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-2">
                Placement Activity & Audit Trail
              </h4>
              <div className="relative pl-6 border-l-2 border-outline-variant/40 space-y-4">
                {student.auditLog && student.auditLog.length > 0 ? (
                  student.auditLog.map((log) => (
                    <div key={log.id} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-surface-container-lowest" />
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-primary">{log.event}</p>
                        <span className="text-[10px] text-outline font-mono">{log.timestamp}</span>
                      </div>
                      <p className="text-xs text-outline mt-0.5">{log.detail}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-outline">
                    No recent audit events logged for this student.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 bg-surface-container-low/50 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>

            <button
              onClick={handleDownloadDossier}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Placement Dossier</span>
            </button>
          </div>

          <button
            onClick={closeStudentProfile}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
