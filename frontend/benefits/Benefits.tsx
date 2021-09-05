import React from 'react';

import {Accordion, Button, Card, Container, Jumbotron} from "react-bootstrap";

import "../src/FAQ/faqs.scss"
import BodyContainer from "../src/Common/BodyContainer";

function AsdInfo() {
    return (
        <React.Fragment>

            <BodyContainer>
                <div className={"container"}>
                <h1 className={"main"}>What is the ASD Essential Eight? </h1>
                <p>ASD stands for the Australian Signals Directorate (ASD).  The part of the Australian intelligence community designated with the task of monitoring foreign electronic communications. A sub-branch of ASD is the Australian Cyber Security Centre (ASCS).  Their mandate is to “provide advice and information about how to protect you, your family and your business online.”  They provide alerts, guidance, and other information to the public to achieve this goal.

                    Part of that guidance is the ASD Essential Eight.  This is a model – a collection of mitigation strategies – designed to minimise the risk of various cyber threats.

                </p>
                <h2>The eight strategies can be grouped into the two following categories.</h2>
                <h3>Mitigation Strategies to Prevent Malware Delivery and Execution: </h3>
                <ul>
                    <li>Application control – What software is allowed to run on your computers; </li>
                    <li>Patch applications – Is your software up to date; </li>
                    <li>Configure Microsoft Office macro settings – Protecting what it is allowed to do; </li>
                    <li>User application hardening; - Making user only you have access to your data;</li>
                </ul>
                <h3>Mitigation Strategies to Limit the Extent of Cyber Security Incidents: </h3>
                <ul>
                    <li>Restrict administrative privileges;</li>
                    <li>Patch operating systems; </li>
                    <li>Multi-factor authentication;</li>
                    <li>Daily backups;</li>
                </ul>

                <p>By assessing your systems against each of these strategies, a Maturity Level can be calculated for each one.  The Maturity Level is a number between 0 and 3. </p>

                    <h2>So, what does a Maturity Level mean?  According to the ASCS, a Maturity Level of:</h2>
                <ul>

                    <li>3 means the system is fully aligned</li>
                    <li>2 means the system is mostly compliant</li>
                    <li>1 means only partial alignment</li>
                    <li>0 means cyber security in this area needed attention yesterday!</li>
                </ul>


                <h3>ASCS advise that all organisations should be aiming to achieve a Maturity Level of three in all Eight strategies.</h3>
                <p>They also offer additional support and tailored advice should you feel your organisation warrants it.  Alternatively, they also provide access to such resources as the Australian Government Information Security Manual  and Strategies to Mitigate Cyber Security Incidents. Documents designed to assist you further in both your responsibilities and means to reduce your risks. What the ASCS does not do is provide a quick and easy to use tool for you to work out how compliment your organisation is with the Essential Eight model.  That is where the Secure Biz App comes in! Remember, no strategy is fool proof.  Just like old fashion security monitoring.  These strategies do not reduce your risk to zero.  But by working towards getting your systems to a Maturity Level of three in all eight strategies, you will go a long way towards minimising that risk, and the potential hurt that can come from being less than vigilant. </p>
                </div>




            </BodyContainer>

        </React.Fragment>

    )
}

export default AsdInfo


