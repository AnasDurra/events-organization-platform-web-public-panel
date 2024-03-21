import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../components/features/org profiles/ProfilePage';
import TeamPage from '../components/features/org profiles/TeamPage';
import ConfigOrgPage from '../components/features/org profiles/ConfigOrgPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/org/:orgId', element: <ProfilePage /> },
      { path: '/org/:orgId/config', element: <ConfigOrgPage /> },
      { path: '/members', element: <TeamPage /> },
    ],
  },
]);
