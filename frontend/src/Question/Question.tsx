import React, {
  useState,
  useContext,
  MouseEvent,
  useEffect,
  useReducer,
  useMemo,
  memo,
  useLayoutEffect,
} from 'react';
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
  Accordion,
  Card,
} from 'react-bootstrap';
import { useRoutes } from 'react-router-dom';
// import { Swiper, Slide } from 'react-dynamic-swiper';
// import 'react-dynamic-swiper/lib/styles.css';
import { MetaContext } from '../Context/Context';

import Style from './question.module.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { url } from '../Config/Config';
import { publicAPI } from '../Common/Services/API';
import { answerFormatter } from './AnswerFormatter';
import BodyContainer from '../Common/BodyContainer';
import QuestionAfterPage from './QuestionAfterPage';

// SWIPE VARIABLE
let swp: any;
// let questionFullArr: any = [];
let questionShortArr: any = [];
//let currentQuestSelect: string = 'AppControl';
let serverError: boolean = false;

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
  submitted: boolean;
}
SwiperCore.use([Navigation, Pagination, Scrollbar]);

interface Props {
  questSelected?: string;
  // questionFullArr: any[];
}

type Action = 'incr' | 'decr' | 'reset';

const setSlideDispatch = (state: number, action: Action) => {
  console.log('setSlideDispatch', action, state);
  switch (action) {
    case 'incr':
      return state + 1;
      break;
    case 'decr':
      return state - 1;
      break;
    case 'reset':
      return 0;
  }
};

function useWindowSize() {
  const [size, setSize] = useState({ width: 1400, height: 0 });

  const updateSize = () => {
    const width = window.innerWidth;
    const height = window.innerWidth;
    //console.log('updateSize', width, height);
    setSize({ width, height });
  };

  useLayoutEffect(() => {
    addEventListener('resize', updateSize);
    return () => {
      removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
}

const getQuestions = async () => {
  return await publicAPI
    .getAllQuestions()
    .then((r) => {
      console.log('r', r);
      let questionFullArr: any = [];
      let questionTypeArr: any = [];
      //@ts-ignore
      r.result.forEach((v, i) => {
        //@ts-ignore
        questionTypeArr.push(v.QuestionType);
        questionFullArr.push(v);
      });
      window.localStorage.setItem(
        'questionnaire',
        JSON.stringify(questionFullArr)
      );
      return questionFullArr;
    })
    .catch((e) => {
      return ['error'];
    });
};

const Question = memo(
  ({ questSelected = 'AppControl' }: Props): JSX.Element => {
    let swipe: unknown;
    const [slides, setSlides] = useState<useState>({
      firstSlide: true,
      questionCompleted: false,
      loading: false,
      multiQues: [],
      answers: [[], []],
      submitted: false,
    });
    const [questionsList, setQuestionsList] = useState([]);
    const [slideIndex, setSlideIndex] = useReducer(setSlideDispatch, 0);
    const size = useWindowSize();
    console.log('questSelected', questSelected);
    //console.log('slides', slides);
    let { multiQues } = slides;
    // Triggered twice - due to dev env (ReactJS default setting)

    const questionGenerator = async (arr: any[]) => {
      //  if (questionsList.length === 0) {
      //  console.log('For loop ran..');
      let lengthArr: any = [];
      let tempArr: any = [];

      // Push all relevant questions to LengthArr to count the number of questions
      arr.forEach((v, i) => {
        if (v.QuestionCategory === questSelected) {
          lengthArr.push({ i: v });
        }
      });
      console.log('lengthArr', lengthArr.length);

      // Loop through questions and push JSX elements to tempArr
      arr.forEach((v: any, i: number) => {
        let questNum = tempArr.length + 1; // use for index of click
        if (v.QuestionCategory === questSelected) {
          questionShortArr.push(v);
          //questionsList.
          tempArr.push(
            <SwiperSlide
              style={{ minHeight: '300px', width: '100vw' }}
              key={`quest${i}`}
              virtualIndex={i + 1}
            >
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
                      // add new multiQues to State
                      // if (ind == 0) {
                      //   console.log('v.Answers.map');
                      //   let multiQuesArr = multiQues; // get current list from state
                      //   multiQuesArr.push({
                      //     QuestNum: questNum,
                      //     AnswerIndexSelected: [],
                      //   });
                      //   setSlides({ ...slides, multiQues: multiQuesArr });
                      //   let answerInd = ind;
                      // }

                      return (
                        <Button
                          id={`button${ind}`} // each button has a unique ID.
                          key={`button${ind}`}
                          // @ts-ignore
                          className={classNames(Style.answerButton)}
                          variant='success'
                          block
                          data-clicked={'Unclicked'}
                          data-answerindex={ind}
                          data-questionnum={questNum}
                          name={val.Value}
                          onClick={(event: MouseEvent<HTMLElement>) => {
                            // get button
                            const button = document.getElementById(
                              `button${ind}`
                            );
                            let clickStatus = (event.target as HTMLElement).getAttribute(
                              'data-clicked'
                            );
                            let answerInd = (event.target as HTMLElement).getAttribute(
                              'data-answerindex'
                            );
                            let questNum = (event.target as HTMLElement).getAttribute(
                              'data-questionnum'
                            );
                            if (clickStatus === 'Unclicked') {
                              console.log('Add');
                              handleAnswer(
                                event,
                                v.QuestionType,
                                questNum,
                                answerInd,
                                lengthArr.length,
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
                                lengthArr.length,
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
                      style={{ backgroundColor: '#1b9a41 !important' }}
                      name={`${v}nextButton`}
                      onClick={() => {
                        setSlideIndex('incr');
                      }}
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
                              answerInd,
                              lengthArr.length
                            );
                            setSlideIndex('incr');
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
      setQuestionsList(tempArr);
      console.log('questionList after', tempArr, tempArr.length);
      // }
    };

    const resetState = () => {
      setSlides({
        firstSlide: true,
        questionCompleted: false,
        loading: false,
        multiQues: [],
        answers: [[], []],
        submitted: false,
      });
    };

    // reset all state
    useLayoutEffect(() => {
      console.log('useLayoutEffect');
      questionShortArr = [];
      setSlideIndex('reset');
      getQuestions().then((arr) => {
        questionGenerator(arr);
        resetState();
      });
    }, [questSelected]);

    useEffect(() => {
      setSlides({ ...slides, loading: true });
    }, [questSelected]);

    useEffect(() => {
      try {
        swp.update();
      } catch (e) {
        console.log('swp', e);
      }
    }, [questionsList.length]);

    const handleAnswer = (
      event: any,
      QuestionType: string,
      questNum: any,
      answerInd: any,
      questLength: number,
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

      console.log('questionsList.length', questLength);
      // LAST SLIDE
      if (questNum === questLength) {
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
              // setSlides({ ...slides, submitted: true });

              window.location.assign(`${url.clientBaseURL}/question-afterpage`);
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
            // setSlides({ ...slides, loading: false });
            resetState();
            alert('Failed to submit answers. Please retry.');
          });
      }
    };

    // const qestLength = () => questionsList.length;
    const slidePercentage = useMemo(() => {
      return slideIndex >= 100
        ? 100
        : Math.round(
            (slideIndex /
              //  questionsList.length < 1 ? 11 :
              questionsList.length) *
              100
          );
    }, [slideIndex]);

    console.log('slideIndex', slideIndex);

    if (questionsList.length < 1 || slides.loading) {
      return (
        <ReactLoading
          type={'spinningBubbles'}
          color={'#1691d1'}
          height={'10%'}
          width={'10%'}
          className={Style.loadingSpinner}
        />
      );
    }

    return (
      <>
        <BodyContainer>
          <div
            style={{
              maxWidth: `${size.width - (size.width < 700 ? 200 : 500)}px`,
            }}
          >
            <ProgressBar
              now={slidePercentage}
              label={`${slidePercentage || 0}%`}
              //variant='success'
              style={{ height: '20px' }}
            />
            <h2 className={Style.mainTitle}>{questSelected}</h2>
            {!serverError && (
              <>
                {!slides.questionCompleted && ( // SHOW ON QUESTIONS NOT COMPLETE
                  <>
                    <Swiper
                      onInit={(s) => {
                        swp = s;
                      }}
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
                      {questionsList.map(
                        (v: JSX.Element[]): JSX.Element[] => v
                      )}
                    </Swiper>

                    {
                      <Button
                        variant='Light'
                        className={classNames(
                          { [Style.backButtonHide]: slides.firstSlide }, // NOT SHOW ON FIRST SLIDE
                          Style.backButtonShow,
                          'prev'
                        )}
                        onClick={() => {
                          setSlideIndex('decr');
                        }}
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
                    className={Style.loadingSpinner}
                  />
                )}
              </>
            )}
            {/* ------- Hidden in prod/test as no text is prepared so far ---------- */}
            {/* <Accordion
              defaultActiveKey='0'
              style={{ paddingTop: '20px', marginBottom: '30px' }}
            >
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  {`Why complete ${questSelected}`}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>{`${questSelected} allow users to...`}</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='1'>
                  {`What your should expect from ${questSelected}`}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='1'>
                  <Card.Body>test...</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion> */}
          </div>
        </BodyContainer>
      </>
    );
  }
);
export default Question;
