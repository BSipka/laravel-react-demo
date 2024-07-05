import RootLayout, { loader as rootLoader } from "./layouts/Root";
import ErrorPage from "./pages/Error";
import AuthenticationPage, {
    action as authAction,
} from "./pages/Authentication";
import AuthLayout, { loader as authLoader } from "./layouts/Auth";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/Home";
import { action as logoutAction } from "./pages/Logout";
import TaskListPage, {
    loader as dailyTaskListLoader,
} from "./pages/DailyTask/TaskList";
import TaskListDetailPage, {
    loader as dailyTaskListDetailLoader,
    action as deleteTaskListAction,
} from "./pages/DailyTask/TaskListDetail";
import TaskListEditPage from "./pages/DailyTask/TaskListEdit";
import TaskListCreate, {
    action as createTaskListAction,
} from "./pages/DailyTask/TaskListCreate";

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
                path: "/auth/daily-list",
                children: [
                    {
                        index: true,
                        loader: dailyTaskListLoader,
                        element: <TaskListPage />,
                    },
                    {
                        path: "create",
                        action: createTaskListAction,
                        element: <TaskListCreate />,
                    },
                    {
                        path: ":id",
                        loader: dailyTaskListDetailLoader,
                        id: "task-list-detail",
                        children: [
                            {
                                index: true,
                                element: <TaskListDetailPage />,
                                action: deleteTaskListAction,
                            },
                            {
                                path: "edit",
                                element: <TaskListEditPage />,
                            },
                        ],
                    },
                ],
            },

            {
                path: "/auth/logout",
                action: logoutAction,
            },
        ],
    },
]);

export default router;
