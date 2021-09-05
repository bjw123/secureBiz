import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
  useReducer,
  useLayoutEffect,
  useRef,
} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
//@ts-ignore
import CheeseburgerMenu from 'cheeseburger-menu';

import Style from './nav.module.scss';
import classNames from 'classnames';
import Feedback from '../FeedbackModal/Feedback';
import Login from '../AdminLogin/LoginModal';
import { MetaContext } from '../Context/Context';
import questionCategories from '../Utilise/questionCategories';
import {
  menuClose,
  menuOpen,
  plusIcon,
  downArrow,
} from '../Common/Icons/CommonIcons';

interface Props {
  setQuest: (q: string) => void;
}

export default function NavComponent({ setQuest }: Props): JSX.Element {
  console.log('NavComponent render');
  const [metaState, setMetaState] = useContext(MetaContext);
  const [isPCDropDown, setIsPCDropDown] = useReducer((s) => !s, false);
  const [isMobMenu, setisMobMenu] = useReducer((s) => !s, false);
  const [isMobSidebar, setisMobSidebar] = useReducer((s) => !s, false);
  const [isMobAssDrop, setIsMobAssDrop] = useReducer((s) => !s, false);
  const [size, setSize] = useState([0, 0]);
  const feedbackOpen = useMemo(() => metaState.feedback, [metaState.feedback]);
  const feedbackClose = useCallback(
    () => setMetaState({ ...metaState, feedback: false }),
    [setMetaState]
  );
  // const mobSidebarRef = useRef();
  // HANDLE ALL NAV CLICK/HOVER EVENT
  const handleShow = (trigger: any) => {
    if (trigger === 'feedback') {
      setMetaState({ ...metaState, feedback: !metaState.feedback });
    } else if (trigger === 'login') {
      setMetaState({ ...metaState, login: !metaState.login });
    }
  };
  const updateSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // console.log('size', size[0]);

  // const handleClickOutside = (event: any) => {
  //   if (
  //     mobSidebarRef.current &&
  //     //@ts-ignore
  //     !mobSidebarRef.current.contains(event.target)
  //   ) {
  //     setisMobSidebar();
  //   }
  // };

  // useLayoutEffect(() => {
  //   // Bind the event listener
  //   window.addEventListener('click', handleClickOutside);

  //   return () => {
  //     // Unbind the event listener on clean up
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      {/* PC view */}
      {size[0] > 1022 ? (
        <div className={Style.topNavWrapper}>
          <div>
            <Navbar expand='lg' className={Style.topNav}>
              <div className={Style.navHeader}>
                <div className={Style.navBannerLogo}>
                  <img
                    className={Style.logoIcon}
                    // style={{ maxHeight: '40px', filter: 'brightness(0) invert(1)' }}
                    src={'./img/logo.png'}
                  />
                </div>
                <div className={Style.navBannerCenter}>
                  <Link
                    // style={{ color: 'white' }}
                    style={{ textDecoration: 'none' }}
                    to='/'
                  >
                    <span className={Style.appName}>SecureBiz</span>
                  </Link>
                </div>
              </div>
            </Navbar>
            <div className={Style.nav}>
              <ul className={Style.navList}>
                {/* <FontAwesomeIcon icon={faVolumeDown} /> */}

                <li
                  className={Style.navButton}
                  onMouseEnter={() => setIsPCDropDown()}
                  onMouseLeave={() => setIsPCDropDown()}
                >
                  Assess {downArrow}
                  {isPCDropDown && (
                    <ul className={Style.navSubListContainer}>
                      {questionCategories.map((v, i) => (
                        <li
                          className={Style.navSubList}
                          onClick={() => {
                            setQuest(v.key);
                            setIsPCDropDown();
                          }}
                        >
                          <Link
                            style={{ textDecoration: 'none', color: 'white' }}
                            to='/question'
                          >
                            {v.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className={Style.navButton}>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to='/why-us'
                  >
                    Why Us
                  </Link>
                </li>
                <li className={Style.navButton}>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to='/faq'
                  >
                    FAQ
                  </Link>
                </li>
                <li
                  className={Style.navButton}
                  onClick={() => {
                    handleShow('feedback');
                  }}
                >
                  Feedback
                </li>
                <li
                  className={Style.navButton}
                  onClick={() => {
                    handleShow('login');
                  }}
                >
                  Admin Portal
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // Mobile View
        <div className={Style.mobNavWrap}>
          <div className={Style.mobNavContainer}>
            <div
              className={Style.mobMenuContainer}
              onClick={() => setisMobMenu()}
            >
              <div
                className={Style.mobMenu}
                onClick={() => {
                  setisMobSidebar();
                }}
              >
                {!isMobMenu ? menuClose : menuOpen}
              </div>
            </div>
            <div className={Style.mobNavBanner}>
              <div>
                <Link style={{ textDecoration: 'none' }} to='/'>
                  <span className={Style.appName}>SecureBiz</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile SideBar */}
      <CheeseburgerMenu
        // ref={mobSidebarRef}
        isOpen={isMobSidebar}
        closeCallback={() => {
          console.log('closeCallback');
        }}
        backgroundColor='#2b2b2a'
        topOffset={50}
      >
        <div className='my-menu-content'>
          <ul className={Style.navMobSubListContainer}>
            <li
              className={Style.navSubList}
              onClick={() => {
                setIsMobAssDrop();
              }}
            >
              Assess <span style={{ paddingLeft: '195px' }}>{plusIcon}</span>
            </li>
            {isMobAssDrop && (
              <ul className={Style.navMobSubListContainer}>
                {questionCategories.map((v, i) => (
                  <li
                    className={Style.navMobSubList}
                    onClick={() => {
                      setQuest(v.key);
                      setisMobSidebar();
                    }}
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'white' }}
                      to='/question'
                    >
                      {v.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <li
              className={Style.navSubList}
              onClick={() => {
                setisMobSidebar();
              }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to='/why-us'
              >
                Why Us
              </Link>
            </li>
            <li
              className={Style.navSubList}
              onClick={() => {
                setisMobSidebar();
              }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to='/faq'
              >
                FAQ
              </Link>
            </li>
            <li
              className={Style.navSubList}
              onClick={() => {
                handleShow('feedback');
                setisMobSidebar();
              }}
            >
              Feedback
            </li>
            <li
              className={Style.navSubList}
              onClick={() => {
                handleShow('login');
                setisMobSidebar();
              }}
            >
              Admin Portal
            </li>
          </ul>
        </div>
      </CheeseburgerMenu>

      <Feedback feedbackOpen={feedbackOpen} feedbackClose={feedbackClose} />
      <Login
        metaState={metaState}
        setMetaState={(v: any) => {
          setMetaState(v);
        }}
      />
    </>
  );
}
