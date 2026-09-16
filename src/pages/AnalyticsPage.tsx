import React from 'react';
import { useMentor } from '../context/MentorContext';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  BarChart3, 
  ShieldCheck, 
  ChevronRight,
  FileText,
  User
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { 
    students, 
    reviews, 
    pendingReviewsCount,
    openExportReportModal,
    openCohortDrilldown,
    openDossierModal,
    openStudentProfile
  } = useMentor();

  const attentionStudents = students.filter(s => s.status === 'Needs Attention' || s.status === 'At Risk');
  const superDreamStudents = students.filter(s => s.eligibility === 'Tier-1 Super Dream');
  const tier1StandardStudents = students.filter(s => s.eligibility === 'Tier-1 Standard');

  const superDreamPct = ((superDreamStudents.length / students.length) * 100).toFixed(1);
  const tier1StandardPct = ((tier1StandardStudents.length / students.length) * 100).toFixed(1);
  const remediationPct = ((attentionStudents.length / students.length) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-heading font-bold text-primary tracking-tight">
              Placement Analytics & Cohort Intelligence
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold">
              CSE Dept • Class of 2025
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Aggregate telemetry across your 28 assigned mentees: recruitment tier readiness, milestone completion velocity, and institutional placement benchmarks.
          </p>
        </div>

        <button
          onClick={openExportReportModal}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Mentor Summary Report</span>
        </button>
      </div>

      {/* 4 High-Level Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-outline uppercase tracking-wider">
              Cohort Readiness
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-heading font-bold text-primary">78.5%</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            +4.2% above CSE department baseline
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-outline uppercase tracking-wider">
              Turnaround Velocity
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-heading font-bold text-primary">1.4 Days</div>
          <p className="text-[11px] text-secondary font-medium mt-1">
            Compliant with &lt; 2.0 days university SLA
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-outline uppercase tracking-wider">
              Milestone Completion
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-heading font-bold text-primary">84.2%</div>
          <p className="text-[11px] text-purple-900 font-medium mt-1">
            23 of 28 mentees completed Phase II
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-amber-300/80 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-amber-900 uppercase tracking-wider">
              Remediation Action Items
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-heading font-bold text-amber-950">4 Students</div>
          <p className="text-[11px] text-amber-800 font-medium mt-1">
            Urgent diagnostic check-ins required
          </p>
        </div>

      </div>

      {/* Mid Section: Readiness Distribution & Milestone Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Readiness Distribution (Clickable bars!) */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-bold text-primary">
                Student Placement Readiness Distribution
              </h3>
              <p className="text-xs text-outline mt-0.5">Click any category to inspect cohort roster</p>
            </div>
            <span className="text-xs text-outline font-mono">N = 28</span>
          </div>

          <div className="space-y-4 pt-1">
            
            {/* Tier-1 Super Dream */}
            <div 
              onClick={() => openCohortDrilldown('Tier-1')}
              className="p-3 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-heading font-bold text-purple-950">
                  Tier-1 Super Dream (CTC &gt; 18 LPA)
                </span>
                <span className="font-bold text-purple-900">{superDreamStudents.length} Students ({superDreamPct}%)</span>
              </div>
              <div className="w-full bg-purple-200/60 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-700 h-full rounded-full" style={{ width: `${superDreamPct}%` }} />
              </div>
              <span className="text-[10px] text-purple-800 mt-1 block">
                Criteria: CGPA &ge; 8.50, Aptitude &ge; 85%, DSA Solved &ge; 300
              </span>
            </div>

            {/* Tier-1 Standard */}
            <div 
              onClick={() => openCohortDrilldown('Tier-2')}
              className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-heading font-bold text-blue-950">
                  Tier-1 Standard (CTC 8 - 18 LPA)
                </span>
                <span className="font-bold text-blue-900">{tier1StandardStudents.length} Students ({tier1StandardPct}%)</span>
              </div>
              <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: `${tier1StandardPct}%` }} />
              </div>
              <span className="text-[10px] text-blue-800 mt-1 block">
                Criteria: CGPA &ge; 7.50, Aptitude &ge; 70%, DSA Solved &ge; 180
              </span>
            </div>

            {/* Needs Remediation */}
            <div 
              onClick={() => openCohortDrilldown('Remediation')}
              className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-heading font-bold text-amber-950">
                  Academic Remediation & Core Placement
                </span>
                <span className="font-bold text-amber-900">{attentionStudents.length} Students ({remediationPct}%)</span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${remediationPct}%` }} />
              </div>
              <span className="text-[10px] text-amber-800 mt-1 block">
                Requires focused faculty tutoring and mock interview repeats
              </span>
            </div>

          </div>
        </div>

        {/* Milestone Velocity */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-bold text-primary">
                Placement Track Milestone Velocity
              </h3>
              <p className="text-xs text-outline mt-0.5">Faculty certification progress across 4 key phases</p>
            </div>
            <span className="text-xs text-emerald-700 font-semibold">Term II Velocity: Strong</span>
          </div>

          <div className="space-y-3.5 pt-1">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-primary">M1: Core DSA & Algorithm Foundations</span>
                <span className="text-emerald-700 font-bold">100% (28/28 Certified)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-primary">M2: Placement Resume & Portfolio Standard</span>
                <span className="text-emerald-700 font-bold">92.8% (26/28 Approved)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[92.8%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-primary">M3: Final Year Capstone Project Delivery</span>
                <span className="text-secondary font-bold">71.4% (20/28 In Progress)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-secondary h-full rounded-full w-[71.4%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-primary">M4: Mock Interview & Company Simulation</span>
                <span className="text-outline font-bold">46.4% (13/28 Scheduled)</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div className="bg-outline h-full rounded-full w-[46.4%]" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Immediate Attention Table with Remediation Dossier Modal Triggers */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-primary">
                Students Needing Immediate Academic Attention
              </h3>
              <p className="text-xs text-outline">Priority list requiring faculty intervention</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
            {attentionStudents.length} Active Flags
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 border-b border-outline-variant/30 text-[11px] font-heading font-bold text-outline uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Attention Trigger / Deficit</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Aptitude</th>
                <th className="py-3 px-4">Roadmap Progress</th>
                <th className="py-3 px-4 text-right">Intervention Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs">
              {attentionStudents.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => openStudentProfile(s)}
                      className="font-heading font-bold text-primary hover:text-secondary text-left block"
                    >
                      {s.name}
                    </button>
                    <span className="text-[11px] text-outline font-mono">{s.usn} ({s.sec})</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <span className="text-amber-900 font-medium leading-relaxed block">
                      {s.attentionReason || s.lastActivity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-primary">
                    {s.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-primary">
                    {s.aptitudeScore}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-primary">{s.progress}%</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openDossierModal(s)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors shadow-xs inline-flex items-center space-x-1"
                    >
                      <span>Open Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Benchmarks Comparison */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center space-x-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-secondary" />
          <h3 className="text-sm font-heading font-bold text-primary">
            Institutional Placement Benchmarks (CSE Department vs Your Cohort)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/30">
            <span className="text-outline block text-[11px]">Department Avg CGPA</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-heading font-bold text-primary">8.32</span>
              <span className="text-[11px] text-emerald-700 font-semibold">(vs 8.14 Dept Avg)</span>
            </div>
            <p className="text-[10px] text-outline mt-1">Cohort performs in the top 15th percentile</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/30">
            <span className="text-outline block text-[11px]">Aptitude Test Clearance</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-heading font-bold text-primary">85.7%</span>
              <span className="text-[11px] text-emerald-700 font-semibold">(vs 82.1% Dept Avg)</span>
            </div>
            <p className="text-[10px] text-outline mt-1">24 of 28 students cleared round-1 screening</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/30">
            <span className="text-outline block text-[11px]">Super Dream Eligibility Ratio</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-heading font-bold text-primary">50.0%</span>
              <span className="text-[11px] text-emerald-700 font-semibold">(vs 42.0% Dept Avg)</span>
            </div>
            <p className="text-[10px] text-outline mt-1">14 students qualified for 18+ LPA campus drives</p>
          </div>
        </div>
      </div>

    </div>
  );
};
