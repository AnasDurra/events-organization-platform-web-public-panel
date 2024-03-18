import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/error-page";
import RegisterAttendee from "../components/Attendees Profiles/register_attendee";
import ShowAttendeProfile from "../components/Attendees Profiles/show_attendee_profile";
import LoginPage from "../pages/loginPage";

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
        ],
    },
]);
