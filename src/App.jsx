import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./features/landingPage/LandingPage";
import { AdminLogin, RegisteredUsers, RegisteredUserDetail } from "./admin/features";
import { AdminWrapper } from "./admin/components";
import { SendMail } from "./admin/features";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/admin/registered-users",
      element: <AdminWrapper Component={RegisteredUsers} />,
    },
    {
      path: "/admin/send-mail",
      element: <AdminWrapper Component={SendMail} />,
    },
    {
      path: "/admin/registered-users/:id",
      element: <AdminWrapper Component={RegisteredUserDetail} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
