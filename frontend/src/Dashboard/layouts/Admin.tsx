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
import React from 'react';
//import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
import { Outlet } from 'react-router-dom';
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';
import Sidebar from '../components/Sidebar/Sidebar';
import { AuthProvider } from '../context/AuthContext';

import routes from '../routes';
import '../assets/scss/argon-dashboard-react.scss';
import style from './admin.module.scss';

const Admin = (props: any) => {
  const mainContent = React.useRef(null);
  //const location = useLocation();
  console.log('dashboard auth');
  React.useEffect(() => {
    try {
      document.documentElement.scrollTop = 0;
      // @ts-ignore
      document.scrollingElement.scrollTop = 0;
      // @ts-ignore
      mainContent.current.scrollTop = 0;
    } catch (e) {
      console.error('cant set scroll');
    }
  }, [location]);

  // const getRoutes = (routes: any) => {
  //   return routes.map(
  //     (prop: { layout: string; path: any; component: any }, key: any) => {
  //       if (prop.layout === '/admin') {
  //         return (
  //           <Route
  //             path={prop.layout + prop.path}
  //             component={prop.component}
  //             key={key}
  //           />
  //         );
  //       } else {
  //         return null;
  //       }
  //     }
  //   );
  // };

  // const getBrandText = (path: string) => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
  //       -1
  //     ) {
  //       return routes[i].name;
  //     }
  //   }
  //   return 'Brand';
  // };

  return (
    <>
      <AuthProvider>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: '/admin/dashboard',
            imgSrc: require('../assets/img/brand/argon-react.png').default,
            imgAlt: '...',
          }}
        />
        <div className='main-content' ref={mainContent}>
          <AdminNavbar
          // {...props}
          // brandText={getBrandText(props.location.pathname)}
          />

          {/* <Switch>
            {getRoutes(routes)}
            <Redirect from='*' to='/admin/dashboard' />
          </Switch> */}

          <div className={style.containerNoPadding}>
            <Outlet />
            <AdminFooter />
          </div>
        </div>
      </AuthProvider>
    </>
  );
};

export default Admin;
