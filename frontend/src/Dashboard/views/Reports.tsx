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
import React, {useContext, useEffect, useReducer} from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  Input,
  Button, Col,
} from "reactstrap";
// core components
import Header from "../components/Headers/Header";
import FeedbackEntry from "./dynamic-data/FeedbackEntry";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {url} from "../../Config/Config";
import Report from "./dynamic-data/Report";

const Tables = () => {
  //Generic API Request
  const [reportsFullArr, setReportsFullArr] = useReducer(
      (curState: any, newState: any) => newState,
      []
  );

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
    };
    fn();
  }, []);



  return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>



          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Reports</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Assessment</th>
                    <th scope="col">Date</th>

                  </tr>
                  </thead>
                  <tbody>
                  {reportsFullArr.map((data: any, index: any) => (
                      <Report key={index} data={data} />
                  ))}

                  </tbody>
                </Table>
                <CardFooter className="py-4">

                </CardFooter>
              </Card>
            </div>
          </Row>

        </Container>
      </>
  );
};

export default Tables;


/*
 <th scope="col">PDF downloaded</th>
                    <th scope="col">Score</th>
                    <th scope="col">Completion</th>
                    <th scope={"col"}>Answers</th>
                    <th scope="col" />
 */



