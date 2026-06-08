

import { redirect } from 'next/navigation';

export default function StudentPanelPage() {
  // This page just redirects to the main dashboard page.
  redirect('/student-panel/dashboard');
}
