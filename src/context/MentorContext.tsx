import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  Student, 
  ReviewItem, 
  NotificationItem, 
  ActivityStreamItem, 
  MentorProfile 
} from '../types';
import { 
  initialMentorProfile, 
  initialStudents, 
  initialReviews, 
  initialNotifications, 
  initialActivities 
} from '../data/mockData';

export type NavigationTab = 'dashboard' | 'students' | 'reviews' | 'analytics';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}

interface MentorContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  mentorProfile: MentorProfile;
  students: Student[];
  reviews: ReviewItem[];
  notifications: NotificationItem[];
  activities: ActivityStreamItem[];
  unreadNotifsCount: number;
  pendingReviewsCount: number;
  studentsNeedingAttentionCount: number;
  activeStudentsCount: number;
  toast: ToastMessage | null;
  clearToast: () => void;
  showToast: (type: 'success' | 'warning' | 'info', title: string, message: string) => void;

  // Modal State Triggers
  selectedReviewForDetail: ReviewItem | null;
  openReviewDetail: (review: ReviewItem) => void;
  closeReviewDetail: () => void;

  selectedReviewForApprove: ReviewItem | null;
  openApproveConfirm: (review: ReviewItem) => void;
  closeApproveConfirm: () => void;
  confirmApproveReview: (reviewId: string, grade?: string, feedback?: string) => void;

  selectedReviewForChanges: ReviewItem | null;
  openRequestChanges: (review: ReviewItem) => void;
  closeRequestChanges: () => void;
  confirmRequestChanges: (reviewId: string, reason: string, instructions: string) => void;

  selectedStudentForProfile: Student | null;
  openStudentProfile: (student: Student) => void;
  closeStudentProfile: () => void;

  selectedStudentForAttention: Student | null;
  openStudentAttention: (student: Student) => void;
  closeStudentAttention: () => void;
  dismissAttention: (studentId: number) => void;
  sendMenteeReminder: (studentId: number, note?: string) => void;

  selectedNotification: NotificationItem | null;
  openNotificationDetail: (notif: NotificationItem) => void;
  closeNotificationDetail: () => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;

  isMentorProfileModalOpen: boolean;
  openMentorProfileModal: () => void;
  closeMentorProfileModal: () => void;

  isExportReportModalOpen: boolean;
  openExportReportModal: () => void;
  closeExportReportModal: () => void;

  isCohortDrilldownOpen: boolean;
  cohortDrilldownTier: string | null;
  openCohortDrilldown: (tier: string) => void;
  closeCohortDrilldown: () => void;

  isDossierModalOpen: boolean;
  selectedDossierStudent: Student | null;
  openDossierModal: (student: Student) => void;
  closeDossierModal: () => void;

  addMentorAssessmentNote: (studentId: number, recommendation: string, remarks: string, actionItem?: string) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [mentorProfile] = useState<MentorProfile>(initialMentorProfile);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activities, setActivities] = useState<ActivityStreamItem[]>(initialActivities);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Modal States
  const [selectedReviewForDetail, setSelectedReviewForDetail] = useState<ReviewItem | null>(null);
  const [selectedReviewForApprove, setSelectedReviewForApprove] = useState<ReviewItem | null>(null);
  const [selectedReviewForChanges, setSelectedReviewForChanges] = useState<ReviewItem | null>(null);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [selectedStudentForAttention, setSelectedStudentForAttention] = useState<Student | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [isMentorProfileModalOpen, setIsMentorProfileModalOpen] = useState(false);
  const [isExportReportModalOpen, setIsExportReportModalOpen] = useState(false);
  const [isCohortDrilldownOpen, setIsCohortDrilldownOpen] = useState(false);
  const [cohortDrilldownTier, setCohortDrilldownTier] = useState<string | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [selectedDossierStudent, setSelectedDossierStudent] = useState<Student | null>(null);

  const showToast = (type: 'success' | 'warning' | 'info', title: string, message: string) => {
    setToast({ id: Date.now().toString(), type, title, message });
  };

  const clearToast = () => setToast(null);

  const unreadNotifsCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  const pendingReviewsCount = useMemo(() => reviews.filter(r => r.status === 'pending').length, [reviews]);
  const studentsNeedingAttentionCount = useMemo(() => students.filter(s => s.status === 'Needs Attention' || s.status === 'At Risk').length, [students]);
  const activeStudentsCount = useMemo(() => students.filter(s => s.status !== 'On Leave').length, [students]);

  // Review Operations
  const openReviewDetail = (review: ReviewItem) => {
    setSelectedReviewForDetail(review);
  };

  const closeReviewDetail = () => {
    setSelectedReviewForDetail(null);
  };

  const openApproveConfirm = (review: ReviewItem) => {
    setSelectedReviewForApprove(review);
  };

  const closeApproveConfirm = () => {
    setSelectedReviewForApprove(null);
  };

  const confirmApproveReview = (reviewId: string, grade = 'Grade: A', feedback = 'Approved with satisfactory benchmark metrics.') => {
    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          status: 'approved',
          grade,
          mentorFeedback: feedback
        };
      }
      return r;
    }));

    // Update matched student
    const matchedRev = reviews.find(r => r.id === reviewId);
    if (matchedRev) {
      setStudents(prev => prev.map(s => {
        if (s.id === matchedRev.studentId) {
          const updatedSubmissions = s.submissions?.map(sub => {
            if (sub.title.toLowerCase().includes(matchedRev.title.toLowerCase().substring(0, 15)) || sub.type === matchedRev.reviewType) {
              return { ...sub, status: 'Approved' as const, score: grade };
            }
            return sub;
          });
          return {
            ...s,
            pendingReviewsCount: Math.max(0, s.pendingReviewsCount - 1),
            submissions: updatedSubmissions
          };
        }
        return s;
      }));

      // Add to activity stream
      const newActivity: ActivityStreamItem = {
        id: `act-${Date.now()}`,
        timeAgo: 'Just now',
        text: `You approved ${matchedRev.studentName}'s ${matchedRev.title} submission with ${grade}.`,
        highlightText: matchedRev.studentName,
        type: 'approval'
      };
      setActivities(prev => [newActivity, ...prev]);
    }

    closeApproveConfirm();
    closeReviewDetail();
    showToast('success', 'Submission Certified', `Review for ${matchedRev?.studentName || 'student'} approved & logged into placement transcript.`);
  };

  const openRequestChanges = (review: ReviewItem) => {
    setSelectedReviewForChanges(review);
  };

  const closeRequestChanges = () => {
    setSelectedReviewForChanges(null);
  };

  const confirmRequestChanges = (reviewId: string, reason: string, instructions: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          status: 'changes',
          revisionReason: reason,
          revisionInstructions: instructions
        };
      }
      return r;
    }));

    const matchedRev = reviews.find(r => r.id === reviewId);
    if (matchedRev) {
      setStudents(prev => prev.map(s => {
        if (s.id === matchedRev.studentId) {
          const updatedSubmissions = s.submissions?.map(sub => {
            if (sub.title.toLowerCase().includes(matchedRev.title.toLowerCase().substring(0, 15)) || sub.type === matchedRev.reviewType) {
              return { ...sub, status: 'Changes Requested' as const, notes: `Revision requested: ${reason}` };
            }
            return sub;
          });
          return {
            ...s,
            pendingReviewsCount: Math.max(0, s.pendingReviewsCount - 1),
            submissions: updatedSubmissions
          };
        }
        return s;
      }));

      const newActivity: ActivityStreamItem = {
        id: `act-${Date.now()}`,
        timeAgo: 'Just now',
        text: `You requested revisions from ${matchedRev.studentName} (${reason}).`,
        highlightText: matchedRev.studentName,
        type: 'revision'
      };
      setActivities(prev => [newActivity, ...prev]);
    }

    closeRequestChanges();
    closeReviewDetail();
    showToast('warning', 'Revisions Requested', `Change request dispatched to ${matchedRev?.studentName || 'student'} with technical guidelines.`);
  };

  // Student Profile
  const openStudentProfile = (student: Student) => {
    setSelectedStudentForProfile(student);
  };

  const closeStudentProfile = () => {
    setSelectedStudentForProfile(null);
  };

  // Student Attention
  const openStudentAttention = (student: Student) => {
    setSelectedStudentForAttention(student);
  };

  const closeStudentAttention = () => {
    setSelectedStudentForAttention(null);
  };

  const dismissAttention = (studentId: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: 'On Track',
          attentionReason: undefined
        };
      }
      return s;
    }));
    closeStudentAttention();
    showToast('info', 'Status Updated', 'Student removed from high-priority attention list.');
  };

  const sendMenteeReminder = (studentId: number, note?: string) => {
    const student = students.find(s => s.id === studentId);
    showToast('success', 'Reminder Logged', `Official placement office notice dispatched to ${student?.name || 'mentee'} via email.`);
    closeStudentAttention();
  };

  // Notification Operations
  const openNotificationDetail = (notif: NotificationItem) => {
    setSelectedNotification(notif);
    markNotificationRead(notif.id);
  };

  const closeNotificationDetail = () => {
    setSelectedNotification(null);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('info', 'Notifications Read', 'All mentor notifications marked as read.');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Mentor Profile Modal
  const openMentorProfileModal = () => setIsMentorProfileModalOpen(true);
  const closeMentorProfileModal = () => setIsMentorProfileModalOpen(false);

  // Export Report Modal
  const openExportReportModal = () => setIsExportReportModalOpen(true);
  const closeExportReportModal = () => setIsExportReportModalOpen(false);

  // Cohort Drilldown Modal
  const openCohortDrilldown = (tier: string) => {
    setCohortDrilldownTier(tier);
    setIsCohortDrilldownOpen(true);
  };
  const closeCohortDrilldown = () => {
    setIsCohortDrilldownOpen(false);
    setCohortDrilldownTier(null);
  };

  // Dossier Modal
  const openDossierModal = (student: Student) => {
    setSelectedDossierStudent(student);
    setIsDossierModalOpen(true);
  };
  const closeDossierModal = () => {
    setIsDossierModalOpen(false);
    setSelectedDossierStudent(null);
  };

  // Add Assessment Note
  const addMentorAssessmentNote = (studentId: number, recommendation: string, remarks: string, actionItem?: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newReview = {
          id: `mr-${Date.now()}`,
          phase: "Mentor Faculty Audit",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          recommendation,
          remarks,
          actionItem
        };
        return {
          ...s,
          mentorReviews: [newReview, ...(s.mentorReviews || [])]
        };
      }
      return s;
    }));
    showToast('success', 'Assessment Recorded', 'Faculty mentor evaluation saved into student institutional dossier.');
  };

  return (
    <MentorContext.Provider value={{
      currentTab,
      setCurrentTab,
      mentorProfile,
      students,
      reviews,
      notifications,
      activities,
      unreadNotifsCount,
      pendingReviewsCount,
      studentsNeedingAttentionCount,
      activeStudentsCount,
      toast,
      clearToast,
      showToast,

      selectedReviewForDetail,
      openReviewDetail,
      closeReviewDetail,

      selectedReviewForApprove,
      openApproveConfirm,
      closeApproveConfirm,
      confirmApproveReview,

      selectedReviewForChanges,
      openRequestChanges,
      closeRequestChanges,
      confirmRequestChanges,

      selectedStudentForProfile,
      openStudentProfile,
      closeStudentProfile,

      selectedStudentForAttention,
      openStudentAttention,
      closeStudentAttention,
      dismissAttention,
      sendMenteeReminder,

      selectedNotification,
      openNotificationDetail,
      closeNotificationDetail,
      markAllNotificationsRead,
      markNotificationRead,

      isMentorProfileModalOpen,
      openMentorProfileModal,
      closeMentorProfileModal,

      isExportReportModalOpen,
      openExportReportModal,
      closeExportReportModal,

      isCohortDrilldownOpen,
      cohortDrilldownTier,
      openCohortDrilldown,
      closeCohortDrilldown,

      isDossierModalOpen,
      selectedDossierStudent,
      openDossierModal,
      closeDossierModal,

      addMentorAssessmentNote,
    }}>
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const context = useContext(MentorContext);
  if (!context) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
};
