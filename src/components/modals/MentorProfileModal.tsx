import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { User, X, Mail, Phone, MapPin, Clock, Award, Shield, CheckCircle2 } from 'lucide-react';

export const MentorProfileModal: React.FC = () => {
  const { 
    isMentorProfileModalOpen, 
    closeMentorProfileModal, 
    mentorProfile,
    students,
    pendingReviewsCount
  } = useMentor();

  if (!isMentorProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="mentor-profile-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Banner */}
        <div className="bg-primary p-6 text-white relative">
          <button
            onClick={closeMentorProfileModal}
            className="absolute top-4 right-4 p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-primary font-heading font-bold text-2xl flex items-center justify-center shadow-lg">
              KR
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-primary-fixed block">
                Faculty Senior Mentor
              </span>
              <h2 className="text-xl font-heading font-bold text-white mt-0.5">{mentorProfile.name}</h2>
              <p className="text-xs text-white/80 mt-0.5">{mentorProfile.title} • {mentorProfile.department}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-on-surface">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <span className="text-[10px] text-outline uppercase font-semibold block">Mentee Allocation</span>
              <span className="text-base font-heading font-bold text-primary mt-1 block">
                {students.length} / {mentorProfile.menteesCapacity} Students
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">2 Open Slots Available</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <span className="text-[10px] text-outline uppercase font-semibold block">Review Queue Status</span>
              <span className="text-base font-heading font-bold text-primary mt-1 block">
                {pendingReviewsCount} Pending Audits
              </span>
              <span className="text-[10px] text-secondary font-medium">Average turnaround: 1.4 days</span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-outline shrink-0" />
              <div>
                <span className="text-outline block text-[11px]">Faculty Chamber</span>
                <span className="font-semibold text-primary">{mentorProfile.office}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-outline shrink-0" />
              <div>
                <span className="text-outline block text-[11px]">Official Mentorship Office Hours</span>
                <span className="font-semibold text-primary">{mentorProfile.officeHours}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-outline shrink-0" />
              <div>
                <span className="text-outline block text-[11px]">Official Institutional Email</span>
                <span className="font-semibold text-primary">{mentorProfile.email}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-outline shrink-0" />
              <div>
                <span className="text-outline block text-[11px]">Department Extension</span>
                <span className="font-semibold text-primary">{mentorProfile.phone}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start space-x-3">
            <Shield className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <div className="text-[11px] text-blue-950 leading-relaxed">
              <strong>Placement Cell Roles:</strong> Designated Tier-1 Super Dream Evaluator for Department of Computer Science & Engineering. Authorized to certify capstone milestone transcripts and placement clearance.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-low/50 border-t border-outline-variant/30 flex justify-end">
          <button
            onClick={closeMentorProfileModal}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
