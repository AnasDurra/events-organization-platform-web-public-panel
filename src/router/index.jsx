import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import RegisterAttendee from '../features/Attendees Profiles/RegisterAttendee';
import ShowAttendeProfile from '../features/Attendees Profiles/ShowAttendeProfile';
import ShowMyProfile from '../features/Attendees Profiles/ShowMyProfile';
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
import ShowAttendeeEvents from '../features/Attendees Profiles/ShowAttendeeEvents';
import ShowEventAttendees from '../features/Manage Events (org)/ShowEventAttendees';
import BlockedUsersPage from '../features/ban/BlockedUsersPage';
import NotFound from '../pages/notFound';
import FollowersList from '../features/org profiles/FollowersList';
import ShowFollowingOrgsList from '../features/Attendees Profiles/ShowFollowingOrgsList';

export const router = createBrowserRouter([
    {
        path: '/not-found',
        element: <NotFound />,
    },
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
                path: '/attendee/my-profile',
                element: <ShowMyProfile />,
            },
            {
                path: '/attendee/my-profile/events',
                element: <ShowAttendeeEvents />,
            },
            {
                //edit this
                path: '/attendee/my-profile/organizations',
                element: <ShowAttendeeEvents />,
            },
            {
                path: '/attendee-profile/:id',
                element: <ShowAttendeProfile />,
            },
            {
                path: '/attendee-profile/:id/organizations',
                element: <ShowFollowingOrgsList />,
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
                    {
                        path: 'show/:id/attendees',
                        element: <ShowEventAttendees />,
                    },
                ],
            },
            {
                path: '/org/blocklist',
                element: <BlockedUsersPage />,
            },

            { path: '/org/:orgId', element: <ProfilePage /> },
            {
                path: '/org/:orgId/followers-list',
                element: <FollowersList />,
            },
            { path: '/org/:orgId/config', element: <ConfigOrgPage /> },

            { path: '/members', element: <TeamPage /> },

            { path: '/forms', element: <ViewFormsPage /> },
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
    {
        path: '/form/:form_id/submit',
        element: <SubmitForm />,
    },
]);
