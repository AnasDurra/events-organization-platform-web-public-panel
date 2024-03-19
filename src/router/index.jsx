import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../components/features/org profiles/ProfilePage';
import TeamPage from '../components/features/org profiles/TeamPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/org', element: <ProfilePage /> },
      { path: '/members', element: <TeamPage /> },
    ],
  },
]);
