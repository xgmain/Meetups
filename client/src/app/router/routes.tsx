import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import MeetupDashboard from "../../features/meetups/dashboard/MeetupDashboard";
import MeetupForm from "../../features/meetups/form/MeetupForm";
import HomePage from "../../features/home/HomePage";
import MeetupDetailsPage from "../../features/meetups/details/MeetupDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'meetups', element: <MeetupDashboard /> },
            { path: 'meetups/:id', element: <MeetupDetailsPage /> },
            { path: 'createMeetup', element: <MeetupForm key='create' /> },
            { path: 'manage/:id', element: <MeetupForm /> },
        ]
    },
]);