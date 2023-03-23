import { createBrowserRouter } from 'react-router-dom';

import { CoursePage, ErrorPage, HomePage } from '../pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />
	},
	{
		path: '/course/:id',
		element: <CoursePage />,
		errorElement: <ErrorPage />
	}
]);

export default router;
