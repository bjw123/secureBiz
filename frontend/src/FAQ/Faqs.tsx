import React from 'react';

import {Accordion, Button, Card, Container, Jumbotron} from "react-bootstrap";
import BodyContainer from "../Common/BodyContainer";
import "./faqs.scss"
import Styles from "../Home/homepage.module.scss";
import classNames from "classnames";
import {Link} from "react-router-dom";

function Faq() {
    return (<React.Fragment>
        <div className={Styles.body}>
            <div
                className={classNames([
                    Styles.body_content,
                    Styles.body_content_nav_fixed,
                ])}
            >
            </div>
            <div
                id='billboard_faq'
                className={classNames([
                    Styles.billboard,
                    Styles.billboard_half_height,
                ])}
            >
                <div
                    style={{ background: 'radial-gradient(#50504e, #363635)' }}
                    // className={classNames([
                    //   Styles.billboard_fill,
                    //   Styles.billboard_fill_inverse,
                    //   Styles.billboard_fill_solid,
                    // ])}
                >
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
                                        Frequently Asked Questions
                                    </div>
                                    <div
                                        className={classNames([
                                            Styles.well,
                                            Styles.well_inverse,
                                        ])}
                                    >
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="0">
                                                        <strong>Who should do this?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>This App is designed with small to medium size businesses in mind. </h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>
                                                                    Thus, the Chief Information Officer, or their agent, should be the one to complete this survey.
                                                                </p>
                                                            </Container>
                                                        </Jumbotron> </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="1" >
                                                        <strong>Do I need to do this just the once or on some regular basis?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Surveys are a snapshot in time.  They tell you how things were then.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>
                                                                    As such we would advise that the survey be done at least once/year to review is the organisations status has changed. Also, whenever there is major organisational change.  Often it is the state of the organisation that will determine if strategies are being applied rather than the state of the IT infrastructure.
                                                                </p>
                                                            </Container>
                                                        </Jumbotron></Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="2">
                                                        <strong>Is this just for work or should I also do this survey for my home system?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="2">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Although the Secure Biz application has been developed with small to medium sized businesses in mind, the ASD Essential Eight is designed to be applicable to both organisations and individuals.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>As such some of the additional questions and advice may be less relevant to individuals.
                                                                </p>
                                                            </Container>
                                                        </Jumbotron></Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="3">
                                                        <strong>I looked at the ASD Essential Eight page, and there seems to be more questions in your assessment than they suggest?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="3">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Well spotted.  Secure Biz has built this app on the model of the Essential Eight, but we recognise that there is more to cyber security that just this base model.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>Consequentially each strategy has a series of additional questions designed to provide additional advice and guidance beyond that of the Essential Eight.  These questions do not impact your organisation’s Maturity Level, but we hope they will add to your cyber security setting and awareness.
                                                                </p>
                                                            </Container>
                                                        </Jumbotron>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="4">
                                                        <strong>So, do I need just a single maturity level, or one for all eight strategies?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="4">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Your organisation’s cyber security is dependent on all eight strategies.  Thus, you need a Maturity Level for each one.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>Once you have that your organisation will be able to determine any changes required, and the priority each should be given.</p>
                                                            </Container>
                                                        </Jumbotron>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>





                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="6">
                                                        <strong>So, do I need just a single maturity level, or one for all eight strategies?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="6">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Your organisation’s cyber security is dependent on all eight strategies. </h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>
                                                                    Thus, you need a Maturity Level for each one.  Once you have that your organisation will be able to determine any changes required, and the priority each should be given.
                                                                </p>
                                                            </Container>
                                                        </Jumbotron> </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>




                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="8">
                                                        <strong>Are my responses secure?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="8">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Except for when Feedback is provided, no data is retained!</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>This includes your answers, IP address, and all meta data.  Additionally, all feedback responses are encrypted when at rest.</p>
                                                            </Container>
                                                        </Jumbotron>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="9">
                                                        <strong>What should I do once I have all eight Maturity levels?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="9">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>Our advice would be to act upon the directions provided.  Identify the strategies with the lowest Maturity Levels and make them the highest priority.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>If you feel that the task is beyond your skills, seek the assistance of a suitably trained IT professional.</p>
                                                            </Container>
                                                        </Jumbotron>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="10">
                                                        <strong>Does a maturity level of 3 for all eight strategies ensure that our system will be totally safe?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="10">
                                                    <Card.Body>
                                                        <Jumbotron fluid>
                                                            <Container>
                                                                <h2 className={classNames([
                                                                    Styles.h2
                                                                ])}>No!  What is does mean is that you have taken reasonable minimum steps to ensure your organisation enjoys at least a base level of cyber security.</h2>
                                                                <p className={classNames([
                                                                    Styles.p
                                                                ])}>If you feel that a greater level of security is required, please refer to the Australian Government Information Security Manual  and Strategies to Mitigate Cyber Security Incidents.  If these documents are too daunting (not all of us are IT professionals), then seek the assistance of a suitably trained IT professional, or contact the ASCS.  That is what they are there for.</p>
                                                            </Container>
                                                        </Jumbotron>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="title" eventKey="11">
                                                        <strong>Is there someone who can explain some of this to me?</strong>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="11">
                                                    <Card.Body><Jumbotron fluid>
                                                        <Container>
                                                            <h2 className={classNames([
                                                                Styles.h2
                                                            ])}>Unfortunately, currently Secure Biz does not have the resources to provide additional support.</h2>
                                                            <p className={classNames([
                                                                Styles.p
                                                            ])}>If you need further guidance on this app, please provide Feedback through the link above.  It is always most welcome. For additional support on the ASD Essential Eight please refer to the following link.  For additional cyber security support please contact a suitably trained IT professional or contact the ASCS.  That is what they are there for.</p>
                                                        </Container>
                                                    </Jumbotron>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>













           


        </React.Fragment>
    );
}

export default Faq;
