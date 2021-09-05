/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Feedback from './views/Feedback';
import Questions from './views/Questions';
import Reports from './views/Reports';

// routes for sidebar only in admin portal
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Dashboard,
    layout: '/admin',
  },

  {
    path: '/feedback',
    name: 'Feedback',
    icon: 'ni ni-pin-3 text-orange',
    component: Feedback,
    layout: '/admin',
  }, //,
  /*
  {
    path: "/user-profile",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },

     */

  {
    path: '/questions',
    name: 'Questions',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Questions,
    layout: '/admin',
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: 'ni ni-key-25 text-info',
    component: Reports,
    layout: '/admin',
  },
];
export default routes;
