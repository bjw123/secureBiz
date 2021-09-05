import React, { useEffect, useState, ReactNode } from 'react';
import NavComponent from '../Nav/Nav';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
  setQuest: (q: string) => void;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  return (
    <>
      {/* <Navbar /> */}
      <NavComponent setQuest={props.setQuest} />
      <Outlet />
      <Footer />
    </>
  );
};
