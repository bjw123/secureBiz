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
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Media,
  Badge,
  UncontrolledTooltip,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, CardFooter, Pagination, PaginationItem, PaginationLink,
} from "reactstrap";
// core components
import Header from "../components/Headers/Header";

const Profile = () => {
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
                <h3 className="mb-0">Admin Logs</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last Login</th>
                  <th scope="col">Actions</th>
                  <th scope="col" />
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/admin.jpg")
                                  .default
                            }
                        />
                      </a>
                      <Media>
                          <span className="mb-0 text-sm">
                            Argon Bootstrap
                          </span>
                      </Media>
                    </Media>
                  </th>
                  <td>abc@gmail.com</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      pending
                    </Badge>
                  </td>
                  <td>
                    <div className="last-login">
                      12:00AM 1/1/11
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">DELETE X</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/admin.jpg")
                                  .default
                            }
                        />
                      </a>
                      <Media>
                          <span className="mb-0 text-sm">
                            Argon Bootstrap
                          </span>
                      </Media>
                    </Media>
                  </th>
                  <td>abc@gmail.com</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      pending
                    </Badge>
                  </td>
                  <td>
                    <div className="last-login">
                      12:00AM 1/1/11
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">DELETE X</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/admin.jpg")
                                  .default
                            }
                        />
                      </a>
                      <Media>
                          <span className="mb-0 text-sm">
                            Argon Bootstrap
                          </span>
                      </Media>
                    </Media>
                  </th>
                  <td>abc@gmail.com</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      pending
                    </Badge>
                  </td>
                  <td>
                    <div className="last-login">
                      12:00AM 1/1/11
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">DELETE X</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/admin.jpg")
                                  .default
                            }
                        />
                      </a>
                      <Media>
                          <span className="mb-0 text-sm">
                            Argon Bootstrap
                          </span>
                      </Media>
                    </Media>
                  </th>
                  <td>abc@gmail.com</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      pending
                    </Badge>
                  </td>
                  <td>
                    <div className="last-login">
                      12:00AM 1/1/11
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">DELETE X</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>






                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}

                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
