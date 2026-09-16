import React, { useState } from 'react';
import { useMentor } from '../context/MentorContext';
import { Student, HealthStatus, EligibilityTier } from '../types';
import { 
  Users, 
  Filter, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const StudentsPage: React.FC = () => {
  const { 
    students, 
    mentorProfile,
    reviews,
    openStudentProfile, 
    openStudentAttention,
    openReviewDetail
  } = useMentor();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedSec, setSelectedSec] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');

  // Filter students (strictly without search input, respecting backend constraint)
  const filteredStudents = students.filter((s) => {
    if (selectedStatus !== 'All' && s.status !== selectedStatus) return false;
    if (selectedSec !== 'All' && s.sec !== selectedSec) return false;
    if (selectedTrack !== 'All' && s.track !== selectedTrack) return false;
    if (selectedTier !== 'All' && s.eligibility !== selectedTier) return false;
    return true;
  });

  const onTrackCount = students.filter(s => s.status === 'On Track').length;
  const attentionCount = students.filter(s => s.status === 'Needs Attention' || s.status === 'At Risk').length;
  const superDreamCount = students.filter(s => s.eligibility === 'Tier-1 Super Dream').length;

  const tracks = [
    'Core Software Placement',
    'Higher Studies / GATE',
    'Research & Capstone'
  ];

  const statusPills: Record<HealthStatus, string> = {
    'On Track': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Needs Attention': 'bg-amber-100 text-amber-800 border-amber-200',
    'At Risk': 'bg-rose-100 text-rose-800 border-rose-200',
    'On Leave': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const tierBadges: Record<EligibilityTier, string> = {
    'Tier-1 Super Dream': 'bg-purple-100 text-purple-900 border-purple-200',
    'Tier-1 Standard': 'bg-blue-100 text-blue-900 border-blue-200',
    'Core Eligible': 'bg-teal-100 text-teal-900 border-teal-200'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-heading font-bold text-primary tracking-tight">
              Assigned Mentees & Placement Cohort
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold">
              {students.length} of {mentorProfile.menteesCapacity} Maximum
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Oversee your 28 assigned mentees across Class VII-A and VII-B. Access academic records, roadmap completions, and placement verification dossiers.
          </p>
        </div>

        {/* Status Highlights */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
            <span className="text-[10px] text-outline block uppercase font-semibold">On Track</span>
            <span className="font-heading font-bold text-emerald-700 text-base">{onTrackCount}</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
            <span className="text-[10px] text-outline block uppercase font-semibold">Needs Attention</span>
            <span className="font-heading font-bold text-amber-800 text-base">{attentionCount}</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
            <span className="text-[10px] text-outline block uppercase font-semibold">Super Dream</span>
            <span className="font-heading font-bold text-purple-900 text-base">{superDreamCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs font-heading font-semibold text-outline">
            <Filter className="w-4 h-4 text-secondary" />
            <span>Filter By:</span>
          </div>

          {/* Status Filter */}
          <select
            id="filter-student-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Health Statuses</option>
            <option value="On Track">On Track</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="At Risk">At Risk</option>
            <option value="On Leave">On Leave</option>
          </select>

          {/* Section Filter */}
          <select
            id="filter-student-sec"
            value={selectedSec}
            onChange={(e) => setSelectedSec(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Sections</option>
            <option value="VII-A">Section VII-A</option>
            <option value="VII-B">Section VII-B</option>
          </select>

          {/* Track Filter */}
          <select
            id="filter-student-track"
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Career Tracks</option>
            {tracks.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Tier Filter */}
          <select
            id="filter-student-tier"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-secondary"
          >
            <option value="All">All Placement Tiers</option>
            <option value="Tier-1 Super Dream">Tier-1 Super Dream</option>
            <option value="Tier-1 Standard">Tier-1 Standard</option>
            <option value="Core Eligible">Core Eligible</option>
          </select>
        </div>

        <div className="text-xs text-outline">
          Showing <strong>{filteredStudents.length}</strong> of {students.length} assigned mentees
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 border-b border-outline-variant/30 text-[11px] font-heading font-bold text-outline uppercase tracking-wider">
                <th className="py-3.5 px-5">Student / USN</th>
                <th className="py-3.5 px-5">Track & Section</th>
                <th className="py-3.5 px-5">CGPA & Tier</th>
                <th className="py-3.5 px-5">Roadmap Progress</th>
                <th className="py-3.5 px-5">Aptitude & DSA</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const studentPendingRev = reviews.find(r => r.studentId === student.id && r.status === 'pending');
                  return (
                    <tr 
                      key={student.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      {/* Name and USN */}
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <button
                              onClick={() => openStudentProfile(student)}
                              className="font-heading font-bold text-primary hover:text-secondary text-xs text-left"
                            >
                              {student.name}
                            </button>
                            <div className="text-[11px] text-outline font-mono mt-0.5">
                              {student.usn}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Track and Sec */}
                      <td className="py-4 px-5">
                        <p className="font-semibold text-primary">{student.track}</p>
                        <span className="text-[11px] text-outline">Section {student.sec}</span>
                      </td>

                      {/* CGPA & Tier */}
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-2">
                          <span className="font-heading font-bold text-primary text-sm">
                            {student.cgpa.toFixed(2)}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tierBadges[student.eligibility]}`}>
                            {student.eligibility.replace('Tier-1 ', '')}
                          </span>
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="py-4 px-5 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-primary">{student.progress}%</span>
                          <span className="text-outline">Roadmap</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              student.progress >= 80 
                                ? 'bg-emerald-600' 
                                : student.progress >= 60 
                                ? 'bg-secondary' 
                                : 'bg-amber-600'
                            }`}
                            style={{ width: `${student.progress}%` }} 
                          />
                        </div>
                      </td>

                      {/* Aptitude & DSA */}
                      <td className="py-4 px-5">
                        <div className="text-[11px] text-on-surface">
                          <span>Aptitude: <strong className="text-primary">{student.aptitudeScore}%</strong></span>
                          <span className="mx-1.5">•</span>
                          <span>DSA: <strong className="text-primary">{student.dsaSolved}</strong></span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold ${statusPills[student.status]}`}>
                          {student.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          {student.status === 'Needs Attention' || student.status === 'At Risk' ? (
                            <button
                              onClick={() => openStudentAttention(student)}
                              title="Inspect Attention Alert"
                              className="p-1.5 rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          ) : null}

                          {studentPendingRev && (
                            <button
                              onClick={() => openReviewDetail(studentPendingRev)}
                              title="Audit Pending Submission"
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-primary text-white hover:bg-primary-container transition-colors"
                            >
                              Audit (1)
                            </button>
                          )}

                          <button
                            onClick={() => openStudentProfile(student)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-outline-variant text-primary hover:bg-surface-container transition-colors"
                          >
                            Dossier
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-outline text-xs">
                    No mentees found matching your selected filters.
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
