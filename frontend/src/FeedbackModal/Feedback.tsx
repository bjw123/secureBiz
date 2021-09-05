import React, { useEffect, useState, useContext, useRef, memo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Style from './feedback.module.scss';
import { MetaContext } from '../Context/Context';
import ReactLoading from 'react-loading';
import { publicAPI } from './../Common/Services/API';

interface state {
  form: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  submitted: boolean;
  loading: boolean;
}

interface props {
  feedbackOpen: boolean;
  feedbackClose: () => void;
}

export default memo(
  ({ feedbackOpen, feedbackClose }: props): JSX.Element => {
    console.log('Feedback render');
    // const [metaState, setMetaState] = useContext(MetaContext);
    const [state, setState] = useState<state>({
      form: {
        name: '',
        phone: '',
        email: '',
        message: '',
      },
      submitted: false,
      loading: false,
    });
    // const handleClose = () => setMetaState({ ...metaState, feedback: false });
    const feedbackRef = useRef(null);

    /* useEffect(() => {
    console.log("Feedback useEffect ran");
    if (metaState.feedback && !state.submitted) {
      // @ts-ignore
      feedbackRef.current.focus();
    }
  });
*/
    const onChange = (e: any): void => {
      console.log('e.target', e.target);
      setState({
        ...state,
        form: {
          ...state.form,
          [e.target.name]: e.target.value,
        },
      });
      console.log('state', state.form);
    };

    const onSubmit = (e: any): void => {
      e.preventDefault();
      //change
      //  START LOADING
      setState({ ...state, loading: true });
      // STOP LOADING AFTER 1 SEC
      setTimeout(() => {
        let body = {
          //  _id: (Math.random() * 10000).toString(),
          name: state.form.name,
          phone: state.form.phone,
          email: state.form.email,
          content: state.form.message,
        };
        console.log('body', body);
        publicAPI
          .addFeedback(body)
          .then((r) => {
            console.log('Submitted');
            //setMetaState({ ...metaState, feedback: true });
            setState({
              ...state,
              submitted: true,
              loading: false,
            });
          })
          .catch((e) => {
            console.warn('Failed', e);
            setState({
              ...state,
              loading: false,
            });
            alert(
              'Unfortunately, form failed to submit. Please try again later.'
            );
          });
      }, 1000);
    };

    return (
      <Modal
        className={Style.navModal}
        show={feedbackOpen} // SHOW IF TRUE
        onHide={feedbackClose}
        backdrop='static'
        keyboard={false}
      >
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton onClick={feedbackClose}>
            <Modal.Title className={Style.navModalTitle}>
              Feedback Form
            </Modal.Title>
          </Modal.Header>
          {state.submitted ? (
            <Modal.Body className={Style.navModalBody}>
              <Form.Group
                controlId='exampleForm.ControlTextarea1'
                className={Style.formGroup}
              >
                <Form.Label>Thank you for submitting your feedback.</Form.Label>
              </Form.Group>
            </Modal.Body>
          ) : (
            <Modal.Body className={Style.navModalBody}>
              <Form.Group
                controlId='exampleForm.ControlInput1'
                className={Style.formGroup}
              >
                <Form.Label className={Style.formLabel}>Name</Form.Label>
                <Form.Control
                  name='name'
                  type='input'
                  className={Style.formControl}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId='exampleForm.ControlInput2'
                className={Style.formGroup}
              >
                <Form.Label className={Style.formLabel}>
                  Phone Number
                </Form.Label>
                <Form.Control
                  name='phone'
                  type='number'
                  className={Style.formControl}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId='exampleForm.ControlInput3'
                className={Style.formGroup}
              >
                <Form.Label className={Style.formLabel}>Email</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='name@example.com'
                  className={Style.formControl}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId='exampleForm.ControlTextarea1'
                className={Style.formGroup}
              >
                <Form.Label className={Style.formLabel}>
                  Type your feedback in the box below
                </Form.Label>
                <Form.Control
                  name='message'
                  as='textarea'
                  rows={3}
                  onChange={onChange}
                  ref={feedbackRef}
                  className={Style.formControl}
                  required
                />
              </Form.Group>
            </Modal.Body>
          )}
          <Modal.Footer className={Style.navModalFooter}>
            {!state.submitted && (
              <Button
                variant='success'
                type='submit'
                className={Style.navModalButton}
                //onClick={afterPage}
              >
                {'Submit'}
              </Button>
            )}

            {state.loading && (
              <ReactLoading
                type={'spinningBubbles'}
                color={'#1691d1'}
                height={'20%'}
                width={'20%'}
                className={Style['loadingSpinner']}
              />
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
);
