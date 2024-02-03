import AddPage from "./pages/AddPage";
import CarPage from "./pages/CarPage";
import DashboardPage from "./pages/DashboardPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import Authentication from "./routes/Authentication";
import Protected from "./routes/Protected";

export const routes = [
  {
    path: "/",
    element: (
      <Authentication>
        {" "}
        <LoginPage />
      </Authentication>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <DashboardPage />
      </Protected>
    ),
  },
  {
    path: "/car",
    element: (
      <Protected>
        <CarPage />
      </Protected>
    ),
  },
  {
    path: "/addcars",
    element: (
      <Protected>
        <AddPage />
      </Protected>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <Protected>
        {" "}
        <EditPage />
      </Protected>
    ),
  },
];
