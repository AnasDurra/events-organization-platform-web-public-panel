import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import ConfigOrgPage from '../features/org profiles/ConfigOrgPage';
import ProfilePage from '../features/org profiles/ProfilePage';
import TeamPage from '../features/org profiles/TeamPage';
import EditFormPage from '../features/dynamic forms/EditFormPage';
import FormLayout from '../features/dynamic forms/FormLayout';
import ErrorPage from '../pages/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/org/:orgId', element: <ProfilePage /> },
      { path: '/org/:orgId/config', element: <ConfigOrgPage /> },
      { path: '/members', element: <TeamPage /> },
    ],
  },
  {
    path: '/form',
    element: <FormLayout />,
    children: [
      {
        path: 'edit',
        element: <EditFormPage />,
      },
    ],
  },
]);
