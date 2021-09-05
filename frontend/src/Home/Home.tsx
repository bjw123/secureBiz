import React, {
  useEffect,
  useState,
  useContext,
  ReactPortal,
  useMemo,
} from 'react';
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Style from './home.module.scss';
import Styles from './homepage.module.scss';
import QuestionModal from '../Common/QuestionModal/QuestionModal';
import { MetaContext } from '../Context/Context';
import { Helmet } from 'react-helmet';
import Faq from '../FAQ/Faqs';
import VideoPlayer from './Videoplayer';
import classNames from 'classnames';

export default function Home({ setQuest }: any) {
  console.log('Home render');
  const [metaState, setMetaState] = useContext(MetaContext);

  // const handleShow = (event: any) => {
  //   setMetaState({
  //     ...metaState,
  //     questionnaire: {
  //       name: event.target.name,
  //       show: metaState.questionnaire.show ? false : true,
  //     },
  //   });
  // };

  return (
    <>
      {/* SEO META ELEMENTS */}
      <Helmet>
        <meta charSet='utf-8' />
        <title>{'SecureBiz - Online Cyber Security Assessment'}</title>
        <meta
          name='description'
          content='SecureBiz, free Online Cyber Security Assessment.'
        />
        <link rel='canonical' href='http://securebizapp.com/' />
      </Helmet>

      <div className={Styles.body}>
        <div
          className={classNames([
            Styles.body_content,
            Styles.body_content_nav_fixed,
          ])}
        >
          <div
            className={classNames([
              Styles.billboard_group,
              Styles.billboard_nav_fixed,
            ])}
          >
            <div
              className={classNames([
                Styles.billboard,
                Styles.billboard_full_height,
              ])}
            >
              <div
                className={classNames([
                  Styles.billboard_fill,
                  Styles.billboard_fill_default,
                  Styles.billboard_fill_solid,
                ])}
              >
                <div className={Styles.container}>
                  <div className={Styles.row}>
                    <div className={Styles.billboard_content}>
                      <div className={Styles.billboard_headline}>
                        <div className={Styles.h5}>
                          <div
                            className={classNames([
                              Styles.billboard_title,
                              Styles.billboard_heading,
                            ])}
                          >
                            Cyber security is something that all businesses need
                            to focus on
                          </div>
                        </div>

                        <div className={Styles.billboard_subtitle}>
                          <div className={Styles.p}>
                            43% of all small businesses were the target
                            cyber-crimes
                            <a
                              style={{ fontSize: '15px', color: 'white' }}
                              href='https://smallbiztrends.com/2016/04/cyber-attacks-target-small-business.html'
                              target='_blank'
                            >
                              [1]
                            </a>
                            <span> </span>
                            and 22% of small businesses were affected by a
                            Ransomware attack that forced them to stop operating
                            <a
                              style={{ fontSize: '15px', color: 'white' }}
                              href='https://go.malwarebytes.com/rs/805-USG-300/images/Second Annual State of Ransomware Report - Australia.pdf'
                              target='_blank'
                            >
                              [2]
                            </a>
                            <span> </span>
                          </div>
                        </div>
                        <div className={Styles.billboard_footer}>
                          <div>
                            <Link
                              style={{ marginRight: '6px' }}
                              className={classNames([
                                Styles.btn,
                                Styles.bannerButton,
                                Styles.btn_inverse,
                                Styles.btn_lg,
                                Styles.btn_hero,
                              ])}
                              to='/question'
                              onClick={() => setQuest('AppControl')}
                            >
                              GET STARTED
                            </Link>
                            <Link
                              className={classNames([
                                Styles.btn,
                                Styles.bannerButton,
                                Styles.btn_inverse,
                                Styles.btn_lg,
                                Styles.btn_hero,
                              ])}
                              to='/why-us'
                            >
                              TELL ME MORE
                            </Link>
                          </div>
                        </div>
                        <div
                          className={Styles.billboard_nav}
                          aria-hidden={true}
                        >
                          {/* <div  className={Styles.billboard_nav_controls}>

                                <a href="billboard_video"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_down])}> 
                                </a>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={classNames([
                  Styles.billboard,
                  Styles.billboard_fill_inverse,
                  Styles.billboard_fill_solid,
                  Styles.billboard_fill_flat,
                ])}
              >
                <div
                  className={classNames([
                    Styles.container,
                    Styles.billboard_container,
                  ])}
                >
                  <div className={classNames([Styles.row, Styles.row_flex])}>
                    <div className={classNames([Styles.col, Styles.col_xs_8])}>
                      <div className={Styles.billboard_container}>
                        <div className={Styles.billboard}>
                          <div className={Styles.billboard_fill}>
                            <div className={Styles.billboard_content}>
                              <div
                                className={classNames([
                                  Styles.billboard_title,
                                  Styles.billboard_heading,
                                ])}
                              >
                                {' '}
                                Watch a video on ASD Essential Eight
                              </div>
                              <div className={Styles.billboard_text}>
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classNames([Styles.col, Styles.col_xs_4])}>
                      <div className={classNames([Styles.billboard])}>
                        <div className={classNames([Styles.billboard_fill])}>
                          <div
                            className={classNames([
                              Styles.billboard_bg,
                              Styles.billboard_img_responsive,
                              Styles.billboard_img_right,
                              Styles.billboard_img_center,
                            ])}
                          >
                            <VideoPlayer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id='billboard_intro'
                className={classNames([
                  Styles.billboard,
                  Styles.billboard_full_height,
                ])}
              >
                <div
                  id='bannerFullWidth'
                  style={{ backgroundColor: '#00647c' }}
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
                            What is the ASD Essential Eight?
                          </div>
                          <div className={Styles.billboard_text}>
                            <p>
                              ASD stands for the Australian Signals Directorate
                              (ASD). The part of the Australian intelligence
                              community designated with the task of monitoring
                              foreign electronic communications. A sub-branch of
                              ASD is the Australian Cyber Security Centre
                              (ASCS). Their mandate is to “provide advice and
                              information about how to protect you, your family
                              and your business online.” They provide alerts,
                              guidance, and other information to the public to
                              achieve this goal.{' '}
                            </p>
                            <p>
                              Part of that guidance is the ASD Essential Eight.
                              This is a model – a collection of mitigation
                              strategies – designed to minimise the risk of
                              various cyber threats.{' '}
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
                            Interested in learning more about the ASD Essential
                            8 Assessments?
                          </h3>
                          <p>
                            To find out more about <span> </span>
                            <Link style={{ color: 'white' }} to='/why-us'>
                              ASD Essentials
                            </Link>
                          </p>
                        </div>
                        {/* <div className={Styles.billboard_nav} aria-hidden="true">
                            <div  className={Styles.billboard_nav_controls}>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_up])}> 
                                </a>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_down])}> 
                                </a>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id='billboard_blurb'
                className={classNames([
                  Styles.billboard,
                  Styles.billboard_full_height,
                ])}
              >
                <div
                  className={classNames([
                    Styles.billboard_fill,
                    Styles.billboard_fill_inverse,
                    Styles.billboard_fill_solid,
                  ])}
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
                            Getting basics of Cyber Security right
                          </div>
                          <div className={Styles.billboard_text}>
                            <p>
                              Artificial intelligence. Blockchain. Zero-day
                              detection. The cyber security marketplace contains
                              a litany of confusing buzzwords that can make an
                              already complex subject sometimes even more
                              confusing. But like so many other fields, before
                              you can make any progress in cyber security you
                              first need to get the fundamentals right.
                            </p>
                          </div>
                        </div>
                        <aside
                          className={classNames([
                            Styles.panel,
                            Styles.panel_tip,
                          ])}
                        >
                          <h3 className={Styles.panel_heading}>
                            <span
                              aria-hidden={true}
                              className={classNames([
                                Styles.fa,
                                Styles.fa_info_circle,
                              ])}
                            ></span>
                            Like to know more?
                          </h3>
                          <p>
                            For more information on the ASD Essential Eight
                            please click this link which lead to an external
                            website
                            <a
                              href='https://www.cyber.gov.au/acsc/view-all-content/publications/essential-eight-maturity-model'
                              target='_blank'
                            >
                              ACSC ASD Essential 8 Model
                            </a>
                          </p>
                        </aside>

                        <div
                          className={classNames([
                            Styles.h4,
                            Styles.text_center,
                          ])}
                        >
                          {' '}
                          The full assessment will take you about 30 minutes to
                          complete and contains 99 questions. Click below to
                          start your assessment!{' '}
                        </div>

                        <div className={Styles.text_center}>
                          <div>
                            <Link
                              className={classNames([
                                Styles.btn,
                                Styles.btn_inverse,
                                Styles.btn_lg,
                                Styles.btn_hero,
                              ])}
                              to='/question'
                              onClick={() => setQuest('AppControl')}
                            >
                              GET STARTED
                            </Link>
                          </div>
                        </div>

                        {/* <div className={Styles.billboard_nav} aria-hidden="true">
                            <div  className={Styles.billboard_nav_controls}>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_up])}> 
                                </a>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_down])}> 
                                </a>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
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
                            <div className={classNames([Styles.h4])}>
                              Who should do this?
                            </div>
                            <p>
                              This App is designed with small to medium size
                              businesses in mind. Thus, the Chief Information
                              Officer, or their agent, should be the one to
                              complete this survey.{' '}
                            </p>
                          </div>

                          <div
                            className={classNames([
                              Styles.well,
                              Styles.well_inverse,
                            ])}
                          >
                            <div className={classNames([Styles.h4])}>
                              Do I need to do this just the once or on some
                              regular basis?
                            </div>
                            <div className={Styles.billboard_text}>
                              <p>
                                Surveys are a snapshot in time. They tell you
                                how things were then. As such we would advise
                                that the survey be done at least once/year to
                                review is the organisations status has changed.
                                Also, whenever there is major organisational
                                change. Often it is the state of the
                                organisation that will determine if strategies
                                are being applied rather than the state of the
                                IT infrastructure.
                              </p>
                            </div>
                          </div>

                          <div
                            className={classNames([
                              Styles.well,
                              Styles.well_inverse,
                            ])}
                          >
                            <div className={classNames([Styles.h4])}>
                              Are my responses secure?
                            </div>
                            <div className={Styles.billboard_text}>
                              <p>
                                Except for when Feedback is provided, no data is
                                retained! This includes your answers, IP
                                address, and all meta data. Additionally, all
                                feedback responses are encrypted when at rest.
                              </p>
                            </div>
                          </div>
                          <aside
                            className={classNames([
                              Styles.panel,
                              Styles.panel_tip,
                            ])}
                          >
                            <h3 className={Styles.panel_heading}>
                              <span
                                aria-hidden={true}
                                className={classNames([
                                  Styles.fa,
                                  Styles.fa_info_circle,
                                ])}
                              ></span>
                              Have more questions?
                            </h3>
                            <p>
                              To find answers to more frequently asked questions
                              please click this link <span> </span>
                              <Link style={{ color: 'white' }} to='/faq'>
                                FAQ
                              </Link>
                            </p>
                          </aside>
                        </div>
                        {/* <div className={Styles.billboard_nav} aria-hidden="true">
                            <div  className={Styles.billboard_nav_controls}>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_up])}> 
                                </a>
                                <a href="#"className={classNames ([Styles.link_scroll, Styles.btn_cycle,Styles.icon_cycle, Styles.fa, Styles.fa_chevron_down])}> 
                                </a>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
