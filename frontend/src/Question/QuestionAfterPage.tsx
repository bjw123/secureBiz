import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useReducer,
  Component,
} from 'react';
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
import BodyContainer from '../Common/BodyContainer';
import Style from './question.module.scss';
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import { MetaContext } from '../Context/Context';
import generatePDF from '../Utilise/pdfGenerator';
import axios from 'axios';
import { url } from './../Config/Config';
import { resourceLimits } from 'worker_threads';

// define the columns we want and their titles

const tableGenerator = (data: any) => {
  let column = [
    {
      Question: 'Question',
      Response: 'Response',
      Mitigation: 'Mitigation',
    },
  ];
  let row = data.Questions.map((v: any) => {
    return {
      Question: v.QuestionLabel,
      Response: `${v.Answers[0]?.Label}`,
      Mitigation: v.Mitigation,
    };
  });
  console.log('tablegenerator', column, row);
  return {
    column,
    row,
  };
};

const setBoolReducer = (state: boolean) => {
  return !state;
};

let scoreComment = (level: any) => {
  if (!level) {
    return 'Result Not Available. Please retry.';
  }
  switch (Number(level)) {
    case 0:
      return 'Very Poor Score';
      break;
    case 1:
      return 'Poor Score';
      break;
    case 2:
      return 'Fair Score';
      break;
    case 3:
      return 'Excellent Score';
      break;
    default:
      return 'Your Score';
  } 
};

export default function QuestionAfterPage(props: any): JSX.Element {
  const [loading, setLoading] = useReducer(setBoolReducer, false);
  const [metaState, setMetaState] = useContext(MetaContext);
  let QuestionCategory = localStorage.getItem('QuestionCategory');
  let level = localStorage.getItem('Level');
  let answered = window.localStorage.getItem('formattedAnswer');
  //@ts-ignore
  let data = tableGenerator(JSON.parse(answered));

  const openPDF = (): void => {
    try {
      console.log('table data', data);
      generatePDF(data);
    } catch (e) {
      console.error(e);
    }
  };
  //Add Table Headers
  const Tableheader = (): any => {
    let header = Object.keys(data.column[0]);
    header.unshift('Question No.');
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  //Add Table Rows
  const Tabledata = (): any => {
    let resultData = data.row;
    return resultData.map((resultData: any, index: number) => {
      const { Question, Response, Mitigation } = resultData; //destructuring
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{Question}</td>
          <td>{Response}</td>
          <td>{Mitigation}</td>
        </tr>
      );
    });
  };
  // Display Table
  const ResultTable = (): any => {
    return (
      <div>
        <h5 className={classNames(Style.tableTitle)}>
          Maturity Assesment Detailed Responses and Mitigation Strategy
        </h5>
        <table className={classNames(Style.tableData)}>
          <tbody>
            <tr>
              <Tableheader />
            </tr>
            <Tabledata />
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <BodyContainer>
        <>
          <h1>{scoreComment(level)}</h1>
          <h2>
            Your Maturity Level for {QuestionCategory || 'Not available'} is{' '}
            {level || 'Not available'}
          </h2>
          <ResultTable />
          <p>Try out another questionnaire.</p>
          <Button onClick={openPDF}>Download in PDF</Button>
        </>
      </BodyContainer>
    </>
  );
}
