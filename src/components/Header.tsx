import React, { useState, useRef, useEffect } from 'react';
import { useMentor, NavigationTab } from '../context/MentorContext';
import { Bell, ChevronDown, CheckCheck, User, Calendar, FileText, Sparkles, AlertCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    mentorProfile, 
    unreadNotifsCount, 
    pendingReviewsCount,
    students,
    notifications,
    openNotificationDetail,
    markAllNotificationsRead,
    openMentorProfileModal,
    openExportReportModal
  } = useMentor();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: NavigationTab; label: string; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { 
      id: 'students', 
      label: 'Students', 
      badge: `${students.length} / ${mentorProfile.menteesCapacity}`,
      badgeColor: 'bg-surface-container-highest text-primary font-medium'
    },
    { 
      id: 'reviews', 
      label: 'Reviews', 
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Pending` : undefined,
      badgeColor: 'bg-primary text-white font-medium'
    },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Left: University Branding & Crest */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm font-bold text-lg font-heading">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-primary tracking-tight text-lg">SJCE Mysore</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                  AY 2024-25 • Term II
                </span>
              </div>
              <p className="text-xs text-outline font-sans">Placement & Career Mentorship Portal</p>
            </div>
          </div>

          <div className="h-6 w-px bg-outline-variant/40 hidden md:block"></div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Portal Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  id={`nav-tab-${item.id}`}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    isActive 
                      ? 'text-primary bg-surface-container font-semibold' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-surface-variant text-primary'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Notifications & Mentor Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications Trigger */}
          <div className="relative" ref={notifRef}>
            <button
              id="header-notif-button"
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="relative p-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors focus:outline-hidden"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-on-surface" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotifDropdownOpen && (
              <div 
                id="header-notif-dropdown"
                className="absolute right-0 mt-2 w-88 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-4 py-2.5 border-b border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading font-semibold text-sm text-primary">Notifications</span>
                    {unreadNotifsCount > 0 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-medium">
                        {unreadNotifsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      onClick={() => markAllNotificationsRead()}
                      className="text-xs text-secondary hover:underline flex items-center space-x-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/15">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        openNotificationDetail(notif);
                        setIsNotifDropdownOpen(false);
                      }}
                      className={`px-4 py-3 hover:bg-surface-container-low cursor-pointer transition-colors ${
                        !notif.read ? 'bg-surface-container-lowest font-medium' : 'opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2.5">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-secondary' : 'bg-transparent'}`} />
                          <div>
                            <p className="text-xs font-semibold text-primary leading-tight">{notif.title}</p>
                            <p className="text-[11px] text-outline mt-0.5 leading-snug">{notif.subtitle}</p>
                            <span className="text-[10px] text-outline/80 mt-1 block">{notif.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-outline-variant/20 bg-surface-container-low/50 text-center">
                  <button
                    onClick={() => {
                      setIsNotifDropdownOpen(false);
                      setCurrentTab('reviews');
                    }}
                    className="text-xs text-secondary font-medium hover:underline"
                  >
                    View All Submissions in Review Queue
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-outline-variant/40"></div>

          {/* Mentor Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              id="header-profile-menu-button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 p-1.5 pl-2.5 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-heading font-semibold text-primary leading-tight">{mentorProfile.name}</div>
                <div className="text-[11px] text-outline leading-tight">{mentorProfile.title}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center font-semibold text-xs border border-white shadow-xs">
                KR
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-outline" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div 
                id="header-profile-dropdown"
                className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-outline-variant/20">
                  <p className="text-xs font-heading font-bold text-primary">{mentorProfile.name}</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{mentorProfile.department}</p>
                  <div className="mt-2 text-[10px] px-2 py-1 bg-surface-container rounded text-primary font-medium">
                    Office: {mentorProfile.office}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      openMentorProfileModal();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center space-x-2.5"
                  >
                    <User className="w-4 h-4 text-outline" />
                    <span>Faculty Mentor Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      openMentorProfileModal();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center space-x-2.5"
                  >
                    <Calendar className="w-4 h-4 text-outline" />
                    <span>Office Hours & Mentoring Schedule</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      openExportReportModal();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center space-x-2.5"
                  >
                    <FileText className="w-4 h-4 text-outline" />
                    <span>Export Mentor Placement Summary</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 px-4 py-1.5">
                  <div className="flex items-center justify-between text-[11px] text-outline">
                    <span>Mentee Capacity</span>
                    <span className="font-semibold text-primary">{students.length} of {mentorProfile.menteesCapacity} active</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
