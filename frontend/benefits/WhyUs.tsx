import React from 'react';

import {
  Accordion,
  Alert,
  Button,
  Card,
  Container,
  Jumbotron,
  ListGroup,
} from 'react-bootstrap';

import BodyContainer from '../src/Common/BodyContainer';
import classNames from 'classnames';
import Styles from '../src/Home/homepage.module.scss';
import { Link } from 'react-router-dom';

function SecurebizPitch() {
  return (
    <React.Fragment>
      <div className={Styles.body}>
        <div
          className={classNames([
            Styles.body_content,
            Styles.body_content_nav_fixed,
          ])}
        >
          <div
            id='billboard_intro'
            className={classNames([
              Styles.billboard,
              Styles.billboard_full_height,
            ])}
          >
            <div id='bannerFullWidth' style={{ backgroundColor: '#00647c' }}>
              <div className={Styles.container}>
                <div className={Styles.row}>
                  <div className={Styles.billboard_content}>
                    <div className={Styles.header}>
                      <div
                        className={classNames([
                          Styles.billboard_title,
                          Styles.billboard_heading,
                        ])}
                      >
                        So, what can these assessments do to help secure your
                        business?
                      </div>
                      <div className={Styles.billboard_text}>
                        <p>
                          It costs nothing to do these assessments, but time.
                          However, it could mean the difference between
                          remaining operational, or simply shutting up shop and
                          walking away!
                        </p>
                        <p>
                          If your business doesn’t have any affective security
                          measures in place, you could put your money,
                          information, and reputation at risk.
                        </p>
                      </div>
                    </div>
                    {/* <div className = {classNames ([Styles.well, Styles.well_default])}>
                                <p>To find out more about ASD Essentials please click this link
                                    <a href=""> ASD Essential 8</a>
                                </p>
                            </div> */}
                    <div
                      className={classNames([
                        Styles.aside,
                        Styles.panel,
                        Styles.panel_tip,
                      ])}
                    >
                      <h3
                        className={Styles.panel_heading}
                        style={{ color: 'white' }}
                      >
                        <span
                          aria-hidden={true}
                          className={classNames([
                            Styles.fa,
                            Styles.fa_info_circle,
                          ])}
                        ></span>
                        It is known that small businesses are the target of 43%
                        of all cyber crimes.
                      </h3>
                      <p>
                        To find out more <span> </span>
                        <Link
                          style={{ color: 'white' }}
                          to='/why-us'
                          onClick={() =>
                            window.open(
                              'https://www.cyber.gov.au/sites/default/files/2020-09/ACSC-Annual-Cyber-Threat-Report-2019-20.pdf'
                            )
                          }
                        >
                          click here!
                        </Link>
                      </p>
                    </div>

                    <div
                      className={classNames([
                        Styles.aside,
                        Styles.panel,
                        Styles.panel_tip,
                      ])}
                    >
                      <h3
                        className={Styles.panel_heading}
                        style={{ color: 'white' }}
                      >
                        <span
                          aria-hidden={true}
                          className={classNames([
                            Styles.fa,
                            Styles.fa_info_circle,
                          ])}
                        ></span>
                        22% of small businesses in 2017 were affected by a
                        Ransomware attack that forced them to stop operating.
                      </h3>
                      <p>
                        To find out more <span> </span>
                        <Link
                          style={{ color: 'white' }}
                          to='/why-us'
                          onClick={() =>
                            window.open(
                              'https://www.cyber.gov.au/sites/default/files/2020-09/ACSC-Annual-Cyber-Threat-Report-2019-20.pdf'
                            )
                          }
                        >
                          click here!
                        </Link>
                      </p>
                    </div>

                    <div
                      className={classNames([
                        Styles.aside,
                        Styles.panel,
                        Styles.panel_tip,
                      ])}
                    >
                      <h3
                        className={Styles.panel_heading}
                        style={{ color: 'white' }}
                      >
                        <span
                          aria-hidden={true}
                          className={classNames([
                            Styles.fa,
                            Styles.fa_info_circle,
                          ])}
                        ></span>
                        The impact of cyberattacks resulted Australian
                        businesses to loose over $634 million in 2019 as stated
                        in ACSC Annual Cyber Threat Report
                      </h3>
                      <p>
                        To find out more <span> </span>
                        <Link
                          style={{ color: 'white' }}
                          to='/why-us'
                          onClick={() =>
                            window.open(
                              'https://www.cyber.gov.au/sites/default/files/2020-09/ACSC-Annual-Cyber-Threat-Report-2019-20.pdf'
                            )
                          }
                        >
                          click here!
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  <h4>Summary</h4>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      {' '}
                      <h2>
                        Help you to know at what level your cybersecurity status
                        is at
                      </h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>
                        Recognize how your business can improve its security
                        measures against cyber-threats
                      </h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>
                        Receive advice on areas of cyber security weakness.
                      </h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                  <h4>More Information</h4>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  <h4>Why is Cyber Security Important</h4>
                  <p>
                    The use of the internet to do business tasks has increased
                    over the years, so it is crucial to place effective cyber
                    security technologies, and practices, into your business to
                    stay protected and remain operational. Australian small to
                    medium sized businesses are challenged with an evolving and
                    complicated cyber environment, that can impact your business
                    dramatically through:{' '}
                  </p>
                  <ul>
                    <li>
                      Financial loss: theft of money, information, and just as
                      important, business reputation
                    </li>
                    <li>
                      Business loss: your operational effectiveness as well as
                      damage that may occur to other businesses that depend on
                      you
                    </li>
                    <li>
                      Operational Costs: repairing/replacing affected systems
                    </li>
                  </ul>

                  <h4>The following critical assets could be distorted: </h4>
                  <ul>
                    <li>Customer/employee records </li>
                    <li>Financial records </li>
                    <li>Product designs </li>
                    <li>Business plans </li>
                  </ul>

                  <h4>What kind of cyber threats your business could face?</h4>
                  <ul>
                    <li>Email phishing</li>
                    <li>Malware</li>
                    <li>Ransomware</li>
                    <li>DoS</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SecurebizPitch;
