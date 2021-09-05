import React, {
  useEffect,
  createContext,
  useState,
  useReducer,
  useLayoutEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { url } from '../../Config/Config';
import ReactLoading from 'react-loading';

// interface IAuthContext {
//   accessToken: string;
//   authorised: boolean;
// }

const initialValue = {
  accessToken: '',
  authorised: false,
  loading: false,
};
const reducer = (currentState: any, newState: any) => {
  return newState;
};

interface IAuthContext {
  getToken: () => string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = (props: ReactNode | any) => {
  const { children } = props;
  const [auth, dispatch] = useReducer(reducer, initialValue);

  useLayoutEffect(() => {
    dispatch({ ...auth, loading: true });
    const initialise = async () => {
      let token = window.localStorage.getItem('accessToken');
      console.log('token', token);
      if (token) {
        try {
          let response = await axios(`${url.serverBaseURL}/vertifytoken`, {
            data: { accessToken: token },
            method: 'POST',
          });
          console.log('responsetoken', response.data.valid);

          dispatch({
            ...auth,
            accessToken: token,
            authorised: response.data.valid,
            loading: false,
          });
        } catch (e) {
          dispatch({ ...auth, loading: false });
          console.log('token validate failed');
        }
      } else {
        dispatch({ ...auth, loading: false });
      }
    };
    initialise();
  }, []);

  const getToken = () => {
    return auth.accessToken;
  };

  return (
    <>
      <AuthContext.Provider value={{ getToken }}>
        {auth.authorised && children}
        {!auth.authorised && !auth.loading && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Not authorised, please sign in again.
          </div>
        )}
      </AuthContext.Provider>
      {/* {auth.loading && (
        <ReactLoading
          type={'spinningBubbles'}
          color={'#1691d1'}
          height={'20%'}
          width={'20%'}
          className='loadingSpinner'
        />
      )} */}
    </>
  );
};
