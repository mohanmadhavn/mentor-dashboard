/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MentorProvider, useMentor } from './context/MentorContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

// Modals
import { ReviewDetailModal } from './components/modals/ReviewDetailModal';
import { ApproveConfirmModal } from './components/modals/ApproveConfirmModal';
import { RequestChangesModal } from './components/modals/RequestChangesModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { StudentAttentionModal } from './components/modals/StudentAttentionModal';
import { NotificationDetailModal } from './components/modals/NotificationDetailModal';
import { MentorProfileModal } from './components/modals/MentorProfileModal';
import { CohortDrilldownModal } from './components/modals/CohortDrilldownModal';
import { DossierModal } from './components/modals/DossierModal';
import { ExportReportModal } from './components/modals/ExportReportModal';

const MainContent: React.FC = () => {
  const { currentTab } = useMentor();

  return (
    <main className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full">
      {currentTab === 'dashboard' && <DashboardPage />}
      {currentTab === 'students' && <StudentsPage />}
      {currentTab === 'reviews' && <ReviewsPage />}
      {currentTab === 'analytics' && <AnalyticsPage />}

      {/* All Application Modals Mounted Safely */}
      <ReviewDetailModal />
      <ApproveConfirmModal />
      <RequestChangesModal />
      <StudentProfileModal />
      <StudentAttentionModal />
      <NotificationDetailModal />
      <MentorProfileModal />
      <CohortDrilldownModal />
      <DossierModal />
      <ExportReportModal />

      {/* Real-time feedback toast notification */}
      <Toast />
    </main>
  );
};

export default function App() {
  return (
    <MentorProvider>
      <div className="min-h-screen flex flex-col bg-background text-on-background font-sans antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </MentorProvider>
  );
}
