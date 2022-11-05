import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Root from '../layout/Root';
import Category from '../Pages/Category/Category';
import News from '../Pages/News/News';
import Login from '../Pages/Auth/Login';
import Signup from '../Pages/Auth/Signup';
import RequireAuth from './RequireAuth';
import Terms from '../Pages/Others/Terms';
import Profile from '../Pages/Others/Profile';
import Location from '../Pages/Others/Location';

export const router = createBrowserRouter([
    {
        path: '/', element: <Root />, children: [
            {
                path: '/',
                loader: () => fetch('https://sunrise-news-server.vercel.app/news'),
                element: <Home />
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`https://sunrise-news-server.vercel.app/category/${params.id}`),
                element: <Category />
            },
            {
                path: '/news/:id',
                loader: ({ params }) => fetch(`https://sunrise-news-server.vercel.app/news/${params.id}`),
                element: <RequireAuth><News /></RequireAuth>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/terms',
                element: <Terms />
            },
            {
                path: '/profile',
                element: <RequireAuth><Profile /></RequireAuth>
            },
            {
                path: '/location',
                element: <Location />
            },
        ]
    }
]);