import RootLayout, { loader as rootLoader } from "./layouts/Root";
import ErrorPage from "./pages/Error";
import AuthenticationPage, {
    action as authAction,
} from "./pages/Authentication";
import AuthLayout, { loader as authLoader } from "./layouts/Auth";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/Home";
import { action as logoutAction } from "./pages/Logout";
import DailyTaskListPage, {
    loader as dailyTaskListLoader,
} from "./pages/DailyTaskList";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
            {
                index: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                action: authAction,
                element: <AuthenticationPage />,
            },
        ],
    },
    {
        path: "/auth",
        loader: authLoader,
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: "/auth",
                element: <ProfilePage />,
            },
            {
                index: true,
                path: "/auth/daily-task-list",
                loader: dailyTaskListLoader,
                element: <DailyTaskListPage />,
            },
            {
                path: "/auth/logout",
                action: logoutAction,
            },
        ],
    },
]);

export default router;
