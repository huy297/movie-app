import { createRoot } from "react-dom/client";
// import HomePage from "./pages/HomePage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MovieDetail from "./pages/MovieDetail.jsx";
import RootLayout from "./pages/RootLayout.jsx";
// import TVShowDetail from "./pages/TVShowDetail.jsx";
import ModalProvider from "./context/ModalProvider.jsx";
// import PeoplePage from "./pages/PeoplePage.jsx";
import { lazy } from "react";
import SearchPage from "./pages/SearchPage";
import AuthProvider from "./context/AuthProvider.jsx";
import User from "./pages/User.jsx";
const MovieDetail = lazy(() => import("./pages/MovieDetail.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const TVShowDetail = lazy(() => import("./pages/TVShowDetail.jsx"));
const PeoplePage = lazy(() => import("./pages/PeoplePage.jsx"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
      {
        path: "/people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return res;
        },
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/user",
        element: <User />
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </AuthProvider>,
  // </StrictMode>,
);
