import {createBrowserRouter} from "react-router-dom";
import Protected from "~/routes/Protected.tsx";
import Public from "~/routes/Public.tsx";
import Home from "~/pages/home";
import Login from "~/pages/login";
import Register from "~/pages/register";
import NotFound from "~/routes/NotFound.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: "*",
        element: <Public />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);

export default routes;