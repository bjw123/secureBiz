/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useState, useReducer } from 'react';

// reactstrap components
import {
  Badge,
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';

// core components
import Header from '../components/Headers/Header';
import FeedbackEntry from './dynamic-data/FeedbackEntry';
import { MetaContext } from '../../Context/Context';
import { publicAPI } from '../../Common/Services/API';
import { AuthContext } from '../../Dashboard/context/AuthContext';
import { url } from '../../Config/Config';

import axios from 'axios';

const Feedback = () => {
  //Generic API Request
  const [feedbackFullArr, setFeedbackFullArr] = useReducer(
    (curState: any, newState: any) => newState,
    []
  );

  //@ts-ignore
  const { getToken } = useContext(AuthContext);
  //const content = useRoutes(routes);

  const getFeedback = async (token: string): Promise<any> => {
    try {
      let response = await axios(`${url.serverBaseURL}/feedback-list`, {
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

  // const getFeedback = () => {
  //   publicAPI
  //     .getAllFeedback()
  //     .then((r) => {
  //       console.log('r', r);
  //       let feedBackArr: any = [];
  //       //let feedBackTypeArr: any = [];
  //       //@ts-ignore
  //       r.result.forEach((v, i) => {
  //         //@ts-ignore
  //         //feedBackFullArr.push(v.getAllFeedback); //needs change
  //         feedBackFullArr.push(v);
  //       });
  //       console.log('feedback list:  ', feedBackArr);

  //       return feedBackArr;
  //     })
  //     .catch((e) => {
  //       return ['error'];
  //     });
  // };

  useEffect(() => {
    // console.log('app useEffect');
    // getFeedback().then((feedbackArr) => setFeedbackFullArr(feedbackArr));
    const fn = async () => {
      let result = await getFeedback(getToken());
      console.log('useEffect async');
      setFeedbackFullArr(result);
    };
    fn();
  }, []);

  /* {feedbackFullArr.map((data, index) => (
        <FeedbackEntry key={index} data={data} onDelete={onDelete} onToggle={onToggle} />

   */

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <h3 className='mb-0'>Feedback Log</h3>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Comment</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {feedbackFullArr.map((data: any, index: any) => (
                    <FeedbackEntry key={index} data={data} />
                  ))}
                </tbody>
              </Table>
              <CardFooter className='py-4'>
                <nav aria-label='...'>
                  {/* <Pagination
                    className='pagination justify-content-end mb-0'
                    listClassName='justify-content-end mb-0'
                  >
                    <PaginationItem className='disabled'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='active'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className='sr-only'>(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination> */}
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Feedback;
