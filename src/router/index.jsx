import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import RegisterAttendee from '../features/Attendees Profiles/RegisterAttendee';
import ShowAttendeProfile from '../features/Attendees Profiles/ShowAttendeProfile';
import CreateEvent from '../features/Manage Events (org)/CreateEvent';
import ShowEvent from '../features/Manage Events (org)/ShowEvent';
import EditFormPage from '../features/dynamic forms/EditFormPage';
import ViewFormsPage from '../features/dynamic forms/ViewFormsPage';
import FormLayout from '../features/dynamic forms/components/FormLayout';
import SubmitForm from '../features/dynamic forms/submission/SubmitForm';
import ConfigOrgPage from '../features/org profiles/ConfigOrgPage';
import ProfilePage from '../features/org profiles/ProfilePage';
import TeamPage from '../features/org profiles/TeamPage';
import ErrorPage from '../pages/error-page';
import LoginPage from '../pages/loginPage';
import ViewFormSubmissions from '../features/dynamic forms/submission/ViewFormSubmissions';
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

            { path: '/org', element: <ProfilePage /> },
            { path: '/org/config', element: <ConfigOrgPage /> },

            { path: '/members', element: <TeamPage /> },

            { path: '/forms', element: <ViewFormsPage /> },
        ],
    },
    {
        path: 'event/:event_id/form/:form_id/',
        children: [
            {
                path: 'edit',
                element: (
                    <FormLayout>
                        <EditFormPage />
                    </FormLayout>
                ),
            },
            {
                path: 'submit',
                element: <SubmitForm />,
            },
            {
                path: 'submissions',
                element: <ViewFormSubmissions />,
            },
        ],
    },
  
    
]);
