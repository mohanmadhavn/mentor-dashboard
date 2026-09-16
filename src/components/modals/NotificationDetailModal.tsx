import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Bell, X, ExternalLink, ArrowRight } from 'lucide-react';

export const NotificationDetailModal: React.FC = () => {
  const { 
    selectedNotification, 
    closeNotificationDetail, 
    students, 
    reviews, 
    openStudentProfile, 
    openReviewDetail,
    setCurrentTab
  } = useMentor();

  if (!selectedNotification) return null;

  const notif = selectedNotification;

  const handleAction = () => {
    closeNotificationDetail();
    if (notif.relatedReviewId) {
      const rev = reviews.find(r => r.id === notif.relatedReviewId);
      if (rev) {
        openReviewDetail(rev);
        return;
      }
    }
    if (notif.relatedUsn) {
      const student = students.find(s => s.usn === notif.relatedUsn);
      if (student) {
        openStudentProfile(student);
        return;
      }
    }
    setCurrentTab('reviews');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="notification-detail-modal"
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-primary">{notif.title}</h3>
                <span className="text-[11px] text-outline font-mono">{notif.timestamp}</span>
              </div>
            </div>
            <button
              onClick={closeNotificationDetail}
              className="p-1 text-outline hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface leading-relaxed">
            <p className="font-semibold text-primary mb-1">{notif.subtitle}</p>
            <p className="text-on-surface-variant">{notif.details || notif.subtitle}</p>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={closeNotificationDetail}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-outline hover:bg-surface-container transition-colors"
            >
              Dismiss
            </button>

            <button
              type="button"
              onClick={handleAction}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-xs flex items-center space-x-1"
            >
              <span>Inspect Submission / Record</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
