
import React, { useEffect, useState, useContext, useRef } from "react";
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
} from "react-bootstrap";
import BodyContainer from "../BodyContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Style from "./questionPage.module.scss";
import classNames from "classnames";
import ReactLoading from "react-loading";

export default function QuestionReport (props:any):JSX.Element {


    const URL = window.location.href;
    const reportType = URL.split("?")[1]
    console.log(reportType)

    return(
        <BodyContainer>
              <h1>ASD ESSENTIAL EIGHT</h1>
                <p>The following report demonstrates your current maturity level in accordance with the ASD Essential Eight Cyber Security Model</p>
                <h4>Mitigation assessed: {reportType}</h4>
                <p>You have reached maturity level 3</p>
            </BodyContainer>
        
    )
} 