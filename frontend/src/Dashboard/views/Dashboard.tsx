import React, { useContext, useEffect, useReducer, useState } from 'react';

//import classnames from "classnames";
//import "../assets/scss/argon-dashboard-react.scss";

// react plugin used to create charts

//import Chart from "../variables/charts";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
} from 'reactstrap';

// core components
import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from '../variables/charts.js';

//import '../assets/plugins/nucleo/css/nucleo.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

import Header from '../components/Headers/Header';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { url } from '../../Config/Config';
import Report from './dynamic-data/Report';
import { log } from 'util';
import { forEach } from 'react-bootstrap/ElementChildren';
import FeedbackEntry from './dynamic-data/FeedbackEntry';
import { publicAPI } from '../../Common/Services/API';
import DashboardTable from './dynamic-data/dashboardTable';

export default function Dashboard({ props }: any) {
  //Generic API Request
  /*const [reportsFullArr, setReportsFullArr] = useReducer(
      (curState: any, newState: any) => newState,
      []
  );*/
  const [reportsFullArr, setReportsFullArr] = useState([]);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  let graphData = {
    labels: [
      'AppControl',
      'OfficeMacro',
      'PatchApp',
      'Hardening',
      'AdminPriv',
      'MFA',
      'PatchOS',
      'Backups',
    ],
    datasets: [
      {
        label: 'Assessments',
        data: [],
        maxBarThickness: 10,
      },
    ],
  };

  let recent = [];

  //@ts-ignore
  const { getToken } = useContext(AuthContext);
  //const content = useRoutes(routes);

  const getReports = async (token: string) => {
    try {
      //${url.serverBaseURL}/get-stats
      let response = await axios(`${url.serverBaseURL}/get-stats`, {
        data: { accessToken: token },
        method: 'POST',
      });
      console.log('response', response.data);

      return response.data.result;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  useEffect(() => {
    // console.log('app useEffect');
    // getFeedback().then((feedbackArr) => setFeedbackFullArr(feedbackArr));
    const fn = async () => {
      let result = await getReports(getToken());
      console.log('useEffect async');
      setReportsFullArr(result);

      const questList = await publicAPI.getAllQuestions();

      // API to get question list
      let questionFullArr: any = [];
      // @ts-ignore
      questList.result.forEach((v: any) => {
        questionFullArr.push(v);
      });
      window.localStorage.setItem(
        'questionnaire',
        JSON.stringify(questionFullArr)
      );
    };
    fn();
    recent.push();
  }, []);

  //Count reports
  let categories = [
    ['AppControl', 0],
    ['OfficeMacro', 0],
    ['PatchApp', 0],
    ['Hardening', 0],
    ['RestrictAdm', 0],
    ['MFA', 0],
    ['PatchOs', 0],
    ['Backups', 0],
  ];

  reportsFullArr.forEach((element) => {
    categories.forEach((cat) => {
      if (cat[0] == element['category']) {
        //console.log("hit", cat[0])
        // @ts-ignore
        cat[1]++;
      }
    });
  });
  //console.log("count array:   ", categories)

  categories.forEach((element) => {
    // @ts-ignore
    graphData.datasets[0].data.push(element[1]);
  });

  let arr1: any = [];
  arr1.push(reportsFullArr[0]);
  arr1.push(reportsFullArr[1]);
  arr1.push(reportsFullArr[2]);
  console.log('report 0   ', arr1);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid id={'Assessments'}>
        <Row>
          <Col className='mb-5 mb-xl-0' xl='8'>
            <Card className='shadow' id={'admin-activity-log'}>
              <CardHeader className='border-0'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h3 className='mb-0'>Completed Assessments</h3>
                  </div>
                  <div className='col text-right'>
                    <Button
                      color='primary'
                      href='#pablo'
                      onClick={(e: { preventDefault: () => any }) =>
                        e.preventDefault()
                      }
                      size='sm'
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <tbody>
                  {categories.map((data: any, index: any) => (
                    <DashboardTable key={index} data={data} />
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xl='8'>
            <Card className='shadow' id={'vertical-graph'}>
              <CardHeader className='bg-transparent'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h6 className='text-uppercase text-muted ls-1 mb-1'>
                      Popularity
                    </h6>
                    <h2 className='mb-0'>Completed Assessments</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className='chart'>
                  <Bar data={graphData} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
