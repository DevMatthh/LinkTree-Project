import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { Networks } from "./pages/Networks";
import { Error } from "./pages/Error";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export { router };

// A rota de admin ira passar pelo private, se o private autorizar ele sera redirecionado a pagina admin
