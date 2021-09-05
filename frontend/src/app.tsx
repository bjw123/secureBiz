import React, { useEffect, useState } from 'react';
import NavComponent from './Nav/Nav';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import AdminHome from './AdminLogin/AdminHome';
import QuestionPage from './Common/QuestionPage/QuestionPage';
import RegisterNewAdmin from './AdminLogin/RegisterNewAdmin';
import AdminStatistics from './AdminLogin/AdminStatistics';
import Report from './Common/QuestionPage/QuestionReport';
import { publicAPI } from './Common/Services/API';
import { MetaContextProvider } from './Context/Context';
import { useRoutes } from 'react-router-dom';
import QuestionModalAfterPage from './Common/QuestionModal/QuestionModalAfterpage';
import QuestionModal from './Common/QuestionModal/QuestionModal';
import Admin from './Dashboard/layouts/Admin';
import { MainLayout } from './Component/MainLayout';

import { routes } from './routes';
import Sidebar from './Dashboard/components/Sidebar/Sidebar';
import Feedback from './Dashboard/views/Feedback';
import Dashboard from './Dashboard/views/Dashboard';
import Questions from './Dashboard/views/Questions';
import Question from './Question/Question';
import QuestionAfterPage from './Question/QuestionAfterPage';
import ReactLoading from 'react-loading';
import Style from './Home/home.module.scss';
import Tables from './Dashboard/views/Reports';
import Faq from './FAQ/Faqs';
import AsdInfo from '../benefits/Benefits';
import SecurebizPitch from '../benefits/WhyUs';

export default function App(): JSX.Element {
  const [questionFullArr, setQuestionFullArr] = useState([]);
  const [questSelected, setQuestSelected] = useState('AppControl');

  let route = [
    {
      path: '/',
      element: <MainLayout setQuest={(q: string) => setQuestSelected(q)} />,
      children: [
        {
          path: '/',
          element: (
            // questionFullArr.length > 1 && (
            <Home
              // questionFullArr={questionFullArr}
              setQuest={(q: string) => setQuestSelected(q)}
            />
          ),
          // ),
        },

        { path: '/faq', element: <Faq /> },
        { path: '/asd-info', element: <AsdInfo /> },
        { path: '/why-us', element: <SecurebizPitch /> },

        {
          path: '/question',
          element: (
            // questionFullArr.length > 1 && (
            <Question
              // questionFullArr={questionFullArr}
              questSelected={questSelected}
            />
          ),
          // ),
        },
        {
          path: '/question-afterpage',
          element: (
            // questionFullArr.length > 1 &&
            <QuestionAfterPage />
          ),
        },
      ],
    },
    {
      path: '/admin',
      element: <Admin />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/feedback',
          element: <Feedback />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/questions',
          element: <Questions />,
        },

        {
          path: '/reports',
          element: <Tables />,
        },
      ],
    },
    {
      path: '404',
      element: <>NOT FOUND</>,
    },
  ];

  const content = useRoutes(route);

  //const content = useRoutes(routes);
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

  // useEffect(() => {
  //   getQuestions().then((arr) => {
  //     setQuestionFullArr(arr);
  //   });
  // }, []);
  return (
    <>
      <MetaContextProvider>
        {content}

        {/* {questionFullArr.length < 1 && (
          <div className={Style.loaderOverFlow}>
            <div className={Style.loaderCenter}>
              <ReactLoading
                type={'spinningBubbles'}
                color={'#1691d1'}
                height={'20%'}
                width={'20%'}
                className={Style.loadingSpinner}
              />
            </div>
          </div>
        )} */}
        {/* {questionFullArr[0] === 'error' && (
          <div className={Style.loaderOverFlow}>
            <div className={Style.containerCenter}>
              <h1>We are so sorry.</h1>
              <h3>
                Ops, looks like the server is encountering some issues. Please
                visit us again later.
              </h3>
            </div>
          </div>
        )} */}
        {/* <Footer /> */}
      </MetaContextProvider>
    </>
  );
}
