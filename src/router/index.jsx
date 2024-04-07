import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import ConfigOrgPage from '../features/org profiles/ConfigOrgPage';
import ProfilePage from '../features/org profiles/ProfilePage';
import TeamPage from '../features/org profiles/TeamPage';
import EditFormPage from '../features/dynamic forms/EditFormPage';
import ErrorPage from '../pages/error-page';
import RegisterAttendee from '../features/Attendees Profiles/RegisterAttendee';
import ShowAttendeProfile from '../features/Attendees Profiles/ShowAttendeProfile';
import LoginPage from '../pages/loginPage';
import CreateEvent from '../features/Manage Events (org)/CreateEvent';
import ShowEvent from '../features/Manage Events (org)/ShowEvent';
import ViewFormsPage from '../features/dynamic forms/ViewFormsPage';
import FormLayout from '../features/dynamic forms/components/FormLayout';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterAttendee />,
    },
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/attende-profile',
                element: <ShowAttendeProfile />,
            },
            {
                path: '/event',
                children: [
                    {
                        path: 'create',
                        element: <CreateEvent />,
                    },
                    {
                        path: 'show/:id',
                        element: <ShowEvent />,
                    },
                ],
            },
            { path: '/org/:orgId', element: <ProfilePage /> },
            { path: '/org/:orgId/config', element: <ConfigOrgPage /> },
            { path: '/members', element: <TeamPage /> },
            { path: '/forms/:organization_id', element: <ViewFormsPage /> },
        ],
    },
    {
        path: '/form/:form_id/',
        element: <FormLayout />,
        children: [
            {
                path: 'edit',
                element: <EditFormPage />,
            },
        ],
    },
]);
