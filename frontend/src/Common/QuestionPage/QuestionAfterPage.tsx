import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Navbar,
  Nav,
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  OverlayTrigger,
  Tooltip,
  Image,
} from 'react-bootstrap';
import BodyContainer from '../BodyContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Style from './questionPage.module.scss';
import classNames from 'classnames';
import ReactLoading from 'react-loading';

export default function QuestionAfterPage(props: any): JSX.Element {
  return (
    <BodyContainer>
      <>
        <h1>Well Done</h1>
        <p>
          You answered {props.questionNum} questions for Configure Microsoft Office Macro Settings
        </p>
        <h4>Your Maturity Level is 3</h4>
        <p>Good job!</p>
        {/* <Button href={`#/report?${props.type}`}>Report</Button> */}
      </>
    </BodyContainer>
  );
}
