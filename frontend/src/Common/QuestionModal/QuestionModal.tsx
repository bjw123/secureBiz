import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MetaContext } from '../../Context/Context';
import Style from './questionModal.module.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { url } from '../../Config/Config';
import { publicAPI } from '../Services/API';
import { answerFormatter } from './AnswerFormatter';

// SWIPE VARIABLE
let swp: any;
// let questionFullArr: any = [];
let questionShortArr: any = [];
let questionsList: any = [];
let serverError: boolean = false;

SwiperCore.use([Navigation, Pagination, Scrollbar]);

interface multiAnswer {
  QuestNum: number;
  AnswerIndexSelected: number[];
}

interface useState {
  firstSlide: boolean;
  questionCompleted: boolean;
  loading: boolean;
  multiQues: multiAnswer[];
  answers: any[];
}

export default function QuestionModal(props: any): JSX.Element {
  const { questionFullArr } = props;
  //console.log('QuestionModal render', questionFullArr);
  // console.log('questionsList', questionsList);
  const [metaState, setMetaState] = useContext(MetaContext);

  const [slides, setSlides] = useState<useState>({
    firstSlide: true,
    questionCompleted: false,
    loading: false,
    multiQues: [],
    answers: [[], []],
  });
  //console.log('slides', slides);
  let { multiQues } = slides;
  // Triggered twice - due to dev env (ReactJS default setting)
  if (questionsList.length === 0) {
    //  console.log('For loop ran..');
    questionFullArr.forEach((v: any, i: number) => {
      let questNum = questionsList.length + 1; // use for index of click
      if (v.QuestionCategory === metaState.questionnaire.name) {
        questionShortArr.push(v);
        //questionsList.
        questionsList.push(
          <SwiperSlide key={`quest${i}`} virtualIndex={i + 1}>
            <div>
              <h4>Question:{questNum}</h4>
              <span>{v.QuestionLabel}</span>

              {v.QuestionDescription && (
                <OverlayTrigger
                  key={`overlay${i}`}
                  overlay={
                    <Tooltip id={`tooltip-${i}`}>
                      {v.QuestionDescription}
                    </Tooltip>
                  }
                >
                  <i className='fas fa-info-circle'></i>
                </OverlayTrigger>
              )}
              {v.QuestionType === 'MULTIPLE' ? (
                <div className={Style.answerContainer}>
                  {v.Answers.map((val: any, ind: any) => {
                    if (ind == 0) {
                      console.log('v.Answers.map');
                      let multiQuesArr = multiQues;
                      multiQuesArr.push({
                        QuestNum: questNum,
                        AnswerIndexSelected: [],
                      });
                      setSlides({ ...slides, multiQues: multiQuesArr });
                      let answerInd = ind;
                    }

                    return (
                      <Button
                        id={`button${ind}`}
                        key={`button${ind}`}
                        // @ts-ignore
                        className={classNames(Style.answerButton)}
                        variant='success'
                        block
                        data-clicked={'Unclicked'}
                        data-answerIndex={ind}
                        data-questionNum={questNum}
                        name={val.Value}
                        onClick={(event: MouseEvent<HTMLElement>) => {
                          const button = document.getElementById(
                            `button${ind}`
                          );
                          let clickStatus = (event.target as HTMLElement).getAttribute(
                            'data-clicked'
                          );
                          let answerInd = (event.target as HTMLElement).getAttribute(
                            'data-answerIndex'
                          );
                          let questNum = (event.target as HTMLElement).getAttribute(
                            'data-questionNum'
                          );
                          if (clickStatus === 'Unclicked') {
                            console.log('Add');
                            handleAnswer(
                              event,
                              v.QuestionType,
                              questNum,
                              answerInd,
                              false
                            );
                            button?.setAttribute('data-clicked', 'Clicked');
                          } else {
                            console.log('Remove');
                            handleAnswer(
                              event,
                              v.QuestionType,
                              questNum,
                              answerInd,
                              true
                            );
                            button?.setAttribute('data-clicked', 'Unclicked');
                          }
                        }}
                      >
                        {val.Label}
                      </Button>
                    );
                  })}
                  <Button
                    key={`buttonNext${i}`}
                    className={(classNames(Style.answerButton), 'next')}
                    variant='success'
                    name={`${v}nextButton`}
                  >
                    {'Next'}
                  </Button>
                </div>
              ) : (
                // Radio or Single Select
                <div className={Style.answerContainer}>
                  {v.Answers.map((v: any, ind: any) => {
                    let answerInd = ind;
                    return (
                      <Button
                        key={`button${ind}`}
                        className={(classNames(Style.answerButton), 'next')}
                        variant='success'
                        block
                        name={`${v.Value}select`}
                        onClick={(event) => {
                          handleAnswer(
                            event,
                            v.QuestionType,
                            questNum,
                            answerInd
                          );
                        }}
                      >
                        {v.Label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </SwiperSlide>
        );
      }
    });
    console.log('questionList after', questionsList, questionsList.length);
  }

  const handleAnswer = (
    event: any,
    QuestionType: string,
    questNum: any,
    answerInd: any,
    removeAnswer?: any
  ) => {
    console.log(
      'handleAnswer triggered',
      QuestionType,
      questNum,
      answerInd,
      removeAnswer
    );

    let questIndex = questNum - 1;
    let answerArr: number[][] = slides.answers;
    console.log('slides.answer before', slides.answers);

    if (QuestionType === 'MULTIPLE') {
      // add answer
      if (!removeAnswer) {
        console.log('Multiple Add before ', answerArr);
        answerArr[questIndex].push(answerInd);

        setSlides({ ...slides, answers: answerArr });
      }
      // remove answer
      else {
        const index = answerArr[questIndex].indexOf(answerInd);
        console.log('remove index', index);
        if (index > -1) {
          answerArr[questIndex].splice(index, 1);
          //@ts-ignore
          setSlides({ ...slides, answers: answerArr });
        }
      }
      console.log('After Mult Update', slides.answers);
    } else {
      answerArr[questIndex] = answerInd;
    }
    // @ts-ignore
    setSlides({ ...slides, answers: answerArr });

    // TOGGLE BACK BUTTON DISPLAY
    setSlides({ ...slides, firstSlide: false });

    // LAST SLIDE
    if (questNum === questionsList.length) {
      console.log('answers', slides.answers);
      // LOADING EFFECT
      setSlides({ ...slides, loading: true });
      let formattedAnswer = answerFormatter(questionShortArr, slides.answers);
      console.log('formattedAnswer', formattedAnswer);
      window.localStorage.setItem(
        'formattedAnswer',
        JSON.stringify(formattedAnswer)
      );
      publicAPI
        // @ts-ignore
        .postCategoryCoreResult(formattedAnswer)
        .then((r) => {
          console.log('postCategoryCoreResult', r[0]);
          // setMetaState({...metaState, questionnaire:{ ...metaState.questionnaire, result: r[0] }})

          let { QuestionCategory, Level }: any = r[0];
          localStorage.setItem('QuestionCategory', QuestionCategory);
          localStorage.setItem('Level', Level);

          // AFTER 2 SECONDS REDIRECT TO AFTERPAGE
          setTimeout(() => {
            setSlides({ ...slides });
            handleHide();

            window.location.assign(`${url.clientBaseURL}/#/question-afterpage`);
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
          setSlides({ ...slides, loading: false });
          alert('Failed to submit answers. Please retry.');
        });
    }
  };

  const handleHide = (): void => {
    setMetaState({
      ...metaState,
      questionnaire: {
        ...metaState.questionnaire,
        show: false,
      },
    });
  };

  // const lastSlideSet = () => {
  //   setSlides({ ...slides, secondlastSlide: true })
  // }

  // ARRAY TO STORE QUESTIONS

  // PUSH QUESTIONS TO ARRAY

  //useEffect(() => {
  // publicAPI.getQuestionCategory("6003cbfc6f7c0260e4ef86fd").then((r)=> {
  //   console.log("getQuestionCategory",r)
  // }).catch((e)=>{
  //   console.log("getQuestionCategory",e)
  // })
  // console.log("useEffect ran")
  //let mounted = false;

  // return ()=>  {mounted = true};
  //})

  return (
    <>
      <Modal
        className={Style.navModal}
        show={metaState.questionnaire.show}
        onHide={handleHide}
        backdrop='static'
        onEntered={() => {
          serverError || swp.update(); // TRIGGER SWIPER TO RERENDER
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className={Style.navModalTitle}>
            {serverError
              ? 'SERVER ERROR - Unable to retrieve questions. Please try again later'
              : metaState.questionnaire.name}
          </Modal.Title>
        </Modal.Header>
        {!serverError && (
          <Modal.Body className={Style.qModal}>
            <div>
              {!slides.questionCompleted && ( // SHOW ON QUESTIONS NOT COMPLETE
                <>
                  <Swiper
                    onInit={(s) => {
                      swp = s;
                    }}
                    //observer={true}
                    //  observeParents={true}
                    // parallax={true}
                    //observeSlideChildren={true}
                    className={Style.swiperContainer}
                    navigation={{
                      nextEl: '.next',
                      prevEl: '.prev',
                    }}
                    spaceBetween={50}
                    slidesPerView={1}
                    touchRatio={0}
                    onSlideChange={() => {}}
                    onReachBeginning={() => {
                      setSlides({ ...slides, firstSlide: true });
                    }}
                  >
                    {/* RENDERING QUESTIONS */}
                    {questionsList.map((v: JSX.Element[]): JSX.Element[] => v)}
                  </Swiper>
                  {
                    <Button
                      variant='Light'
                      className={classNames(
                        { [Style.backButtonHide]: slides.firstSlide }, // NOT SHOW ON FIRST SLIDE
                        Style.backButtonShow,
                        'prev'
                      )}
                    >
                      Back
                    </Button>
                  }
                </>
              )}
              {slides.loading && ( // LOADING EFFECT
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#1691d1'}
                  height={'30%'}
                  width={'30%'}
                  className='loadingSpinner'
                />
              )}
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
