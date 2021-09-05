import React, { useEffect, useState, useContext, memo } from 'react';
import { Navbar, Nav, Modal, Button, Form, SafeAnchor } from 'react-bootstrap';
import Style from './admin.module.scss';
import classNames from 'classnames';
import { MetaContext, ImetaContext } from '../Context/Context';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CustomFormControl } from '../Common/Forms/CustomFormControl';
import ReactLoading from 'react-loading';
import { url } from '../Config/Config';
import { userAuth } from '../Common/Services/userAuth';

interface props {
  metaState: ImetaContext;
  setMetaState: (state: ImetaContext) => void;
}

export default function LoginModal({
  metaState,
  setMetaState,
}: props): JSX.Element {
  console.log('Admin render');
  // const [metaState, setMetaState] = useContext(MetaContext);
  const { rememberMe } = metaState.admin;
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
  });

  const handleClose = (v: React.MouseEvent<HTMLInputElement>): void =>
    setMetaState({ ...metaState, login: false });

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    //setState({ loading: true });
    // load spinner 1 second

    // remove load spinner

    // Retrieve the user info
    let username = e.target.childNodes[1].childNodes[0].childNodes[1].value;
    let password = e.target.childNodes[1].childNodes[1].childNodes[1].value;
    console.log('username', username, 'pw', password, 'remember');

    //      useEffect(() => {
    // async function createComponent() {
    //    let authResult = await userAuth(username, password);
    // }
    let authResult = await userAuth(username, password);
    //Auth true
    console.log('authResult 1', authResult, authResult.result);
    if (authResult.result) {
      console.log('authResult 2');
      if (rememberMe) {
        // rememberMe true set local
        localStorage.setItem('accessToken', authResult.token);
      } else {
        // rememberMe false set session
        sessionStorage.setItem('accessToken', authResult.token);
      }
      // remove modal
      setMetaState({ ...metaState, login: false });

      //redirect user to new URL
      window.location.assign(`${url.clientBaseURL}/admin/dashboard`);
    } else {
      alert('Wrong password, please re-enter');
    }
  };

  // Set RememberMe to state
  const checkOnChange = (v: React.MouseEvent<HTMLInputElement>): void => {
    setMetaState({
      ...metaState,
      admin: { rememberMe: !rememberMe },
    });

    console.log(`metaState.admin.rememberMe`, rememberMe);
  };

  return (
    <>
      <Modal
        className={Style.navModal}
        show={metaState.login}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Formik
          initialValues={{
            userName: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string()
              .min(3, 'Must be 5 characters')
              .required('Username is required'),
            password: Yup.string().required('Password is required'),
          })}
          //can't remove, since it e.preventDefault not work, created a separate function to handle submit.
          onSubmit={(values) => {
            console.log('onSubmit', values);
          }}
        >
          <Form onSubmit={onSubmitForm}>
            <Modal.Header
              closeButton
              onClick={handleClose}
              className={Style.navModalHeader}
            >
              <Modal.Title className={Style.navModalTitle}>
                Admin Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={Style.navModalBody}>
              <CustomFormControl
                labelName='Username'
                name='userName'
                type='text'
                placeholder='Enter Username'
                className={Style.formControl}
              />
              <CustomFormControl
                labelName='Password'
                name='password'
                type='password'
                placeholder='Enter Password'
                className={Style.formControl}
              />
              {/* <Form.Check
                  type='checkbox'
                  id={`rememberMe`}
                  label={`Remember me`}
                  defaultChecked={true}
                  onChange={checkOnChange}
                  className={Style.rememberMe}
                /> */}
            </Modal.Body>
            <Modal.Footer className={Style.navModalFooter}>
              <Button
                variant='success'
                type='submit'
                // href={"#/admin-home"}
                // onClick={handleClose}
                className={Style.navModalButton}
              >
                Login
              </Button>
              <Button
                variant='success'
                type='submit'
                // href={"#/admin-home"}
                // onClick={handleClose}
                className={Style.navModalButton}
              >
                Cancel
              </Button>
              {/* <SafeAnchor
                href={''}
                className={classNames(Style.forgotPassword)}
              >
                Forgot password?
              </SafeAnchor> */}
              {/* {state.loading && (
                  <ReactLoading
                    type={'spinningBubbles'}
                    color={'#1691d1'}
                    height={'20%'}
                    width={'20%'}
                    className='loadingSpinner'
                  />
                )} */}
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

// export default memo(
//   ({ metaState, setMetaState }: props): JSX.Element => {
//     console.log('Admin render');
//     // const [metaState, setMetaState] = useContext(MetaContext);
//     const { rememberMe } = metaState.admin;
//     const [state, setState] = useState({
//       username: '',
//       password: '',
//       loading: false,
//     });

//     const handleClose = (v: React.MouseEvent<HTMLInputElement>): void =>
//       setMetaState({ ...metaState, login: false });

//     const onSubmitForm = async (e: any) => {
//       e.preventDefault();
//       //setState({ loading: true });
//       // load spinner 1 second

//       // remove load spinner

//       // Retrieve the user info
//       let username = e.target.childNodes[1].childNodes[0].childNodes[1].value;
//       let password = e.target.childNodes[1].childNodes[1].childNodes[1].value;
//       console.log('username', username, 'pw', password, 'remember');

//       //      useEffect(() => {
//       // async function createComponent() {
//       //    let authResult = await userAuth(username, password);
//       // }
//       let authResult = await userAuth(username, password);
//       //Auth true
//       console.log('authResult 1', authResult, authResult.result);
//       if (authResult.result) {
//         console.log('authResult 2');
//         if (rememberMe) {
//           // rememberMe true set local
//           localStorage.setItem('accessToken', authResult.token);
//         } else {
//           // rememberMe false set session
//           sessionStorage.setItem('accessToken', authResult.token);
//         }
//         // remove modal
//         setMetaState({ ...metaState, login: false });

//         //redirect user to new URL
//         window.location.assign(`${url.clientBaseURL}/admin/feedback`);
//       } else {
//         alert('Wrong password, please re-enter');
//       }
//     };

//     // Set RememberMe to state
//     const checkOnChange = (v: React.MouseEvent<HTMLInputElement>): void => {
//       setMetaState({
//         ...metaState,
//         admin: { rememberMe: !rememberMe },
//       });

//       console.log(`metaState.admin.rememberMe`, rememberMe);
//     };

//     return (
//       <>
//         <Modal
//           className={Style.navModal}
//           show={metaState.login}
//           onHide={handleClose}
//           backdrop='static'
//           keyboard={false}
//         >
//           <Formik
//             initialValues={{
//               userName: '',
//               password: '',
//             }}
//             validationSchema={Yup.object().shape({
//               userName: Yup.string()
//                 .min(3, 'Must be 5 characters')
//                 .required('Username is required'),
//               password: Yup.string().required('Password is required'),
//             })}
//             //can't remove, since it e.preventDefault not work, created a separate function to handle submit.
//             onSubmit={(values) => {
//               console.log('onSubmit', values);
//             }}
//           >
//             <Form onSubmit={onSubmitForm}>
//               <Modal.Header
//                 closeButton
//                 onClick={handleClose}
//                 className={Style.navModalHeader}
//               >
//                 <Modal.Title className={Style.navModalTitle}>
//                   Admin Login
//                 </Modal.Title>
//               </Modal.Header>
//               <Modal.Body className={Style.navModalBody}>
//                 <CustomFormControl
//                   labelName='Username'
//                   name='userName'
//                   type='text'
//                   placeholder='Enter Username'
//                   className={Style.formControl}
//                 />
//                 <CustomFormControl
//                   labelName='Password'
//                   name='password'
//                   type='password'
//                   placeholder='Enter Password'
//                   className={Style.formControl}
//                 />
//                 {/* <Form.Check
//                   type='checkbox'
//                   id={`rememberMe`}
//                   label={`Remember me`}
//                   defaultChecked={true}
//                   onChange={checkOnChange}
//                   className={Style.rememberMe}
//                 /> */}
//               </Modal.Body>
//               <Modal.Footer className={Style.navModalFooter}>
//                 <Button
//                   variant='success'
//                   type='submit'
//                   // href={"#/admin-home"}
//                   // onClick={handleClose}
//                   className={Style.navModalButton}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   variant='success'
//                   type='submit'
//                   // href={"#/admin-home"}
//                   // onClick={handleClose}
//                   className={Style.navModalButton}
//                 >
//                   Cancel
//                 </Button>
//                 <SafeAnchor
//                   href={''}
//                   className={classNames(Style.forgotPassword)}
//                 >
//                   Forgot password?
//                 </SafeAnchor>
//                 {/* {state.loading && (
//                   <ReactLoading
//                     type={'spinningBubbles'}
//                     color={'#1691d1'}
//                     height={'20%'}
//                     width={'20%'}
//                     className='loadingSpinner'
//                   />
//                 )} */}
//               </Modal.Footer>
//             </Form>
//           </Formik>
//         </Modal>
//       </>
//     );
//   }
// );
