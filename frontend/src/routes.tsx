import type { PartialRouteObject } from 'react-router';

import Dashboard from './Dashboard/views/Dashboard';
import Profile from './Dashboard/views/Profile';
import FeedBack from './Dashboard/views/Feedback';
import Questions from './Dashboard/views/Questions';
import Reports from './Dashboard/views/Reports';
import Home from './Home/Home';

export const routes: PartialRouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <Home />,
  },
];
