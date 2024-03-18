import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../components/features/org profiles/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: '/org', element: <ProfilePage /> }],
  },
]);
