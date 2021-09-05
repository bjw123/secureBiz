

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
import { Helmet } from "react-helmet";
import classNames from "classnames";
import ReactLoading from "react-loading";
import QuestionAfterPage from "./QuestionAfterPage";
import QuestionModal from "../QuestionModal/QuestionModal"

import "../../global.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function QuestionPage(props: any): JSX.Element {
  const [slides, setSlides] = useState({
    //questions: dataSchema.Questions,
    slideIndex: 0,
    firstSlide: true,
    questionCompleted: false,
    secondlastSlide: false,
    lastSlide: false,
    loading: false,
  });

  const handleAnswer = (event: any) => {
    console.log("handleAnswer trigger");

    setSlides({ ...slides, firstSlide: false });

    if (slides.lastSlide) {
      console.log("slides.endSlide afterpage");
      setSlides({ ...slides, loading: true });

      setTimeout(() => {

        

        setSlides({ ...slides, questionCompleted: true });
      }, 2000);
    }

    if (slides.secondlastSlide && !slides.lastSlide) {
      setSlides({ ...slides, lastSlide: true });
    }
  };

  const { questionSchema, pageTitle, pageDescription } = props;

  const questions: any = [];
  // questionSchema.forEach((v: any, i: number) => {
  //   questions.push(
  //     <SwiperSlide>
  //       <div key={i}>
  //         <h4>Question:{i + 1}</h4>
  //         <span>{v.QuestionLabel}</span>
  //         <OverlayTrigger
  //           key={i}
  //           overlay={
  //             <Tooltip id={`tooltip-${i}`}>{v.QuestionDescription}</Tooltip>
  //           }
  //         >
  //           <i className="fas fa-info-circle"></i>
  //         </OverlayTrigger>
  //         {/* Boolean */}
  //         {v.QuestionType == "BOOLEAN" && (
  //           <div className={classNames(Style.answerContainer)}>
  //             <Button
  //               // @ts-ignore
  //               className={(classNames(Style.answerButton), "next")}
  //               variant="primary"
  //               name={v.Answers[0].Value}
  //               onClick={handleAnswer}
  //             >
  //               {v.Answers[0].Text}
  //             </Button>
  //             <Button
  //               // @ts-ignore
  //               className={(classNames(Style.answerButton), "next")}
  //               variant="primary"
  //               name={v.Answers[1].Value}
  //               onClick={handleAnswer}
  //             >
  //               {v.Answers[1].Text}
  //             </Button>
  //           </div>
  //         )}
  //         {/* Multi */}
  //         {v.QuestionType == "MULTIPLE" && (
  //           <div className={Style.answerContainer}>
  //             {v.Answers.map((v: any, i: any) => {
  //               return (
  //                 <Button
  //                   key={i}
  //                   // @ts-ignore
  //                   className={(classNames(Style.answerButton), "next")}
  //                   variant="primary"
  //                   name={v.Value}
  //                   onClick={handleAnswer}
  //                 >
  //                   {v.Text}
  //                 </Button>
  //               );
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     </SwiperSlide>
  //     // </SwiperSlide>
  //   );
  //});

  // custom button https://stackoverflow.com/questions/63312848/swiperslide-ontouchstart-onclick-trigger-slidenext

  return (
    <BodyContainer title={pageTitle}>
      <QuestionModal/>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="description" content="Helmet application" />
        <link rel="canonical" href="http://securebiz.com/example" />
      </Helmet>
      {!slides.questionCompleted ? (
        <>
          <div>
            <p>{pageDescription}</p>
          </div>
          <Swiper
            className={Style.swiperContainer}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            spaceBetween={50}
            slidesPerView={1}
            touchRatio={0}
            onSlideChange={() => {
              //setSlides({ ...slides, slideIndex: slides.slideIndex++ });
              //console.log(slides);
            }}
            onReachBeginning={() => {
              setSlides({ ...slides, firstSlide: true });
              console.log("onReachBeginning", slides.firstSlide);
            }}
            onReachEnd={() => {
              setSlides({ ...slides, secondlastSlide: true });
              console.log("Slide at the end");
              console.log("slides.endSlide", slides.secondlastSlide);
            }}
            pagination={{ dynamicMainBullets: 1, type: "bullets" }}
          >
            {questions.map((v: JSX.Element[]): JSX.Element[] => v)}
          </Swiper>
          {
            <Button
              variant="secondary"
              className={classNames(
                { [Style.backButtonHide]: slides.firstSlide },
                "prev"
              )}
            >
              Back
            </Button>
          }
          {slides.loading && (
            <ReactLoading
              type={"spinningBubbles"}
              color={"#1691d1"}
              height={"10%"}
              width={"10%"}
              className="loadingSpinner"
            />
          )}
        </>
      ) : (
        <QuestionAfterPage
          questionNum={questions.length}
          type={"applicationControl"}
        />
      )} */}
    </BodyContainer>
  );
}
