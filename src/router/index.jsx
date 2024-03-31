import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/error-page";
import RegisterAttendee from "../features/Attendees Profiles/RegisterAttendee";
import ShowAttendeProfile from "../features/Attendees Profiles/ShowAttendeProfile";
import LoginPage from "../pages/loginPage";
import CreateEvent from "../features/Manage Events (org)/CreateEvent";
import ShowEvent from "../features/Manage Events (org)/ShowEvent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterAttendee />,
            },
            {
                path: "/attende-profile",
                element: <ShowAttendeProfile />,
            },
            {
                path: "/event",
                children: [
                    {
                        path: "create",
                        element: <CreateEvent />,
                    },
                    {
                        path: "show/:id",
                        element: <ShowEvent />,
                    },
                ],
            },
        ],
    },
]);
