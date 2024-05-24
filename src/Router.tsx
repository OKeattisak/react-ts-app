import {
    createBrowserRouter,
    RouterProvider, Navigate
} from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Navigate replace to="/dashboard" />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            }
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}