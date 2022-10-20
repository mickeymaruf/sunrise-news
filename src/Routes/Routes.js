import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Root from '../layout/Root';
import Category from '../Pages/Category/Category';
import News from '../Pages/News/News';

export const router = createBrowserRouter([
    {
        path: '/', element: <Root />, children: [
            {
                path: '/',
                loader: () => fetch('http://localhost:5500/news'),
                element: <Home />
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`http://localhost:5500/category/${params.id}`),
                element: <Category />
            },
            {
                path: '/news/:id',
                loader: ({ params }) => fetch(`http://localhost:5500/news/${params.id}`),
                element: <News />
            },
        ]
    }
]);