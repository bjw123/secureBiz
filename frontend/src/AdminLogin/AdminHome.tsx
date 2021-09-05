import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Style from './admin.module.scss';
import QuestionModal from '../Common/QuestionModal/QuestionModal';
import { MetaContext } from '../Context/Context';
import BodyContainer from '../Common/BodyContainer';
import '../global.scss';
import { tokenAuth } from '../Common/Services/tokenAuth';

export default function AdminHome(): JSX.Element {
  const [metaState, setMetaState] = useContext(MetaContext);

  const tokenHandler = (v: void): boolean => {
    if (tokenAuth()) {
      return true;
    } else {
      setMetaState({ ...metaState, login: true });
      return false;
    }
  };

  // TOKEN FALSE - SHOW MODAL, TOKEN TRUE = SHOW OPTIONS
  return !tokenHandler() ? (
    <Redirect to='/' />
  ) : (
    <BodyContainer title={'Admin Home'}>
      <div className={Style.homeContainer}>
        <Button href={'#/manage-questionnaires'}>Manage Questionnaires</Button>
        <Button href={'#/admin-statistics'}>Statistics</Button>
        <Button href={'#/register-admin-user'}>Register new Administrator</Button>
      </div>
    </BodyContainer>
  );
}
