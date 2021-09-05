import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Style from './home.module.scss';
import QuestionModal from '../Common/QuestionModal/QuestionModal';
import { MetaContext } from '../Context/Context';
import BodyContainer from '../Common/BodyContainer';
import '../global.scss';

export default function RegisterNewAdmin(): JSX.Element {
  return <BodyContainer title={'Register New Admin User'}></BodyContainer>;
}
