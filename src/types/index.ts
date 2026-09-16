export type HealthStatus = 'On Track' | 'Needs Attention' | 'At Risk' | 'On Leave';

export type EligibilityTier = 'Tier-1 Super Dream' | 'Tier-1 Standard' | 'Core Eligible';

export type ReviewType = 
  | 'Capstone Project' 
  | 'GATE Prep' 
  | 'Coding Assessment' 
  | 'Resume / Portfolio' 
  | 'Internship Report';

export type ReviewStatus = 'pending' | 'changes' | 'approved';

export type ReviewPriority = 'urgent' | 'normal';

export interface StudentSubmission {
  id: string;
  title: string;
  type: ReviewType;
  status: 'Approved' | 'Pending Review' | 'Changes Requested';
  date: string;
  size?: string;
  notes: string;
  link?: string;
  score?: string;
}

export interface StudentMentorReview {
  id: string;
  phase: string;
  date: string;
  recommendation: string;
  remarks: string;
  actionItem?: string;
}

export interface StudentAuditLogItem {
  id: string;
  event: string;
  timestamp: string;
  detail: string;
}

export interface Student {
  id: number;
  name: string;
  usn: string;
  sec: string;
  track: string;
  progress: number;
  status: HealthStatus;
  cgpa: number;
  eligibility: EligibilityTier;
  pendingReviewsCount: number;
  lastActivity: string;
  email: string;
  phone: string;
  dsaSolved: number;
  aptitudeScore: number;
  attendance: number;
  backlogs: number;
  targetCompanyTier: string;
  submissions?: StudentSubmission[];
  mentorReviews?: StudentMentorReview[];
  auditLog?: StudentAuditLogItem[];
  attentionReason?: string;
}

export interface ReviewItem {
  id: string;
  studentId: number;
  studentName: string;
  usn: string;
  program: string;
  avatar: string;
  reviewType: ReviewType;
  priority: ReviewPriority;
  title: string;
  description: string;
  subDate: string;
  dueDate: string;
  dueHoursText?: string;
  status: ReviewStatus;
  studentNotes: string;
  attachmentName: string;
  attachmentSize?: string;
  attachmentType?: 'pdf' | 'repo' | 'json';
  grade?: string;
  mentorFeedback?: string;
  revisionReason?: string;
  revisionInstructions?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'submission' | 'attention' | 'system' | 'deadline';
  read: boolean;
  relatedUsn?: string;
  relatedReviewId?: string;
  details?: string;
}

export interface ActivityStreamItem {
  id: string;
  timeAgo: string;
  text: string;
  highlightText?: string;
  type: 'submission' | 'approval' | 'system' | 'checkin' | 'revision';
}

export interface MentorProfile {
  name: string;
  salutation: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  avatarUrl: string;
  menteesCapacity: number;
  assignedCount: number;
}
