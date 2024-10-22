import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieDetail from './pages/MovieDetail.jsx'
import RootLayout from './pages/RootLayout.jsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/movie/:id',
        element: <MovieDetail/>
      }
    ]
  }
 
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
