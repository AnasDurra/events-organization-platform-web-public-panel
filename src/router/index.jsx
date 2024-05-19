import { createBrowserRouter } from 'react-router-dom';
import OrganizerLayout from '../features/org profiles/Layout/OrganizerLayout';
import RegisterAttendee from '../features/Attendees Profiles/RegisterAttendee';
import ShowAttendeProfile from '../features/Attendees Profiles/ShowAttendeProfile';
import ShowMyProfile from '../features/Attendees Profiles/ShowMyProfile';
import CreateEvent from '../features/Manage Events (org)/CreateEvent';
import ShowEvent from '../features/Manage Events (org)/ShowEvent';
import EditFormPage from '../features/dynamic forms/EditFormPage';
import ViewFormsPage from '../features/dynamic forms/ViewFormsPage';
import FormLayout from '../features/dynamic forms/components/FormLayout';
import SubmitForm from '../features/dynamic forms/submission/SubmitForm';
import ProfilePage from '../features/org profiles/ProfilePage';
import TeamPage from '../features/org profiles/TeamPage';
import ErrorPage from '../pages/error-page';
import LoginPage from '../pages/loginPage';
import ViewFormSubmissions from '../features/dynamic forms/submission/ViewFormSubmissions';
import ShowAttendeeEvents from '../features/Attendees Profiles/ShowAttendeeEvents';
import ShowEventAttendees from '../features/Manage Events (org)/ShowEventAttendees';
import BlockedUsersPage from '../features/ban/BlockedUsersPage';
import NotFound from '../pages/notFound';
import HomeLayout from '../features/landing/HomeLayout';
import PopularPage from '../features/landing/PopularPage';
import ExplorePage from '../features/landing/ExplorePage';
import HomePage from '../features/landing/HomePage';
import ViewOrgsPage from '../features/landing/ViewOrgsPage';
import FollowersList from '../features/org profiles/FollowersList';
import ShowFollowingOrgsList from '../features/Attendees Profiles/ShowFollowingOrgsList';
import ChatsList from '../features/chat/ChatsList';
import TicketsBalancePage from '../features/Ticketing Packages/TicketsBalancePage';
import ResultSuccessPage from '../features/Ticketing Packages/ResultSuccessPage';
import ConfigOrgPage from '../features/org profiles/configure org/ConfigOrgPage';
import ViewFollowingPage from '../features/landing/ViewFollowingPage';
import OrgAttendees from '../features/org profiles/OrgAttendees';
import OrgEvents from '../features/org profiles/OrgEvents';
import { getLoggedInUserV2 } from '../api/services/auth';
import OrgTicketsPage from '../features/Ticketing Packages/OrgTicketsPage';

const user = getLoggedInUserV2();

export const router = createBrowserRouter([
    {
        path: '/not-found',
        element: <NotFound />,
    },
    {
        path: '/payment/success',
        element: <ResultSuccessPage />,
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
        element: user?.user_role == 2 ? <OrganizerLayout /> : <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home/profile',
                element: <ShowMyProfile />,
            },
            {
                path: '/home/profile/events',
                element: <ShowAttendeeEvents />,
            },
            {
                path: '/home/profile/organizations',
                element: <ShowFollowingOrgsList />,
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
        ],
    },
    {
        path: 'form/:form_id',
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
                path: 'event/:event_id/',
                children: [
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
        ],
    },
    {
        path: 'home',
        element: <HomeLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'popular',
                element: <PopularPage />,
            },
            {
                path: 'explore',
                element: <ExplorePage />,
            },
            {
                path: 'orgs',
                element: <ViewOrgsPage />,
            },
            {
                path: 'tickets',
                element: <TicketsBalancePage />,
            },
            {
                path: 'profile',
                element: <ShowMyProfile />,
            },
            {
                path: 'following',
                element: <ViewFollowingPage />,
            },
        ],
    },

    {
        path: 'org',
        element: <OrganizerLayout />,
        children: [
            // { index: true, element: <HomePage /> }, // TODO Edit this
            { path: ':orgId', element: <ProfilePage /> },
            { path: 'blocklist', element: <BlockedUsersPage /> },
            { path: ':orgId/followers-list', element: <FollowersList /> },
            { path: ':orgId/config', element: <ConfigOrgPage /> },

            { path: 'members', element: <TeamPage /> },

            { path: 'forms', element: <ViewFormsPage /> },
            { path: 'attendees', element: <OrgAttendees /> },
            { path: 'our-events', element: <OrgEvents /> },
            { path: 'tickets', element: <OrgTicketsPage /> },
        ],
    },
]);
