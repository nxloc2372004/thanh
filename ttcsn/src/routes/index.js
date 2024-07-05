import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Profile from "../pages/Staff/Profile";
import Ticket from "../pages/Customer/Ticket";
import ManagerAccount from "../pages/Admin/ManagerAccount";
import ManagerProfile from "../pages/Admin/ManagerProfile";
import ManagerProject from "../pages/Admin/ManagerProject";
import ListProject from "../pages/Staff/ListProject";
export const routes = [
    {
        path: "/dashboard",
        element: <LayoutDefault />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "ticket",
                element: <Ticket />
            },
            {
                path: "manageraccount",
                element: <ManagerAccount />,
            },
            {
                path: "managerproject",
                element: <ManagerProject />
            },
            {
                path: "managerprofile",
                element: <ManagerProfile/>,
    

            },
            {
                path: "listproject",
                element: <ListProject />
            },
            


        ]
    },
    {
        path: "/",
        element: <Login />

    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/register",
        element: <Register />
    }
]