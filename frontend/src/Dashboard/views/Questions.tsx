import React, {
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  useContext,
  useReducer,
} from 'react';

// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts

// react plugin used to create charts
import { Bar } from 'react-chartjs-2';
//import Chart from "../variables/charts";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  FormGroup,
  Label,
  Input,
  Form,
  Toast,
  ToastHeader,
  ToastBody,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { publicAPI } from '../../Common/Services/API';

// core components
import { chartOptions, parseOptions, chartExample2 } from '../variables/charts';

import Header from '../components/Headers/Header';

import axios from 'axios';
import { url } from '../../Config/Config';
import { AuthContext } from '../../Dashboard/context/AuthContext';

import Question from './dynamic-data/Question';
import questionCategories from '../../Utilise/questionCategories';
import { string } from 'yup/lib/locale';
import style from './Question.module.scss';

interface questList {
  Answers: any[];
  Mitigation: string;
  QuestionCategory: string;
  QuestionCore: boolean;
  QuestionCoreNumber: number;
  QuestionDescription: string;
  QuestionLabel: string;
  QuestionNumber: number;
  QuestionSetNumber: number;
  QuestionType: string;
  _v: number;
  _id: string;
}

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const getRelevantQuest = (category: string, list: questList[]) => {
  return list.filter((v, i) => v.QuestionCategory === category);
};

const payloadFormat = (questionObj: any, token: string) => {
  const fieldsArr = [];

  // separate fields by questionNum in the array
  for (const v in questionObj) {
    let split = v.split('_');
    let questIndex = parseInt(split[1]) - 1;
    let fieldName = split[0];
    if (!fieldsArr[questIndex]) {
      fieldsArr[questIndex] = {};
      fieldsArr[questIndex] = { [fieldName]: questionObj[v] };
    } else {
      //@ts-ignore
      fieldsArr[questIndex][fieldName] = questionObj[v];
    }
  }
  console.log('fieldsArr', fieldsArr);

  // format to required payload
  const questionArr = fieldsArr.map((v, i) => {
    return {
      //@ts-ignore
      number: v.questionNo,
      change: {
        //@ts-ignore
        QuestionLabel: v.question,
        //@ts-ignore
        Mitigation: v.mitigation,
        //@ts-ignore
        QuestionDescription: v.toolTip,
      },
    };
  });

  return {
    accessToken: token,
    questions: questionArr,
  };
};

const QuestUpdateApi = async (payload: any) => {
  //   let response = await adminAPI.adminlogin(JSON.stringify(content));
  try {
    let response = await axios(`${url.serverBaseURL}/update-question`, {
      data: payload,
      method: 'POST',
    });
    console.log('response', response.data);

    return true;
  } catch (e) {
    return false;
  }
};

const Questions = (props: any) => {
  const [activeNav, setActiveNav] = useState(1);
  const [showSuccToast, setSuccToast] = useReducer(
    (oldState: boolean) => !oldState,
    false
  );
  const [showFailedToast, setFailToast] = useReducer(
    (oldState: boolean) => !oldState,
    false
  );
  const [chartExample1Data, setChartExample1Data] = useState('data1');
  //@ts-ignore
  const { getToken } = useContext(AuthContext);
  const [selectedQuest, setQuest] = useState<string>();

  const [formikState, setFormikState] = useState<{
    initialValues: any;
    questList: questList | any;
    yup: any;
  }>({
    initialValues: {},
    questList: [],
    yup: {},
  });
  /*
  if (window.Chart) {
      parseOptions(Chart, chartOptions());
  }
  */
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const questionArr = useMemo(() => {
    const arr = window.localStorage.getItem('questionnaire') || '';
    return JSON.parse(arr);
  }, []);

  const toggleNavs = (
    e: { preventDefault: () => void },
    index: any | React.SetStateAction<number>
  ) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  console.log('selectedQuestion', selectedQuest);

  //@ts-ignore

  useLayoutEffect(() => {
    if (selectedQuest) {
      let filteredList = getRelevantQuest(selectedQuest, questionArr);

      let initialV = {};
      let fieldName = ['questionNo', 'question', 'toolTip', 'mitigation'];
      let schema = {};
      // Yup.object().shape({
      // BusinessStageTrading: Yup.string().required(
      //   'Please choose a stage of your business'
      // ),
      filteredList.forEach((v, i) => {
        // @ts-ignore
        initialV['questionNo' + '_' + v.QuestionNumber] = v.QuestionNumber; // @ts-ignore
        initialV['question' + '_' + v.QuestionNumber] = v.QuestionLabel; // @ts-ignore
        initialV['toolTip' + '_' + v.QuestionNumber] = v.QuestionDescription; // @ts-ignore
        initialV['mitigation' + '_' + v.QuestionNumber] = v.Mitigation; // @ts-ignore

        schema['question' + '_' + v.QuestionNumber] = Yup.string()
          .min(10, '')
          .required('');
        // @ts-ignore
        schema['mitigation' + '_' + v.QuestionNumber] = Yup.string()
          .min(10, '')
          .required('');
      });

      setFormikState({
        initialValues: initialV,
        questList: filteredList,
        yup: Yup.object().shape(schema),
      });
    }
  }, [selectedQuest]);

  let Schema = Yup.object().shape({
    BusinessStageTrading: Yup.string().required(
      'Please choose a stage of your business'
    ),
  });

  useEffect(() => {
    console.log('FormikState', formikState);
  });

  // const handleSubmit = (e) => {
  //   console.log('submitted');
  //   e.preventDefault();
  // };

  const formSubmit = async (value: any) => {
    const payload = payloadFormat(value, getToken());
    console.log('payload', payload.questions);
    return await QuestUpdateApi(payload);
  };

  const toastHandler = (type: string) => {
    if (type === 'success') {
      setSuccToast();
      setTimeout(() => {
        setSuccToast();
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h3 className='mb-0'>
                      {selectedQuest || 'Question - Select from dropdown.'}
                    </h3>
                  </div>
                  <div className='col text-right'>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>Select Assessment</DropdownToggle>
                      <DropdownMenu>
                        {questionCategories.map((v, i) => (
                          <DropdownItem
                            key={i}
                            onClick={() => {
                              setQuest(v.key);
                            }}
                          >
                            {v.key}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Row>
              </CardHeader>
              {formikState.questList.length > 1 && (
                <Formik
                  enableReinitialize
                  initialValues={formikState.initialValues}
                  //initialValues={{ mitigation_1: 'test' }}
                  // validationSchema={formikState.yup}
                  onSubmit={(values, actions) => {
                    console.log('onSubmit', values);
                    const call = async () => {
                      const result = await formSubmit(values);
                      if (result) {
                        actions.setSubmitting(false);
                        toastHandler('success');
                      } else {
                        alert('failed');
                      }
                    };
                    call();
                  }}
                  validate={(e) => {
                    console.log('validator', e);
                  }}
                >
                  {({
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                    values,
                    handleSubmit,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Table
                        className='align-items-center table-flush'
                        responsive
                      >
                        <thead className='thead-light'>
                          <tr>
                            <th style={{ maxWidth: '50px' }} scope={'col'}>
                              No.
                            </th>
                            <th scope={'col'}>Question</th>
                            <th scope={'col'}>Mitigation</th>
                            <th scope={'col'}>Tooltip</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <Field
                          type='text'
                          name='mitigation_1'
                          key='mitigation'
                        /> */}

                          {formikState.questList.map((v: any) => (
                            <tr>
                              <th scope='row'>
                                {v.QuestionNumber}
                                {/* <Field
                                style={{ maxWidth: '50px' }}
                                type='text'
                                name={'questionNo' + '_' + v.QuestionNumber}
                                key={'questionNo' + '_' + v.QuestionNumber}
                                disable
                              /> */}
                              </th>
                              <td>
                                <Field
                                  className={style.textArea}
                                  type='text'
                                  name={'question' + '_' + v.QuestionNumber}
                                  key={'question' + '_' + v.QuestionNumber}
                                  as='textarea'
                                  rows={3}
                                />
                              </td>
                              <td>
                                <Field
                                  className={style.textArea}
                                  type='text'
                                  name={'mitigation' + '_' + v.QuestionNumber}
                                  key={'mitigation' + '_' + v.QuestionNumber}
                                  as='textarea'
                                  rows={3}
                                />
                              </td>
                              <td>
                                <Field
                                  className={style.textArea}
                                  type='text'
                                  name={'toolTip' + '_' + v.QuestionNumber}
                                  key={'toolTip' + '_' + v.QuestionNumber}
                                  as='textarea'
                                  rows={3}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className={style.buttonContainer}>
                        <Button
                          style={{ padding: '10px 30px' }}
                          color='primary'
                          // onClick={(e: { preventDefault: () => any }) =>
                          //   e.preventDefault()
                          // }
                          size='sm'
                          type='submit'
                          disabled={isSubmitting}
                        >
                          Update
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Toast isOpen={showSuccToast} className={style.noticeModal}>
        <ToastHeader
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Successfully
        </ToastHeader>
        <ToastBody>Updated Successfully</ToastBody>
      </Toast>
      <Toast isOpen={showFailedToast} className={style.noticeModal}>
        <ToastHeader>Failed</ToastHeader>
        <ToastBody>Updated Failed</ToastBody>
      </Toast>
    </>
  );
};

export default Questions;
