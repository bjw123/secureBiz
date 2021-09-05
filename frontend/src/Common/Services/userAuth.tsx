import { publicAPI, adminAPI } from '../Services/API';
import { url } from '../../Config/Config';
import axios from 'axios';

interface result {
  result: boolean;
  token: string;
}

export const userAuth = async (username: string, password: string): result => {
  let content = { email: username, password: password };
  //   let response = await adminAPI.adminlogin(JSON.stringify(content));
  try {
    let response = await axios(`${url.serverBaseURL}/login`, {
      data: content,
      method: 'POST',
      // responseType: 'blob', //Force to receive data in a Blob Format
    });
    console.log('response', response.data);
    // .then((response) => {
    //   console.log('response', response.body);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    return { result: true, token: response.data.accessToken };
  } catch (e) {
    return { result: false, token: '' };
  }
};
