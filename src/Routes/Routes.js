import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Root from '../layout/Root';
import Category from '../Pages/Category/Category';

export const router = createBrowserRouter([
    {
        path: '/', element: <Root />, children: [
            { path: '/', element: <Home /> },
            { path: '/category/:Id', element: <Category /> },
        ]
    }
]);