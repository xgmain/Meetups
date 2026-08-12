import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import MeetupDashboard from "../../features/meetups/dashboard/MeetupDashboard";
import MeetupForm from "../../features/meetups/form/MeetupForm";
import HomePage from "../../features/home/HomePage";
import MeetupDetailsPage from "../../features/meetups/details/MeetupDetailsPage";
import Counter from "../../features/counter/Counter";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'meetups', element: <MeetupDashboard /> },
                    { path: 'meetups/:id', element: <MeetupDetailsPage /> },
                    { path: 'createMeetup', element: <MeetupForm key='create' /> },
                    { path: 'manage/:id', element: <MeetupForm /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'counter', element: <Counter /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm />},
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    },
]);