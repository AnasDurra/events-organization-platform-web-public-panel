import { createBrowserRouter } from 'react-router-dom';
import OrganizerLayout from '../components/Layouts/OrganizerLayout';
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
import AttendeeLoginPage from '../pages/login pages/AttendeeLoginPage';
import ViewFormSubmissions from '../features/dynamic forms/submission/ViewFormSubmissions';
import ShowAttendeeEvents from '../features/Attendees Profiles/ShowAttendeeEvents';
import ShowEventAttendees from '../features/Manage Events (org)/ShowEventAttendees';
import BlockedUsersPage from '../features/ban/BlockedUsersPage';
import NotFound from '../pages/notFound';
import HomeLayout from '../components/Layouts/HomeLayout';
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
import PublicLayout from '../components/Layouts/PublicLayout';
import Roles from '../api/Roles';
import BasicLayout from '../components/Layouts/BasicLayout';
import OrganizerLoginPage from '../pages/login pages/OrganizerLoginPage';
import OrgTicketsPage from '../features/Ticketing Packages/OrgTicketsPage';
import ViewCategoryPage from '../features/landing/ViewCategoryPage';
import ViewAllCategoriesPage from '../features/landing/ViewAllCategoriesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BasicLayout />,
        errorElement: <ErrorPage />,
        children: [
            //  { index: true, element: </> }, // TODO make a landing page for all types of users
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
                element: <AttendeeLoginPage />,
            },
            {
                path: '/org/login',
                element: <OrganizerLoginPage />,
            },
            {
                path: '/register',
                element: <RegisterAttendee />,
            },
        ],
    },

    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/attendee-profile/:id',
                element: <ShowAttendeProfile />,
            },
            {
                path: '/attendee-profile/:id/organizations',
                element: <ShowFollowingOrgsList />,
            },
            { path: 'org/:orgId/followers-list', element: <FollowersList /> },
            {
                path: 'event',
                children: [
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
        path: 'home',
        element: <HomeLayout roles={[Roles.ATTENDEE]} />,
        errorElement: <ErrorPage />,
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
                children: [
                    {
                        path: 'events',
                        element: <ShowAttendeeEvents />,
                    },
                    {
                        path: 'organizations',
                        element: <ShowFollowingOrgsList />,
                    },
                ],
            },
            {
                path: 'following',
                element: <ViewFollowingPage />,
            },
            {
                path: 'chats',
                element: <ChatsList />,
            },
            {
                path: 'tags',
                children: [
                    {
                        index: true,
                        element: <ViewAllCategoriesPage />,
                    },
                    {
                        path: ':tag_name',
                        element: <ViewCategoryPage />,
                    },
                ],
            },
            {
                path: 'event',
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
                path: 'tags',
                children: [
                    {
                        index: true,
                        element: <ViewAllCategoriesPage />,
                    },
                    {
                        path: ':tag_name',
                        element: <ViewCategoryPage />,
                    },
                ],
            },
        ],
    },

    {
        path: 'org',
        element: <OrganizerLayout roles={[Roles.EMPLOYEE]} />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ProfilePage /> },
            { path: ':orgId', element: <ProfilePage /> },
            { path: 'blocklist', element: <BlockedUsersPage /> },

            { path: ':orgId/config', element: <ConfigOrgPage /> },
            { path: 'members', element: <TeamPage /> },
            { path: 'attendees', element: <OrgAttendees /> },
            { path: 'our-events', element: <OrgEvents /> },

            {
                path: 'forms',
                element: <ViewFormsPage />,
                children: [
                    {
                        path: ':form_id',
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
                ],
            },
            {
                path: 'event',
                children: [
                    {
                        path: 'create',
                        element: <CreateEvent />,
                    },
                ],
            },
            { path: 'tickets', element: <OrgTicketsPage /> },
        ],
    },
]);
