import React, { useEffect, memo } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { JsxElement } from 'typescript';
import Style from './footer.module.scss';

export default memo(() => {
  console.log('Footer render');
  return (
    <div className={Style.footerContainer}>
      <p className={Style.fixPosition}>
        © Copyright Secure Biz. All Rights Reserved. Made in Melbourne.
      </p>
    </div>
  );
});
