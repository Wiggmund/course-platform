import {
    createBrowserRouter
} from "react-router-dom";

import {CoursePage, HomePage} from '../pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/course/:id',
        element: <CoursePage />
    }
]);

export default router;