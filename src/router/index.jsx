import { createBrowserRouter } from 'react-router-dom';
import OrganizerLayout from '../components/Layouts/OrganizerLayout';
import RegisterAttendee from '../features/Attendees Profiles/RegisterAttendee';
import MyProfile from '../features/Attendees Profiles/MyProfile';
import CreateEvent from '../features/Manage Events (org)/CreateEvent';
import ShowEvent from '../features/Manage Events (org)/show_event/ShowEvent';
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
import PublicLayout from '../components/Layouts/PublicLayout';
import Roles from '../api/Roles';
import BasicLayout from '../components/Layouts/BasicLayout';
import OrganizerLoginPage from '../pages/login pages/OrganizerLoginPage';
import OrgTicketsPage from '../features/Ticketing Packages/OrgTicketsPage';
import ViewCategoryPage from '../features/landing/ViewCategoryPage';
import ViewAllCategoriesPage from '../features/landing/ViewAllCategoriesPage';
import AttendeeProfile from '../features/Attendees Profiles/AttendeeProfile';
import HomeLayout from '../components/Layouts/home/HomeLayout';
import DesignBadge from '../features/gamification/badges/design/DesignBadge';
import SeedPage from '../api/services/SeedPage';
import ViewShop from '../features/gamification/shop/ViewShop';
import ShopTickets from '../features/gamification/shop/ShopTickets';
import ViewPointsBalance from '../features/gamification/ViewPointsBalance';
import ViewRPsBalance from '../features/gamification/ViewRPsBalance';
import AnimatePrize from '../AnimatePrize';
import OrgReports from '../features/org profiles/reports/OrgReports';
import ReportToAdmin from '../features/Attendees Profiles/ReportToAdmin';
import ScanQRCode from '../features/qrCodes/ScanQRCode';
import OrgEvents from '../features/org profiles/org events/OrgEvents';
import Blocked from '../pages/Blocked';
import ViewSubmitSuccess from '../features/dynamic forms/submission/ViewSubmitSuccess';

export const router = createBrowserRouter([
    {
        path: '/not-found',
        element: <NotFound />,
    },
    {
        path: '/blocked',
        element: <Blocked />,
    },
    {
        path: '/payment/success',
        element: <ResultSuccessPage />,
    },
    {
        path: '/',
        element: <BasicLayout />,
        //errorElement: <ErrorPage />,
        children: [
            //  { index: true, element: </> }, // TODO make a landing page for all types of users

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
        path: 'forms',
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
                        path: 'event/:event_id',
                        children: [
                            {
                                path: 'submit',
                                element: <SubmitForm />,
                            },
                            {
                                path: 'submissions',
                                element: <ViewFormSubmissions />,
                            },
                            {
                                path: 'success',
                                element: <ViewSubmitSuccess />,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: '/',
        element: <PublicLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: '/attendee-profile/:id',
                // element: <ShowAttendeProfile />,
                element: <AttendeeProfile />,
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
            {
                path: 'org',
                children: [{ path: ':orgId', element: <ProfilePage /> }],
            },
        ],
    },

    {
        path: 'home',
        element: <HomeLayout roles={[Roles.ATTENDEE]} />,
        //errorElement: <ErrorPage />,
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
                path: 'points',
                element: <ViewPointsBalance />,
            },
            {
                path: 'RPs',
                element: <ViewRPsBalance />,
            },
            {
                path: 'profile',
                children: [
                    {
                        index: true,
                        element: <MyProfile />,
                    },
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
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        element: <ViewAllCategoriesPage />,
                    },
                    {
                        path: ':category_name/:category_id',
                        element: <ViewCategoryPage />,
                    },
                ],
            },
            {
                path: 'shop',
                element: <ViewShop />,
                children: [
                    {
                        index: true,
                        element: <ShopTickets></ShopTickets>,
                    },
                ],
            },
            {
                path: 'report-to-admin',
                element: <ReportToAdmin />,
            },
        ],
    },

    {
        path: 'org',
        element: <OrganizerLayout roles={[Roles.EMPLOYEE]} />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ProfilePage /> },
            { path: ':orgId', element: <ProfilePage /> },
            {
                path: 'blocklist',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <BlockedUsersPage />{' '}
                        </div>
                    </div>
                ),
            },

            { path: ':orgId/config', element: <ConfigOrgPage /> },
            {
                path: 'members',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <TeamPage />
                        </div>
                    </div>
                ),
            },
            {
                path: 'attendees',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <OrgAttendees />
                        </div>
                    </div>
                ),
            },
            {
                path: 'our-events',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <OrgEvents />
                        </div>
                    </div>
                ),
            },
            { path: 'profile/config', element: <ConfigOrgPage /> },

            {
                path: 'forms',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <ViewFormsPage />
                        </div>
                    </div>
                ),
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
            {
                path: 'tickets',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <OrgTicketsPage />
                        </div>
                    </div>
                ),
            },
            {
                path: 'reports',
                element: (
                    <div className='grid grid-cols-10 w-full'>
                        <div className='col-span-10 md:col-span-8 md:col-start-2'>
                            <OrgReports />
                        </div>
                    </div>
                ),
            },
            { path: 'attendance/scan-qr', element: <ScanQRCode /> },
        ],
    },
]);
